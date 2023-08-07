import {Link, Outlet} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ContextProvider} from "./ContextElem";
import './NavBar.css'
import {getAccountById} from "../Helper/accountHelper";
export const NavBar = () => {
    const {userId} = useContext(ContextProvider);
    const [userRole, setUserRole] = useState();

    useEffect(() => {
        if(userId === '') setUserRole("")
        else{
            getAccountById(userId).then((userObj) => setUserRole(userObj.role));
        }

    }, [userId])

    return (
        <>
            <nav className = "navigationBar">
                <Link className = "navBarLink" to = "/">Home</Link>
                <Link className = "navBarLink" to = "/project-posts">Projects</Link>
                {userRole === "business" && <Link className = "navBarLink" to = "/my-projects">My projects</Link>}


                {userId === '' ? (
                    <>
                        <Link id = "signInNavBarLink" className = "navBarLink" to = "/select-account">Sign In</Link>
                    </>
                ) : (
                    <>
                        <Link id = "signInNavBarLink" className = "navBarLink" to = "/sign-out">Sign Out</Link>
                    </>
                )}
            </nav>
            <Outlet/>
        </>
    )
}

export default NavBar;