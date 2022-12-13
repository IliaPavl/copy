import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import UserHttpServise from '../../servise/httpServise/UserHttpServise';

const MessageSettings = () => {
    let [setting, setSetting] = useState([]);
    useEffect(() => {
        UserHttpServise.getSettingsNotification().then(obj => {
            console.log(obj.data);
            setSetting(obj.data);
        })
    }, [])

    async function switchValue(link) {
        setSetting(setting.map(item =>
            JSON.stringify(link) === JSON.stringify(item)
                ? { ...item, enable: !link.enable }
                : item
        ))
    }

    async function click() {
        toast.promise(
            UserHttpServise.setSettingsNotification(setting).then((respons) => {
                toast.success("Настройки сохранены")
            }).catch((error) => { toast.error(error) }), { pending: "Please wait... ", })
    }
    let number = 1;

    function plus() {
        number++;
        return number;
    }
    return (
        <Container>
            <Card className='noBorder'>
                <Card.Header className='noBorder BlueBack'>
                    Настройки уведомлений
                </Card.Header>
                <Card.Body className='noBorder'>
                    {setting.length !== 0 ?
                        <table>
                            <tbody>
                                {setting.map(setting =>
                                    <tr key={plus()}>
                                        <td>
                                            {setting.enable === true ?
                                                <Form.Check
                                                    checked
                                                    type={'switch'}
                                                    key={plus()}
                                                    onChange={() => {
                                                        switchValue(setting);
                                                    }}
                                                /> :
                                                <Form.Check
                                                    type={'switch'}
                                                    key={plus()}
                                                    onChange={() => {
                                                        switchValue(setting);
                                                    }}
                                                />}
                                        </td>
                                        <td>
                                            {setting.name}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        : <></>}
                </Card.Body>
                <Card.Footer>
                        <Button variant="primary" onClick={() => click()}>
                            Сохранить
                        </Button>
                    </Card.Footer>
            </Card>
        </Container>
    );
};

export default MessageSettings;