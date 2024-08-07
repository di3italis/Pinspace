// Pins.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPinsThunk } from "../../store/pins";
import PinCard from "../PinCard";
import styles from "./Pins.module.css";

export default function Pins() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    // should i use Object.values or just grab state.pins?
    //const pins = useSelector((state) => Object.values(state.pins));
    let pins = useSelector((state) => state.pins);
    pins = Object.values(pins)

    //console.log("Pins:", pins);

    useEffect(() => {
        dispatch(getPinsThunk());
    }, [dispatch]);

    // if (!pins) {
    //     return <div key ='none'>Pins Not Found!</div>;
    // }

    // return (
    //     <div className={styles.pins}>
    //         <p>PINS PAGE</p>
    //     </div>
    // );

    //console.log("Pins:", pins)

    if (pins.length == 0)
      return <h1>no pins</h1>

    const getPinCards = () => {
      // return <PinCard key={pins[1].id} key2={pins[1].id} pin={pins[1]} addBoard={true} />
      // return (
      //   <>
      //   {/* <PinCard key={pin.id} key2={pin.id} pin={pin} addBoard={true} /> */}
      //   </>
      // )

      return pins.map((pin) => {
        return (
          <PinCard key={pin.id} pin={pin} addBoard={true} />
        )
      })
    }

    return (
        <div className={styles.pins}>
          {getPinCards()}
        </div>
    );
}
// pins.map((pin) => (
//   <>
//   {pin.id}
//   <PinCard key={pin.idk} pin={pin} addBoard={true} />
//   </>
// {

//   pins.map((pin) => (
//     <>
//     {pin.id}
//     <PinCard key={pin.idk} pin={pin} addBoard={true} />
//     </>
// ))}
