import useAuth from "../shared/hooks/useAuth.jsx";
import {Navigate} from "react-router-dom";

function AuthRedirect() {
    const {accessToken, isLoading} = useAuth();

    if (isLoading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    return accessToken ? <Navigate to={"/dashboard"}/> : <Navigate to={"/login"}/>
}

export default AuthRedirect;