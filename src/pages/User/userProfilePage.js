import React from 'react';
import { Container } from 'react-bootstrap';
import UserProfile from '../../components/Users/UserProfile';

const userProfilePage = () => {
    return (
        <Container>
            <UserProfile/>
        </Container>
    );
};

export default userProfilePage;