// session.js
import { getCookie } from "./utils";
import { clearBoards } from "./boards";

const SET_USER = "session/setUser";
export const REMOVE_USER = "session/removeUser";

const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

const removeUser = () => ({
    type: REMOVE_USER,
});

export const thunkAuthenticate = () => async (dispatch) => {
    // console.log("GODDAMNIT!!!")
    // console.log("Thunk Authenticate!!!")
    const response = await fetch("/api/auth", {
        headers: {
            "X-CSRFToken": getCookie("csrf_token"),
        },
    });
    // console.log("thunkAuth res:", response)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            // console.log("thunkAuthenticate data.errors:", data.errors)
            return;
        }

        dispatch(setUser(data));
    } else {
        return;
    }
};

export const thunkLogin = (payload) => async (dispatch) => {
    // console.log("credential:", credential)
    // console.log("password:", password)
    // const reqObj = { credential, password };
    // const reqArr = [ credential, password ];
    // console.log("reqObj:", reqObj);
    // console.log("reqArr:", reqArr);

    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrf_token"),
        },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const data = await response.json();
        // console.log("Login successful:", data);  // Add detailed logging
        dispatch(setUser(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        // console.log("Login error:", errorMessages);  // Add detailed logging
        return errorMessages;
    } else {
        // console.log("Server error");
        // console.log("response:", response);
        return { server: "Something went wrong. Please try again" };
    }
};

export const thunkSignup = (payload) => async (dispatch) => {
    // console.log("payload:", payload)
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrf_token"),
        },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages;
    } else {
        return { server: "Something went wrong. Please try again" };
    }
};

export const thunkLogout = () => async (dispatch) => {
    await fetch("/api/auth/logout", {
        headers: {
            "X-CSRFToken": getCookie("csrf_token"),
        },
    });
    dispatch(clearBoards());
    dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            // return { ...state, user: null };
            return initialState;
        default:
            return state;
    }
}

export default sessionReducer;
