import {useContext} from "react";
import {ContextProvider} from "../general/ContextElem";
import "./ReportPost.css"
export const ReportPost = (props) => {
    const {userId} = useContext(ContextProvider);
    function handleSubmit(event){
        event.preventDefault();
        const data = {
            userId : userId,
            postId : props.id,
            complaintType : document.getElementById("complaint").value,
            content : document.getElementById("content").value
        }
        fetch("/add-complaint", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.text())
        .then((result) => alert(result))
        window.location.href = "/project-posts";
    }

    return(
        <div id="report-post-div">
            <h2 className="title-font center" id="title">Sorry for your inconvenience.<br/>
                Let us know your experience, we will review your report and make an appropriate move.</h2>
            <form onSubmit={handleSubmit}>
                <select name="complaint" id="complaint">
                    <option value="This is a copy of an existing product.">This is a copy of an existing product.</option>
                    <option value="This is harmful.">This is harmful.</option>
                    <option value="Others...">Others...</option>
                </select><br/>
                <textarea placeholder="Give us more information about your claim." id="content"></textarea><br/>
                <button  id="submit-button">Submit</button>
            </form>

        </div>
    )
}

export default ReportPost