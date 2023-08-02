import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Auth/Authenticator";
import {Link} from "react-router-dom";
import {getAccountById} from "../Helper/accountHelper";
import './DisplayPosts.css'
function Blog() {
    const [originalPosts, setOriginalPosts] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const {userId} = useContext(AuthContext);

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
        setBlogPosts((prevPosts) => prevPosts.filter((post) => post.content.includes(searchTextArea.value)))
    }
    return(
        <div id="pageDiv">
            <h2 id="postTitle">Project Posts</h2>
            <div id="searchTab">
                <textarea id="searchTextArea" placeholder="Search..." onChange={handleChange}/>
            </div>
            <div id="postContainerDiv">
                {blogPosts && blogPosts.reverse().map((post) => (
                    <div className="postDiv" key={post.id}>
                        <img src={`data:image/jpeg;base64,${post.titleImg}`} alt="titleImg" className="titleImg"/>
                        <Link className="postLink" to={post.title + "/" + post.postId}><h2 className="postTitle">{post.title}</h2></Link>
                        <p className="postContent">{post.content}</p>
                        <input type="range" min="0" max={post.goalMoney} value={post.currentMoney} className="moneyBar" />
                        <p className="moneyP">{post.currentMoney} EUR/{post.goalMoney} EUR</p>
                        <div className="rightAlignedDiv">
                            <p className="author">By : {post.username}</p>
                        </div>
                        <div className="rightAlignedDiv">
                            { userId === post.userId && <button className="deleteButton" onClick={() => handleDelete(post.postId)}>Delete Post</button>}
                        </div>
                    </div>
                ))}
            </div>

            {blogPosts.length === 0 &&
                <h3 id={"no-post-h"}>No posts! Write something ;)</h3>
            }
        </div>
    )
}

export default Blog;