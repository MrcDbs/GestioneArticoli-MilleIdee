import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    let authToken = localStorage.getItem('token');
    return (
        authToken ? <Outlet /> : <Navigate to="/GestioneArticoli-MilleIdee" />
    )
}
export default PrivateRoute;