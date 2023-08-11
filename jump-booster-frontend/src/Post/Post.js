import React, {useContext, useEffect, useState} from "react";
import './Post.css'
import {getAccountById} from "../Helper/accountHelper";
import {Link} from "react-router-dom";
import {ContextProvider} from "../general/ContextElem";
import Comment from "./Comment";
const Post = (props) => {
    const {userId} = useContext(ContextProvider);
    const [post, setPost] = useState('');
    const [tabMode, setTabMode] = useState('Description');
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('individual');

    useEffect(() => {
        if (userId) getAccountById(userId).then((userObj) => setUserRole(userObj.role));
        const fetchData = async () => {
            const formData = new FormData();
            formData.append("postId", props.id);

            const postResponse = await fetch("/post/get-post-by-post-id", {
                method: "POST",
                body: formData
            })

            const postData = await postResponse.json();
            setPost(postData);
            if (postData.userId) getAccountById(postData.userId).then((userObj) => setUserName(userObj.username));
        }
        fetchData();
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

    function handleActive(){
        const formData = new FormData();
        formData.append("postId", post.postId);
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

    function handleAbort(){
        const formData = new FormData();
        formData.append("postId", post.postId);
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
                <div id="post-navbar-div">
                    <button className="post-nav-button" onClick={() => {setTabMode('Description'); window.scrollTo(0, window.scrollY);}}>Description</button>
                    <button className="post-nav-button" onClick={() => {setTabMode('Owner\'s comments'); window.scrollTo(0, window.scrollY);}}>Owner's comments</button>
                    <button className="post-nav-button" onClick={() => {setTabMode('Funder\'s comments'); window.scrollTo(0, window.scrollY);}}>Funder's comments</button>
                    <button className="post-nav-button" onClick={() => {setTabMode('Policies'); window.scrollTo(0, window.scrollY);}}>Policies</button>
                </div>
                <div id="content-div">
                    {tabMode === 'Owner\'s comments' && (
                        <Comment postId={post.postId} role="business"/>
                    )}
                    {tabMode === 'Funder\'s comments' && (
                        <Comment postId={post.postId} role="individual"/>
                    )}
                    {tabMode === 'Description' && (
                        <div id = "description-div">
                            <p>{<img src={`data:image/jpeg;base64,${post.contentImg}`} alt="contentImg" id="content-img"/>}</p>
                        </div>

                    )}
                    {tabMode === 'Policies' && (
                        <div id = "policies-div">
                            <p className="content-font">Funding is investing. Funding doesn't guarantee a reward. However, we will try our best to bring the best result!</p>
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
                                        <button onClick={handleActive} id="activate-button">Activate</button>
                                        <button onClick={handleDelete} id="delete-button">Delete</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleAbort} id="abort-button">Abort</button>
                                        <button onClick={handleDelete} id="delete-button">Delete</button>
                                    </>
                                )}
                            </>
                        )
                    )}
                </div>
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