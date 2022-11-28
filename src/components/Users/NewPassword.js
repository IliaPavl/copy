import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../../components/UI/CSS/Auth.css';
import AuthServise from '../../servise/funtionService/AuthService'
import { toast } from 'react-toastify';

const NewPassword = () => {
    const [password,setPassword] =useState('');
    const [passwordRepit,setRepitPassword] =useState('');

    useEffect(()=> {
    },[])

    async function click(){
        let url = window.location.pathname.split('/');
        if(password===passwordRepit)
        toast.promise(
            AuthServise.newPassword(password,url[2]).then((respons) => {
                toast.success(respons.data.body.message);
            })
            .catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            }), {
            pending: "Please wait... ",
        })
        else toast.warning("Password and repit not =")
    }
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="p-5 loginForm">
                <h2 className="m-auto"> Новый пароль </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите новый пароль ..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Повторите пароль ..."
                        value={passwordRepit}
                        onChange={e => setRepitPassword(e.target.value)}
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