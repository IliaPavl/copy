import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import RoleServise from '../../servise/funtionService/RoleServise';
import LocalServise from '../../servise/httpServise/LocalServise';
import IntegrationSetting from './IntegrationService';
import MessageSettings from './MessageSettings';
import SettingGroup from './SettingGroup';
import './Settings.css';

const SettingBack = () => {
    let [isAdmin, setIsAdmin] = useState();
    let [setting, setSetting] = useState();

    useEffect(() => {
        let u = window.location.pathname.split('/')[2];
        setSetting(u);
        if (LocalServise.getUserName() !== "error")
            RoleServise.cheakRole().then(function(value){
                setIsAdmin(value)
            });
        else
            setIsAdmin(false);
    }, [])
    useEffect(() => {
        console.log(isAdmin)
    }, [setting,isAdmin])
    return (
        <Card className='mt-2 BlueBorder' >
            <Card.Header className='BlueBack CardHead'>
                <h6>Настройки</h6>
            </Card.Header>
            <Card.Body>

                <Row>
                    <Col sm={3} className="mb-2">
                        <SettingGroup setSetting={setSetting} isAdmin={isAdmin}/>
                    </Col>
                    <Col>
                        {setting === "notification"
                            ? <><MessageSettings /></> : <></>}
                        {setting === "integration" && isAdmin ===true
                            ? <><IntegrationSetting /></> : <></>}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default SettingBack;