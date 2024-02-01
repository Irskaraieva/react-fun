import { Link, NavLink, useLocation } from "react-router-dom";
import { FaEarthEurope } from "react-icons/fa6";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import Burger from "./burger";
import { useMediaQuery } from "@react-hook/media-query";

const Header = () => {
    const location = useLocation();
    
    const [focusedLink, setFocusedLink] = useState('/');
    const [isRegisteredUser, setIsRegisteredUser] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const isWideScreen = useMediaQuery("(min-width: 768px)");

    const handleActiveClass = () => {
        if (!isWideScreen) {
            setIsActive(!isActive);
        };
    };
    useEffect(() => {        
        const handlePopstate = () => {
            document.activeElement.blur();
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsRegisteredUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isActive && isWideScreen) {
            setIsActive(false);
        }
    }, [isWideScreen]);

    useEffect(() => {
        setFocusedLink(location.pathname);
    }, [location.pathname]);


    return (
        <>
            <header className="hero-head header-bg">
                <div className="container navbar nav">
                    <div className="navbar-brand">
                        <Link className="navbar-item header-log">
                            <FaEarthEurope />
                        </Link>
                    </div>
                    <div className={`navbar-end nav-content ${isActive ? "active" : ""}`}>
                        <div className="navbar-end nav-content-items">
                            <NavLink
                                to={"/"}
                                className={`navbar-item header-text ${isActive ? 'active' : ''} ${(focusedLink === "/")? 'is-focus' : ''}`}
                                onClick={handleActiveClass}
                            >
                                Home
                            </NavLink>
                            {isRegisteredUser ? (
                                <>
                                    <NavLink
                                        to={"catFact"}
                                        className={`navbar-item header-text ${isActive ? 'active' : ''} ${(focusedLink === "/catFact")? 'is-focus' : ''}`}
                                        onClick={handleActiveClass}
                                    >
                                        Cat's fact
                                    </NavLink>
                                    <NavLink
                                        to={"excuses"}
                                        className={`
                                        navbar-item header-text 
                                        ${isActive ? 'active' : ''} 
                                        ${(focusedLink === "/excuses") ? 'is-focus' : ''}
                                        `}
                                        onClick={() => handleActiveClass()}
                                    >
                                        Excuses
                                    </NavLink>
                                    <NavLink
                                        to={"login"}
                                        onClick={() => handleActiveClass()}
                                        className={`
                                        navbar-item header-text 
                                        ${isActive ? 'active' : ''} 
                                        ${(focusedLink === "/login") ? 'is-focus' : ''}
                                        `}
                                    >
                                        Sign Out
                                        <span className="icon is-medium ml-1">
                                            <span className="mdi mdi-logout mdi-18px"></span>
                                        </span>
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        to={"login"}
                                        className={`
                                        navbar-item header-text
                                        ${isActive ? 'active' : ''}
                                        ${(focusedLink === "/login") ? 'is-focus' : ''}
                                        `}
                                        onClick={() => handleActiveClass()}
                                    >
                                        Log in
                                        <span className="icon is-medium ">
                                            <span className="mdi mdi-login mdi-18px"></span>
                                        </span>
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                    <Burger isActive={isActive} setIsActive={setIsActive} />
                </div>
            </header>
        </>
    );
};

export default Header;