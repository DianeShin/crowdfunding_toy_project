import React, {useContext, useEffect, useState} from "react";
import {ContextProvider} from "../general/ContextElem";
import {Link} from "react-router-dom";
import './MyProjects.css'

export const MyProjects = () => {
    const {userId} = useContext(ContextProvider);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/fetchPostsByUserId", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(userId)
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                else throw new Error("No posts.")
            })
            .then((posts) => {
                setPosts(posts)
            })
            .catch((error) => {});
    }, [userId]);

    return (
        <div id="myPostContainerDiv">
            <Link to="/create-project">
                <div className="myPostDiv">
                    <h2 id="addText"> + Add new project</h2>
                </div>
            </Link>
            {posts && posts.reverse().map((post) => (
                <div className="myPostDiv" key={post.id}>
                    <img src={`data:image/jpeg;base64,${post.titleImg}`} alt="titleImg" className="myPostTitleImg"/>
                    <h3 className="title-font myPostTitle">{post.title}</h3>
                    <input type="range" min="0" max={post.goalMoney} value={post.currentMoney} className="myPostMoneyBar" />
                    <p className="myPostmoneyP">{post.currentMoney/post.goalMoney*100}%</p>
                    {post.status === 0 && <p id="status-indicator" className="pending title-font">PENDING</p>}
                    {post.status === 1 && <p id="status-indicator" className="active title-font">ACTIVE</p>}
                    {post.status === -1 && <button id="status-indicator" className="aborted title-font" onClick={() => window.location.href = "/aborted/" + post.title + "/" + post.postId}>ABORTED</button>}
                </div>
            ))}
        </div>
    )
}

export default MyProjects;