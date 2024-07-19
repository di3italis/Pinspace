// PinComments.jsx
import * as commentActions from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './PinDetail.module.css';

export default function PinComments({ pinId }) {
    const pin = useSelector((state) => state.pins[pinId]);
    // const comments = useSelector((state) => Object.values(state.pins[pinId].comments));
    const comments = pin.comments;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(commentActions.getCommentsThunk(pinId));
    }, [dispatch, pinId]);

    if (!comments) {
        return <div>Be the first to comment!</div>;
    }

    const pinCommentsArr = comments ? 

    // const sortedComments = comments.sort((a, b) => {
    //     return new Date(b.createdAt) - new Date(a.createdAt);
    // });
}
