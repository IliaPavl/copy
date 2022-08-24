import React from 'react';
import { Alert } from 'react-bootstrap';

const StandartAlert = ({message}) => {
    return (
        <Alert key="danger" variant="danger">
          Uuups.<br/> Problems: {message} 
        </Alert>
    );
};

export default StandartAlert;