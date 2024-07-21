// PinCard.jsx
import { Link } from 'react-router-dom';
// import * as pinActions from '../../store/pins';
import styles from './BoardCard.css';

export default function BoardCard({ board }) {


  if (!board) {
    return <div>Board Not Found!</div>;
  }
  function DDotest(){

    console.log('sdsdsdsd' + board)
    return board
  }
  return (
        <div>

            <h1>No {DDotest()} BoardCard</h1>
        </div>
  );
}
