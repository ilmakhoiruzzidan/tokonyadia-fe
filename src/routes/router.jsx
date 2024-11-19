import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/login/LoginPage.jsx";
import Product from "../features/product/Product.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Page404 from "../pages/404/Page404.jsx";
import Page500 from "../pages/500/Page500.jsx";
import App from "../App.jsx";

const router = createBrowserRouter([
    {
        path: '*',
        element: <Page404/>,
    },
    {
        path: '',
        element: <App/>,
        children: [
            {
                path: "/dashboard",
                element: <DashboardLayout/>,
                errorElement: <Page500/>,
                children: [
                    {
                        index: true,
                        element: <Dashboard/>,
                    },
                    {
                        path: "products",
                        element: <Product/>,
                    }
                ]
            },
            {
                path: "/login",
                element: <LoginPage/>,
            },
        ]
    }
],
    {
        future: {
            v7_relativeSplatPath: true,
            v7_startTransition: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        }
    }
)

export default router;