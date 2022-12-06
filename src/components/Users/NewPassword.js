import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../../components/UI/CSS/Auth.css';
import AuthServise from '../../servise/funtionService/AuthService'
import { toast } from 'react-toastify';
import InputPatternService from '../../servise/funtionService/InputPatternService';

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordRepit, setRepitPassword] = useState('');

    useEffect(() => {
        isPass('')
    }, [])

    async function click() {
        let url = window.location.pathname.split('/');
        if(errorPass==='')
        if (password === passwordRepit)
            toast.promise(
                AuthServise.newPassword(password, url[2]).then((respons) => {
                    toast.success("Проверьте вашу почту, пароль был успешно изменён! ");
                })
                    .catch((error) => {
                        let message = error.request.responseText.split('"');
                        toast.error(message[3]);
                    }), {
                pending: "Please wait... ",
            })
        else toast.warning("Пароли должны совпадать")
        else toast.warning("Проверьте введённые двнные")
    }

    let [errorPass, setErrorPass] = useState('');

    function isPass(value) {
        setErrorPass(InputPatternService.passwordInput(value));
        setPassword(value);
    }
    function isRepit(value) {
        setRepitPassword(value);
    }
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="p-5 loginForm">
                <h2 className="m-auto"> Новый пароль </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите новый пароль ..."
                        defaultValue={password} onChange={e => isPass(e.target.value)}
                        type="password"
                    />
                    {errorPass === '' ? <></> : <Form.Text muted>
                        <span className='textError'>{errorPass}</span>
                    </Form.Text>}
                    <Form.Control
                        className="mt-3"
                        placeholder="Повторите пароль ..."
                        defaultValue={passwordRepit} onChange={e => isRepit(e.target.value)}
                        type="password"
                    />
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
            </Card>
        </Container>
    );
};

export default React.memo(NewPassword);