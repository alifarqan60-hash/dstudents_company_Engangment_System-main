import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { OverlayProvider } from "./contexts/OverlayContext.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OverlayProvider>
      <Provider store={store}>
        <RouterProvider router={routes} />
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          theme="colored"
        />
      </Provider>
    </OverlayProvider>
  </React.StrictMode>
);
