import LoginPage from "./pages/login/LoginPage.jsx";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router.jsx";
import {Provider} from "react-redux";
import store from "./redux/store.js";

function App() {

    return (
        <>
            <div className="font-customFontFamily">
                <Provider store={store}>
                    <RouterProvider router={router}></RouterProvider>
                </Provider>
            </div>
        </>
    )
}

export default App
