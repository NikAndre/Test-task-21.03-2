import React, { useState } from 'react';
import style from './Cell.module.css';

export const Cell = ({number, onCellChecked, isCanBeChecked}) => {
    const [checked, setChecked] = useState(false);
    const className = checked ? style.cellButtonActive : style.cellButton;

    const onCellClick = () => {
        if (isCanBeChecked) {
            setChecked(true);
            onCellChecked(number);
        }
    };

    return (
        <button className={className} onClick={onCellClick}>
            {number}
        </button>
    );
};