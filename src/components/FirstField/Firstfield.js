import React, {useEffect, useState} from 'react';
import { Cell } from "../Cell/Cell";
import style from './Firstfield.module.css';

export const Field = ({fieldNumber, cellsAmount, getFieldsChecked}) => {
    const cells = [];
    const checkedCellsAmountAprooved = fieldNumber === 1 ? 8 : 1 ;
    const [checkedCells, setCheckedCells] = useState([]);

    const isCanBeChecked = checkedCells.length < checkedCellsAmountAprooved;

    for (let i = 1; i <= cellsAmount ; i++) {
        cells.push(i);
    }

    const onCellChecked = (number) => {
        if (isCanBeChecked) {
            return setCheckedCells([...checkedCells, number]);
        }
    };

    useEffect(() => {
        if (!isCanBeChecked) {
            getFieldsChecked(fieldNumber, checkedCells);
        }
    }, [isCanBeChecked])

    return (
        <div className={style.fieldWrapper}>
            <div className={style.header}>
                <p>Поле {fieldNumber} </p>
                <p> Отметьте { fieldNumber === 1 ? '8' : '1' } чисел. </p>
            </div>
            <div className={style.cellWrapper}>
                {cells.map((number) => {
                    return <Cell key={`field-${fieldNumber}-${number}`} number={number} onCellChecked={onCellChecked} isCanBeChecked={isCanBeChecked} />
                })}
            </div>
        </div>
    );
};