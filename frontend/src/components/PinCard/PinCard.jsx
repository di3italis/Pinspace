// PinCard.jsx
import { Link } from 'react-router-dom';
import * as pinActions from '../../store/pins';
import styles from './PinCard.module.css';

export default function PinCard({ pin }) {

    return (
        <div className={styles.card}>
            <Link to={`/pins/${pin.id}`}>
                <div className={styles.imageContainer}>
                    <img
                        src={pin.image}
                        alt={pin.title}
                        title={pin.title}
                        className={styles.image}
                    />
                </div>
                <h1>PinCard</h1>

            </Link>
        </div>
    );
}
