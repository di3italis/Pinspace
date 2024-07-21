// Boards.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoardsThunk } from "../../store/boards";
import styles from "./Boards.module.css"
import BoardCard from "../BoardCard";

export default function Boards() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => Object.values(state.boards));
  console.log("Boards:", boards);

  useEffect(() => {
      dispatch(getBoardsThunk());
  }, [dispatch]);

  if (!boards) {
      return <div>Boards Not Found!</div>;
  }

  return (
      <div className={styles.pins}>
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
