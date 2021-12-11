import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import RentCar from './components/lendCar/RentCar'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import Home from './components/Home/Home'
import RideCar from './components/getRide/Ride'
import HtmlViewer from './components/HtmlViewer'
import UserDashBoard from './components/userDashboard.js'
import PrivateRoute from './apiCalls/PrivateRoute'
import CarRentForm from './components/RentCarForm'

function router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/'
                        exact render={props => (
                            <Home {...props} />
                        )}
                    />
                    <Route path='/signup'
                        exact component={Signup}
                    />
                    <Route path='/login'
                        exact render={props => (
                            <Login {...props} />
                        )}
                    />
                    <Route exact path = '/payment' component={HtmlViewer}/>
                    <PrivateRoute path='/rentcar'
                        exact component={RentCar}
                    />
                    <PrivateRoute path='/getride'
                        exact component={RideCar}
                    />
                    <PrivateRoute path='/dashboard'
                    exact component = {UserDashBoard}
                    />
                    <PrivateRoute exact path='/car-rent-form' 
                    component={CarRentForm}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default router