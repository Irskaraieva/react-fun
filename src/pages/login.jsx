import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {

    const [isRegisteredUser, setIsRegisteredUser] = useState(null);
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsRegisteredUser(user);
        });

        return () => unsubscribe();
    }, []);


    const schema = z.object({
        email: z.string().email('Email must be a valid email'),
        password: z.string().min(6, 'Password must be at least 6 characters').max(16, 'Password must not exceed 16 characters'),
    });

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        },
        reset
    } = useForm({
        resolver: zodResolver(schema),
    });


    const onSubmit = async (data) => {
        await new Promise((resolver) => setTimeout(resolver, 1000));
        try {
            if (isSignUpActive) {
                handleSignUp(data);

            } else {
                handleSignIn(data);

            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);

            setServerError(errorMessage);
        }

    };

    const handleSignUp = async ({ email, password }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setServerError('');
            reset();
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            setServerError(errorMessage);
        }

    };

    const handleSignIn = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setServerError('');
            reset();
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode.includes('auth/invalid-credential')) {
                setServerError('Email or password is incorrect');
            } else {
                setServerError('An unexpected error occurred. Please try again.');
                console.error(errorCode, errorMessage);
            }    
        }
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => console.log("Sign Out"))
            .catch((error) => console.error(error));
    };

    return (
        <>
            <div className="container has-text-centered">
                <div className="column is-6 mx-auto">

                    {!isRegisteredUser ? (
                        <>
                            <header className="is-flex is-flex-direction-column mb-3">
                                <h6 className="title has-text-black is-6 mb-1">
                                    If you don't have an account yet, please
                                </h6>
                                <a onClick={() => setIsSignUpActive(true)}> Create an account</a>
                                <h6 className="title has-text-black is-6 mb-1"> or </h6>
                                <a onClick={() => setIsSignUpActive(false)}>Log in </a>
                                <h6 className="title has-text-black is-6 mb-1">
                                    if you already have an ccount to proceed.
                                </h6>
                            </header>


                            <div className="box">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {isSignUpActive && <legend className="title-sign-in"> Create an account</legend>}
                                    {!isSignUpActive && <legend className="title-sign-in"> Log In</legend>}
                                    {serverError.includes('auth/email-already-in-use')
                                        ? (
                                            <p className='has-text-danger-dark'>
                                                Such a user is already registered. Maybe you want to <a onClick={() => setIsSignUpActive(false)}>
                                                    Log in
                                                </a> ?
                                            </p>

                                        )
                                        : (
                                            <p className='has-text-danger-dark'>
                                                {serverError}
                                            </p>
                                        )
                                    }
                                    <div className="field mt-4">
                                        <div className="control">
                                            <input
                                                {...register('email')}
                                                className="input is-medium" name="email"
                                                autoComplete="on"
                                                type="text"
                                                placeholder="Your Email"
                                                autoFocus />
                                            <div className='has-text-danger-dark'>
                                                {errors.email && <p>{errors.email.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input
                                                {...register('password')}
                                                className="input is-medium"
                                                id='password'
                                                name="password"
                                                autoComplete="on" type="password" placeholder="Your Password" />
                                            <div className='has-text-danger-dark'>
                                                {errors.password && <p>{errors.password.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="button is-block is-medium is-fullwidth btn-login">
                                        <span>
                                            {
                                                isSubmitting ? "Loading..." :
                                                    (isSignUpActive ? 'Create an account' : 'Log In')
                                            }
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </>

                    ) : (
                        <>
                            <span className="mdi mdi-hand-wave-outline"></span>
                            <h5 className="title is-5">
                                You have successfully registered!
                            </h5>
                            <div className="block is-flex is-flex-direction-column">
                                Go to
                                <Link to={'/catFact'} className="button my-4 btn-generate">
                                    Amazing cat's fakts
                                    <span className="mdi mdi-arrow-right-bold-outline ml-3"></span>
                                </Link>
                                or
                                <Link to={'/excuses'} className="button my-4 btn-generate">
                                    Funny excuses
                                    <span className="mdi mdi-arrow-right-bold-outline ml-3"></span>
                                </Link>
                            </div>

                            <Link to={'/'} className="login-link" onClick={handleSignOut}>
                                Sign out <span className="mdi mdi-logout"></span>
                            </Link>
                        </>
                    )
                    }
                </div>
            </div>
            <script async type="text/javascript" src="../js/bulma.js" />
        </>
    );
}