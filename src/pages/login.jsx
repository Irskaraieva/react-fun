import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { FcGoogle } from "react-icons/fc";

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
    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;
            reset();
        } catch (error) {
            console.log(error);
        }
    };
    const handleSignOut = () => {
        signOut(auth)
            .then(() => console.log("Sign Out"))
            .catch((error) => console.error(error));
    };

    const handleResetPassword = () => {
        const email = prompt('Please enter your emal');
        sendPasswordResetEmail(auth, email);
        email ?
            alert('Email sent! Check your inbox for password reset instructions and then go back to sign in again with your new password. We are waiting for you!')
            :
            alert('Password reset canceled.');
    };

    return (
        <>
            <div className="container has-text-centered">
                <div className="column is-6 mx-auto">

                    {!isRegisteredUser ? (
                        <>
                            <header className="is-flex is-flex-direction-column mb-3">
                                <h5 className="title has-text-black is-5 mb-3">
                                    Welcome to ReactFun
                                </h5>

                                <h6 className="title has-text-black is-6 mb-1">
                                    <a
                                        className="sign-in-link"
                                        onClick={() => setIsSignUpActive(true)}>
                                        Create an account
                                    </a> or  <a
                                        className="sign-in-link"
                                        onClick={() => setIsSignUpActive(false)}>
                                        Log in
                                    </a> to continue
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
                                                className="input is-medium mb-2" name="email"
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
                                                className="input is-medium mb-2"
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
                                <button
                                className="google-btn"
                                onClick={signInWithGoogle}>
                                <span>Sign in with Google</span>
                                <FcGoogle className="google-icon" />
                            </button>
                            </div>
                            <p
                                onClick={handleResetPassword}
                                className="forgot-password">
                                Forgot Password?
                            </p>
                        </>

                    ) : (
                        <>
                            <span className="icon is-medium mr-1 has-text-success-dark">
                                <span className="mdi mdi-account-check mdi-24px"></span>
                            </span>
                            <h5 className="title is-5">
                                You have successfully registered!
                            </h5>
                            <div className="block">
                                Go to
                                <div className="buttons-group">
                                    <Link to={'/catFact'} className="button my-1 btn-generate">
                                        Amazing cat's fakts
                                        <span className="mdi mdi-arrow-right-bold-outline ml-3"></span>
                                    </Link>
                                    or
                                    <Link to={'/excuses'} className="button my-1 btn-generate">
                                        Funny excuses
                                        <span className="mdi mdi-arrow-right-bold-outline ml-3"></span>
                                    </Link>
                                </div>
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