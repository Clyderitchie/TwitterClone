import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN, CREATE_USER } from '../../utils/mutations';

import './LoginForm.css';

const Login = ({ handleLogin }) => {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupUsername, setSignupUsername] = useState('');
    const navigate = useNavigate();

    const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN, {
        onError: (error) => {
            console.error('Login error:', error);
        },
        onCompleted: (data) => {
            console.log('Login success:', data);
            localStorage.setItem('token', data.login.token);
            handleLogin();
            navigate("/home");
        },
    });

    const [createUser, { loading: createUserLoading, error: createUserError }] = useMutation(CREATE_USER, {
        onError: (error) => {
            console.error('Sign up error:', error);
        },
        onCompleted: (data) => {
            console.log('Sign up success:', data);
            // Log in the user after sign up
            login({ variables: { email: signupEmail, password: signupPassword } });
        },
    });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ variables: { email: loginEmail, password: loginPassword } });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser({ variables: { email: signupEmail, password: signupPassword, username: signupUsername } });
            console.log("Create user: ", createUser)
        } catch (error) {
            console.error('Sign up error:', error);
        }
    };

    return (
        <>
            <div className="container">
                <div id="loginFormContainer" className="row d-flex justify-content-center">
                    <div className="col-8 border border-black border-3 rounded">
                        <div className="login-container d-flex justify-content-center">
                            <div className="login-form">
                                <h2 className="login-title text-center mt-3">
                                    Login
                                </h2>
                                <form id="loginForm" className="d-flex flex-column" onSubmit={handleLoginSubmit}>
                                    <input type="email" className="input-field p-1 mb-3 mt-3" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                    <input type="password" className='input-field p-1 mb-5 mt-3' placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                    <div className="d-flex justify-content-end">
                                        <button className="submit-button btn btn-dark w-25 mb-4" type="submit" disabled={loginLoading}>Login</button>
                                    </div>
                                </form>
                                {loginError && <p className="error-message">Error: {loginError.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="signupFormContainer" className="row d-flex justify-content-center">
                    <div className="col-8 border border-black border-3 rounded">
                        <div className="signup-container d-flex justify-content-center">
                            <div className="signup-form">
                                <h2 className="login-title text-center mt-3">
                                    Signup
                                </h2>
                                <form id="signupForm" className="d-flex flex-column" onSubmit={handleSignUpSubmit}>
                                    <input type="email" className="signUpField input-field p-1 mb-3 mt-3" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                                    <input type='text' className='signUpField input-field p-1 mb-3 mt-3' placeholder='Username' value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} />
                                    <input type="password" className='signUpField input-field p-1 mb-5 mt-3' placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                                    <div className="d-flex justify-content-end">
                                        <button className="submit-button btn btn-dark w-25 mb-4" type="submit" disabled={createUserLoading}>Signup</button>
                                    </div>
                                </form>
                                {createUserError && <p className="error-message">Error: {createUserError.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;