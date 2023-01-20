import React from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SETTINGS_NOTIFICATION } from '../../utils/const';

const SettingGroup = () => {
    return (
        <Container>
            <Card>
                <ListGroup >
                    <ListGroup.Item action>
                        <Link to={SETTINGS_NOTIFICATION} className='groupList'>
                            Настройки уведомлений
                        </Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Container>
    );
};

export default SettingGroup;