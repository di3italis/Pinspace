import { createBrowserRouter } from "react-router-dom";
import LoginFormModal from "../components/LoginFormModal";
// import LoginFormPage from '../components/LoginFormPage';
import SignupFormModal from "../components/SignupFormModal";
// import SignupFormPage from '../components/SignupFormPage';
import HomeSplash from "../components/HomeSplash";
import Boards from "../components/Boards";
import CreatePin from "../components/CreatePin";
import Favorites from "../components/Favorites";
// import Navigation from "../components/Navigation";
import PinDetail from "../components/PinDetail";
import UpdatePin from "../components/UpdatePin";
import { Pins, MyPins } from "../components/Pins";
import Layout from "./Layout";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomeSplash />,
            },
            {
                path: "auth/login",
                element: <LoginFormModal />,
            },
            {
                path: "login",
                element: <LoginFormModal />,
            },
            {
                path: "signup",
                element: <SignupFormModal />,
            },
            {
                path: "boards",
                element: <Boards />,
            },
            {
                path: "create-pin",
                element: <CreatePin />,
            },
            {
                path: "favorites",
                element: <Favorites />,
            },
            {
                path: "pins",
                element: <Pins />,
            },
            {
                path: "pins/current",
                element: <MyPins />,
            },
            {
                path: "pins/:pinId",
                element: <PinDetail />,
            },
            {
                path: "pins/edit/:pinId",
                element: <UpdatePin />,
            },
        ],
    },
]);
