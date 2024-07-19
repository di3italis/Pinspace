import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPinDetailsThunk } from "../../store/pins";
import styles from "./PinDetail.module.css";

export default function PinDetail() {
    const { pinId: pinIdStr } = useParams();
    const pinId = parseInt(pinIdStr, 10);
    const dispatch = useDispatch();
    // const pins = useSelector((state) => Object.values(state.pins));
    // const pins = useSelector((state) => state.pins);
    // console.log("PinDetail pins", pins);
    const pin = useSelector((state) => state.pins[pinId]);

    useEffect(() => {
        dispatch(getPinDetailsThunk(pinId));
        console.log(`PinDetail pin ${pinId}`, pin);
    }, [dispatch, pinId]);


    if (!pin) {
        return <div>Pin Not Found!</div>;
    }

    return (
        <div className={styles.main}>
            <h1>{pin.title}</h1>
            <img src={pin.image}/>
            <div className={styles.comments}>
                 
            </div>
        </div>
    )
}
