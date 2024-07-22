# PinSpace

## Overview

PinSpace is a dynamic social platform that allows users to pin, share, and comment on images. Designed to facilitate inspiration and creativity, PinSpace offers a seamless experience for users to curate and explore visual content.

## [Live Demo](https://pinspace.onrender.com) 

## Technologies Used

- **Frontend**: React, Redux, CSS Modules
- **Backend**: Flask, SQLAlchemy
- **Database**: PostgreSQL
- **Authentication**: Flask-Login, Flask_WTF.CSRF
- **Other**: Pipenv, Alembic, Git, React-Vite, Flask Blueprint

## Key Features

### 1. User Authentication

Users can sign up, log in, and log out securely. The authentication system is built using Flask-Login and ensures that user data is protected.`

### 2. Dynamic Content Creation Management

In a Fullstack app, we call data manipulation CRUD: Create, Read, Update, Delete.

Pinspace currently allows for full CRUD on Pins and Boards, with partial CRUD (Create/Delete) on BoardPins and Comments, with full CRUD on all features planned for future upgrades to the app. BoardPin categorizes the relationship between Boards and Pins, allowing the user to organize pins into whatever boards they create. Each pin can have multiple comments, showcasing a rich interaction model. Comments are dynamically updated and rendered without page refresh.

## Challenges and Solutions

### 1. Handling State Consistency Across Multiple Users

**Challenge**: When logging out and back in with a different user, boards from the previous user were still rendered.

**Solution**: Introduced a `CLEAR_BOARDS` action to reset the boards state upon logout, ensuring only the current user's boards are displayed, keeping data compartmentalized and secure. There is no data leakage for multiple users on the same device, and a User's boards and Pins are persistant between each unique session, meaning after loggin out and back in, the User's data is reloaded just as they left it.

```javascript
// actions/boards.js
export const clearBoards = () => {
    return {
        type: CLEAR_BOARDS,
    };
};

// reducers/boards.js
import { GET_BOARDS, ADD_BOARD, CLEAR_BOARDS } from '../actions/types';

const initialState = {};

export default function boardsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOARDS:
            return { ...action.payload };
        case ADD_BOARD:
            return { ...state, [action.payload.id]: action.payload };
        case CLEAR_BOARDS:
            return {};
        default:
            return state;
    }
}
```

### 2. Real-time Updates for Comments

**Challenge**: Ensuring comments are rendered in real-time without requiring a page refresh.

**Solution**: Implemented Redux for state management, allowing components to subscribe to state changes and re-render accordingly.

```javascript
// PinComments.jsx
useEffect(() => {
    dispatch(commentActions.getCommentsThunk(pinId));
}, [dispatch, pinId]);

const deleteComment = (commentId) => { 
    dispatch(commentActions.deleteCommentThunk(commentId));
}
```
