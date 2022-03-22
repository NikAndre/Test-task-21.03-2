import React, {useState} from 'react';
import style from './App.module.css';
import { Field } from "./components/FirstField/Firstfield";
import { sendResultApi } from "./api/sendResult";

function App() {
    const [firstFieldChecked, setFirstFieldChecked] = useState([]);
    const [secondFieldChecked, setSecondFieldChecked] = useState([]);

    const getFieldsChecked = (field, cellsArray) => {
        switch (field) {
            case 1 :
                return  setFirstFieldChecked(cellsArray);
            case 2 :
                return  setSecondFieldChecked(cellsArray);
            default:
                return  null;
        }
    };

    const readyToRoll = (firstFieldChecked.length === 8 && secondFieldChecked.length === 1);

    const onSubmitClick = () => {
        if (readyToRoll) {
            const firstFieldResult = getMatch(firstFieldChecked, 19);
            const secondFieldResult = getMatch(secondFieldChecked, 2);

            if(
                firstFieldResult.length >= 4 ||
                (firstFieldResult.length === 3 && secondFieldResult.length > 0)
            ) {
                sendResultApi(firstFieldChecked, secondFieldChecked, true,1)
                return alert('Ты победил!');
            }
            sendResultApi(firstFieldChecked, secondFieldChecked, false,1)
            alert('Попробуй в другой раз!');
        }
    };

    return (
        <div className={style.App}>
            <div className={style.ticketBlock}>
                <p>Билет №1</p>
                <Field key={1} fieldNumber={1} cellsAmount={19} getFieldsChecked={getFieldsChecked}/>
                <Field key={2} fieldNumber={2} cellsAmount={2} getFieldsChecked={getFieldsChecked}/>
                <button
                    className={style.submitButton}
                    onClick={onSubmitClick}
                >
                    Показать результат
                </button>
            </div>
        </div>
    );
}

export default App;


const getMatch = (userArray, cells) => {
    const firstFieldNumbers = [...userArray].map((elem) => {
        return Math.ceil(Math.random()*cells);
    });
    const resultArr = [];
    const map = new Map();

    for (let i = 0; i< userArray.length; i++) {
        map.set(userArray[i],1);
    }
    for (let i = 0; i< firstFieldNumbers.length; i++) {
        if (map.has(firstFieldNumbers[i])) {
            resultArr.push(firstFieldNumbers[i]);
        }
    }
    return [...new Set(resultArr)]
};