import React from 'react';
import Add2 from "../../components/Users/Add2";

import { Container } from "react-bootstrap";
import PageServise from '../../servise/funtionService/PageServise';

const AddUser = () => {
    PageServise.setLastPage()
    return (
        <Container>
            <Add2 />
        </Container>
    );
};

export default AddUser;