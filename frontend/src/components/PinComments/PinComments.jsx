// PinComments.jsx
import * as commentActions from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './PinComments.module.css';

export default function PinComments({ pinId }) {
    const pin = useSelector((state) => state.pins[pinId]);
    // const comments = useSelector((state) => Object.values(state.pins[pinId].comments));
    const comments = useSelector((state) => Object.values(state.comments));
    // const comments = pin.comments;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(commentActions.getCommentsThunk(pinId));
    }, [dispatch, pinId]);

    if (!comments) {
        return <div>Be the first to comment!</div>;
    }

    return (
        <div> className={styles.container}{comments}</div>
    )

    // const pinCommentsArr = comments ? 

    // const sortedComments = comments.sort((a, b) => {
    //     return new Date(b.createdAt) - new Date(a.createdAt);
    // });

    // return (
    //     <div className={styles.container}>
    //         <div className={styles.header}>
    //             <h2>Comments</h2>
    //         </div>
    //         <div className={styles.comments}>
    //             {pinCommentsArr.map((comment) => (
    //                 <div key={comment.id} className={styles.comment}>
    //                     <h3>{comment.User.username}</h3>
    //                     <p>{comment.content}</p>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // )
}
