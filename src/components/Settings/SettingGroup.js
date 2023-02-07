import React from 'react';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SETTINGS_NOTIFICATION, SETTINGS_INTEGRATION } from '../../utils/const';

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
                    <ListGroup.Item action>
                        <script
                            class="amocrm_oauth"
                            charset="utf-8"
                            data-client-id="8971ce16-0b0e-4a27-b2f0-5f0ea62bb5ea"
                            data-title="Button"
                            data-compact="false"
                            data-class-name="className"
                            data-color="default"
                            data-state="state"
                            data-error-callback="functionName"
                            data-mode="popup"
                            src="https://www.amocrm.ru/auth/button.min.js"
                        />
                    </ListGroup.Item>

                </ListGroup>
            </Card>
        </Container>
    );
};

export default SettingGroup;