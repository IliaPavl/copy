import React, { useEffect, useState } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import LocalServise from '../../../../servise/httpServise/LocalServise';
import { LOGIN_ROUTE } from '../../../../utils/const';
import Switch from "../../Theme/switch";
import "./NavBarCss.css";


const NavigationBar = ({ showBurger, isUser }) => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        setUsername(LocalServise.getUserName());
    }, [])

    return (
        <Navbar key={'md'} expand={'md'} className="nav">
            <Container fluid >
                <Nav className="me-auto">
                    <GiHamburgerMenu className='hamburger' onClick={() => showBurger()} />
                </Nav>
                <Nav >
                    {isUser ?

                        <NavItem onClick={() => showBurger()} className={"navbar-brand justify-content-end d-flex"}>
                            <span className='textNav'> {username} </span>
                        </NavItem>

                        :
                        <Link to={LOGIN_ROUTE} className={"navbar-brand justify-content-end d-flex"}>
                            <span className='textNav'>Login</span>
                        </Link>
                    }
                </Nav>
                <Switch />
            </Container>
        </Navbar>
    );
};

export default React.memo(NavigationBar);