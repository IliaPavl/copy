import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import IntegrationSetting from './IntegrationService';
import MessageSettings from './MessageSettings';
import SettingGroup from './SettingGroup';
import './Settings.css';

const SettingBack = () => {
    let [setting, setSetting] = useState();
    useEffect(() => {
        let u = window.location.pathname.split('/')[2];
        setSetting(u);
    }, [])
    useEffect(() => {
    }, [setting])
    return (
        <Card className='mt-2 BlueBorder' >
            <Card.Header className='BlueBack CardHead'>
                <h6>Настройки</h6>
            </Card.Header>
            <Card.Body>

                <Row>
                    <Col sm={3} className="mb-2">
                        <SettingGroup setSetting={setSetting} />
                    </Col>
                    <Col>
                        {setting === "notification"
                            ? <><MessageSettings /></> : <></>}
                        {setting === "integration"
                            ? <><IntegrationSetting/></> : <></>}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default SettingBack;