import React, {useContext, useEffect, useState} from "react";
import {ContextProvider} from "../general/ContextElem";
import {Link} from "react-router-dom";
import {getAccountById} from "../Helper/accountHelper";
import './DisplayPosts.css'
function DisplayPosts() {
    const [originalPosts, setOriginalPosts] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const {userId} = useContext(ContextProvider);

    useEffect(() => {
        fetch("/fetchAllPosts", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                else throw new Error("No posts.")
            })
            .then((posts) => {
                const getUserPromises = posts.map((post) =>
                    getAccountById(post.userId).then((accountObj) => (post.username = accountObj.username))
                );

                // Wait for all promises to be resolved before updating the state
                Promise.all(getUserPromises).then(() => {
                    setBlogPosts(posts);
                    setOriginalPosts(posts);
                });
            })
            .catch((error) => {});
    }, []);

    function handleDelete(postId){
        const data = {
            postId: postId,
            userId: userId
        };
        fetch("/deleteBlogPost", {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.text())
            .then((text) => {
                if (text === "OK"){
                    alert("Post deleted.");
                    setBlogPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
                }
                else alert(text);
            })
            .catch((error) => alert("Something didn't go right."))
    }

    function handleChange(){
        const searchTextArea = document.getElementById("searchTextArea");
        setBlogPosts(originalPosts);
        setBlogPosts((prevPosts) => prevPosts.filter((post) => post.title.includes(searchTextArea.value)))
    }

    function copyContent(){
        let button = document.getElementById("emailButton");
        navigator.clipboard.writeText(button.innerText);
        alert("Copied!");
    }

    return(
        <div id="pageDiv">
            <div className="center" id="top-bar">
                <h1 className="title-font" id="display-title">Project Posts</h1>
            </div>
            <div id="searchTab">
                <textarea id="searchTextArea" placeholder="Search by title..." onChange={handleChange}/>
            </div>
            <div id="postContainerDiv">
                {blogPosts && blogPosts.reverse().filter((post) => post.status === 1).map((post) => (
                    <div className="postDiv" key={post.id}>
                        <img src={`data:image/jpeg;base64,${post.titleImg}`} alt="titleImg" className="titleImg"/>
                        <Link className="postLink" to={post.title + "/" + post.postId} onClick={scrollToTop}><h2 className="postTitle">{post.title}</h2></Link>
                        <p className="postContent">{post.content}</p>
                        <input type="range" min="0" max={post.goalMoney} value={post.currentMoney} className="moneyBar" />
                        <p className="moneyP">{post.currentMoney/post.goalMoney*100}%</p>
                        <div className="rightAlignedDiv">
                            <p className="author">By : {post.username}</p>
                        </div>
                    </div>
                ))}
            </div>

            {blogPosts.length === 0 &&
                <h1 id="no-post-h" className="title-font">There are no results. Search something else!</h1>
            }
        </div>
    )
}

export default DisplayPosts;