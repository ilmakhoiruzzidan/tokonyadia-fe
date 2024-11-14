import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/login/LoginPage.jsx";
import Hook from "../pages/dashboard/hook/Hook.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: "*",
        element: <h1>404</h1>,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        errorElement: <h1>500</h1>,
        children: [
            {
                index: true,
                element: <Dashboard/>,
            },
            {
                path: "hooks",
                element: <Hook/>,
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
])

export default router;