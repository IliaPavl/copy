import React from 'react';
import { Col, Form, InputGroup, Modal } from 'react-bootstrap';

const ModalMonthPlan = ({ show, close, nowData, type }) => {
    const month = [
        {
            text: "Январь",
            value: "1",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Февраль",
            value: "2",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Март",
            value: "3",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Апрель",
            value: "4",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Май",
            value: "5",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Июнь",
            value: "6",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Июль",
            value: "7",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Август",
            value: "8",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Сентябрь",
            value: "9",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Октябрь",
            value: "10",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Ноябрь",
            value: "11",
            fact: 0,
            plan: 0,
            enabled: false
        },
        {
            text: "Декабрь",
            value: "12",
            fact: 0,
            plan: 0,
            enabled: false
        }
    ]
    let number = 1;

    function plus() {
        number++;
        return number;
    }

    return (
        <>
            <Modal show={show} onHide={() => close()} >
                <Modal.Header closeButton>
                    <Modal.Title>Планы на месяца</Modal.Title>
                </Modal.Header>
                <Modal.Body className='accessOv accordionItem'></Modal.Body>

                {month.map(month =>
                    <Col key={plus()}>
                        <InputGroup className={"mt-1"}>
                            <InputGroup.Text className={"withP"}>{month.text}, {type} :  </InputGroup.Text>
                            {"12" !== month.value ?
                                <>
                                    <Form.Control
                                        aria-describedby="basic-addon1"
                                        defaultValue={"Факт: " + month.fact}
                                        readOnly
                                    />
                                    <Form.Control
                                        aria-describedby="basic-addon1"
                                        defaultValue={"План: " + month.fact}

                                    />
                                </>
                                :
                                <>
                                    <Form.Control
                                        aria-describedby="basic-addon1"
                                        defaultValue={"Факт: " + nowData.indFact}
                                        readOnly
                                    />
                                    <Form.Control
                                        aria-describedby="basic-addon1"
                                        defaultValue={"План: " + nowData.indPlan}
                                    />
                                </>
                            }
                        </InputGroup>
                    </Col>
                )}

            </Modal>
        </>
    );
};

export default ModalMonthPlan;