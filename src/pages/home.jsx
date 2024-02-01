import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
    const [isRegisteredUser, setIsRegisteredUser] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        const authStateChange = onAuthStateChanged(auth, (user) => {
            setIsRegisteredUser(user);
        });
        return () => {
            clearInterval(intervalId);
            authStateChange();
        }
    }, []);

    const formattedTime = currentTime.toLocaleTimeString();

    return (
        <>
            <div className="container has-text-centered">
                <h4 className="title is-4">Today is {new Date().toLocaleDateString()}</h4>
                <h5 className="tatle is-5 has-text-info-dark">Current Time: {formattedTime}</h5>
                {!isRegisteredUser ? (
                    <>
                        <h5 className="title is-5 mt-6">You will see more, such as incredible facts about cats or generate a themed excuse for your absence, if you complete a simple registration</h5>

                        <Link to={'login'} className="login-link">
                            Log in or regisrer <span className="mdi mdi-login"></span>
                        </Link>
                    </>
                ) : (
                    <>
                        <h5 className="title is-5 mt-6">I'm glad you're here, {isRegisteredUser.email.split("@")[0]}!</h5>
                        <div className="buttons-group">
                            You can navigate to
                            <Link to={'/catFact'} className="button btn-generate">
                                Amazing cat's fakts
                                <span className="mdi mdi-arrow-right-bold-outline ml-3"></span>
                            </Link>
                            or
                            <Link to={'/excuses'} className="button btn-generate">
                                Funny excuses
                                <span className="mdi mdi-arrow-right-bold-outline ml-3"></span>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Home;