import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {ContextProvider} from "./ContextElem";
import {getAccountById} from "../Helper/accountHelper";

// CSS
import './App.css'

// elements
import SelectAccount from "../Auth/SelectAccount";
import AccountLogin from "../Auth/AccountLogin";
import DisplayPosts from "../Post/DisplayPosts";
import Post from "../Post/Post";
import ReportPost from "../Post/ReportPost";
import Home from "./Home";
import NavBar from "./NavBar";
import SignOut from "../Auth/SignOut";
import CreateIndividualAccount from "../Auth/CreateIndividualAccount";
import MyProjects from "../ProjectOwner/MyProjects";
import CreatePost from "../ProjectOwner/CreatePost";
import DisplayComplaints from "../Administrator/DisplayComplaints";

function App() {
    const [projectPosts, setProjectPosts] = useState([]);
    const {userId, setUserId, setHeader} = useContext(ContextProvider);
    const [username, setUsername] = useState('');
    const [profileImg, setProfileImg] = useState('');

    useEffect(() => {
        setHeader(true);
        if(userId){
            getAccountById(userId)
                .then((accountObj) => {
                    setUsername(accountObj.username);
                    setProfileImg(accountObj.profileImg);
                })
        }
        fetch("/fetchAllPosts", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                else throw new Error("No posts.")
            })
            .then((posts) => setProjectPosts(posts))
            .catch((error) => {})
    }, [userId]);

    function copyContent(){
        let button = document.getElementById("emailButton");
        navigator.clipboard.writeText(button.innerText);
        alert("Copied!");
    }

    const handleSignOut = () => {
        setUserId('');
        sessionStorage.clear();
        window.location.href = "/";
    };

    return (
        <div id="outer-page-div">
            <div id="headerFooter" className="center">
                <Link to="/"><img src="/image/logo.png" alt="logo" id="logo"/><br/></Link>
                {userId === '' ? (
                    <>
                        <h3 id="login-info-text" className="right content-font">Please log-in!</h3>
                    </>
                ) : (
                    <div className="right">
                        <img src={`data:image/jpeg;base64,${profileImg}`} alt="profileImg" id="profileImg"/>
                        <h3 id="login-info-text" className="content-font">{"Welcome " + username + " !"}</h3>
                    </div>
                )}

                <NavBar/>
            </div>
            <Routes>
                <Route path="/"  >
                    <Route index element={<Home />}/>
                    <Route path="/select-account" element={<SelectAccount/>}/>
                    <Route path="/individual-login" element={<AccountLogin role="individual"/>}/>
                    <Route path="/business-login" element={<AccountLogin role="business"/>}/>
                    <Route path="/create-individual-account" element={<CreateIndividualAccount/>}/>
                    <Route path="/project-posts" element={<DisplayPosts />}/>
                    <Route path="/my-projects" element={<MyProjects/>}/>
                    <Route path="/create-project" element={<CreatePost/>}/>
                    <Route path="/complaints" element={<DisplayComplaints/>}/>
                    {projectPosts && projectPosts.map((post) => (
                        <>
                            <Route path={"/project-posts/" + post.title + "/" + post.postId} element={<Post id={post.postId} />}/>
                            <Route path={"/report-project/" + post.postId} element={<ReportPost id={post.postId} />}/>
                        </>
                    ))}

                    {userId === '' ? (
                        <Route path="/select-account" element={<SelectAccount />} />
                    ) : (
                        <Route path="/sign-out" element={<SignOut handleSignOut={handleSignOut} />} />
                    )}
                    <Route path="/administrator-login" element={<AccountLogin role="administrator"/>}/>
                </Route>
            </Routes>
            <div id="footer">
                <p>Developer : Diane Shin</p>
                <p>Email : <button id="emailButton" className="footer-button" onClick={copyContent}>jadore845@snu.ac.kr</button></p>
                <p>Github : <button id="emailButton" className="footer-button" onClick={() => window.location.href = "https://github.com/DianeShin"}>Here</button></p>
            </div>
        </div>
  );
}

export default App;