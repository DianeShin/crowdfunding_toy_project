import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './DisplayComplaints.css'
export const DisplayComplaints = () => {
    const [posts, setPosts] = useState([]);
    const [complaints, setComplaints] = useState([]);
    function fetchComplaintPerPost(postId){
        const formData = new FormData();
        formData.append("postId", postId);
        return fetch("/complaint/get-complaint-by-post-id", {
            method: "POST",
            body: formData
        })
            .then((response) => response.json())
    }

    useEffect(() => {
        fetch("/post/fetch-all-active-posts", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((posts) => setPosts((posts)));

        fetch("/complaint/fetch-all-complaints", {
            method: "GET"
        })
            .then((response) => response.json())
            .then((complaints) => setComplaints((complaints)));
    }, [])

    return (
        <div id="complaint-page-div">
            {posts.map((post) => (
                <div key={post.postId} className="complaintPostDiv">
                    <div>
                        <Link to={"/project-posts/" + post.title + "/" + post.postId} className="complaintPostLink title-font">Link to project</Link>
                    </div>
                    <div className="complaintsDiv">
                        {complaints
                            .filter((complaint) => complaint.postId === post.postId)
                            .map((complaint) => (
                                <div className="complaintDiv">
                                    <p key={complaint.complaintId} className="content-font">{complaint.content}</p>
                                </div>
                            ))}
                    </div>

                </div>
            ))}
        </div>
    );
}

export default DisplayComplaints;