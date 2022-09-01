import React, { useEffect, useState } from 'react';
import { Dropdown, NavLink } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import LocalServise from '../../../servise/httpServise/LocalServise.js';
import { COMPANY_ADD, COMPANY_LIST, INDICATOR_RESULT, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ADD, USER_LIST } from "../../../utils/const.js";

const OffcanvasUser = ({ close }) => {
    const [username,setUsername] =useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        close();
    };
    const toggleShow = () => setShow((s) => !s)

    async function Logout() {
        LocalServise.logoutUser();
    }
    async function loadUsername(){
        setUsername(LocalServise.getUserName());
    }

    useEffect(()=>{
        loadUsername()
    })


    return (
        <Nav className="flex-grow-1 pe-3 justify-content-end">
            <NavLink onClick={toggleShow} className={"nav-link"}> {username}</NavLink>
            <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={false}
                className="justify-content-end" placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Link to={USER_ADD} className={"nav-link"} onClick={handleClose}> Users add </Link>
                    <Link to={USER_LIST} className={"nav-link"} onClick={handleClose}> Users list </Link>
                    <Link to={LOGIN_ROUTE} className={"nav-link"} onClick={handleClose}> Login </Link>
                    <Link to={COMPANY_ADD} className={"nav-link"} onClick={handleClose}>(For tests) Company add</Link>
                    <Link to={COMPANY_LIST} className={"nav-link"} onClick={handleClose}>(For tests) Company List </Link>
                    <Link to={REGISTRATION_ROUTE} className={"nav-link"} onClick={handleClose}>(For tests) Registration admin </Link>
                    <Link to={INDICATOR_RESULT} className={"nav-link"} onClick={handleClose}> Indicator result </Link>
                    <Dropdown.Divider />
                    <Link to={LOGIN_ROUTE} className={"nav-link"} onClick={Logout}> Logout </Link>
                </Offcanvas.Body>
            </Offcanvas>
        </Nav>
    );
};

export default OffcanvasUser;