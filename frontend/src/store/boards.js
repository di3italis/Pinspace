// boards.js
import { getCookie } from "./utils";

// --------------CONSTANTS----------------
const GET_BOARDS = "boards/GET_BOARDS";
const GET_BOARD_DETAILS = "boards/GET_BOARD";
const ADD_BOARD = "boards/ADD_BOARD";
const DELETE_BOARD = "boards/DELETE_BOARD";
const EDIT_BOARD = "boards/EDIT_BOARD";
const ERROR = "boards/ERROR";

// --------------ACTIONS----------------
//
// --------------GET BOARDS ACTION----------------
export const getBoards = (payload) => {
    return {
        type: GET_BOARDS,
        payload,
    };
};

// --------------GET BOARD DETAILS ACTION----------------
export const getBoardDetails = (payload) => {
    return {
        type: GET_BOARD_DETAILS,
        payload,
    };
};

// --------------ADD BOARDS ACTION----------------
export const addBoard = (payload) => {
    return {
        type: ADD_BOARD,
        payload,
    };
};

// --------------DELETE BOARD ACTION----------------
export const deleteBoard = (boardId) => {
    return {
        type: DELETE_BOARD,
        boardId,
    };
};

// --------------EDIT BOARD ACTION----------------
export const updateBoard = (payload) => {
    return {
        type: EDIT_BOARD,
        payload,
    };
};

// --------------ERROR ACTION----------------
export const handleError = (payload) => {
    return {
        type: ERROR,
        payload,
    };
};

// --------------THUNKS----------------
//
// --------------GET BOARDS THUNK----------------
export const getBoardsThunk = () => async (dispatch) => {
    try {
        const res = await fetch("/api/boards/");

        if (res.ok) {
            const data = await res.json();
            //console.log('ERRRRRRRRRdfsdfsdfdsfsdfds', data)

            dispatch(getBoards(data.boards));
            console.log("getBoardsThunk data:", data);
        }
    } catch (error) {
        console.log("ERROR IN GET BOARDS", error);
        dispatch(handleError(error));
    }
};

// --------------GET BOARD DETAILS THUNK----------------
// CHECK THIS!!!
export const getBoardDetailsThunk = (boardId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/boards/${boardId}`);

        if (res.ok) {
            const data = await res.json();
            dispatch(getBoardDetails(data.board));
            console.log("getBoardDetailsThunk data:", data);
        }
    } catch (error) {
        console.log("ERROR IN GET BOARD DETAILS", error);
        dispatch(handleError(error));
    }
};

// --------------ADD BOARD THUNK----------------
export const addBoardThunk = (board) => async (dispatch) => {
    try {
        const res = await fetch("/api/boards/", {
            method: "POST",
            headers: {
              "X-CSRFToken": getCookie("csrf_token"),
              "Content-Type": "application/json" },
            body: JSON.stringify(board),
        });

        if (res.ok) {
            const data = await res.json();
            console.log("addBoardThunk data:", data);

            dispatch(addBoard(data));
        }
    } catch (error) {
        console.log("ERROR IN ADD BOARD", error);
        dispatch(handleError(error));
    }
}

// --------------DELETE BOARD THUNK----------------
export const deleteBoardThunk = (boardId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/boards/${boardId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            dispatch(deleteBoard(boardId));
        }
    } catch (error) {
        console.log("ERROR IN DELETE BOARD", error);
        dispatch(handleError(error));
    }
};

// --------------EDIT BOARD THUNK----------------
export const editBoardThunk = (payload, boardId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/boards/${boardId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(updateBoard(data.board));
            return data;
        }
    } catch (error) {
        console.log("ERROR IN EDIT BOARD", error);
        dispatch(handleError(error));
    }
};

// --------------REDUCER----------------
const initialState = {};

export default function boardsReducer(state = initialState, action) {
    switch (action.type) {
        // --------------GET BOARDS----------------
        case GET_BOARDS: {
            const newState = structuredClone(state);
            //const newState = { ...state };

            action.payload.forEach((board) => {
                newState[board.id] = board;
            });

            return newState;
        }
        // --------------GET BOARD DETAILS----------------
        case GET_BOARD_DETAILS: {
          const newState = structuredClone(state);
          const id = action.payload.id;
            return { ...state, [id]: action.payload };
        }
        // --------------ADD BOARD----------------
        case ADD_BOARD: {
          const newState = structuredClone(state);
          return {
                ...state,
                [action.payload.id]: action.payload
            };
        }
        // --------------DELETE BOARD----------------
        case DELETE_BOARD: {
            const newState = structuredClone(state);
            delete newState[action.boardId];
            return newState;
        }
        // --------------EDIT BOARD----------------
        case EDIT_BOARD: {
            const newState = structuredClone(state);
            newState[action.payload.id] = action.payload;
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
