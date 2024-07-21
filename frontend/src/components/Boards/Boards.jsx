// Boards.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoardsThunk, addBoardThunk } from "../../store/boards";
import styles from "./Boards.module.css"
import BoardCard from "../BoardCard";

export default function Boards() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => Object.values(state.boards));

  const [showCreate, setshowCreate] = useState(false);
  const [description, setdescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
      dispatch(getBoardsThunk());
  }, [dispatch]);

  if (!boards) {
      return <div>Boards Not Found!</div>;
  }

  function reserveClick(e){
    setshowCreate(true);
  }
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      addBoardThunk({
        description,
      })
    );

    console.log("response frpm BAORD CREATE:", serverResponse)

    if (serverResponse) {
        setErrors(serverResponse);
    } else {
      setshowCreate(false)
    }
};

  function getCreateForm(){
      return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleCreateSubmit}>
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}
                <button type="submit">Create Board</button>
            </form>
        </>
    );

  }

  return (
      <div className={styles.pins}>
          <button onClick={reserveClick} className='midBtn'>Create Board</button>
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
