import {createRoot} from 'react-dom/client'
import './index.css'
import store from "./redux/store.js";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router.jsx";
import {Provider} from "react-redux";
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "./shared/context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Toaster/>
        <AuthProvider>
            <RouterProvider
                router={router}
                future={{
                    v7_startTransition: true
                }}
            >
            </RouterProvider>
        </AuthProvider>
    </Provider>
)
