// HomeSplash.jsx
import styles from "./HomeSplash.module.css";

export default function HomeSplash() {
    return (
        <div className={styles.main}>
            <div className={styles.splash}>
                <h1 className={styles.title}>Welcome to Pinspiration</h1>
                <p className={styles.subtitle}>
                    The best place to find inspiration for your next project
                </p>
            </div>
        </div>
    );
}
