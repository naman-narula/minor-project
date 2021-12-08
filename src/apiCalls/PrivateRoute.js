import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    let storedUser = localStorage.getItem('user');
    storedUser = JSON.parse(storedUser);
    const user = {}
    if(storedUser?.userid){
        user.loggedIn = true;
        user.userId = storedUser.userid
    }

    return (
        <Route
        {...rest}
        render={props =>
            user.loggedIn? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
        />
    )
}
export default PrivateRoute