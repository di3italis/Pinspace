// pins.js
import { getCookie } from "./utils";
import { REMOVE_USER } from "./session";

// --------------CONSTANTS----------------
const GET_PINS = "pins/GET_PINS";
const GET_USER_PINS = "pins/GET_USER_PINS";
const GET_PIN_DETAILS = "pins/GET_PIN";
const ADD_PIN = "pins/ADD_PIN";
const DELETE_PIN = "pins/DELETE_PIN";
const UPDATE_PIN = "pins/UPDATE_PIN";
const ERROR = "pins/ERROR";

// --------------ACTIONS----------------
//
// --------------GET PINS ACTION----------------
export const getPins = (payload) => {
    return {
        type: GET_PINS,
        payload,
    };
};

// --------------GET USER PINS ACTION----------------
export const getUserPins = (payload) => {
    return {
        type: GET_USER_PINS,
        payload,
    };
};

// --------------GET PIN DETAILS ACTION----------------
export const getPinDetails = (payload) => {
    return {
        type: GET_PIN_DETAILS,
        payload,
    };
};

// --------------ADD ACTION----------------
export const addPin = (payload) => {
    return {
        type: ADD_PIN,
        payload,
    };
};

// --------------DELETE ACTION----------------
export const deletePin = (pinId) => {
    return {
        type: DELETE_PIN,
        pinId,
    };
};

// --------------UPDATE ACTION----------------
export const updatePin = (payload) => {
    return {
        type: UPDATE_PIN,
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
// --------------GET PINS THUNK----------------
export const getPinsThunk = () => async (dispatch) => {
    try {
        const res = await fetch("/api/pins", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrf_token"),
            },
        });
        if (res.ok) {
            const data = await res.json();
            console.log("Fetched data.Pins:", data.pins);
            // dispatch(getPins(data.Pins));
            dispatch(getPins(data.pins));
        }
    } catch (error) {
        console.log("ERROR IN GET PINS", error);
        dispatch(handleError(error));
    }
};

// --------------GET USER PINS THUNK----------------
export const getUserPinsThunk = () => async (dispatch) => {
    try {
        const res = await fetch("/api/pins/current", {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrf_token"),
            },
        });
        // console.log("getUserPinsThunk res:", res);
        const data = await res.json();
        dispatch(getUserPins(data.pins));
    } catch (error) {
        // console.log("ERROR IN GETTING USER PINS", error);
        dispatch(handleError(error));
    }
};

// --------------GET PIN DETAILS THUNK----------------
export const getPinDetailsThunk = (pinId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/pins/${pinId}`, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrf_token"),
            },
        });
        if (res.ok) {
            const data = await res.json();
            // console.log("getPinDetailsThunk data:", data);
            dispatch(getPinDetails(data.pin));
        }
    } catch (error) {
        // console.log("ERROR IN GETTING PIN DETAILS", error);
        dispatch(handleError(error));
    }
};

// --------------ADD PIN THUNK----------------
export const addPinThunk = (payload) => async (dispatch) => {
    try {
        // console.log("addPinThunk payload:", payload);
        const res = await fetch("/api/pins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrf_token"),
            },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(addPin(data));
            return data;
        }
    } catch (error) {
        // console.log("ERROR IN ADDING PIN", error);
        dispatch(handleError(error));
    }
};

// --------------DELETE PIN THUNK----------------
export const deletePinThunk = (pinId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/pins/${pinId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrf_token"),
            },
        });
        if (res.ok) {
            dispatch(deletePin(pinId));
        } else {
            const errorData = await res.json();
            console.error("Failed to delete pin:", errorData);
            dispatch(handleError(errorData));
        }
    } catch (error) {
        // console.log("ERROR IN DELETING PIN", error);
        dispatch(handleError(error));
    }
};

// --------------UPDATE PIN THUNK----------------
export const updatePinThunk = (payload, pinId) => async (dispatch) => {
    try {
        console.log("updatePinThunk payload:", payload);
        console.log("updatePinThunk pinId:", pinId);
        const res = await fetch(`/api/pins/${pinId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrf_token"),
            },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(updatePin(data));
            return data;
        }
    } catch (error) {
        // console.log("ERROR IN UPDATING PIN", error);
        dispatch(handleError(error));
    }
};

// --------------REDUCER----------------
const initialState = {};

export default function pinsReducer(state = initialState, action) {
    switch (action.type) {
        // --------------GET PINS CASE----------------
        case GET_PINS: {
            const newState = { ...state };
            // console.log("newState:", newState);
            action.payload.forEach((pin) => {
                newState[pin.id] = pin;
            });

            return newState;
        }
        // --------------GET USER PINS CASE----------------
        case GET_USER_PINS: {
            const newState = { ...state };
            // console.log("GET_USER_PINS action.payload:", action.payload);
            action.payload.forEach((pin) => {
                newState[pin.id] = pin;
            });

            return newState;
        }
        // --------------GET PIN DETAILS CASE----------------
        case GET_PIN_DETAILS: {
            // console.log("GET_PIN_DETAILS action.payload:", action.payload);
            const id = action.payload.id;
            return { ...state, [id]: action.payload };
        }
        // --------------ADD PIN CASE----------------
        case ADD_PIN: {
            return { ...state, [action.payload.id]: action.payload };
        }
        // --------------DELETE PIN CASE----------------
        case DELETE_PIN: {
            const newState = structuredClone(state);
            delete newState[action.pinId];
            return newState;
        }
        // --------------UPDATE PIN CASE----------------
        case UPDATE_PIN: {
            // structured clone to avoid mutating state. Creates deep copy of an object
            const newState = structuredClone(state);
            // newState[action.payload.id] = action.payload;
            newState[action.pinId] = action.payload;
            return newState;
        }
        case REMOVE_USER:
            return initialState;
        // --------------ERROR CASE----------------
        case ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
}
