import React, { useState, useEffect } from 'react'
import './nav.scss'
import { Link } from 'react-router-dom'
import { DriveEtaOutlined } from '@material-ui/icons'
import VNav from './vNav'
import { isAuthenticated, signout } from '../../apiCalls/auth'
import { useGlobalContext } from '../../context'

const Navbar = (props) => {
    const [name, setName] = useState('')
    
    const {user} = useGlobalContext();
    console.log(user)
    return (
        <div>
            <div className='nav-container'>
                <Link className='navbar-brand' to='/'>
                <DriveEtaOutlined style={{fontSize: '1.5em'}} />Hub
                </Link>
                <ul className='nav-links'>
                    <Link className='nav-link' to='/rentcar'>
                        <li className='link'>Rent</li>
                    </Link>
                    <Link className='nav-link' to='/getride'>
                        <li className='link'>Ride</li>
                    </Link>
                    { !user.loggedIn && 
                    <Link className='nav-link' to='/login'>
                        <li className='link'>Login</li>
                    </Link>
                    }
                    { !user.loggedIn && 
                    <Link className='nav-link' to='/signup'>
                        <li className='link'id='different-link'>Signup</li>
                    </Link>
                    
                    }
                    {user.loggedIn &&
                    <Link className="nav-link"
                    onClick={() => {
                        signout(() => {
                            localStorage.clear()
                            props.history.push('/')
                        })
                    }}
                >
                        <li className='link'>Logout</li>
                    </Link>
                    
                    }
                    { user.loggedIn &&
                    <Link className='nav-link' to='/dashboard'>
                        <li className='link'id='different-link'>{name}</li>
                    </Link>
                    
                    }
                </ul>
            <VNav id='vertical-nav' {...props} />
            </div>
        </div>

    )
}

export default Navbar