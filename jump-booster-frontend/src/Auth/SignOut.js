import {useContext} from "react";
import {ContextProvider} from "../general/ContextElem";

export const SignOut = () => {
    const {setUserId} = useContext(ContextProvider);
    setUserId('');
    sessionStorage.clear();
    alert("Logged out safely. See you again!");
    window.location.href = "/";
}

export default SignOut;