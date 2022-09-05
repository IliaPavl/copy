import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import UserServise from '../../../servise/funtionService/UserServise';
import LocalServise from '../../../servise/httpServise/LocalServise';
import UserHttpServise from '../../../servise/httpServise/UserHttpServise';
import { COMPANY_ADD, COMPANY_LIST, INDICATOR_RESULT, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ADD, USER_LIST } from '../../../utils/const';
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
    async function Logout() {
        LocalServise.logoutUser();
        window.location.assign(LOGIN_ROUTE)
    }

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

export default React.memo(NavigationBar);