import { useEffect } from 'react';
import useAuth from './useAuth';  // Adjust the import path as necessary
import { api } from '../api/api';
const useAuthInterceptor = () => {
    const { auth } = useAuth();

    useEffect(() => {
        const interceptorId = api.interceptors.request.use(
            config => {
                if (auth?.token) {
                    config.headers['Authorization'] = `Bearer ${auth.token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(interceptorId);
        };
    }, [auth?.token]);  // Dependency on auth.token ensures interceptor updates when token changes

    // This hook doesn't need to return anything unless you have other reasons to do so
};

export default useAuthInterceptor;