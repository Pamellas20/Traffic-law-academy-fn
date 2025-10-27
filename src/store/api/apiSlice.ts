import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api/v1',
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('token') || (getState() as any).auth?.token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        headers.set('content-type', 'application/json');
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const url = typeof args === 'string' ? args : args.url;

        const authExemptPaths = ['/auth/login', '/auth/signup', '/auth/forgot-password'];
        if (!authExemptPaths.some(path => url.includes(path))) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            api.dispatch({ type: 'auth/logout' });
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
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