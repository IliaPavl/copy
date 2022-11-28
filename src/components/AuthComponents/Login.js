import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../components/UI/CSS/Auth.css';
import PageServise from '../../servise/funtionService/PageServise';
import AuthHttpServise from '../../servise/httpServise/AuthHttpServise';
import LocalServise from '../../servise/httpServise/LocalServise';
import { FORGOT_PASSWPRD } from '../../utils/const';
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const click = async (e) => {
        e.preventDefault()
        getResponse(username, password);
        setUsername('')
        setPassword('')
    }

    const getResponse = (username, password) => {
        toast.promise(
            AuthHttpServise.logining(username, password).then((respons) => {
                console.log(respons)
                LocalServise.saveTokens(respons)
                LocalServise.saveUserName(username)
                PageServise.redirectLastPage();

            }).catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            }), {
            pending: "Please wait... ",
        })

    }

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="p-5 loginForm">
                <h2 className="m-auto"> Авторизация </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите логин ..."
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль ..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Col className={"d-grid"}>
                            <Button
                                variant={"outline-success"}
                                onClick={event => click(event)}
                            >
                                Логин
                            </Button>
                        </Col>

                    </Row>
                    <Row >
                        <Col md={"auto"} className={'mt-2'}>
                            <Link to={FORGOT_PASSWPRD}>Забыли пароль ?</Link>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default React.memo(Login);