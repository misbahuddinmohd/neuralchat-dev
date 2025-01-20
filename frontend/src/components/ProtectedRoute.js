import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

const ProtectedRoute =({ children }) => {
    // const { authState } = useContext(AuthContext);
    const { isLoggedIn, authLoading } = useAuth();

    if (authLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
