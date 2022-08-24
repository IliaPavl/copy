import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DropDownOutSucses from '../DropDown/DropDownOutSucses';

const RegCompany = () => {
    let [status, setStatus] = useState([
        { item: 'Staus1' },
        { item: 'Staus2' },
        { item: 'Staus3' },
        { item: 'Staus4' }
    ])
    return (
        <Card className={"border-1 m-1"}>
            <Card.Header>
                <div style={{ float: "left" }}>
                    Add from company
                </div>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput1">
                            <Form.Label>Name company</Form.Label>
                            <Form.Control type="text" placeholder="OOO company" />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name client</Form.Label>
                            <Form.Control type="text" placeholder="Surname Firstname Lastname " />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="+3752912345678" />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                        <Form.Label>Status client</Form.Label>
                            <DropDownOutSucses values={status} />
                        </Form.Group>
                    </Row>
                    <Form.Group as={Row} xs={3} className="mb-3 d-flex justify-content-center">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default RegCompany;