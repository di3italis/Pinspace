import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoardThunk, editBoardThunk } from "../../store/boards";

export default function BoardCard({ board }) {
  const dispatch = useDispatch();

  const [inEdit, setinEdit] = useState(false);
  const [description, setdescription] = useState(false);

  useEffect(() => {
    setdescription(board?.description);
  }, [board?.description]);

  if (!board) {
    return <div>Board Not Found!</div>;
  }
  const startUpdate = () => {
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
      console.log('edit thunk resp is', serverResponse )
        // setErrors(serverResponse);
    } else {
      // cancelCreate()
    }
  };

  const deleteBoard = async () => {
  }

  const cancelEdit = async () => {
    setdescription(board?.description);
    setinEdit(false)
  }

  return (
    <>
      <div className='redBox'>
          {!inEdit &&
            <>
              <h1>{board.description}</h1>
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
    </>
  );
}
