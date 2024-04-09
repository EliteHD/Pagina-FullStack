import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthContext'; 

const PublicRoute = ({ children }) => {
    const { currentUser, isLoading } = useAuth();

    if (isLoading) {
        return <div>Cargando...</div>; 
    }

    return currentUser ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;
