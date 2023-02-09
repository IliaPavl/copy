import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserServise from '../../servise/funtionService/UserServise';
import { FORGOT_PASSWPRD } from '../../utils/const';
import "./profile.css";


const ProfileUser = () => {
    let [company, setSompany] = useState({});
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

    useEffect(() => {
        UserServise.setUserProfile().then(obj => {
            setSompany(obj.data[1])
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
            userInfo.roles.forEach(role => {
                r += (role.name.split('_')[1] + " ")
            })
            setRolse(r);
            setStatus(userInfo.userStatus.userStatus.split('_')[1]);
        }
    }, [userInfo])
    return (
        <Container className='mt-2 mb-5' >

            {isPfone ?
                <Card border="secondary" >
                    <Card.Header>
                        <span>Профиль </span>
                    </Card.Header>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><span>Информация о компании</span></Accordion.Header>
                            <Accordion.Body style={{ padding: 0 }}>
                                <ListGroup variant="flush" >
                                    <ListGroup.Item key={company.idClient}>
                                        <span ><h5>Информация об организации</h5></span>
                                        <Row>
                                            <div className='containerFirst'>Организация:</div> <div className='containerSecond'>{company.nameCompany}</div>
                                        </Row>

                                        <Row>
                                            <div className='containerFirst'>Статус: </div><div className='containerSecond'>{company.status}</div>
                                        </Row>
                                        <Row>
                                            <div className='containerFirst'>УНП: </div><div className='containerSecond'>{company.ynp}</div>
                                        </Row>
                                        <Row>
                                            <div className='containerFirst'>ID: </div> <div className='containerSecondPfone '>{company.idClient}</div>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* <ListGroup.Item key={"2332y827y8hgeirhi"} >
                                        <span><h5>Agents info</h5></span>
                                        <div className='ov'>
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
                                        </div>
                                    </ListGroup.Item> */}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <Accordion defaultActiveKey={"0"}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><span >Информация о пользователе</span></Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <div className='containerFirst'>Логин:</div> <div className='containerSecond'>{userInfo.username}</div>
                                </Row>

                                <Row>
                                    <div className='containerFirst'>ФИО: </div><div className='containerSecond'>{userInfo.userFio}</div>
                                </Row>
                                <Row>
                                    <div className='containerFirst'>Почта: </div><div className='containerSecond'>{userInfo.email}</div>
                                </Row>
                                <Row>
                                    <div className='containerFirst'>Компании: </div> <div className='containerSecond '>{company.nameCompany}</div>
                                </Row>
                                <Row>
                                    <div className='containerFirst'>Статус: </div> <div className='containerSecond '>{status}</div>
                                </Row>
                                <Row>
                                    <div className='containerFirst'>Роль: </div> <div className='containerSecond '>{roles}</div>
                                </Row>
                                <Row className="mb-3">
                                    <div className='containerFirst'> Пароль</div>
                                    <Button variant="outline-primary  containerSecond_b">
                                        <Link className='textLink' to={FORGOT_PASSWPRD}>Новый пароль</Link>
                                    </Button>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card>
                :
                <Container className='mt-2 mb-5' >
                    <Card border="secondary" >
                        <Card.Header>
                            <span>Профиль</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Header>
                                        <span>Информация о компании</span>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup variant="flush" >
                                            <ListGroup.Item key={company.idClient}>
                                                <Row>
                                                    <div className='containerFirst'>Организация:</div> <div className='containerSecond'>{company.nameCompany}</div>
                                                </Row>

                                                <Row>
                                                    <div className='containerFirst'>Статус: </div><div className='containerSecond'>{company.status}</div>
                                                </Row>
                                                <Row>
                                                    <div className='containerFirst'>УНП: </div><div className='containerSecond'>{company.ynp}</div>
                                                </Row>
                                                <Row>
                                                    <div className='containerFirst'>ID: </div> <div className='containerSecond'>{company.idClient}</div>
                                                </Row>
                                            </ListGroup.Item>
                                            {/* <ListGroup.Item key={"2332y827y8hgeirhi"} >
                                                <span><h5>Agents info</h5></span>
                                                <div className='ov'>
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
                                                </div>
                                            </ListGroup.Item> */}

                                        </ListGroup>
                                    </Card.Body>
                                </Col>

                                <Col>
                                    <Card.Header>
                                        <span>Информация о пользователе</span>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <div className='containerFirst'>Логин: </div><div className='containerSecond'>{userInfo.username}</div>
                                        </Row>
                                        <Row>
                                            <div className='containerFirst'>ФИО: </div><div className='containerSecond'>{userInfo.userFio}</div>
                                        </Row>
                                        <Row>
                                            <div className='containerFirst'>Почта: </div><div className='containerSecond'>{userInfo.email}</div>
                                        </Row>
                                        <Row>
                                            <div className='containerFirst'>Компания: </div> <div className='containerSecond '>{company.nameCompany}</div>
                                        </Row>
                                        <Row>
                                            <div className='containerFirst'>Статус: </div> <div className='containerSecond '>{status}</div>
                                        </Row>
                                        <Row>
                                            <div className='containerFirst'>Роль: </div> <div className='containerSecond '>{roles.split(",")[0]}</div>
                                        </Row>
                                        <Row className="mb-3">
                                            <div className='containerFirst'>Пароль: </div>
                                            <Button variant="outline-primary  containerSecond_b">
                                                <Link className='textLink' to={FORGOT_PASSWPRD}>Новый пароль</Link>
                                            </Button>
                                        </Row>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            }
        </Container>
    );
};

export default ProfileUser;