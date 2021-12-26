import React, { useState, useEffect } from "react";
import {SwipeableDrawer} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'
import { isAuthenticated, signout } from '../../apiCalls/auth'
import './nav.scss'
import './vNav.scss'
import { Menu, Close } from '@material-ui/icons'

function Nav(props) {
  const [state, setState] = useState({
    top: false
  })
  const [redirect, setRedirect] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const doRedirect = () => {
    if (redirect) {
        props.history.push('/')
    }
}
  
  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className='vnav-container'>
      {["top"].map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
              <Menu className='menu-icon' />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
        <div className='drawer'>
            <div onClick={toggleDrawer(anchor, false)} className='close-icon'>
                <Close  />
            </div>
            <div className='vertical-nav-container'>
                <Link className='vertical-link' to='/'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                Home
                </Link>
                <Link className='vertical-link' to='/rentcar'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                Rent Car
                </Link>
                <Link className='vertical-link' to='/getride'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                Ride Now
                </Link>

                { user?.is_active &&
                <Link className='vertical-link' to='/dashboard'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                  Dashboard
                </Link>
                }

                { !user?.is_active &&
                  <Link className='vertical-link' to='/login'
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
                  >
                  Login
                  </Link>
                }
                { !user?.is_active &&
                  <Link className='vertical-link' to='/signup'
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
                  >
                  Signup
                  </Link>
                }

                { user?.is_active &&
                <Link className='vertical-link' to='/'
                onClick={() => {
                  toggleDrawer(anchor, false)
                  signout(() => {
                      setRedirect(true)
                      doRedirect()
                  })
              }}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                  Logout
                </Link>
                }
            </div>
        </div>
            
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default Nav