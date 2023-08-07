import React, {useContext, useState} from "react";
import './CreatePost.css'
import {ContextProvider} from "../general/ContextElem";

export const CreatePost = () => {
    const {userId} = useContext(ContextProvider);
    const [inputs, setInputs] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        // add userId to formData
        formData.append("userId", userId);

        // Add text fields to formData
        for (const [key, value] of Object.entries(inputs)) {
            if (typeof value !== 'object') {
                formData.append(key, value);
            }
        }

        // Add pics to formData
        formData.append('titleImg', inputs.titleImg);
        formData.append('contentImg', inputs.contentImg);

        fetch("/create-post", {
            method: "POST",
            body: formData
        })
            .then(() => alert("Post made!"))

        window.location.href = "/my-projects";
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    }

    const handleFileChange = (event) => {
        const name = event.target.name;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: event.target.files[0],
        }));
    };

    return (
        <div id="createPostDiv">
            <form id="createPostForm" onSubmit={handleSubmit}>
                <h1 id="createPostTitle" className="title-font">Add information</h1>
                <label>
                    <input type="text" name="title" value={inputs.title || ""} placeholder="title" onChange={handleChange}/><br/><br/>
                </label>
                <label>
                    <input type="text" name="content" value={inputs.content || ""} placeholder="content" onChange={handleChange} id="contentInput"/><br/><br/>
                </label>
                <label>
                    <input type="number" name="goalMoney" value={inputs.goalMoney || ""} placeholder="goal in EUR" onChange={handleChange} id="goalMoney"/><br/><br/>
                </label>
                <label>
                    Title image: <br/>
                    <input type="file" accept="image/*" name="titleImg" className="fileInput" onChange={handleFileChange} alt="titleImg"/><br/><br/>
                </label>
                <label>
                    Content image: <br/>
                    <input type="file" accept="image/*" name="contentImg" className="fileInput" onChange={handleFileChange} alt="contentImg"/><br/><br/>
                </label>
                <input type="submit" value="Submit" id="create-individual-account-button"/>
            </form>
        </div>
    )
}

export default CreatePost;