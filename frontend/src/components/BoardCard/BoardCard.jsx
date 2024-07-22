import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoardThunk, editBoardThunk} from "../../store/boards";
import { getBoardPinsThunk } from "../../store/boardpins";
import PinCard from "../PinCard";

export default function BoardCard({ board }) {
  const dispatch = useDispatch();

  const [inEdit, setinEdit] = useState(false);
  const [description, setdescription] = useState(false);

  const pins = useSelector((state) => Object.values(state.pins));
  const boardPins = useSelector((state) => {
      const res = []
      for (let k in state.boardpins){
        if (state.boardpins[k].boardId == board.id){
          res.push(state.boardpins[k].pinId)
        }
      }
      return res//state.boardpins//[]//res
    });

  useEffect(() => {
    setdescription(board?.description);
    dispatch(getBoardPinsThunk(board.id));
  }, [dispatch, board]);

  if (!board) {
    return <div>Board Not Found!</div>;
  }
  const startUpdate = () => {

    console.log('bpbpbpbpbpb', boardPins, pins[1])
    setinEdit(true)
  }

  const saveEdit = async () => {

    const serverResponse = await dispatch(
      editBoardThunk({
        description,
      }, board.id)
    );


     console.log("response from BAORD edit:", serverResponse)
    if (serverResponse) {
      board.description = description
      cancelEdit();
      //console.log('edit thunk resp is', serverResponse )
        // setErrors(serverResponse);
    } else {
      //
    }
  };

  const deleteBoard = async () => {
    const serverResponse = await dispatch(
      deleteBoardThunk(board.id)
    );
    console.log("response from BAORD Delete:", serverResponse)
    if (serverResponse) {
      // board.description = description
      // cancelEdit();
      //console.log('edit thunk resp is', serverResponse )
        // setErrors(serverResponse);
    } else {
      //
    }
  }

  const cancelEdit = async () => {
    setdescription(board?.description);
    setinEdit(false)
  }
//   <div >
//   {boardPins.map((b) => (
//     b.id
//   ))}
// </div>

  return (
    <>

       <div className='redBox'>
          {!inEdit &&
            <>
              <h1>{board.description}</h1>
              <h2>BoardID is {board.id}</h2>
              <button onClick={startUpdate}>Edit</button>
              <button onClick={deleteBoard}>Delete</button>
            </>
          }
          {inEdit &&
            <>
              <input
                type="text"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                required/>
              <button onClick={cancelEdit}>Cancel</button>
              <button onClick={saveEdit}>Save</button>
              </>
          }
      </div>
      {boardPins.map((pin) => (
         <PinCard key={pin} pin={pins[pin]} addBoard={false}/>
       ))}

    </>
  );
}
