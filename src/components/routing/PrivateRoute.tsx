import { Route, Redirect } from "react-router-dom";
import React from "react";

interface PrivateRouteProps{
    loading: boolean
    isLoggedIn: boolean,
    path:string,
    component: React.ComponentClass<any, any> | React.FunctionComponent<any> | undefined
}

const PrivateRoute = (privateRouteProps:PrivateRouteProps) => {
    const {loading, isLoggedIn, path, component:Component} = privateRouteProps;
    if (loading) {
        return <div>Loading...</div>
    }
    return isLoggedIn? <Route path={path} component={Component} /> : <Redirect to='/login' />;
}

export default PrivateRoute