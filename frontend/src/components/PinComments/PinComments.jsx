// PinComments.jsx
import * as commentActions from "../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import styles from "./PinComments.module.css";

export default function PinComments({ pinId }) {
    // const { pinId: pinIdStr } = useParams();
    const [comment, setComment] = useState("");
    // const pin = useSelector((state) => state.pins[pinId]);
    const comments = useSelector((state) => Object.values(state.comments));
    const dispatch = useDispatch();

    console.log("PinComments pinId:", pinId);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(commentActions.addCommentThunk(comment, pinId));
        setComment("");
    };

    useEffect(() => {
        dispatch(commentActions.getCommentsThunk(pinId));
    }, [dispatch, pinId]);

    const deleteComment = (commentId) => {
        dispatch(commentActions.deleteCommentThunk(commentId));
    };

    console.log("comments:", comments);

    const pinCommentsArr = comments.filter(
        (comment) => comment.pinId === pinId
    );
    console.log("pinCommentsArr[0]:", pinCommentsArr[0]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Comments</h2>
            </div>
            <div className={styles.comments}>
                {pinCommentsArr.map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                        <p>{comment.comment}</p>
                        <button onClick={() => deleteComment(comment.id)}>
                            Delete Comment
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.newComment}>
                <textarea
                    value={comment}
                    onChange={handleChange}
                    placeholder="Share your thoughts!"
                />
                <button onClick={handleSubmit}>Post Comment</button>
            </div>
        </div>
    );
}
