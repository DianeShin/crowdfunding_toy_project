import React, {createContext, useEffect, useState} from "react";

export const AuthContext = createContext("");

export default ({children}) => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const userId = JSON.parse(sessionStorage.getItem('loginUserId'));
    }, [userId]);

    return(
        <AuthContext.Provider
            value={{
                userId,
                setUserId
            }}>
            {children}
        </AuthContext.Provider>
    );
};