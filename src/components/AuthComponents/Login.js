import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../components/UI/CSS/Auth.css';
import InputPatternService from '../../servise/funtionService/InputPatternService';
import PageServise from '../../servise/funtionService/PageServise';
import AuthHttpServise from '../../servise/httpServise/AuthHttpServise';
import LocalServise from '../../servise/httpServise/LocalServise';
import { FORGOT_PASSWPRD } from '../../utils/const';
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const click = async (e) => {
        if (errorlogin === '' && errorPass === '') {
            e.preventDefault()
            getResponse(username, password);
            setUsername('')
            setPassword('')
        } else { toast.warning("Проверьте введённые вами данные") }
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

    let [errorlogin, setErrorlogin] = useState('');
    let [errorPass, setErrorPass] = useState('');

    function isPass(value) {
        setErrorPass(InputPatternService.passwordInput(value));
        setPassword(value);
    }

    function isLogin(value) {
        setErrorlogin(InputPatternService.loginInput(value));
        setUsername(value);
    }

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="p-5 loginForm">
                <h2 className="m-auto"> Авторизация </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите логин ..."
                        onChange={e => isLogin(e.target.value)}
                    />
                    {errorlogin === '' ? <></> : <Form.Text muted>
                        <span className='textError'>{errorlogin}</span>
                    </Form.Text>}
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль ..."
                        onChange={e => isPass(e.target.value)}
                        type="password"
                    />
                    {errorPass === '' ? <></> : <Form.Text muted>
                        <span className='textError'>{errorPass}</span>
                    </Form.Text>}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Col className={"d-grid"}>
                            <Button
                                variant={"outline-success"}
                                onClick={event => click(event)}
                            >Логин
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