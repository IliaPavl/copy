import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Container, Form, ListGroup, Offcanvas, Row, Stack } from 'react-bootstrap';
import UserServise from '../../servise/funtionService/UserServise';
import "./profile.css";
import ListBook from './userList';
import UserProfileEdit from './UserProfileEdit';

const ProfileUser = () => {
    const [showSettings, setShowSettings] = useState(false);
    const handleShow = () => setShowSettings(!showSettings);
    let [company, setSompany] = useState({});
    let [agents, setAgents] = useState([]);
    let [userInfo, setUserInfo] = useState([]);
    let [roles, setRolse] = useState('');
    let [status, setStatus] = useState('');

    let [isPfone, setIsPfone] = useState(false)
    window.onresize = function (event) {
        if (event.target.innerWidth < 780)
            setIsPfone(true)
        else
            setIsPfone(false)
    };
    async function update(){
        console.log("Use")
        return true;
    }

    useEffect(() => {
        UserServise.setUserProfile().then(obj => {
            setSompany(obj.data[1])
            setAgents(obj.data[0]);
            setUserInfo(obj.data[2]);
        })
        if (window.innerWidth < 780)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, [])

    useEffect(() => {
        if (userInfo.length !== 0) {
            let r = '';
            userInfo.roles.forEach(role => { r += (role.name.split('_')[1] + ", ") })
            setRolse(r);
            setStatus(userInfo.userStatus.userStatus.split('_')[1]);
        }
    }, [userInfo])
    return (
        <Container className='mt-2 mb-5' >
            {isPfone ?
                <Card border="secondary" >
                    <Card.Header>
                        <span>Profile Page</span>
                    </Card.Header>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><span>Company Info</span></Accordion.Header>
                            <Accordion.Body style={{ padding: 0 }}>
                                <ListGroup variant="flush" >
                                    <ListGroup.Item key={company.idClient}>
                                        <span><h5>Info about organization</h5></span>
                                        <span>Name organization:</span><br /><span>{company.nameCompany}</span>
                                        <br />
                                        <br />
                                        <span>ID: </span><br /><span>{company.idClient}</span>
                                        <br />
                                        <br />
                                        <span>Status:{company.status}</span>
                                        <br />
                                        <br />
                                        <span>YHП:{company.ynp}</span>
                                        <br />
                                        <br />
                                    </ListGroup.Item>
                                    <ListGroup.Item key={"2332y827y8hgeirhi"} className='ov'>
                                        <span><h5>Agents info</h5></span>

                                        {agents.map(agent =>
                                            <Card className={'agentCard'}>
                                                <Card.Body>
                                                    <div key={agent.idAgent} >
                                                        <span> Name agent : {agent.nameAgent}</span>
                                                        <br />
                                                        <span> Status : {agent.status}</span>
                                                        <br />
                                                        <span> ID : {agent.idAgent}</span>
                                                        <br />
                                                        <span> Last date work : {agent.lastDateWork}</span>
                                                        <br />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><span>User information</span></Accordion.Header>
                            <Accordion.Body>
                                <Form >
                                    <Col className="mb-3">
                                        <Stack direction="horizontal" gap={2} className={'mb-2'}>
                                            <Form.Label className='ml-2'>Login</Form.Label>
                                            <Form.Control type="text" placeholder="login" value={userInfo.username} disabled={true} />
                                        </Stack>
                                        <Stack direction="horizontal" gap={2} className={'mb-2'}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="" value={userInfo.userFio} disabled={true} />
                                        </Stack>
                                        <Stack direction="horizontal" gap={2}>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="123@mail.ru" value={userInfo.email} />
                                        </Stack>
                                    </Col>
                                    <Row className="mb-3">
                                        <Form.Control className={'m-1'} type="password" placeholder="password" />
                                        <Form.Control className={'m-1'} type="password" placeholder="repit" />
                                    </Row>
                                    <Row className="mb-3">
                                        <Stack direction="horizontal" gap={2} className={'mb-2'}>
                                            <Form.Label className={'m-1'}>Company</Form.Label>
                                            <Form.Control className={'m-1'} type="text" placeholder="Company" disabled={true} value={company.nameCompany} />
                                        </Stack>
                                        <Stack direction="horizontal" gap={2} className={'mb-2'}>
                                            <Form.Label className={'m-1'}>Status</Form.Label>
                                            <Form.Control className={'m-1'} type="text" placeholder="Status" disabled={true} value={status} />
                                        </Stack>
                                        <Stack direction="horizontal" gap={2} className={'mb-2'}>
                                            <Form.Label className={'m-1'}>Role</Form.Label>
                                            <Form.Control className={'m-1'} type="text" placeholder="Role" disabled={true} value={roles} />
                                        </Stack>
                                    </Row>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Button variant="info" className='m-1 mt-2' onClick={handleShow}>Add new user +</Button>
                    <ListBook update={update}/>
                </Card>
                :
                <Container className='mt-2 mb-5' >
                    <Card border="secondary" >
                        <Card.Header>
                            <span>Profile Page</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card border="light" >
                                        <Card.Header>
                                            <span>Company Info</span>
                                        </Card.Header>
                                        <Card.Body>
                                            <ListGroup variant="flush" >
                                                <ListGroup.Item key={company.idClient}>
                                                    <span><h5>Info about organization</h5></span>
                                                    <br />
                                                    <span>Name organization: {company.nameCompany}</span>
                                                    <br />
                                                    <br />
                                                    <span>ID: {company.idClient}</span>
                                                    <br />
                                                    <br />
                                                    <span>Status: {company.status}</span>
                                                    <br />
                                                    <br />
                                                    <span>YHП: {company.ynp}</span>
                                                    <br />
                                                    <br />
                                                </ListGroup.Item>
                                                <ListGroup.Item key={"2332y827y8hgeirhi"} className='ov'>
                                                    <span><h5>Agents info</h5></span>

                                                    {agents.map(agent =>
                                                        <Card className={'agentCard'}>
                                                            <Card.Body>
                                                                <div key={agent.idAgent} >
                                                                    <span> Name agent : {agent.nameAgent}</span>
                                                                    <br />
                                                                    <span> Status : {agent.status}</span>
                                                                    <br />
                                                                    <span> ID : {agent.idAgent}</span>
                                                                    <br />
                                                                    <span> Last date work : {agent.lastDateWork}</span>
                                                                    <br />
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    )}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col sm={7} className={"ml-2"} >
                                    <Row>
                                        <Card.Header>
                                            <span>User information</span>
                                        </Card.Header>
                                        <Card.Body>
                                            <Form >
                                                <Col className="mb-3">
                                                    <Stack direction="horizontal" gap={2} className={'mb-2'}>
                                                        <Form.Label className='ml-2'>Login</Form.Label>
                                                        <Form.Control type="text" placeholder="login" value={userInfo.username} disabled={true} />
                                                    </Stack>
                                                    <Stack direction="horizontal" gap={2} className={'mb-2'}>
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Surname Firstname Lastname" value={userInfo.userFio} disabled={true} />
                                                    </Stack>
                                                    <Stack direction="horizontal" gap={2}>
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type="email" placeholder="sumsing@mail.ru" value={userInfo.email} />
                                                    </Stack>
                                                </Col>
                                                <Row className="mb-3">
                                                    <Stack direction="horizontal" gap={4} className={'mb-2'}>
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" placeholder="12424235Le" />
                                                        <Form.Label>Repit</Form.Label>
                                                        <Form.Control type="password" placeholder="12424235Le" />
                                                    </Stack>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Stack direction="horizontal" gap={4} className={'mb-2'}>
                                                        <Form.Label className={'m-1'}>Company</Form.Label>
                                                        <Form.Control className={'m-1'} type="text" placeholder="Company" disabled={true} value={company.nameCompany} />
                                                        <Form.Label className={'m-1'}>Status</Form.Label>
                                                        <Form.Control className={'m-1'} type="text" placeholder="Status" disabled={true} value={status} />
                                                    </Stack>
                                                    <Stack direction="horizontal" gap={2} className={'mb-2'}>
                                                        <Form.Label className={'m-1'}>Role</Form.Label>
                                                        <Form.Control className={'m-1'} type="text" placeholder="Roles" disabled={true} value={roles} />
                                                    </Stack>
                                                </Row>
                                            </Form>
                                        </Card.Body>
                                    </Row>
                                    <Row >
                                        <Button variant="info" onClick={handleShow}>Add new user +</Button>
                                    </Row>
                                    <Row >
                                        <ListBook update={update}/>
                                    </Row>
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            }

            <Offcanvas show={showSettings} onHide={handleShow} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Chart settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <UserProfileEdit isNew={true} update={update}/>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default ProfileUser;