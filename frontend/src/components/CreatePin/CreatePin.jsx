import { useState /*, useEffect*/ } from "react";
import { useDispatch /*, useSelector*/ } from "react-redux";
import { addPinThunk } from "../../store/pins";
import styles from "./CreatePin.module.css";

export default function CreatePin() {
    const dispatch = useDispatch();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [boardId, setBoardId] = useState('');
    const [errors, setErrors] = useState({});

    // const boards = useSelector((state) => Object.values(state.boards));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const newPin = { image, title, description /*, boardId */ };

        const res = await dispatch(addPinThunk(newPin));
        if (res.errors) {
            setErrors(res.errors["message"]);
        } else {
            setImage("");
            setTitle("");
            setDescription("");
            // setBoardId('');
        }
    };

    return (
        <div className={styles.createPinPage}>
            <div className={styles.createSpotContainer}>
                <h2>Create a Pin</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                    {errors.image && (
                        <p className={styles.error}>{errors.image}</p>
                    )}
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {errors.image && (
                        <p className={styles.error}>{errors.image}</p>
                    )}
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    {errors.image && (
                        <p className={styles.error}>{errors.image}</p>
                    )}
                    <button className={styles.button} type="submit">
                        Create Pin
                    </button>
                </form>
            </div>
        </div>
    );
}
