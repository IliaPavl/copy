import React, { useState, useEffect } from 'react';

import { Button, Card, Form, Pagination, Row, Col } from "react-bootstrap";
import DropDownCompany from '../DropDown/DropDownOutSucses';

const Add = () => {
    let [companys, setCompanys] = useState([
        { item: 'Company1' },
        { item: 'Company2' },
        { item: 'Company3' },
        { item: 'Company4' }
    ])
    let [reng, setReng] = useState()

    function getValueReng() {
        let value = document.getElementById("r1");
        setReng(value.value)
    }

    useEffect(() => {
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
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Company</Form.Label>
                        <Form.Group>
                            <Row sm={3}>
                                <Col>
                                    <DropDownCompany values={companys}/>
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
                            <Pagination.Item key={reng} >
                                {reng}
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

export default Add;