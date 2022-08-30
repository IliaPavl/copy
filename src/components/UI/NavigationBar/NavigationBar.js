import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
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