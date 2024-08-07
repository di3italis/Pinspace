// PinCard.jsx
import { /*useEffect,*/ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import * as pinActions from "../../store/pins";
import styles from "./PinCard.module.css";
import { addBoardPinThunk } from "../../store/boardpins";


export default function PinCard({ key, pin, addBoard }) {
    const dispatch = useDispatch();

    const boards = useSelector((state) => Object.values(state.boards));

    const [selectedBoard, setselectedBoard] = useState("");

    console.log('THIS PINCARD KEY ===', key)

    const getOptions = () => {
        if (boards.length === 0) {
            return <option value="">Create a Board</option>;
        } else {
            return (
                <>
                    <option value="">Select a Board</option>
                    {boards.map((board) => (
                        <option key={board.id} value={board.id}>
                            {board.description}
                        </option>
                    ))}
                </>
            );
        }
    };

    const addBoardPin = async () => {
        const serverResponse = await dispatch(
            addBoardPinThunk(selectedBoard, pin.id)
        );
        //  console.log("response from BAORDPIN ADD:", serverResponse)
        if (serverResponse) {
            // board.description = description
            // cancelEdit();
            //console.log('edit thunk resp is', serverResponse )
            // setErrors(serverResponse);
        } else {
            //
        }
    };
    // const doX = () => {
    //   console.log('dox', pin)
    // }

    if (!pin) {
        return <h1>PinCard</h1>;
    }

    return (
        <div className={styles.card}>
            <Link to={`/pins/${pin.id}`}>
                <div className={styles.imageContainer}>
                    <img
                        src={pin.image}
                        alt={pin.title}
                        title={pin.title}
                        className={styles.image}
                    />
                </div>
                <h1>PinCard</h1>
            </Link>

            {addBoard && (
                <>
                    Link to Board
                    <select
                        value={selectedBoard} // ...force the select's value to match the state variable...
                        onChange={(e) => setselectedBoard(e.target.value)} // ... and update the state variable on any change!
                    >
                        {getOptions()}
                    </select>
                    {selectedBoard != "" && (
                        <button onClick={addBoardPin}>Add to Board</button>
                    )}
                </>
            )}
        </div>
    );
}
//<button onClick={addBoardPin}>Add to Board</button>
//{(selectedBoard != '') && <button onClick={addBoardPin}>Add to Board</button>}
