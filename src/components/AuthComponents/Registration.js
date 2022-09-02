import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../../components/UI/CSS/Auth.css';
import AuthHttpServise from '../../servise/httpServise/AuthHttpServise';
import { HOME_PAGE } from '../../utils/const';
import { toast } from 'react-toastify';
import UserHttpServise from '../../servise/httpServise/UserHttpServise';
import UserServise from '../../servise/funtionService/UserServise';
import DropDownCompany from '../UI/DropDown/DropDownOutSucses';


const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repit, setRepit] = useState('')
    const [login, setLogin] = useState('')
    const [company, setCompany] = useState([])
    let [companyE, setCompanyE] = useState()

    async function setAxiosClients() {
        UserHttpServise.getRegistratios().then((respons) => {
            setCompany(UserServise.setClientUser(respons))
        }).catch((error) => { toast.error(error) })
    }

    
    useEffect(() => {
        setAxiosClients()
    }, [])

    const click = async (event) => {
        event.preventDefault()
        if (password !== repit) {
            toast.warning("repeat the password correctly!")
        } else if (password === '') {
            toast.warning("password no empty!")
        } else {
            AuthHttpServise.createAdmin(login, email, password,companyE).then((respons) => {
                alert(respons.data.message)
                window.location.assign(HOME_PAGE)
            }).catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            })
        }
    }
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="p-5 loginForm">
                <h2 className="m-auto"> Регистрация администратора</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите логин ..."
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email ..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Придумайте пароль ..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Повторите Пароль ..."
                        value={repit}
                        onChange={e => setRepit(e.target.value)}
                        type="password"
                    />
                    <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput6">
                        <Form.Label></Form.Label>
                        <DropDownCompany values={company} setEnabledStatus={setCompanyE} enabledStatus={companyE} />
                    </Form.Group>
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Col className={"d-grid"} >
                            <Button
                                variant={"outline-success"}
                                onClick={event => click(event)}
                            >
                                Registration
                            </Button>
                        </Col>
                        <Col md={"auto"}>
                            <Link to={"/login"} className={"nav-link"}> У вас есть аккаунт? Авторизуйтесь! </Link>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default React.memo(Registration);