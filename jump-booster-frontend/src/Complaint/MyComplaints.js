import {useContext, useEffect, useState} from "react";
import {ContextProvider} from "../general/ContextElem";
import './MyComplaints.css'

export const MyComplaints = () => {
    const {userId} = useContext(ContextProvider);
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const formData = new FormData();
            formData.append("userId", userId);

            const complaintResponse = await fetch("/complaint/get-complaint-by-user-id", {
                method: "POST",
                body: formData
            });

            const complaintData = await complaintResponse.json();
            setComplaints(complaintData);
        }

        fetchData();
    }, [])

    if(complaints.length === 0) return "There are none!";
    else{
            return (
                <div id="my-complaints-div">
                    {complaints && complaints.map((complaint) => (
                            <div key={complaint.complaintId} className="myComplaintDiv">
                                <h2 className="title-font">{complaint.complaintType}</h2>
                                <p className="content-font">{complaint.content}</p>
                                {complaint.status === 1 &&
                                    <>
                                        <button className="replied-indicator indicator">Replied</button>
                                        <p className="title-font">Reply from our customers service</p>
                                        <p>{complaint.reply}</p>
                                    </>
                                }
                                {complaint.status === 0 && <button className="pending-indicator indicator">Pending</button>}
                                {complaint.status === -1 && <button className="aborted-indicator indicator">Aborted</button>}
                            </div>
                        )
                    )}
                </div>
            )
        }

}

export default MyComplaints;