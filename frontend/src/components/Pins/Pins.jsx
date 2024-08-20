// Pins.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPinsThunk } from "../../store/pins";
import PinCard from "../PinCard";
import styles from "./Pins.module.css";

export default function Pins() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    // const sessionUser = useSelector((state) => state.session.user);
    // should i use Object.values or just grab state.pins?
    const pins = useSelector((state) => {
        console.log("Current state.pins:", state.pins);
        return Object.values(state.pins) || [];
    });
    // const pins = useSelector((state) => state.pins);
    // console.log("Pins:", pins);

    useEffect(() => {
        const loadPins = async () => {
            await dispatch(getPinsThunk());
            console.log("Data fetched, Redux state updated"); // Debugging log
            setLoading(false);
        }
        loadPins();
    }, [dispatch]);

    if (loading) {
        console.log("Loading...");
        return <div>Loading...</div>;
    }

    if (!pins.length) {
        console.log("Pins Not Found!");
        return <div>Pins Not Found!</div>;
    }



    return (
        <div className={styles.pins}>
            {pins && pins.map((pin) => (
                <PinCard key={pin.id} pin={pin} addBoard={true} />
            ))}
        </div>
    );
}
