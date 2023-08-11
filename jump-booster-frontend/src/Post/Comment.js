import React, {useContext, useEffect, useState} from "react";
import {getAccountById} from "../Helper/accountHelper";
import './Comment.css'
import {ContextProvider} from "../general/ContextElem";
import {Link} from "react-router-dom";

export const Comment = (props) => {
    const {userId} = useContext(ContextProvider);
    const [role, setRole] = useState();
    const [comments, setComments] = useState([]);
    const [commentChange, setCommentChange] = useState(false);

    useEffect(() => {
        if(userId) getAccountById(userId).then((userObj) => setRole(userObj.role));
        const fetchData = async () => {
            const formData = new FormData();
            formData.append("postId", props.postId);
            formData.append("role", props.role);
            const commentsResponse = await fetch("/comment/get-comments-by-post-id-by-role", {
                method: "POST",
                body: formData
            })

            const CommentsData = await commentsResponse.json();

            const getCommentsPromises = CommentsData.map((comment) =>
                getAccountById(comment.userId).then((accountObj) => (comment.username = accountObj.username))
            );

            Promise.all(getCommentsPromises).then(() => {
                setComments(CommentsData);
            });
        }
        fetchData();
    }, [commentChange])

    function handleCommentSubmit(){
        const formData = new FormData();
        formData.append("postId", props.postId);
        formData.append("userId", userId);
        formData.append("content", document.getElementById('comment-textarea').value);
        formData.append("role", props.role);
        fetch("/comment/upload", {
            method: "POST",
            body: formData
        })
            .then(() => {
                alert("Comment uploaded!");
                setCommentChange(!commentChange);
                document.getElementById('comment-textarea').value = ''
            })
            .catch((error) => alert("Something didn't go right."))
    }


    return(
        <div id="comments-div">
            {userId === '' && (
                <div id="login-inform-div">
                    <Link to="/select-account" className="content-font" id="login-inform-text">Login to leave a comment.</Link>
                </div>
            )}
            {userId !== '' && (props.role === "individual" && role === "individual"|| props.role === "business" && role === "business") && (
                <>
                    <textarea id="comment-textarea" placeholder="Write comment..."></textarea>
                    <button onClick={handleCommentSubmit}>Submit</button>
                </>
            )}
            {comments && comments.reverse().map(comment => (
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
    )
}

export default Comment;