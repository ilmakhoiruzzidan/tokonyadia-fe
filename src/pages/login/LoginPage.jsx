function LoginPage() {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col md:flex-row gap-1 md:gap-14 bg-white rounded-lg border shadow-md p-8 w-screen md:w-auto">
                        <div className="p-0 md:p-36">
                            <div className="flex flex-col items-center md:items-start">
                                <h1 className="font-bold mt-2 text-3xl text-blue-800">Welcome Back👋</h1>
                                <p className="text-lg mt-2 text-gray-400">Please login to your account</p>
                            </div>

                            <form className="flex flex-col mt-8 gap-2">
                                <label className="font-medium text-gray-700" htmlFor="username">Username</label>
                                <input
                                    className="font-light p-2 rounded-lg border-2 border-gray-200 focus:outline-blue-200"
                                    type="text" placeholder="Username" required/>

                                <label className="font-medium text-gray-700" htmlFor="password">Password</label>
                                <input
                                    className="font-light p-2 rounded-lg border-2 border-gray-200 focus:outline-blue-200"
                                    type="password" placeholder="*******" required/>

                                <button
                                    className="mt-4 p-2 bg-blue-800 rounded-lg text-white hover:bg-blue-700 active:bg-blue-800 transition"
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
                        <div className="p-2 hidden lg:block lg:w-1/2">
                            <img className="rounded-md w-full" src="src/assets/herologin.jpeg" alt="hero-login"/>
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

export default LoginPage;