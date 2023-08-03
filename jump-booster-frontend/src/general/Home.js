import {Link} from "react-router-dom";
import "./Home.css"
import React from "react";
export const Home = () => {
    function copyContent(){
        let button = document.getElementById("emailButton");
        navigator.clipboard.writeText(button.innerText);
        alert("Copied!");
    }
    return (
        <div className="center" id="home-div">
            <h2 className="title-font" id="text">This is where products in mind gain shape in real life.</h2>
        </div>

    )
}

export default Home;