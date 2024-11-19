import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import store from "./redux/store.js";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router.jsx";
import {Provider} from "react-redux";
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <Toaster/>
          <RouterProvider router={router}
                          future={{
                              v7_startTransition: true
                          }}
          >
          </RouterProvider>
      </Provider>
  </StrictMode>,
)
