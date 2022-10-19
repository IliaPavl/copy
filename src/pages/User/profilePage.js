import React from 'react';
import { Container } from 'react-bootstrap';
import ProfileUser from '../../components/Users/ProfileUser';
import PageServise from '../../servise/funtionService/PageServise';

const profilePage = () => {
    PageServise.setLastPage()
    return (
            <Container>
                <ProfileUser/>
            </Container>
    );
};

export default profilePage;