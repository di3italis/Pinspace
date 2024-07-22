import { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { addPinThunk } from '../../store/pins';
import styles from './CreatePin.module.css';

export default function CreatePin() {
    const boards = useSelector((state) => Object.values(state.boards));
    return (
        <div>
            <h1>CreatePin</h1>
        </div>
    );
}
