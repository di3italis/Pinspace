// App.jsx
import {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import HomeSplash from "./components/HomeSplash";
import LoginFormModal from "./components/LoginFormModal";
import Boards from "./components/Boards";
import CreatePin from "./components/CreatePin";
import Favorites from "./components/Favorites";
import Navigation from "./components/Navigation";
import PinDetail from "./components/PinDetail";
import Pins from "./components/Pins";

import * as sessionActions from './store/session';

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.thunkAuthenticate()).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch]);

    return (
        <div>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && <Outlet />}
        </div>
    );
}

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomeSplash />,
            },
            {
                path: "/auth/login",
                element: <LoginFormModal />,
            },
            {
                path: "/boards",
                element: <Boards />,
            },
            {
                path: "/create-pin",
                element: <CreatePin />,
            },
            {
                path: "/favorites",
                element: <Favorites />,
            },
            {
                path: "/pins/all",
                element: <Pins />,
            },
            {
                path: "/pins/:pinId",
                element: <PinDetail />,
            },
        ]
    }
])

export default function App() {
    return <RouterProvider router={router} />;
}
