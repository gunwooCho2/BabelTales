import React, {useCallback, useContext, useEffect} from 'react';
import "@/styles/main/dice.scss"
import {FaDice} from "react-icons/fa";
import {ModalContext} from "@/context/ModalContext.jsx";
import Dice from "@/components/main/Dice.jsx";

const TRPGMenu = () => {
    const {modal, updateModal} = useContext(ModalContext);

    const diceClickHandler = () => {
        updateModal(
            <div className="scene">
                <Dice setNumber={diceFunction}></Dice>
                {/*<Dice setNumber={diceFunction}></Dice>*/}
            </div>
        )
    }

    const diceFunction = useCallback((number) => {
        console.log(number);
    }, [])
    
    return (
        <div className="icon" onClick={diceClickHandler}>
            <FaDice />
        </div>
    );
};

export default TRPGMenu;