import { useAppSelector } from '@/store/hooks';

import { Navigate } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';
import { SupervisorDashboard } from './SupervisorDashboard';
import { UserDashboard } from './UserDashboard';

export const RoleBasedDashboard = () => {
    const { user, isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

    // Show loading spinner while authentication state is being initialized
    if (!isInitialized) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    switch (user.role) {
        case 'admin':
            return <AdminDashboard />;
        case 'supervisor':
            return <SupervisorDashboard />;
        case 'normal':
        default:
            return <UserDashboard />;
    }
};