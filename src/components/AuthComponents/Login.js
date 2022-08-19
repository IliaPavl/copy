import React, {useState} from 'react';
import {Container, Card, Form, Button, Row, Col} from 'react-bootstrap';
import {Link} from "react-router-dom";
import '../CSS/Auth.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        console.log("email:" + email)
        console.log("password:" + password)
        setEmail('')
        setPassword('')
    }
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="p-5 loginForm">
                <h2 className="m-auto"> Авторизация </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email ..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                                onClick={() => click()}
                            >
                                Login
                            </Button>
                        </Col>
                        <Col md={"auto"}>
                            <Link to={"/registration"} className={"nav-link"}> У вас нет аккаунта?
                                Зарегистрируйтесь! </Link>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;