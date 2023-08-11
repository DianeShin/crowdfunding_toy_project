import React, {useEffect, useState} from "react";
import './ReplyToComplaint.css'

export const ReplyToComplaint = (props) => {
    const [complaint, setComplaint] = useState();
    const [post, setPost] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append("complaintId", props.complaintId);

                const complaintResponse = await fetch("/complaint/get-complaint-by-complaint-id", {
                    method: "POST",
                    body: formData
                });
                const complaintData = await complaintResponse.json();
                setComplaint(complaintData);

                const postFormData = new FormData();
                postFormData.append("postId", complaintData.postId);

                const postResponse = await fetch("/post/get-post-by-post-id", {
                    method: "POST",
                    body: postFormData
                });
                const postData = await postResponse.json();
                setPost(postData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleComplaintReplySubmit = () => {
        const reply = document.getElementById("reply-textarea").value;
        const formData = new FormData;
        formData.append("reply", reply);
        formData.append("complaintId", complaint.complaintId);
        fetch("/complaint/update-reply", {
            method: "POST",
            body: formData
        }).then((response) => response.text())
            .then((result) => alert(result))
        window.location.href = "/complaints";
    }

    const handleAbort = () => {
        const formData = new FormData;
        formData.append("complaintId", complaint.complaintId);
        fetch("/complaint/abort-complaint", {
            method: "POST",
            body: formData
        }).then((response) => response.text())
            .then((result) => alert(result))
        window.location.href = "/complaints";
    }

    if (!complaint || !post) {
        return <p>Loading...</p>;
    }

    return(
        <div id="complaint-reply-page-div">
            <p>{post.title}</p>
            <p key={complaint.complaintId} className="title-font">{complaint.complaintType}</p>
            <p key={complaint.complaintId} className="content-font">{complaint.content}</p>
            <textarea id="reply-textarea" placeholder="Reply..."></textarea><br/>
            <button onClick={handleAbort} id="abort-button">Abort</button>
            <button onClick={handleComplaintReplySubmit} id="submit-button">Submit</button>
        </div>
    )
}

export default ReplyToComplaint;