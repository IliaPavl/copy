import React, {useState} from 'react';
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import {Dropdown, NavLink} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

const OffcanvasUser = ({close}) => {
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
                    <Link to={"/bookAdd"} className={"nav-link"} onClick={handleClose}> Профиль </Link>
                    <Link to={"/bookList"} className={"nav-link"} onClick={handleClose}> Моя библиоткека</Link>
                    <Dropdown.Divider/>
                    <Link to={"/"} className={"nav-link"} onClick={handleClose}> Выйти</Link>
                </Offcanvas.Body>
            </Offcanvas>
        </Nav>
    );
};

export default OffcanvasUser;