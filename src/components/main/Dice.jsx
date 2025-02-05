import React, {useContext, useLayoutEffect} from 'react';
import "@/styles/main/dice.scss"
import {ModalContext} from "@/context/ModalContext.jsx";
import {FaDiceFive, FaDiceFour, FaDiceOne, FaDiceThree, FaDiceTwo} from "react-icons/fa";
import {FaDiceSix} from "react-icons/fa6";

const Dice = ({setNumber}) => {
    const {modal, updateModal} = useContext(ModalContext);
    const [rotate, setRotate] = React.useState({
        TY:0,
        X:0,
        Y: 0,
        Z: 0,
    });

    const [transition, setTransition] = React.useState("")

    useLayoutEffect(() => {
        const randX = 360 * 3 + Math.floor(Math.random() * 4) * 90;
        const randY = 360 * 3 + Math.floor(Math.random() * 4) * 90;
        const randZ = 360 * 3 + Math.floor(Math.random() * 4) * 90;

        setTimeout(() => {
            setTransition('transform 2s ease-out');
            setRotate({
                TY: 0,
                X: randX,
                Y: randY,
                Z: randZ,
            });
        }, 0);

        setTimeout(() => {
            updateModal(<></>);
        }, 2500);

    }, []);


    return (
            <div className="dice" style={{transition:transition, transform: `translateY(-${rotate.TY}px) rotateX(${rotate.X}deg) rotateY(${rotate.Y}deg) rotateZ(${rotate.Z}deg)`}}>
                <div className="face face1">
                    <FaDiceOne />
                </div>
                <div className="face face2">
                    <FaDiceTwo />
                </div>
                <div className="face face3">
                    <FaDiceThree />
                </div>
                <div className="face face4">
                    <FaDiceFour />
                </div>
                <div className="face face5">
                    <FaDiceFive />
                </div>
                <div className="face face6">
                    <FaDiceSix />
                </div>
            </div>
    );
};

export default Dice;