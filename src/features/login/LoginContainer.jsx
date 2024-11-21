import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {useNavigate} from "react-router-dom";

import TextInput from "../../shared/components/TextInput.jsx";
import {loginSchema} from "./schema/index.js";
import toast from "react-hot-toast";
import useAuth from "../../shared/hooks/useAuth.jsx";
import authService from "../../services/authService.js";
import {useEffect} from "react";

function LoginContainer() {
    const {accessToken, setAuthentication} = useAuth();

    const {
        control,
        handleSubmit,
        formState: {
            isValid,
            errors
        }
    } = useForm({
        mode: "all",
        resolver: zodResolver(loginSchema),
    })

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (formValues) => {
        try {
            const data  = authService.login(formValues);
            setAuthentication(data);
            toast.success('Successfully logged in!');
            navigate('/dashboard');
        } catch (e) {
            console.log(e)
            toast.error(e.response?.data.message);
        }
    });

    useEffect(() => {
        if  (accessToken) {
            navigate('/dashboard');
        }
    }, [accessToken, navigate])

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col justify-center items-center">
                    <div
                        className="flex flex-col md:flex-row gap-1 md:gap-14 bg-white rounded-lg border shadow-md p-8 w-screen md:max-w-7xl">
                        <div className="p-0 md:p-36">
                            <div className="flex flex-col items-center md:items-start">
                                <h1 className="font-bold mt-2 text-3xl text-blue-800">Welcome Back👋</h1>
                                <p className="text-lg mt-2 text-gray-400">Please login to your account</p>
                            </div>

                            <form onSubmit={onSubmit} className="flex flex-col mt-8 gap-2">
                                <TextInput
                                    label={'Username'}
                                    name={'username'}
                                    control={control}
                                    placeholder={'Username'}
                                    variant={'text'}
                                    error={errors.username}
                                />
                                <TextInput
                                    label={'Password'}
                                    name={'password'}
                                    control={control}
                                    placeholder={'******'}
                                    variant={'password'}
                                    type="password"
                                    error={errors.password}
                                />
                                <button
                                    disabled={!isValid}
                                    className="disabled:bg-gray-300 mt-4 p-2 bg-blue-800 rounded-lg text-white hover:bg-blue-700 active:bg-blue-800 transition"
                                    type="submit">Sign in
                                </button>
                            </form>
                            <div className="flex mt-4 items-center justify-center">
                                <p className="text-sm text-gray-400 mt-4">{"Don't have account yet?"}
                                    <a href="#"
                                       className="font-bold text-pink-600 hover:text-pink-500 active:text-pink-700 ml-1">
                                        Sign Up
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="p-2 hidden max-h-full lg:flex lg:w-1/2">
                            <img className="rounded-md  w-full" src="src/assets/herologin.jpeg" alt="hero-login"/>
                        </div>
                    </div>
                    <footer className="mt-4">
                        <p className="text-sm text-gray-400">
                            &copy; 2024 Dashboard App, All right reserved.
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default LoginContainer;