import React, {createContext, useEffect, useState} from "react";
import {getAccountById} from "../Helper/accountHelper";

export const ContextProvider = createContext("");

export default ({children}) => {
    const [userId, setUserId] = useState("");
    const [header, setHeader] = useState(true);

    useEffect(() => {
        // fetch info
        const userNameP = document.getElementById("userNameP");
        const userId = JSON.parse(sessionStorage.getItem('loginUserId'));
        // if no userId, inform user to login.
        if (userId){
            getAccountById(userId)
                .then((userObj) => {
                    setUserId(userId);
                })
        }


    }, [userId]);

    useEffect(() => {
        if (header){
            document.getElementById('header').style.display = 'block';

        }
        else{
            document.getElementById('header').style.display = 'none';
        }
    }, [header])

    return(
        <ContextProvider.Provider
            value={{
                userId,
                setUserId,
                header,
                setHeader
            }}>
            {children}
        </ContextProvider.Provider>
    );
};