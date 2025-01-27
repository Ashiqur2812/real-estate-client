import React from 'react';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
    const [role, isLoading] = useRole();
    if (isLoading) return <LoadingSpinner />;
    if (role === 'user') return children;

    return <Navigate to='/dashboard/profile' />;
};

export default UserRoute;