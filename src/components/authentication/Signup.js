import React, { Component } from 'react'
import './auth.scss'
import { signup } from '../../apiCalls/auth'
import Navbar from '../nav/Navbar'
import BestPlace from '../../assets/undraw_best_place.svg'
import Success from '../styled.components/Success'
import { capitalize } from '@material-ui/core'
import {PropagateLoader} from "react-spinners";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
`;

class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: '',
            email: '',
            password: '',
            mobile_number:'',
            error: '',
            active: false,
            redirect: false,
            loading: false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit = (event) => {
        this.setState({ error: '', active: false, redirect: false, loading: true })
        const { name, email, password, mobile_number } = this.state
        console.log(name, email, password,mobile_number)

        if (!name || !email || !password || !mobile_number) {
            this.setState({ error: 'Fill in the details', active: true })
        }
        else {
            const formData = new FormData()
            formData.append('email', email)
            formData.append('username', name)
            formData.append('password', password)
            formData.append('mobile_number',mobile_number)
    
            signup(formData)
            .then(user => {
                this.setState({loading: false})
                if (user.error) {
                    this.setState({ error: user.error, active: true })
                }
                else {
                    this.setState({ redirect: true })
                    setTimeout(() => {
                        this.props.history.push('/login')
                    }, 5000)
                }
            })
        }
        event.preventDefault()
    }
    
    render() {
        return (
            <div className='login-container'>
                <Navbar {...this.props} />
                {
                    this.props.redirect && 
                    <Success message='Signup successfull' />
                }
                {
                    this.state.error && this.state.active &&
                    <div className='error-message'>
                        {capitalize(this.state.error)}
                    </div>
                }
                <div className='form-container'>
                    <h1>Welcome, enjoy your time here.</h1>
                    <form className='form-control' method='post'>
                        <label className='auth-labels' htmlFor="username">
                            Your Good Name
                        </label>
                        <input 
                            className='auth-inputs'
                            type="text" id='username'
                            name="name"
                            onChange={this.handleChange}
                            onClick={() => this.setState({ active: false })}
                        />
                        <label className='auth-labels' htmlFor="usermail">
                            Enter your Email
                        </label>
                        <input
                            className='auth-inputs'
                            type="email"
                            id='usermail'
                            name="email"
                            onChange={this.handleChange}
                            onClick={() => this.setState({ active: false })}
                        />
                        <label className='auth-labels' htmlFor="userpassword">
                            Enter your password
                        </label>
                        <input
                            className='auth-inputs'
                            type="password"
                            id='userpassword'
                            name="password"
                            onChange={this.handleChange}
                            onClick={() => this.setState({ active: false })}
                        />
                        <label className='auth-labels' htmlFor="usernumber">
                            Enter Mobile Number
                        </label>
                        <input
                            className='auth-inputs'
                            type="number"
                            id='userpassword'
                            name="mobile_number"
                            onChange={this.handleChange}
                            onClick={() => this.setState({ active: false })}
                        />
                        { this.state.loading && 
                        <div className='loader-signup'>
                            <PropagateLoader
                                css={override}
                                size={100}
                                color={"#FFAFBD"}
                                loading={this.state.loading}
                            />
                        </div>
                        }
                        <button className='auth-submit' onClick={this.handleSubmit}>Signup</button>
                    </form>
                </div>
                <div className='image'>
                    <img src={BestPlace} alt='' className='image' />
                </div>
            </div>
        )
    }
}
export default Signup