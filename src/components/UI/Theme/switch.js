import React from 'react';
import { IoMoonOutline, IoMoonSharp } from "react-icons/io5";
import '../CSS/swithTheme.css';

const Switch = () => {

    async function f() {

    }

    return (

        <div className={'example2'}>
            <IoMoonSharp className={'icon moon1'} onClick={f}>fg</IoMoonSharp>
            <IoMoonOutline className={'icon moon2'} onClick={f}>gkk</IoMoonOutline>

        </div>
    );
};

export default Switch;