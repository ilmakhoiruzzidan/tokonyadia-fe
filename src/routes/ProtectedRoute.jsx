import useAuth from "../shared/hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {logoutAction} from "../redux/actions/authAction.js";

ProtectedRoute.propTypes = {
    children: PropTypes.node
}

function ProtectedRoute({children}) {
    const {accessToken, isLoading} = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && (!accessToken)) {
            dispatch(logoutAction());
            navigate("/login", {replace: true});
        }
    }, [accessToken, dispatch, navigate, isLoading]);

    if (isLoading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }

    return children;
}

export default ProtectedRoute;