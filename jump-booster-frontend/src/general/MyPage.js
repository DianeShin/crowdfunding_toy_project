import './MyPage.css'
import MyComplaints from "../Complaint/MyComplaints";
import {useState} from "react";
export const MyPage = () => {
    const [general, setGeneral] = useState(true);
    const [myComplaint, setMyComplaint] = useState(false);
    const handleGeneral = () => {
        setGeneral(true);
        setMyComplaint(false);
    }
    const handleMyComplaints = () => {
        setGeneral(false);
        setMyComplaint(true);
    }
    return(
        <div id="my-page-div">
            <div id="selection-div">
                <button className="selectionButton" onClick={handleGeneral}>General</button>
                <button className="selectionButton" onClick={handleMyComplaints}>My complaints</button>
            </div>
            <div id="info-div">
                {general && <p className="title-font">We're fixing it...</p>}
                {myComplaint && <MyComplaints/>}
            </div>
        </div>
    )
}

export default MyPage;