import React from 'react';
import { Container } from 'react-bootstrap';
import UserProfileEdit from '../../components/Users/UserProfileEdit';
import PageServise from '../../servise/funtionService/PageServise';

const userProfilePage = () => {
    PageServise.setLastPage()
    return (
        <Container>
            <UserProfileEdit/>
        </Container>
    );
};

export default userProfilePage;