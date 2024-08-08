// comments.js
import { getCookie } from "./utils";

// --------------CONSTANTS----------------
const GET_COMMENTS = "comments/GET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const ERROR = "comments/ERROR";

// --------------ACTIONS----------------
//
// --------------GET COMMENTS ACTION----------------
export const getComments = (payload) => {
    return {
        type: GET_COMMENTS,
        payload,
    };
};

// --------------ADD COMMENT ACTION----------------
export const addComment = (payload) => {
    return {
        type: ADD_COMMENT,
        payload,
    };
};

// --------------DELETE COMMENT ACTION----------------
export const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId,
    };
};

// --------------EDIT COMMENT ACTION----------------
export const editComment = (payload) => {
    return {
        type: EDIT_COMMENT,
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
// --------------GET COMMENTS THUNK----------------
export const getCommentsThunk = (pinId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/pins/${pinId}/comment`);
        // console.log("getCommentsThunk res:", res);
        if (res.ok) {
            const data = await res.json();
            dispatch(getComments(data.comments));
        }
    } catch (error) {
        // console.error("ERROR IN GET COMMENTS", error);
        dispatch(handleError(error));
    }
};

// --------------ADD COMMENT THUNK----------------
export const addCommentThunk = (comment, pinId) => async (dispatch) => {
    try {
        const payload = { comment };
        // console.log("addCommentThunk payload", payload);
        const res = await fetch(`/api/pins/${pinId}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrf_token")

            },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(addComment(data));
            return data;
        }
    } catch (error) {
        // console.error("ERROR IN ADD COMMENT", error);
        dispatch(handleError(error));
    }
};

// --------------DELETE COMMENT THUNK----------------
export const deleteCommentThunk = (commentId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/pins/comment/${commentId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": getCookie("csrf_token")
            }
        });
        if (res.ok) {
            dispatch(deleteComment(commentId));
        }
    } catch (error) {
        console.error("ERROR IN DELETE COMMENT", error);
        dispatch(handleError(error));
    }
};

// --------------EDIT COMMENT THUNK----------------
export const editCommentThunk = (payload) => async (dispatch) => {
    try {
        const res = await fetch(`/api/pins/comment/${payload.commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(editComment(data));
            return data;
        }
    } catch (error) {
        console.error("ERROR IN EDIT COMMENT", error);
        dispatch(handleError(error));
    }
};

// --------------REDUCER----------------
const initialState = {};

export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
        // --------------GET COMMENTS CASE------------
        case GET_COMMENTS: {
            // console.log("GET COMMENTS REDUCER:", action.payload);
            const newState = {};
            action.payload.forEach((comment) => {
                newState[comment.id] = comment;
            });
            return newState;
        }
        // --------------ADD COMMENT CASE------------
        case ADD_COMMENT: {
            return { ...state, [action.payload.id]: action.payload };
        }
        // --------------DELETE COMMENT CASE------------
        case DELETE_COMMENT: {
            const newState = { ...state };
            delete newState[action.commentId];
            return newState;
        }
        // --------------EDIT COMMENT CASE------------
        case EDIT_COMMENT:
            return { ...state, ...action.payload };
        // --------------ERROR CASE------------
        case ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
