import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import MessageSettings from './MessageSettings';
import SettingGroup from './SettingGroup';
import './Settings.css';

const SettingBack = () => {
    return (
        <Container>
            <Card className='mt-2 BlueBorder' >
                <Card.Header className='BlueBack'>
                    <h6>Настройки</h6>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col sm={3}>
                            <SettingGroup />
                        </Col>
                        <Col>
                            <MessageSettings />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SettingBack;