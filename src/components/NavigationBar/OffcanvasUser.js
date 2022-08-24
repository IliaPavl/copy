import React, { useState } from 'react';
import { Dropdown, NavLink } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import {USER_ADD, USER_LIST, LOGIN_ROUTE,COMPANY_ADD, COMPANY_LIST, REGISTRATION_ROUTE, USER_PROFILE, COMPANY_PROFILE} from "../../utils/const.js";

const OffcanvasUser = ({ close }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        close();
    };
    const toggleShow = () => setShow((s) => !s)


    return (
        <Nav className="flex-grow-1 pe-3 justify-content-end">
            <NavLink onClick={toggleShow} className={"nav-link"}> UserName</NavLink>
            <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={false}
                className="justify-content-end" placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>UserName</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Link to={USER_ADD} className={"nav-link"} onClick={handleClose}> Users add </Link>
                    <Link to={USER_LIST} className={"nav-link"} onClick={handleClose}> Users list </Link>
                    <Link to={COMPANY_ADD} className={"nav-link"} onClick={handleClose}> Company Add </Link>
                    <Link to={COMPANY_LIST} className={"nav-link"} onClick={handleClose}> Company List </Link>
                    <Link to={LOGIN_ROUTE} className={"nav-link"} onClick={handleClose}> Login </Link>
                    <Link to={REGISTRATION_ROUTE} className={"nav-link"} onClick={handleClose}> Registration </Link>
                    <Link to={USER_PROFILE} className={"nav-link"} onClick={handleClose}> User Profile </Link>
                    <Link to={COMPANY_PROFILE} className={"nav-link"} onClick={handleClose}> Company Profile </Link>
                    <Dropdown.Divider />
                    <Link to={"/"} className={"nav-link"} onClick={handleClose}> Выйти</Link>
                </Offcanvas.Body>
            </Offcanvas>
        </Nav>
    );
};

export default OffcanvasUser;