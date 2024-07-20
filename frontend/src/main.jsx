import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
// import { RouterProvider } from "react-router-dom";
import configureStore from "./store/store";
// import { restoreCSRF, csrfFetch } from "./store/csrf";
// import { router } from "./router";
import * as sessionActions from "./store/session";
import { Modal, ModalProvider } from "./context/Modal.jsx";

import "./index.css";
// import styles from "./index.module.css";

const store = await configureStore();

if (import.meta.env.MODE !== "production") {
    window.store = store;
    window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ModalProvider>
            <Provider store={store}>
                <App />
                <Modal />
            </Provider>
        </ModalProvider>
    </React.StrictMode>
);
