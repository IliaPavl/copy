import React from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SETTINGS_NOTIFICATION,SETTINGS_INTEGRATION } from '../../utils/const';

const SettingGroup = ({setSetting}) => {

    return (
        <Container>
            <Card>
                <ListGroup >
                    <ListGroup.Item action>
                        <Link to={SETTINGS_NOTIFICATION} onClick={()=>setSetting("notification")} className='groupList'>
                            Настройки уведомлений
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item action>
                        <Link to={SETTINGS_INTEGRATION} onClick={()=>setSetting("integration")} className='groupList'>
                            Настройки интеграций
                        </Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Container>
    );
};

export default SettingGroup;