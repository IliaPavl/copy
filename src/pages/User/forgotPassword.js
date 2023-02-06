import React from 'react';
import { Container } from 'react-bootstrap';
import ForgotPassword from '../../components/Users/ForgotPassword';
import PageServise from '../../servise/funtionService/PageServise';

const forgotPassword = () => {
    PageServise.setLastPage()
    return (
        <Container>
            <ForgotPassword/>
        </Container>
    );
};

export default forgotPassword;