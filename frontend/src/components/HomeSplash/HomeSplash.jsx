// HomeSplash.jsx
import { useDispatch, useSelector } from "react-redux";
import styles from "./HomeSplash.module.css";
import Boards from "../Boards";
import Pins from "../Pins";

export default function HomeSplash() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
        <div className={styles.main}>
            <div className={styles.splash}>
                <h1 className={styles.title}>Welcome to Pinspiration</h1>
                <p className={styles.subtitle}>
                    The best place to find inspiration for your next project
                </p>
                {sessionUser &&
                 <>
                 <Boards />
                 <Pins />
                 </>
              }
            </div>
        </div>
    );
}
