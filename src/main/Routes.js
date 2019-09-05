import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/login';
import Home from '../components/home';
import {PrivateRoute} from './PrivateRouter';

export function Routes() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <PrivateRoute path='/home' component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default Routes;
