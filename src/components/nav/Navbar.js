import React, { useState, useEffect } from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';
import { DriveEtaOutlined } from '@material-ui/icons';
import VNav from './vNav';
import { signout } from '../../apiCalls/auth';
import { useGlobalContext } from '../../context';

const Navbar = (props) => {
    const [name, setName] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    function handleSignout() {
        signout().then(() => {
            props.history.push('/');
            setUser({ is_active: false });
        });
    }
    return (
        <div>
            <div className="nav-container">
                <Link className="navbar-brand" to="/">
                    <DriveEtaOutlined style={{ fontSize: '1.5em' }} />
                    Hub
                </Link>
                <ul className="nav-links">
                    <Link className="nav-link" to="/rentcar">
                        <li className="link">Rent</li>
                    </Link>
                    <Link className="nav-link" to="/getride">
                        <li className="link">Ride</li>
                    </Link>
                    {user?.is_active && (
                        <Link className="nav-link" to="/dashboard">
                            <li className="link" id="different-link">
                                Dashboard
                            </li>
                        </Link>
                    )}
                    {!user?.is_active && (
                        <Link className="nav-link" to="/login">
                            <li className="link">Login</li>
                        </Link>
                    )}
                    {!user?.is_active && (
                        <Link className="nav-link" to="/signup">
                            <li className="link" id="different-link">
                                Signup
                            </li>
                        </Link>
                    )}
                    {user?.is_active && (
                        <a className="nav-link" onClick={handleSignout}>
                            <li className="link">Logout</li>
                        </a>
                    )}
                </ul>
                <VNav id="vertical-nav" {...props} />
            </div>
        </div>
    );
};

export default Navbar;
