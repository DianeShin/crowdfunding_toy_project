import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route, BrowserRouter, Link} from 'react-router-dom';

import SelectAccount from "./Auth/SelectAccount";
import AccountLogin from "./Auth/AccountLogin";
import DisplayPosts from "./Post/DisplayPosts";
import {AuthContext} from "./Auth/Authenticator";
import Post from "./Post/Post";
import './App.css'
import ReportPost from "./Post/ReportPost";
import Home from "./Home";
function App() {
    const [projectPosts, setProjectPosts] = useState([]);
    const {userId, setUserId} = useContext(AuthContext);
    useEffect(() => {
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
    }, []);

    function copyContent(){
        let button = document.getElementById("emailButton");
        navigator.clipboard.writeText(button.innerText);
        alert("Copied!");
    }

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" >
              <Route index element={<Home />}/>
              <Route path="/select-account" element={<SelectAccount/>}/>
              <Route path="/individual-login" element={<AccountLogin role="individual"/>}/>
              <Route path="/business-login" element={<AccountLogin role="business"/>}/>
              <Route path="/project-posts" element={<DisplayPosts />}/>
              {projectPosts && projectPosts.map((post) => (
                  <>
                      <Route path={"project-posts/" + post.title + "/" + post.postId} element={<Post id={post.postId} />}/>
                      <Route path={"/report-project/" + post.postId} element={<ReportPost id={post.postId} />}/>
                  </>
              ))}
          </Route>
      </Routes>
        <div className="footer" id="footer">
            <p>Developer : Diane Shin</p>
            <p>Email : <button id="emailButton" className="footer-button" onClick={copyContent}>jadore845@snu.ac.kr</button></p>
            <p>Github : <button id="emailButton" className="footer-button" onClick={() => window.location.href = "https://github.com/DianeShin"}>Here</button></p>
        </div>
    </BrowserRouter>
  );
}

export default App;