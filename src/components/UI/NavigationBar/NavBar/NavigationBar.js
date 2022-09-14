import React, { useEffect, useState } from 'react';
import { NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import UserServise from '../../../../servise/funtionService/UserServise';
import LocalServise from '../../../../servise/httpServise/LocalServise';
import UserHttpServise from '../../../../servise/httpServise/UserHttpServise';
import { LOGIN_ROUTE } from '../../../../utils/const';
import SearchLable from "../../SearchForm/SearchLable";
import Switch from "../../Theme/switch";
import "./NavBarCss.css";


const NavigationBar = ({showBurger}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    const search = (seachMessege) => {
        console.log(seachMessege)
    };

    const [c, setC] = useState(false);

    useEffect(() => {
        if (LocalServise.getAccesToken() !== null)
            UserHttpServise.userRole().then((respons) => {
                let k = UserServise.setRRoleUser(respons);
                for (let i = 0; i < k.length; k++)
                    if (k[i].item === "Руководитель")
                        setC(true)
            }).catch((error) => {
                console.log(error)
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            })

    }, [c])

    const [username, setUsername] = useState('');
    async function loadUsername() {
        setUsername(LocalServise.getUserName());
    }
    useEffect(() => {
        loadUsername()
    })

    return (
                <Navbar key={'md'} expand={'md'} className="nav">
                    <Container fluid >
                        <GiHamburgerMenu className='hamburger' onClick={() => showBurger()}/>
                        
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-md`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                            placement="end"
                            show={show}
                            onHide={handleClose}
                            scroll={true}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            {c ?  <Offcanvas.Body className="justify-content-end"><NavItem onClick={() => showBurger()} className={"navbar-brand"}><span className='textNav'> {username} </span></NavItem></Offcanvas.Body>: (
                                <Offcanvas.Body className="justify-content-end">
                                    <Link to={LOGIN_ROUTE} className={"navbar-brand"} onClick={handleClose}> <span className='textNav'>Login</span></Link>
                                </Offcanvas.Body>
                            )}

                        </Navbar.Offcanvas>
                        <Switch />
                        <SearchLable backSearch={search} />
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} onClick={toggleShow} />
                    </Container>
                </Navbar>
    );
};

export default React.memo(NavigationBar);