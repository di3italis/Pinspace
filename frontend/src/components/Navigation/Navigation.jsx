// Navigation.jsx
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import Pins from "../Pins";
import "./Navigation.css";

function Navigation() {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <ProfileButton />
            </li>
        </ul>
    );
}

export default Navigation;
