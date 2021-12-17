import React, { Component, useState } from 'react';
import { login } from '../../apiCalls/auth';
import Navbar from '../nav/Navbar';
import './auth.scss';
import SignIn from '../../assets/undraw_sign_in.svg';
import { capitalize } from '@material-ui/core';
import Success from '../styled.components/Success';
import { useGlobalContext } from '../../context';
import { Redirect } from 'react-router';

function Login(props) {
    const { setUser } = useGlobalContext();
    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
        error: '',
        redirect: false,
        active: false
    });
    function handleChange(event) {
        setFormInput({ ...formInput, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        setFormInput({ ...formInput, error: '', active: false, redirect: false });
        const formData = new FormData();
        formData.append('email', formInput.email);
        formData.append('password', formInput.password);
        login(formData)
            .then((res) => {
                console.log(res);
                if (res.code === 200) {
                    setUser({ loggedIn: true, userId: res.response.userid });
                    setFormInput({ ...formInput, redirect: true });
                } else {
                    setFormInput({ ...formInput, error: res.error, active: true });
                    // localStorage.setItem('user', loggedUser)
                }
                console.log(res);
            })
            .catch((err) => console.log(err));
        event.preventDefault();
    }
    if (formInput.redirect) {
        return (
            <>
                <Success message="Login successful" />
                <Redirect to="/dashboard" />
            </>
        );
    } else {
        return (
            <div className="login-container">
                <Navbar {...props} />
                {formInput.redirect && <Success message="Login successful" />}
                {formInput.error && formInput.active && (
                    <div className="error-message">{capitalize(formInput.error)}</div>
                )}
                <div className="form-container">
                    <h1>
                        Login to <em style={{ color: '#C33764' }}>CarHub</em> and have a happy journey.
                    </h1>
                    <form method="post" onSubmit={handleSubmit} className="form-control">
                        <label className="auth-labels" htmlFor="usermail">
                            Enter your Email
                        </label>
                        <input
                            className="auth-inputs"
                            id="usermail"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onClick={() => setFormInput({ ...formInput, active: false })}
                        />
                        <label className="auth-labels" htmlFor="userpassword">
                            Enter your Password
                        </label>
                        <input
                            className="auth-inputs"
                            id="userpassword"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onClick={() => setFormInput({ ...formInput, active: false })}
                        />
                        <button type="submit" className="auth-submit">
                            Login
                        </button>
                    </form>
                </div>
                <div>
                    <img src={SignIn} alt="" className="login-image" />
                </div>
            </div>
        );
    }
}
export default Login;
