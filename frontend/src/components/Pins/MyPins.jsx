// Pins.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { /*getPinsThunk,*/ getUserPinsThunk } from "../../store/pins";
import { useNavigate } from "react-router-dom";
import PinCard from "../PinCard";
import styles from "./Pins.module.css";

export default function Pins() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    // should i use Object.values or just grab state.pins?
    //const pins = useSelector((state) => Object.values(state.pins));
    // const pins = useSelector((state) => state.pins);
    let pins = useSelector((state) => state.pins);
    pins = Object.values(pins)
    // console.log("Pins:", pins);

    useEffect(() => {
        sessionUser ? dispatch(getUserPinsThunk()) : navigate("/");
    }, [dispatch, navigate, sessionUser]);

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
            <h1 className="redBox">My Pins</h1>
            <div className="redBox">
              {sessionUser
                ? pins.map((pin) => (
                      <PinCard className='redBox' key={pin.id} pin={pin} addBoard={false} />
                  ))
                : pins.map((pin) => (
                      <PinCard key={pin.id} pin={pin} addBoard={false} />
                  ))}
            </div>
        </div>
    );
}
