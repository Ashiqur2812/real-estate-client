import React from 'react';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const AgentRoute = ({ children }) => {
    const [role, isLoading] = useRole();
    if (isLoading) return <LoadingSpinner />;
    if (role === 'agent') return children;

    return <Navigate to='/dashboard/agent-profile' />;
};

export default AgentRoute;