import {createContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import authService from "../../services/authService.js";

const AuthContext = createContext({});

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export function AuthProvider({children}) {
    const [accessToken, setAccessToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);


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

    useEffect(() => {
        const initializeAccessToken = async () => {
            if (!isInitialized) {
                await refreshToken();
                setIsInitialized(true);
            }
        };

        initializeAccessToken();
    }, [isInitialized]);

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