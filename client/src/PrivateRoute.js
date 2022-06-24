import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PrivateRoute = (props) => {
    const jwt = localStorage.getItem('jwt');
    const validJwt = (token) => {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            if (Date.now() <= decoded.exp*1000) return true;
            localStorage.clear();
            return false;
        } catch (e) {
            return null;
        }
    };
    const expire = jwt? !validJwt(jwt): false;

    if (expire){
        toast.info("Session expired! Login again")
    }
    // If authorized, return an outlet that will render child elements
    return jwt && !expire ? <Outlet /> 
    : <Navigate to="/login" replace="true" />;
}

export default PrivateRoute;