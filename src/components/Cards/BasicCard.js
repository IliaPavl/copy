import React from 'react';
import { Card } from 'react-bootstrap';

const BasicCard = ({ props }) => {
    return (
        <Card className={"border-1 m-1"}>
            <Card.Header>
                <div style={{ float: "left" }}>
                    {props.head}
                </div>
            </Card.Header>
            <Card.Body>
                {props.children}
            </Card.Body>
        </Card>
    );
};

export default BasicCard;