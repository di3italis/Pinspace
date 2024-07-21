// PinComments.jsx
import * as commentActions from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PinComments.module.css';

export default function PinComments({ pinId }) {
    const { pinId: pinIdStr } = useParams();
    const pin = useSelector((state) => state.pins[pinId]);
    // const comments = useSelector((state) => Object.values(state.pins[pinId].comments));
    const comments = useSelector((state) => Object.values(state.comments));
    // const comments = pin.comments;
    const dispatch = useDispatch();

    console.log("PinComments pinId:", pinId);

    useEffect(() => {
        dispatch(commentActions.getCommentsThunk(pinId));
    }, [dispatch, pinId]);

    const deleteComment = (commentId) => { 
        dispatch(commentActions.deleteCommentThunk(commentId));
    }


    console.log("comments:", comments)

    if (!comments || comments.length === 0) {
        return <div>Be the first to comment!</div>;
    }

    // return (
    //     <div> className={styles.container}{comments}</div>
    // )

    const pinCommentsArr = comments.filter((comment) => comment.pinId === pinId); 
    console.log("pinCommentsArr[0]:", pinCommentsArr[0]);

    // const sortedComments = comments.sort((a, b) => {
    //     return new Date(b.createdAt) - new Date(a.createdAt);
    // });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Comments</h2>
            </div>
            <div className={styles.comments}>
                {pinCommentsArr.map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                        <p>{comment.comment}</p>
                        <button onClick={() => deleteComment(comment.id)}>Delete Comment</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
