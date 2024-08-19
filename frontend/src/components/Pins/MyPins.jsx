// Pins.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPinsThunk, /*getUserPinsThunk*/ } from "../../store/pins";
import { useNavigate } from "react-router-dom";
import PinCard from "../PinCard";
import styles from "./Pins.module.css";

export default function Pins() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    // should i use Object.values or just grab state.pins?
    const pins = useSelector((state) => Object.values(state.pins));
    // const pins = useSelector((state) => state.pins);
    console.log("Pins:", pins);
    console.log("Session User:", sessionUser);

    useEffect(() => {
        // sessionUser ? dispatch(getUserPinsThunk()) : navigate("/");
        sessionUser ? dispatch(getPinsThunk()) : navigate("/");
    }, [dispatch, navigate, sessionUser]);

    if (!pins) {
        return <div>Pins Not Found!</div>;
    }

    const myPins = pins.filter((pin) => pin.owner.id === sessionUser?.id);
    // return (
    //     <div className={styles.pins}>
    //         <p>PINS PAGE</p>
    //     </div>
    // );
    
    console.log("My Pins:", myPins);
    console.log("")

    return (
        <div className={styles.pins}>
            {sessionUser
                ? myPins.map((pin) => (
                      <PinCard key={pin.id} pin={pin} addBoard={true} />
                  ))
                : pins.map((pin) => (
                      <PinCard key={pin.id} pin={pin} addBoard={false} />
                  ))}
        </div>
    );
}
