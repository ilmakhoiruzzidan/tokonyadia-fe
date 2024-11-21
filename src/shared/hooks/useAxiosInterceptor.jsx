import useAuth from "./useAuth.jsx";
import {useLayoutEffect} from "react";
import httpClient from "../../libs/api.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {refreshTokenAction} from "../../redux/actions/authAction.js";

export default function useAxiosInterceptor() {
    const {accessToken} = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const requestInterceptor = httpClient.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        )

        const responseInterceptor = httpClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.status === 401) {
                    try {
                        dispatch(refreshTokenAction)
                        if (accessToken) {
                            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
                            return httpClient(error.config);
                        }
                    } catch (e) {
                        navigate('/login', {replace: true});
                        toast.error(e);
                    }
                }
                return Promise.reject(error);
            }
        )

        return () => {
            httpClient.interceptors.request.eject(requestInterceptor)
            httpClient.interceptors.response.eject(responseInterceptor)
        }
    }, [accessToken, navigate, dispatch])
}