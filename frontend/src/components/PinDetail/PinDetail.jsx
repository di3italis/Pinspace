// PinDetail.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import * as pinActions from "../../store/pins";
import PinComments from "../PinComments";
// import UpdatePin from "../UpdatePin";
import styles from "./PinDetail.module.css";

export default function PinDetail() {
    const { pinId: pinIdStr } = useParams();
    const pinId = parseInt(pinIdStr, 10);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const pins = useSelector((state) => Object.values(state.pins));
    // const pins = useSelector((state) => state.pins);
    // console.log("PinDetail pins", pins);
    const pin = useSelector((state) => state.pins[pinId]);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(pinActions.getPinDetailsThunk(pinId));
        // console.log(`PinDetail pin ${pinId}`, pin);
    }, [dispatch, pinId]);

    const deletePin = () => {
        dispatch(pinActions.deletePinThunk(pin.id));
        navigate(`/pins`);
    };

    const updatePin = () => {
        navigate(`/pins/edit/${pinId}`);
    };

    if (!pin) {
        return <div>Pin (Details) Not Found!</div>;
    }

    const isOwner = () =>{
      return pin.ownerId === user.id
    }
    return (
        <div className={styles.main}>
            <h1>{pin.title}</h1>
            <img src={pin.image} />
            <div className={styles.comments}>
                <PinComments key={pinId} pinId={pinId} />
            </div>
            { isOwner() && <>
              <button onClick={deletePin}>Delete Pin</button>
              <button onClick={updatePin}>Update Pin</button>
            </>}
        </div>
    );
}
