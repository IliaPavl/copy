import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';


import {  toast } from 'react-toastify';
import ClientServise from '../../servise/funtionService/ClientServise';
import ClientHttpServise from '../../servise/httpServise/ClientHttpServise';
import { URL_EDIT_CLIENT } from '../../utils/const';
import DropDownCompany from '../UI/DropDown/DropDownOutSucses';

const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;

const EditCompany = () => {
    let [status, setStatus] = useState([])
    let [companyName, setCompanyName] = useState('')
    let [nameCliet, setNameCliet] = useState('')
    let [phoneNumber, setPhoneNumber] = useState('')
    let [enabledStatus, setEnabledStatus] = useState('')


    async function handleDepositeAmountChange(evt) {
        if (rx_live.test(evt.target.value))
            setPhoneNumber(evt.target.value);
    }

    async function setAxiosStatus() {
        ClientHttpServise.getStatusClient().then((respons) => {
            setStatus(ClientServise.setStatusClient(respons))
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

    async function loadClientData(){
        let url = window.location.pathname.split('/');
        ClientHttpServise.getClient(URL_EDIT_CLIENT+'/'+url[2]).then((respons) => {
           console.log(respons.data.status);
           setCompanyName(respons.data.companyName);
           setPhoneNumber(respons.data.phoneNumber);
           setNameCliet(respons.data.nameCliet);
           setEnabledStatus(respons.data.status);
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

    async function setAxiosStatus() {
        ClientHttpServise.getStatusClient().then((respons) => {
            setStatus(ClientServise.setStatusClient(respons))
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

    async function setClient(e) {
        e.preventDefault()
        let url = window.location.pathname.split('/');
        console.log(companyName+ nameCliet+ phoneNumber+ enabledStatus)
        ClientHttpServise.updateCompany(companyName, nameCliet, phoneNumber, enabledStatus,URL_EDIT_CLIENT+'/'+url[2]).then((respons) => {
            toast.success(respons.data);
            //window.location.assign(URL_ADD_CLIENTS)
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }


    useEffect(() => {
        setAxiosStatus();
        loadClientData();
    }, [])

    return (
        <Card className={"border-1 m-1"}>

            <Card.Header>
                <div style={{ float: "left" }}>
                    Add from company
                </div>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={event => setClient(event)}>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput1">
                            <Form.Label>Name company</Form.Label>
                            <Form.Control type="text" placeholder="OOO company" value={companyName} onChange={event => setCompanyName(event.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name client</Form.Label>
                            <Form.Control type="text" placeholder="Surname Firstname Lastname " value={nameCliet} onChange={event => setNameCliet(event.target.value)} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" maxLength="13" placeholder="+3752912345678" value={phoneNumber} onChange={event => handleDepositeAmountChange(event)} />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Status client</Form.Label>
                            <DropDownCompany values={status} setEnabledStatus={setEnabledStatus} enabledStatus={enabledStatus} />
                        </Form.Group>
                    </Row>
                    <Form.Group as={Row} xs={3} className="mb-3 d-flex justify-content-center">
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EditCompany;