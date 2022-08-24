import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import DropDownOutSucses from '../DropDown/DropDownOutSucses';

const UserProfile = () => {
    let [status, setStatus] = useState([
        { item: 'Staus1' },
        { item: 'Staus2' },
        { item: 'Staus3' },
        { item: 'Staus4' }
    ])
    return (
        <Container>
            <Card className={"border-1 m-1"}>
                <Card.Header>
                    <div style={{ float: "left" }}>
                    Confirm user
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput1">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Login123" />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>User name</Form.Label>
                                <Form.Control type="text" placeholder="Surname Firstname Lastname " />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="12424235Le" />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput5">
                                <Form.Label>Repit password</Form.Label>
                                <Form.Control type="password" placeholder="12424235Le" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput6">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" placeholder="Company" disabled="true" />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput7">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" placeholder="Manager" disabled="true" />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput8">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" placeholder="activating" disabled="true" />
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
        </Container>
    );
};

export default UserProfile;