import React, {createContext, useEffect, useState} from "react";
import {getAccountById} from "../Helper/accountHelper";

export const ContextProvider = createContext("");

export default ({children}) => {
    const [userId, setUserId] = useState("");
    const [headerFooter, setHeaderFooter] = useState(true);

    useEffect(() => {
        // fetch info
        const userNameP = document.getElementById("userNameP");
        const userId = JSON.parse(sessionStorage.getItem('loginUserId'));
        // if no userId, inform user to login.
        if (userId){
            getAccountById(userId)
                .then((userObj) => {
                    document.getElementById('login-info-text').value = userObj.username;
                    setUserId(userId);
                })
        }
        else{
            document.getElementById('login-info-text').value = "Please log-in!";
        }


    }, [userId]);

    useEffect(() => {
        if (headerFooter){
            document.getElementById('headerFooter').style.display = 'block';
            document.getElementById('footer').style.display = 'block';

        }
        else{
            document.getElementById('headerFooter').style.display = 'none';
            document.getElementById('footer').style.display = 'none';
        }
    }, [headerFooter])

    return(
        <ContextProvider.Provider
            value={{
                userId,
                setUserId,
                header: headerFooter,
                setHeader: setHeaderFooter
            }}>
            {children}
        </ContextProvider.Provider>
    );
};