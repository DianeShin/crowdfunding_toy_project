import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase, faUser} from "@fortawesome/free-solid-svg-icons";
export function SelectAccount(){
    return(
        <>
            <h1 id="home-title">Who are you?</h1>
            <div id="account-type-container">
                <div className="accountType" id="individual-account-type">
                    <FontAwesomeIcon icon={faUser} size = "10x" style={{color: "#1f73ff",}} />
                    <h2>Individuals</h2>
                    <p>I would like to fund a project!</p>
                </div>
                <div className="accountType" id="business-account-type">
                    <FontAwesomeIcon icon={faBriefcase} size = "10x" style={{color: "#1f71ff",}} />
                    <h2>Project Owners</h2>
                    <p>I would like to get my project funded!</p>
                </div>
            </div>
        </>
    )
}

export default SelectAccount;