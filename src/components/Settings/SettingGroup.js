import React, { useEffect } from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SETTINGS_INTEGRATION, SETTINGS_NOTIFICATION } from '../../utils/const';
import Amo from './Amo';
import amoButton from './amoButton';



const SettingGroup = ({ setSetting }) => {

    return (
        <Container>
            <Card>
                <ListGroup >
                    <ListGroup.Item action>
                        <Link to={SETTINGS_NOTIFICATION} onClick={() => setSetting("notification")} className='groupList'>
                            Настройки уведомлений
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item action>
                        <Link to={SETTINGS_INTEGRATION} onClick={() => setSetting("integration")} className='groupList'>
                            Настройки интеграций
                        </Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Container>
    );
};

export default SettingGroup;