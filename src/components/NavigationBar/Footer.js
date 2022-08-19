import React from 'react';
import {Col, Container, Navbar} from "react-bootstrap";

const Footer = () => {
    let year = new Date().getFullYear();
    return (
        <Navbar fixed={"bottom"} bg="light">
            <Container>
                <Col className={"text-center"}>
                    <div>
                        Created by ILIA in - {year}
                    </div>
                </Col>
            </Container>
        </Navbar>
    );
};

export default Footer;