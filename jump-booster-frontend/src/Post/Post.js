import React, {useContext, useEffect, useState} from "react";
import './Post.css'
import {getAccountById} from "../Helper/accountHelper";
import {Link} from "react-router-dom";
import {ContextProvider} from "../general/ContextElem";

const Post = (props) => {
    const {userId} = useContext(ContextProvider);
    const [post, setPost] = useState('');
    const [tabMode, setTabMode] = useState('Description');
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        if (userId !== '') getAccountById(userId).then((userObj) => setUserRole(userObj.role));
        const formData = new FormData();
        formData.append("postId", props.id);
        fetch("/post/get-post-by-post-id", {
            method: "POST",
            body: formData
        })
            .then((response) => response.json())
            .then((postResponse) => {
                setPost(postResponse);
                if(postResponse.userId) getAccountById(postResponse.userId).then((userObj) => setUserName(userObj.username));
            });

    }, []);

    function handleDelete(postId){
        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("userId", userId);

        fetch("/post/delete", {
            method: "DELETE",
            body: formData
        })
            .then((response) => response.text())
            .then((text) => {
                if (text === "OK"){
                    alert("Post deleted.");
                    window.location.href = "/complaints"
                }
                else alert(text);
            })
            .catch((error) => alert("Something didn't go right."))
    }

    function handleActive(postId){
        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("userId", userId);

        fetch("/post/activate", {
            method: "POST",
            body: formData
        })
            .then((response) => response.text())
            .then((text) => {
                if (text === "OK"){
                    alert("Post activated.");
                    window.location.href = "/complaints"
                }
                else alert(text);
            })
            .catch((error) => alert("Something didn't go right."))
    }

    function handleAbort(postId){
        const formData = new FormData();
        formData.append("postId", postId);
        formData.append("userId", userId);

        fetch("/post/abort", {
            method: "POST",
            body: formData
        })
            .then((response) => response.text())
            .then((text) => {
                if (text === "OK"){
                    alert("Post aborted.");
                    window.location.href = "/complaints"
                }
                else alert(text);
            })
            .catch((error) => alert("Something didn't go right."))
    }

    return (
        <div id="post-container">
            <div id="post-div">
                <img src={`data:image/jpeg;base64,${post.titleImg}`} alt="titleImg" id="title-img"/>
                <div>
                    <button onClick={() => setTabMode('Description')}>Description</button>
                    <button onClick={() => setTabMode('Project owner\'s comments')}>Project owner's comments</button>
                    <button onClick={() => setTabMode('Funder\'s comments')}>Funder's comments</button>
                    <button onClick={() => setTabMode('Policies')}>Policies</button>
                </div>
                {tabMode === 'Description' && (
                    <div id = "tab-div">
                        <p>{<img src={`data:image/jpeg;base64,${post.contentImg}`} alt="contentImg" id="content-img"/>}</p>
                    </div>

                )}
                {tabMode === 'Policies' && (
                    <div id = "tab-div">
                        <p>Funding is investing. We can't guarantee a reward.</p>
                    </div>

                )}
                {userId === '' ? (
                    <Link to="/select-account" id="report-link" onClick={() => alert("You need to login to report.")}>Is there a problem? Report the project</Link>
                ) : (
                    userRole !== "administrator" ? (
                        <Link to={"/report-project/" + post.postId} id="report-link">Is there a problem? Report the project</Link>
                    ) : (
                        <>
                            {post.status === -1 ? (
                                <>
                                    <button onClick={() => handleActive(post.postId)} id="activate-button">Activate</button>
                                    <button onClick={() => handleDelete(post.postId)} id="delete-button">Delete</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleAbort(post.postId)} id="abort-button">Abort</button>
                                    <button onClick={() => handleDelete(post.postId)} id="delete-button">Delete</button>
                                </>
                            )}
                        </>
                    )
                )}
            </div>
            <div id="payDiv">
                <h1 className="title-font">{post.title}</h1>
                <p className="postAuthor">{userName}</p>
                <p className="postContent">{post.content}</p>
                <button id="fund-button">Fund!</button>
            </div>
        </div>


    )
}
export default Post;