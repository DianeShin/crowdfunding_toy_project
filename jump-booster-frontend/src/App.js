import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route, BrowserRouter, Link} from 'react-router-dom';

import SelectAccount from "./Auth/SelectAccount";
import AccountLogin from "./Auth/AccountLogin";
import DisplayPosts from "./Post/DisplayPosts";
import {AuthContext} from "./Auth/Authenticator";
import Post from "./Post/Post";
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

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<SelectAccount/>}/>
          <Route path="/individual-login" element={<AccountLogin role="individual"/>}/>
          <Route path="/business-login" element={<AccountLogin role="business"/>}/>
          <Route path="/project-posts" element={<DisplayPosts />}/>
          {projectPosts && projectPosts.map((post) => (
              <Route path={"project-posts/" + post.title + "/" + post.postId} element={<Post id={post.postId} />}/>
          ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;