import React, { useEffect, useState } from 'react';
import UserServise from '../../../servise/funtionService/UserServise';
import LocalServise from '../../../servise/httpServise/LocalServise';
import NavigationBar from './NavBar/NavigationBar';
import SideBar from './SideBar/SideBar';

const Bars = () => {
    const [sideBurger, setSide] = useState(false)
    async function showBurger() {
        setSide(!sideBurger);
    }

    const [isRoleAdmin, setIsAdmin] = useState(false);
    const [resultName, setResulName] = useState([]);


    useEffect(() => {
        if(LocalServise.getUserName()!== "error")
        if (resultName !== [])
            UserServise.bars().then((data) => {
                if (data.isAdmin === null) {
                    setIsAdmin(false);
                    setResulName([]);
                } else{
                setIsAdmin(data.isAdmin);
                setResulName(data.names);
            }
            }).catch(() => {
                setIsAdmin(false);
                setResulName([]);
            });
    }, [isRoleAdmin])

    return (
        <>
            <NavigationBar showBurger={showBurger} isRoleAdmin={isRoleAdmin} />
            <SideBar show={sideBurger} isRoleAdmin={isRoleAdmin} resultName={resultName} />
        </>
    );
};

export default Bars;