// ProfileButton.jsx
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../store/session";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();
    const navigate = useNavigate();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
        navigate("/");
    };

    return (
        <>
        <h1>Beta V 2</h1>
            <button onClick={toggleMenu}>
                <FaUserCircle />
            </button>
            {showMenu && (
                <ul className={"profile-dropdown"} ref={ulRef}>
                    {user ? (
                        <>
                            <li>{user.username}</li>
                            <li>{user.email}</li>
                            <ul className="menu-buttons">
                                <li>
                                    <NavLink
                                        to={"/boards/"}
                                        onClick={() => setShowMenu(false)}
                                    >
                                        My Boards
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/pins/current/"}
                                        onClick={() => setShowMenu(false)}
                                    >
                                        My Pins
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/create-pin/"}
                                        onClick={() => setShowMenu(false)}
                                    >
                                        Create Pin
                                    </NavLink>
                                </li>
                            </ul>
                            <li>
                                <button onClick={logout}>Log Out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                itemText="Log In"
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </>
                    )}
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
