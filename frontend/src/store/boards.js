// boards.js
// --------------CONSTANTS----------------
const GET_BOARDS = "boards/GET_BOARDS";
const GET_BOARD_DETAILS = "boards/GET_BOARD";
const ADD_BOARD = "boards/ADD_BOARD";
const DELETE_BOARD = "boards/DELETE_BOARD";
const UPDATE_BOARD = "boards/UPDATE_BOARD";
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

// --------------UPDATE BOARD ACTION----------------
export const updateBoard = (payload) => {
    return {
        type: UPDATE_BOARD,
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
        const response = await fetch("/api/boards/");

        if (response.ok) {
            const data = await response.json();
            dispatch(getBoards(data.board));
            console.log("getBoardsThunk data:", data);
        }
    } catch (error) {
        consol.log("ERROR IN GET BOARDS", error);
        dispatch(handleError(error));
    }
};

// --------------GET BOARD DETAILS THUNK----------------
// CHECK THIS!!!
export const getBoardDetailsThunk = (boardId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/boards/${boardId}`);

        if (response.ok) {
            const data = await response.json();
            dispatch(getBoardDetails(data.board));
            console.log("getBoardDetailsThunk data:", data);
        }
    } catch (error) {
        console.log("ERROR IN GET BOARD DETAILS", error);
        dispatch(handleError(error));
    }
};

// --------------ADD BOARD THUNK----------------
export cont addBoardThunk = (board) => async (dispatch) => {
    try {
        const response = await fetch("/api/boards/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(board),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(addBoard(data.board));
            console.log("addBoardThunk data:", data);
        }
    } catch (error) {
        console.log("ERROR IN ADD BOARD", error);
        dispatch(handleError(error));
    }
}
