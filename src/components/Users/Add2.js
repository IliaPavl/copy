import React, { useEffect, useState } from 'react';

import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";
import { toast } from 'react-toastify';
import UserServise from '../../servise/funtionService/UserServise';
import DropDownOutSucses from '../UI/DropDown/DropDownOutSucses';


const Add2 = () => {
    let [status, setStatus] = useState([])
    let [renj, setReng] = useState()
    let [clientsE, setClientsE] = useState('')

    async function getValueReng() {
        let value = document.getElementById("r1");
        setReng(value.value)
    }

    async function setAxiosClients() {
        UserServise.setAxiosClients().then(res => {
            setStatus(res)
            setClientsE(res[0].item)
        })
    }

    async function createUsers(event) {
        event.preventDefault()
        toast.promise(
            UserServise.createUsers('', renj), { pending: "Please wait... ", }
        );
    }

    useEffect(() => {
        setAxiosClients()
        getValueReng()
    }, []);

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