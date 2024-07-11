import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
// import { RouterProvider } from "react-router-dom";
import configureStore from "./store/store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
// import { router } from "./router";
import * as sessionActions from "./redux/session";
import { Modal, ModalProvider } from "./context/Modal.jsx";

import styles from "./index.module.css";

async function renderApp() {
    const store = await configureStore();

    if (process.env.NODE_ENV !== "production") {
        window.store = store;
    }

    if (import.meta.env.MODE !== "production") {
        restoreCSRF();

        window.csrfFetch = csrfFetch;
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
}

renderApp();
