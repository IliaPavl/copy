import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import DropdownMonth from '../UI/DropDown/DropdownMonth';

const RangeCart = ({ setRange }) => {
    let [monthStart, setMS] = useState('');
    let [monthEnd, setME] = useState('')
    let [yearStart, setYS] = useState('');
    let [yearEnd, setYE] = useState('')

    async function setStartMonth(value) {
        setMS(value)
    }

    async function setEndMonth(value) {
        setME(value)
    }
    async function click() {
        setRange(monthStart, yearStart, monthEnd, yearEnd);
    }



    return (
        <Card className={"border-1 m-1"}>
            <Card.Header>
                <h4><span>Переуд очета</span></h4>
            </Card.Header>
            <Card.Body>
                <Col>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Первый месяц</Form.Label>
                                <DropdownMonth setEnable={setStartMonth} />
                                <Form.Text className="text-muted">
                                    Нужно выбрать месяц с которого начнется отчет
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Год</Form.Label>
                                <Form.Control type="number" placeholder="Введите начальный год" onChange={(event) => setYS(event.target.value)} />
                                <Form.Text className="text-muted">
                                    Введите первый год отчета
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Последний месяц</Form.Label>
                                <DropdownMonth setEnable={setEndMonth} />
                                <Form.Text className="text-muted">
                                    Нужно выбрать месяц на котором закончится отчет
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Год</Form.Label>
                                <Form.Control type="number" placeholder="Введите конечный год" onChange={(event) => setYE(event.target.value)} />
                                <Form.Text className="text-muted">
                                    Введите последний год отчета
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Card.Body>
            <Card.Footer>
                <Button variant="success" onClick={() => click()}>Подтвердить</Button>
            </Card.Footer>
        </Card>
    );
};

export default React.memo(RangeCart);