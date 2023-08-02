import {useEffect, useState} from "react";
import './Post.css'
import {getAccountById} from "../Helper/accountHelper";

const Post = (props) => {
    const [post, setPost] = useState('');
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
                if(postResponse.userId) getAccountById(postResponse.userId).then((userObj) => setUserName(userObj.name));
            });

    }, []);

    return (
        <div className="postDiv">
            <h1 className="postTitle">{post.title}</h1>
            <p className="postAuthor">{userName}</p>
            <p className="postContent">{post.content}</p>
        </div>
    )
}
export default Post;