import React from 'react';
import { Container } from 'react-bootstrap';
import UserProfile from '../../components/Users/UserProfile';
import PageServise from '../../servise/funtionService/PageServise';

const userProfilePage = () => {
    PageServise.setLastPage()
    return (
        <Container>
            <UserProfile/>
        </Container>
    );
};

export default userProfilePage;