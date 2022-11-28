import React, { useEffect, useState } from 'react';
import LocalServise from '../../../servise/httpServise/LocalServise';
import UserHttpServise from '../../../servise/httpServise/UserHttpServise';
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
        if (LocalServise.getUserName() !== "error") {
            UserHttpServise.isAdmin().then(response => {
                setIsAdmin(response.data.body);
                setIsUser(true);
            })
        }
    }, [])
    useEffect(() => { }, [isUser])

    return (
        <>
            <NavigationBar showBurger={showBurger} isUser={isUser} />
            <SideBar showBurger={showBurger} show={sideBurger} monitors={monitors} links={links} isRoleAdmin={isRoleAdmin} isUser={isUser} />
        </>
    );
};

export default Bars;