import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Form, Row } from "react-bootstrap";

const DropDownOutSucsesCheked = ({ values, setEnabledBox, enabledStatus }) => {
    let [head, setHead] = useState()

    async function hederSet(role) {

        if (head != null) {
            let temp = head.slice();
            var myIndex = temp.indexOf(role);
            if (myIndex !== -1) {
                if (head.length == 1)
                    setHead([])
                else
                    setHead(head.filter(function (f) { return f !== role }))
            } else {
                setHead([...head, role]);
            }
        }
        setEnabledBox(head)
    }

    async function enableHead(enabledStatus) {
        setHead(enabledStatus)
    }

    useEffect(() => {
        enableHead(enabledStatus)
    }, [enabledStatus]);

    return (
        <Dropdown className="d-grid gap-2">
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                {head + ' '}
            </Dropdown.Toggle>

            <Dropdown.Menu >
                {values.length ?
                    values.map((type) => (
                        <Form>
                            <Form.Group>
                                <Row className='m-1'>
                                    <Col className='ml-3'>
                                        <Form.Check
                                            type={'checkbox'}
                                            id={type.item}
                                            onChange={() =>
                                                hederSet(type.item)
                                            } />
                                    </Col>
                                    <Col>
                                        <Dropdown.Item size="lg" key={type.item} value={type.item} disabled={true}>{type.item}</Dropdown.Item>
                                    </Col>
                                </Row>

                            </Form.Group>
                        </Form>
                    )) : <p> Not one select Item</p>}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropDownOutSucsesCheked;