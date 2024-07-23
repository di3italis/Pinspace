// UpdatePin.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import * as pinActions from "../../store/pins";
import styles from "./UpdatePin.module.css";

export default function UpdatePin() {
    const { pinId: pinIdStr } = useParams();
    const pinId = parseInt(pinIdStr, 10);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pin = useSelector((state) => state.pins[pinId]);

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    // console.log("UpdatePin pinId:", pinId);

    useEffect(() => {
        dispatch(pinActions.getPinDetailsThunk(pinId));
    }, [dispatch, pinId]);

    useEffect(() => {
        if (pin) {
            setImage(pin.image);
            setTitle(pin.title);
            setDescription(pin.description);
        }
    }, [pin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const updatedPin = { image, title, description };

        const res = await dispatch(
            pinActions.updatePinThunk(updatedPin, pinId)
        );
        if (res.errors) {
            setErrors(res.errors["message"]);
        } else {
            navigate(`/pins/${pinId}`);
        }
    };

    if (!pin) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.updatePinPage}>
            <div className={styles.updatePinContainer}>
                <h2>Update Pin</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Image URL</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder={image}
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                    {errors.image && (
                        <p className={styles.error}>{errors.image}</p>
                    )}
                    <label>Title</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder={title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {errors.title && (
                        <p className={styles.error}>{errors.title}</p>
                    )}
                    <label>Description</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder={description}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    {errors.description && (
                        <p className={styles.error}>{errors.description}</p>
                    )}
                    <button className={styles.button} type="submit">
                        Update Pin
                    </button>
                </form>
            </div>
        </div>
    );
}
