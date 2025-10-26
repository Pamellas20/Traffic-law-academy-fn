import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define base query with authentication
const baseQuery = fetchBaseQuery({
    baseUrl: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api/v1',
    prepareHeaders: (headers, { getState }) => {
        // Get token from localStorage first, then from Redux state as fallback
        const token = localStorage.getItem('token') || (getState() as any).auth?.token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
            console.log('Adding token to request headers');
        } else {
            console.log('No token found for request');
        }

        headers.set('content-type', 'application/json');
        return headers;
    },
});

// Enhanced base query with token refresh logic
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    console.log('Making API request:', args);
    let result = await baseQuery(args, api, extraOptions);

    // Log the result for debugging
    if (result.error) {
        console.log('API request failed:', result.error);
    } else {
        console.log('API request successful');
    }

    // Only clear auth data if it's a 401 error on authenticated endpoints
    // and not during login/signup
    if (result.error && result.error.status === 401) {
        const url = typeof args === 'string' ? args : args.url;

        // Don't auto-logout for auth endpoints (login, signup, etc.)
        if (!url.includes('/auth/login') && !url.includes('/auth/signup') && !url.includes('/auth/forgot-password')) {
            console.log('Authentication failed, clearing session...');

            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Dispatch logout action to update Redux state
            api.dispatch({ type: 'auth/logout' });

            // Only redirect if we're not already on login page
            if (window.location.pathname !== '/login') {
                console.log('Redirecting to login page...');
                window.location.href = '/login';
            }
        } else {
            console.log('401 error on auth endpoint, not auto-logging out');
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Course', 'Test', 'Role', 'TestResult'],
    endpoints: () => ({}),
});