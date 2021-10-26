import React, { Component } from 'react'
import { login } from '../../apiCalls/auth'
import Navbar from '../nav/Navbar'
import './auth.scss'
import SignIn from '../../assets/undraw_sign_in.svg'
import { capitalize } from '@material-ui/core'
import Success from '../styled.components/Success'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
            error: '',
            redirect: false,
            active: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit(event) {
        this.setState({ error: '', active: false, redirect: false })
        const formData = new FormData()
        formData.append('email',this.state.email);
        formData.append('password',this.state.password)
        login(formData)
        .then(loggedUser => {
            if (loggedUser.error) {
                this.setState({error: loggedUser.error, active: true})
            }
            else {
                this.setState({ redirect: true })
                // localStorage.setItem('user', loggedUser)
            }
            console.log(loggedUser)
        })
        .catch(err => console.log(err))
        event.preventDefault()
    }
    
    render() {
        return (
            <div className='login-container'>
                <Navbar {...this.props} />
                {
                    this.state.redirect && 
                    <Success message='Login successful' />
                }
                {
                    this.state.error && this.state.active &&
                    <div className='error-message'>
                        {capitalize(this.state.error)}
                    </div>
                }
                <div className='form-container'>
                    <h1>Login to <em style={{color: '#C33764'}}>CarHub</em> and have a happy journey.</h1>
                    <form
                        method="post"
                        onSubmit={this.handleSubmit}
                        className='form-control'
                    >
                        <label className='auth-labels' htmlFor="usermail">Enter your Email</label>
                        <input
                            className='auth-inputs'
                            id='usermail'
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            onClick={() => this.setState({ active: false })}
                        />
                        <label className='auth-labels' htmlFor="userpassword">Enter your Password</label>
                        <input
                            className='auth-inputs' id='userpassword'
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            onClick={() => this.setState({ active: false })}
                        />
                        <button type="submit" className='auth-submit'>Login</button>
                    </form>
                </div>
                <div className='image'>
                    <img src={SignIn} alt='' className='image' />
                </div>
            </div>
        )
    }
}
export default Login