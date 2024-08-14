// Boards.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoardsThunk, addBoardThunk } from "../../store/boards";
import styles from "./Boards.module.css";
import BoardCard from "../BoardCard";

export default function Boards() {
    const dispatch = useDispatch();
    //const boards = useSelector((state) => Object.values(state.boards));
    let boards = useSelector((state) => state.boards);
    boards = Object.values(boards);

    const user = useSelector((state) => state.session.user);

    const [showCreate, setShowCreate] = useState(false);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getBoardsThunk());
    }, [dispatch, user]);

    if (!boards) {
        return <div>Boards Not Found!</div>;
    }

    function reserveClick(/*e*/) {
        setShowCreate(true);
    }
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        setDescription("");

        const serverResponse = await dispatch(
            addBoardThunk({
                description,
            })
        );

        // console.log("response frpm BAORD CREATE:", serverResponse);

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            cancelCreate();
        }
    };

    function cancelCreate() {
        setDescription("");
        setShowCreate(false);
    }

    function getCreateForm() {
        return (
            <>
                <h1>Creating </h1>
                <form onSubmit={handleCreateSubmit}>
                    <label>
                        Description
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    {errors.description && <p>{errors.description}</p>}
                    <button type="submit">Create Board</button>
                    <button onClick={cancelCreate}>Cancel</button>
                </form>
            </>
        );
    }

    return (
        <div className={styles.pins}>
            <button onClick={reserveClick} className="midBtn">
                Create Board
            </button>
            {showCreate && getCreateForm()}

            {boards.map((board) => (
                <BoardCard key={board.id} board={board} />
            ))}
        </div>
    );

    // return (
    //       <div>
    //           <h1>Boards</h1>
    //       </div>
    //   );
}
