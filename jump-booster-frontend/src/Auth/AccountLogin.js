import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './AccountLogin.css'
import {ContextProvider} from "../general/ContextElem";
export function AccountLogin(props) {
    const [loginInfo, setLoginInfo] = useState({email: "", username: "", user: "", role: props.role});
    const {setUserId, setHeader} = useContext(ContextProvider);

    useEffect(() => {
        setHeader(false);
    })
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginInfo(values => ({...values, [name]:value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
        .then((response) => {
            if (response.status === 200) return response.json();
            else throw new Error("Something went wrong.");
        })
        .then((data) => {
            if (Number(data) > 0){
                setUserId(data);
                sessionStorage.setItem('loginUserId', JSON.stringify(data));
                alert("Logged in!");
                if(props.role === "individual") window.location.href = "/project-posts";
                else if (props.role === "business") window.location.href = "/my-projects";
                else if (props.role === "administrator") window.location.href = "/complaints"
            }
            else if (Number(data) === -3){
                alert("No account.")
            }
            else if (Number(data) === -2){
                alert("Wrong role.")
            }
            else if (Number(data) === -1){
                alert("Wrong password.")
            }
            else{
                alert("Something went wrong.")
            }
        })
            .catch((error) => alert(error.message))
    }
    return(
        <div id="page">
            <Link to="/"><img src="/image/logo.png" alt="logo" id="logo" onClick={() => {setHeader(true)}}/><br/></Link>
            <div className="container">
                <div className="center-wrapper">
                    <div id="login-div">
                        <div className="loginSection" id="login-decoration-div">
                            {props.role === "individual" && (
                                <>
                                    <h3>Invest,</h3><br/><br/>
                                    <h3>Get rewarded,</h3><br/><br/>
                                    <h3>Change the world.</h3>
                                </>
                            )}
                            {props.role === "business" && (
                                <>
                                    <h3>Show your passion,</h3><br/><br/>
                                    <h3>Get funded,</h3><br/><br/>
                                    <h3>Change the world.</h3>
                                </>
                            )}
                            {props.role === "administrator" && (
                                <>
                                    <h3>Check the projects,</h3><br/><br/>
                                    <h3>Put them in real life,</h3><br/><br/>
                                    <h3>Change the world.</h3>
                                </>
                            )}
                        </div>
                        <div className="loginSection" id="login-info-div">
                            <h2 id="login-text">Login</h2>
                            <form onSubmit={handleSubmit}>
                                {props.role === "individual" && (
                                    <>
                                        <input className="loginInput" type="text" name="user" placeholder="Username or email" value={loginInfo.user} onChange={handleChange}/><br/>
                                    </>
                                )}
                                {props.role === "business" && (
                                    <>
                                        <input className="loginInput" type="text" name="user" placeholder="Username or email" value={loginInfo.user} onChange={handleChange}/><br/>
                                    </>
                                )}
                                {props.role === "administrator" && (
                                    <>
                                        <input className="loginInput" type="text" name="user" placeholder="Username" value={loginInfo.user} onChange={handleChange}/><br/>
                                    </>
                                )}

                                <input className="loginInput" type="password" name="password" placeholder="Password" value={loginInfo.password} onChange={handleChange}/><br/>
                                {props.role !== "administrator" && (
                                    <>
                                    <Link to={"/find-password"}>Forgot password?</Link><br/>
                                    </>
                                )}
                                <input type="submit" value="Sign in" id="sign-in-button"/>
                            </form>
                            {props.role !== "administrator" && (
                                <>
                                    <Link to={"/create-individual-account"}>New here? Create an account!</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default AccountLogin;