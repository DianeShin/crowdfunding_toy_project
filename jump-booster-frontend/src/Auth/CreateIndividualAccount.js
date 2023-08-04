import React, {useContext, useEffect, useState} from "react";
import {ContextProvider} from "../general/ContextElem";
import './CreateIndividualAccount.css'
import {Link} from "react-router-dom";
export const CreateIndividualAccount = () => {
    const [inputs, setInputs] = useState({role : "individual"});
    const {setHeader} = useContext(ContextProvider);

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

    function signUp(event) {
        event.preventDefault();
        const formData = new FormData();

        // Add text fields to formData
        for (const [key, value] of Object.entries(inputs)) {
            if (typeof value !== 'object') {
                formData.append(key, value);
            }
        }

        // Add file to formData
        formData.append('profileImg', inputs.profileImg);

        fetch("/account/register", {
            method: "POST",
            body: formData
        })
            .then(() => alert("Account made!"))

        window.location.href = "/individual-login";
    }

    return (
        <div id="page">
            <Link to="/"><img src="/image/logo.png" alt="logo" id="logo" onClick={() => {setHeader(true)}}/><br/></Link>
            <div className="container">
                <div className="center-wrapper">
                    <div id="login-div">
                        <div className="loginSection" id="login-decoration-div">
                            <h3>Invest,</h3><br/><br/>
                            <h3>Get rewarded,</h3><br/><br/>
                            <h3>Change the world.</h3>
                        </div>
                        <div className="loginSection" id="login-info-div">
                            <form id="signUpForm" onSubmit={signUp}>
                                <h1 id="signUpTitle" className="title">Sign-up</h1>
                                <label>
                                    <input type="text" name="username" value={inputs.username || ""} placeholder="Username" onChange={handleChange}/><br/><br/>
                                </label>
                                <label>
                                    <input type="email" name="email" value={inputs.email || ""} placeholder="Email" onChange={handleChange}/><br/><br/>
                                </label>
                                <label>
                                    <input type="password" name="password" value={inputs.password || ""} placeholder="Password" onChange={handleChange}/><br/><br/>
                                </label>
                                <label>
                                    Profile pic:<br/>
                                    <input type="file" accept="image/*" name="profileImg" onChange={handleFileChange} alt="profileImg"/><br/><br/>
                                </label>
                                <input type="submit" value="Submit" id="create-individual-account-button"/>
                            </form>

                            <Link to={"/individual-login"}>Already have an account? Login!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateIndividualAccount;