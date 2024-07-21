// PinCard.jsx
import { Link } from 'react-router-dom';
// import * as pinActions from '../../store/pins';
import styles from './BoardCard.css';

export default function BoardCard({ board }) {


  if (!board) {
    return <div>Board Not Found!</div>;
  }
  // function DDotest(){
  //   if (board === null){
  //     return "Board is null"
  //   } else{
  //     console.log('Boards has boards!')
  //     // + Object.keys(board).length()
  //     return "Board exists" + 'keys are:'

  //   }
  // }
  return (
    <>
      <div>
          <h1>{board.description}</h1>
      </div>
    </>
  );
}
