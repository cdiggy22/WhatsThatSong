import React from "react";
import Artists from './Artists';
import {Switch, Route} from "react-router-dom";
import Home from './Homepage';
import Tracks from './Tracks';
import Login from './Login';
// import Profile from './Profile';


function Routes ({setToken}) {
    return (
        <div className = "routes">
            <h6>roues</h6>
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>

            <Route exact path = "/login">
                <Login setToken={setToken}/>
            </Route>

            <Route exact path = "/tracks">
                <Tracks/>
            </Route>

            <Route exact path = "/artists">
                <Artists/>
            </Route>
        </Switch>

        </div>
    )
}

export default Routes;