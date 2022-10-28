import React, { useEffect, useState } from 'react';
import UserServise from '../../../servise/funtionService/UserServise';
import LocalServise from '../../../servise/httpServise/LocalServise';
import NavigationBar from './NavBar/NavigationBar';
import SideBar from './SideBar/SideBar';

const Bars = () => {
    const [sideBurger, setSide] = useState(true)
    async function showBurger() {
        setSide(!sideBurger);
    }

    const [isRoleAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [monitors, setMonitors] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (LocalServise.getUserName() !== "error")
        {
            if (monitors !== [])
                UserServise.bars().then((data) => {
                    if (data.isAdmin === null) {
                        setIsAdmin(false);
                        setMonitors([]);
                        setLinks([]);
                    } else {
                        setMonitors(data.monitorLevel);
                        setLinks(data.linkMonitors);
                        setIsAdmin(data.isAdmin);
                    }
                }).catch(() => {
                    setIsAdmin(false);
                    setMonitors([]);
                    setLinks([]);
                });
                setIsUser(true);
            }
    }, [isRoleAdmin,isUser])
    useEffect(() =>{},[isUser])

    return (
        <>
            <NavigationBar showBurger={showBurger} isUser={isUser} />
            <SideBar show={sideBurger} isRoleAdmin={isRoleAdmin} monitors={monitors} links={links} />
        </>
    );
};

export default Bars;