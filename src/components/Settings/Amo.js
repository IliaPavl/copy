import React from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

const Amo = () => {
    return (
        <Container>
            <Card className='mt-2 BlueBorder' >
                <Card.Header className='BlueBack CardHead'>
                    <h6>Интеграция Амо</h6>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col className="mb-2">
                            <InputGroup className="mt-2">
                                <InputGroup.Text className='settingForm' >
                                    Название
                                </InputGroup.Text>

                                <Form.Control
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => { }}

                                />

                            </InputGroup>
                            <InputGroup className='mt-2'>
                                <InputGroup.Text className='settingForm'>
                                    Комментарий
                                </InputGroup.Text>

                                <Form.Control as="textarea"
                                    aria-describedby="basic-addon1"
                                />

                            </InputGroup>
                        </Col>
                        <Col sm={3} className="mb-2 ">
                            <InputGroup>
                                <Button className="mt-2 settingForm">
                                    TEST
                                </Button>
                                <InputGroup.Text className=' mt-2 settingForm'>
                                    Результат теста
                                </InputGroup.Text>
                            </InputGroup>
                            <Form.Control as="textarea"
                                aria-describedby="basic-addon1"
                                className='mt-2'
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Amo;