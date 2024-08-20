// this is from the starter code
import { useState, useRef } from "react";
import { thunkLogin } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const formRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("credential", credential);
        // console.log("password", password);

        const serverResponse = await dispatch(
            thunkLogin({
                credential,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    const handleDemoLogin = async () => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkLogin({
                credential: "demo@aa.io",
                password: "password",
            })
        );

        if (!serverResponse) {
            closeModal();
        }
    };

    return (
        <>
            <div className="loginWrapper ">
            <h1>Log In</h1>
            <form ref={formRef} className="loginWrapper" onSubmit={handleSubmit}>
                <label>
                    Email or Username
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <button type="submit">Log In</button>
                <button className="demo-login" onClick={handleDemoLogin}>
                    Demo Login
                </button>
            </form>
            </div>
        </>
    );
}

export default LoginFormModal;
