import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';


const PrivateRoute = (props) => {
    const jwt = localStorage.getItem('jwt');

    // If authorized, return an outlet that will render child elements
    return jwt? <Outlet />: <Navigate to="/login" replace="true"/>;
}

export default PrivateRoute;