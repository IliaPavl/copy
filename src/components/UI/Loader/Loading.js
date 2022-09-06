import React from 'react';
import { Row, Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <Row className="justify-content-center">
            <Spinner animation="grow" variant="primary" />
        </Row>
    );
};

export default Loading;
