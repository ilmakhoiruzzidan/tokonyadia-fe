import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/login/LoginPage.jsx";
import Product from "../pages/dashboard/Product.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Page404 from "../pages/404/Page404.jsx";
import Page500 from "../pages/500/Page500.jsx";
import ProductList from "../features/product/components/ProductList.jsx";
import ProductFormCreate from "../features/product/components/forms/ProductFormCreate.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
        {
            path: '*',
            element: <Page404/>,
        },
        {
            path: "/dashboard",
            element: (
                <ProtectedRoute>
                    <DashboardLayout/>
                </ProtectedRoute>
            ),
            errorElement: <Page500/>,
            children: [
                {
                    index: true,
                    element: <Dashboard/>,
                },
                {
                    path: "products",
                    element: <Product/>,
                    children: [
                        {
                            index: true,
                            element: <ProductList/>,
                        },
                        {
                            path: "create",
                            element: <ProductFormCreate/>
                        },
                    ]
                }
            ]
        },
        {
            path: "/login",
            element: <LoginPage/>,
        },
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