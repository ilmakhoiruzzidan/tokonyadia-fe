import {createContext, useEffect, useLayoutEffect, useState} from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import authService from "../../services/authService.js";
import httpClient from "../../libs/api.js";
import {useDispatch} from "react-redux";
import {retrying} from "../../redux/slices/uiSlices.js";


const AuthContext = createContext({});

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export function AuthProvider({children}) {
    const [accessToken, setAccessToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const setAuthentication = (auth) => {
        setAccessToken(auth.accessToken);
        setRole(auth.role);
    }

    const clearAuthentication = () => {
        setAccessToken(null)
        setRole(null)
    }

    const refreshToken = async () => {
        try {
            const {data} = await authService.refreshToken();
            setAuthentication({
                accessToken: data.accessToken,
                role: data.role
            });
            return data.accessToken;
        } catch (e) {
            if (e.status === 401) {
                toast(e.response?.data.message);
            }
            clearAuthentication();
            return null;
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            await authService.logout();
            setAccessToken(null);
        } catch (e) {
            toast.error(e.response?.data?.message);
            setAccessToken(null);
        }
    }

    useLayoutEffect(() => {
        const requestInterceptor = httpClient.interceptors.request.use(
            async (config) => {
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = httpClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401 && !error.config._retry) {
                    error.config._retry = true;
                    dispatch(retrying());
                    try {
                        const newToken = await refreshToken()
                        error.config.headers.Authorization = `Bearer ${newToken}`;
                        return httpClient.request(error.config);
                    } catch (refreshError) {
                        await logout();
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken, dispatch]);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await refreshToken();
                // eslint-disable-next-line no-unused-vars
            } catch (e) {
                await logout();
            } finally {
                setLoading(false);
            }
        }

        initializeAuth();
    }, [])


    if (loading) {
        return <LoadingSpinner/>
    }

    const state = {
        accessToken,
        role,
        setAuthentication,
        clearAuthentication,
        refreshToken,
    }

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;