// import { getCookie } from "./utils";

const ADD_BOARDPIN = "boardPins/ADD_BOARDPIN";
const DEL_BOARDPIN = "boardPins/DEL_BOARDPIN";
const GET_BOARDPINS = "boardPins/GET_BOARDPINS";
const ERROR = "boardPins/ERROR";

//--------------GET BOARDPINS ACTION----------------
const getBoardPins = (payload) => {
  return {
      type: GET_BOARDPINS,
      payload,
  };
};
// --------------Delete BOARDPIN ACTION----------------
const deleteBoardPin = (boardPinId) => {
  return {
      type: DEL_BOARDPIN,
      boardPinId,
  };
};
// --------------ADD BOARDPIN ACTION----------------
const addBoardPin = (payload) => {
  return {
      type: ADD_BOARDPIN,
      payload,
  };
};
const handleError = (payload) => {
  return {
      type: ERROR,
      payload,
  };
};

// --------------GET BOARDPINS THUNK---------------
export const getBoardPinsThunk = (boardPinId) => async (dispatch) => {
  try {
    // console.log('getBoardPinsThunk fetch("/api/boards/:: FETCHING BOARD ID::', boardPinId)


    const res = await fetch(`/api/boards/${boardPinId}/boardPin`);

      if (res.ok) {
          const data = await res.json();
          //  console.log('getBoardPinsThunk fetch("/api/boards/::', data)

          dispatch(getBoardPins(data.boardPins));
          // console.log("getBoardPinsThunk data:", data);
      }
  } catch (error) {
      // console.log("ERROR IN GET BOARDPINS", error);
      dispatch(handleError(error));
  }
};

// --------------Delete BOARDPIN THUNK-------------
export const deleteBoardPinThunk = (boardPinId, pinId) => async (dispatch) => {
  try {
      const res = await fetch(`/api/boards/${boardPinId}/boardPin/${pinId}`, {
        headers: {
          //"X-CSRFToken": getCookie("csrf_token"),
          "Content-Type": "application/json" },
        method: "DELETE",
      });

      if (res.ok) {
          dispatch(deleteBoardPin(boardPinId));
      }
  } catch (error) {
      // console.log("ERROR IN DELETE BOARD", error);
      dispatch(handleError(error));
  }
};
// --------------ADD BOARDPIN THUNK----------------
export const addBoardPinThunk = (boardId, pinId) => async (dispatch) => {
  try {
      const res = await fetch(`/api/boards/${boardId}/boardPin/${pinId}`, {
          method: "POST",
          // headers: {
          //   "X-CSRFToken": getCookie("csrf_token"),
          // }
      });

      if (res.ok) {
          const data = await res.json();
          // console.log("addBoardPinThunk data:", data);
          dispatch(addBoardPin(data));
      }
  } catch (error) {
      // console.log("ERROR IN ADD BOARDPIN", error);
      dispatch(handleError(error));
  }
}

// --------------REDUCER----------------
const initialState = {};
export default function boardpinsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOARDPIN:{
      const newState = structuredClone(state);
      newState[action.payload.id] = action.payload

      return newState;
    }
    case DEL_BOARDPIN:{
      const newState = structuredClone(state);
      delete newState[action.boardPinId];
      return newState;
    }
    case GET_BOARDPINS:{
      const newState = structuredClone(state);

      action.payload.forEach((boardPin) => {
        newState[boardPin.id] = boardPin;
      });

      return newState;
    }

      // --------------ERROR----------------
      case ERROR: {
          return {
              ...state,
              error: action.payload
          };
      }
      default:
          return state;
  }
}
