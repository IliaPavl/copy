import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";
import UserServise from '../../servise/funtionService/UserServise';
import UserHttpServise from '../../servise/httpServise/UserHttpServise';
import DropDownOutSucses from '../UI/DropDown/DropDownOutSucses';
import {  toast } from 'react-toastify';


const Add2 = () => {
    let [status, setStatus] = useState([])
    let [clients, setClients] = useState('')
    let [renj, setReng] = useState()
    let [clientsE, setClientsE] = useState('')

    async function getValueReng() {
        let value = document.getElementById("r1");
        setReng(value.value)
    }

    async function setAxiosClients() {
        UserHttpServise.getClientUser().then((respons) => {
            setStatus(UserServise.setClientUser(respons))
            setClientsE(UserServise.setClientUser(respons)[0].item)
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

    async function createUsers(event) {
        event.preventDefault()
        UserHttpServise.createUsers(clients, renj).then((respons) => {
            toast.success(respons.data)
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

    useEffect(() => {
        setAxiosClients()
        getValueReng()
    }, [clients]);

    return (
        <Card className={"border-1 m-1"}>
            <Card.Header>
                <div style={{ float: "left" }}>
                    Create users for company
                </div>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={event => createUsers(event)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company</Form.Label>
                        <Form.Group>
                            <Row sm={3}>
                                <Col>
                                    <DropDownOutSucses values={status} setEnabledStatus={setClientsE} enabledStatus={clientsE} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Text className="text-muted">
                            Seelect the company for create users
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>How create users</Form.Label>
                        <Form.Range onChange={() => getValueReng()} id="r1" />
                        <Pagination>
                            <Pagination.Item key={renj} >
                                {renj}
                            </Pagination.Item>
                        </Pagination>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default React.memo(Add2);