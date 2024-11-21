import {Outlet, useNavigate} from "react-router-dom";
import useAxiosInterceptor from "./shared/hooks/useAxiosInterceptor.jsx";
import {useEffect} from "react";

function App() {

    useAxiosInterceptor();

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/login");
    }, [navigate]);

    return (
        <>
            <Outlet/>
        </>
    )
}

export default App
