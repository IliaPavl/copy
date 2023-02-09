import React from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { SETTINGS_INTEGRATION, SETTINGS_NOTIFICATION } from '../../utils/const';



const SettingGroup = ({ setSetting, isAdmin }) => {
    const navigate = useNavigate();
    function setSet(value, url) {
        setSetting(value);
        navigate(url);
    }
    return (
        <Container>
            <Card>
                <ListGroup >
                    <ListGroup.Item action onClick={() => setSet("notification", SETTINGS_NOTIFICATION)}>
                        <Link to={SETTINGS_NOTIFICATION} onClick={() => setSetting("notification")} className='groupList'>
                            Настройки уведомлений
                        </Link>
                    </ListGroup.Item>
                    {isAdmin === true ? <ListGroup.Item action onClick={() => setSet("integration", SETTINGS_INTEGRATION)}>
                        <Link to={SETTINGS_INTEGRATION} onClick={() => setSetting("integration")} className='groupList'>
                            Настройки интеграций
                        </Link>
                    </ListGroup.Item>:<></>}

                </ListGroup>
            </Card>
        </Container>
    );
};

export default SettingGroup;