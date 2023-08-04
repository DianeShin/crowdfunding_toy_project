import {Link, Outlet} from "react-router-dom";
import {useContext} from "react";
import {ContextProvider} from "./ContextElem";
import './NavBar.css'
export const NavBar = () => {
    const {userId} = useContext(ContextProvider);

    return (
        <>
            <nav className = "navigationBar">
                <Link className = "navBarLink" to = "/">Home</Link>
                <Link className = "navBarLink" to = "/project-posts">Projects</Link>

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