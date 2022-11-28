import React, { useState,useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../../components/UI/CSS/Auth.css';
import AuthServise from '../../servise/funtionService/AuthService'
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    useEffect(()=>{},[])
    async function click() {
        toast.promise(
            AuthServise.forgotPassword(email).then((respons) => {
                toast.success(respons.data.body.message);
            })
            .catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            }), {
            pending: "Please wait... ",
        })
    }
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="p-5 loginForm">
                <h2 className="m-auto"> Забыли пароль? </h2>
                <Card.Body>


                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите почтовый адрес ..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                        />
                        <Form.Text muted>
                            Введи почтовый адрес на который зарестрирован ваш аккант для получения ссылки смены пароля
                        </Form.Text>
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            <Col className={"d-grid"}>
                                <Button
                                    variant={"outline-success"}
                                    onClick={() => click()}
                                >
                                    Отправить
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ForgotPassword;