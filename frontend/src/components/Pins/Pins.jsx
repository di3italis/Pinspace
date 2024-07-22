import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPinsThunk } from "../../store/pins";
import PinCard from "../PinCard";
import styles from "./Pins.module.css";

export default function Pins() {
    const dispatch = useDispatch();
    // should i use Object.values or just grab state.pins?
    const pins = useSelector((state) => Object.values(state.pins));
    // const pins = useSelector((state) => state.pins);
    console.log("Pins:", pins);

    useEffect(() => {
        dispatch(getPinsThunk());
    }, [dispatch]);

    if (!pins) {
        return <div>Pins Not Found!</div>;
    }

    // return (
    //     <div className={styles.pins}>
    //         <p>PINS PAGE</p>
    //     </div>
    // );

    return (
        <div className={styles.pins}>
            {pins.map((pin) => (
                <PinCard key={pin.id} pin={pin} addBoard={true}/>
            ))}
        </div>
    );
}
