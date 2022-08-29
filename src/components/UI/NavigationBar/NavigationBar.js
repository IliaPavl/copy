import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import { COMPANY_ADD, COMPANY_LIST, COMPANY_PROFILE, LOGIN_ROUTE, USER_ADD, USER_LIST, USER_PROFILE } from "../../../utils/const.js";
import SearchLable from "../SearchForm/SearchLable";
import Switch from "../Theme/switch";
import OffcanvasUser from "./OffcanvasUser";



const NavigationBar = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    const search = (seachMessege) => {
        console.log(seachMessege)
    };
    return (
        <>
            {['md'].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                    <Container fluid>
                        <Link to={"/"} className={"navbar-brand"}>Home page</Link>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            show={show}
                            onHide={handleClose}
                            scroll={true}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="flex-grow-1 pe-3 justify-content-start">
                                    <Link to={USER_ADD} className={"nav-link"} onClick={handleClose}> Users add </Link>
                                    <Link to={USER_LIST} className={"nav-link"} onClick={handleClose}> Users list </Link>
                                    <Link to={COMPANY_ADD} className={"nav-link"} onClick={handleClose}> Company Add </Link>
                                    <Link to={COMPANY_LIST} className={"nav-link"} onClick={handleClose}> Company List </Link>
                                    <Link to={LOGIN_ROUTE} className={"nav-link"} onClick={handleClose}> Auth </Link>
                                    <Link to={USER_PROFILE} className={"nav-link"} onClick={handleClose}> User Profile </Link>
                                    <Link to={COMPANY_PROFILE} className={"nav-link"} onClick={handleClose}> Company Profile </Link>
                                </Nav>
                                <OffcanvasUser close={handleClose} />
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        <Switch />
                        <SearchLable backSearch={search} />
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={toggleShow} />
                    </Container>
                </Navbar>
            ))}
        </>
    );
};

export default NavigationBar;