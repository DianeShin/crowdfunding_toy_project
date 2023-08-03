import React, {useEffect, useState} from "react";
import './Post.css'
import {getAccountById} from "../Helper/accountHelper";
import {Link} from "react-router-dom";
import ReportPost from "./ReportPost";

const Post = (props) => {
    const [post, setPost] = useState('');
    const [tabMode, setTabMode] = useState('Description');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetch("/fetchBlogPostById", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(props.id)
        })
            .then((response) => response.json())
            .then((postResponse) => {
                setPost(postResponse);
                if(postResponse.userId) getAccountById(postResponse.userId).then((userObj) => setUserName(userObj.username));
            });

    }, []);

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
                <div className= "right-bottom-div">

                </div>
                <Link to={"/report-project/" + post.postId} id="report-link">Is there a problem? Report the project</Link>
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