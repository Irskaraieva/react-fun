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
            <div className="container has-text-centered is-flex is-flex-direction-column">
                <h4 className="title is-4">Today is {new Date().toLocaleDateString()}</h4>
                <h5 className="tatle is-5 has-text-info-dark">Current Time: {formattedTime}</h5>


                {!isRegisteredUser ? (
                    <>
                        <h5 className="title is-5 mt-4 ">You will see more, such as incredible facts about cats or generate a themed excuse for your absence, if you complete a simple registration</h5>

                        <Link to={'login'} className="login-link mb-4">
                            Log in or regisrer <span className="mdi mdi-login"></span>
                        </Link>
                        <h6 className="title is-6">if you don't want to register, then below you can play with a cute cat during its day and night<br />
                        Just hover the mouse on the cat or switch day/night
                        </h6>
                        <div class="the-container">

                            <input type="checkbox" id="toggle" />
                            <label for="toggle"></label>

                            <div class="day-night-cont">
                                <span class="the-sun"></span>
                                <div class="the-moon"><span class="moon-inside"></span></div>
                            </div>

                            <div class="switch">
                                <div class="button">
                                    <div class="b-inside"></div>
                                </div>
                            </div>

                            <div class="c-window">

                                <span class="the-sun"></span>
                                <span class="the-moon"></span>

                                <div class="the-cat">
                                    <div class="cat-face">
                                        <section class="eyes left"><span class="pupil"></span></section>
                                        <section class="eyes right"><span class="pupil"></span></section>
                                        <span class="nose"></span>
                                    </div>
                                </div>
                            </div>

                        </div>
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