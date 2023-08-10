import React, {useContext, useEffect, useState} from "react";
import './Post.css'
import {getAccountById} from "../Helper/accountHelper";
import {Link} from "react-router-dom";
import {ContextProvider} from "../general/ContextElem";

const Post = (props) => {
    const {userId} = useContext(ContextProvider);
    const [post, setPost] = useState('');
    const [fundersComments, setFundersComments] = useState([]);
    const [tabMode, setTabMode] = useState('Description');
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [commentChange, setCommentChange] = useState(false);

    useEffect(() => {
        if (userId !== '') getAccountById(userId).then((userObj) => setUserRole(userObj.role));
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

            const fundersCommentsResponse = await fetch("/comment/get-funders-comments-by-post-id", {
                method: "POST",
                body: formData
            })

            const fundersCommentsData = await fundersCommentsResponse.json();

            const getCommentsPromises = fundersCommentsData.map((comment) =>
                getAccountById(comment.userId).then((accountObj) => (comment.username = accountObj.username))
            );

            Promise.all(getCommentsPromises).then(() => {
                setFundersComments(fundersCommentsData);
            });

        }

        fetchData();
    }, [commentChange]);

    function handleCommentSubmit(){
        const formData = new FormData();
        formData.append("postId", post.postId);
        formData.append("userId", userId);
        formData.append("content", document.getElementById('funders-comment-textarea').value);
        formData.append("role", "funder");
        fetch("/comment/upload", {
            method: "POST",
            body: formData
        })
            .then(() => {
                alert("Comment uploaded!");
                setCommentChange(!commentChange);
                document.getElementById('funders-comment-textarea').value = ''
            })
            .catch((error) => alert("Something didn't go right."))
    }

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
                <div>
                    <button onClick={() => setTabMode('Description')}>Description</button>
                    <button onClick={() => setTabMode('Project owner\'s comments')}>Project owner's comments</button>
                    <button onClick={() => setTabMode('Funder\'s comments')}>Funder's comments</button>
                    <button onClick={() => setTabMode('Policies')}>Policies</button>
                </div>
                {tabMode === 'Funder\'s comments' && (
                    <div id="funders-comments-div">
                        <textarea id="funders-comment-textarea" placeholder="Write comment..."></textarea>
                        <button onClick={handleCommentSubmit}>Submit</button>
                        {fundersComments && fundersComments.reverse().map(comment => (
                            <div key={comment.commentId} className="commentDiv">
                                <div className="commentContent">
                                    <p>{comment.content}</p>
                                </div>
                                <div className="commentInfo right">
                                    <p>By : {comment.username} </p>
                                    <p className="timestamp">({comment.timestamp})</p>
                                </div>
                            </div>
                        ))}
                    </div>
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
                                    <button onClick={() => handleActive} id="activate-button">Activate</button>
                                    <button onClick={() => handleDelete} id="delete-button">Delete</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleAbort} id="abort-button">Abort</button>
                                    <button onClick={() => handleDelete} id="delete-button">Delete</button>
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