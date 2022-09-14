import React, { useState } from 'react';
import NavigationBar from './NavBar/NavigationBar';
import SideBar from './SideBar/SideBar';

const Bars = () => {
    const [sideBurger,setSide]= useState(false)
    async function showBurger(){
        setSide(!sideBurger);
    }
    return (
        <>
        <NavigationBar showBurger={showBurger}/>
        <SideBar show={sideBurger} />
        </>
    );
};

export default Bars;