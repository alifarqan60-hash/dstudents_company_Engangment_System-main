import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { OverlayProvider } from "./contexts/OverlayContext";
import { routes } from "./routes";
import { SocketProvider } from "./contexts/SocketContext";
import "../firebase.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OverlayProvider>
      <Provider store={store}>
        <SocketProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </SocketProvider>
      </Provider>
    </OverlayProvider>
  </React.StrictMode>
);
