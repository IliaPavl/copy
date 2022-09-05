import React, { useEffect, useState } from 'react';
import { Dropdown, NavLink } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import UserServise from '../../../servise/funtionService/UserServise.js';
import LocalServise from '../../../servise/httpServise/LocalServise.js';
import UserHttpServise from '../../../servise/httpServise/UserHttpServise.js';
import { COMPANY_ADD, COMPANY_LIST, INDICATOR_RESULT, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ADD, USER_LIST } from "../../../utils/const.js";

const OffcanvasUser = ({ close }) => {
    const [username, setUsername] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        close();
    };
    const toggleShow = () => setShow((s) => !s)

    async function loadUsername() {
        setUsername(LocalServise.getUserName());
    }

    async function Logout() {
        LocalServise.logoutUser();
        window.location.assign(LOGIN_ROUTE)
    }

    useEffect(() => {
        loadUsername()
    })

    const [c, setC] = useState(false);

    useEffect(() => {
        if (LocalServise.getAccesToken() !== null)
            UserHttpServise.userRole().then((respons) => {
                let k = UserServise.setRRoleUser(respons);
                for (let i = 0; i < k.length; k++)
                    if (k[i].item === "Руководитель")
                        setC(true)
            }).catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            })

    }, [])

    useEffect(() => {

    }, [c])

    return (
        <Nav className="flex-grow-1 pe-3 justify-content-end">
            <NavLink onClick={toggleShow} className={"nav-link"}> {username}</NavLink>
            <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={false}
                className="justify-content-end" placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                {c ? (
                    <Offcanvas.Body>
                        <Link to={LOGIN_ROUTE} className={"nav-link"} onClick={handleClose}> Login </Link>
                        <Link to={USER_ADD} className={"nav-link"} onClick={handleClose}> Users add </Link>
                        <Link to={USER_LIST} className={"nav-link"} onClick={handleClose}> Users list </Link>
                        <Link to={INDICATOR_RESULT} className={"nav-link"} onClick={handleClose}> Indicator result </Link>
                        <Link to={COMPANY_ADD} className={"nav-link"} onClick={handleClose}>(For tests) Company add</Link>
                        <Link to={COMPANY_LIST} className={"nav-link"} onClick={handleClose}>(For tests) Company List </Link>
                        <Link to={REGISTRATION_ROUTE} className={"nav-link"} onClick={handleClose}>(For tests) Registration admin </Link>
                        <OffcanvasUser close={handleClose} />
                        <Link to={LOGIN_ROUTE} className={"nav-link"} onClick={Logout}> Logout </Link>
                    </Offcanvas.Body>
                ) : (
                    <Offcanvas.Body>
                        <Link to={LOGIN_ROUTE} className={"nav-link"} onClick={handleClose}> Login </Link>
                        <OffcanvasUser close={handleClose} />
                        <Link to={LOGIN_ROUTE} className={"nav-link"} onClick={Logout}> Logout </Link>
                    </Offcanvas.Body>
                )}
            </Offcanvas>
        </Nav>
    );
};

export default React.memo(OffcanvasUser);