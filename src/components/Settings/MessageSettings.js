import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import UserHttpServise from '../../servise/httpServise/UserHttpServise';

const MessageSettings = () => {
    let mapSettings = [{ id: 1, name: 'Окончание расчета', enable: false, help: "Получать уведомления на почту по завершению расчета показателей" }]
    let [setting, setSetting] = useState(mapSettings);
    useEffect(() => {
        UserHttpServise.getSettingsNotification().then(obj => {
            console.log(obj.data);
            obj.data.map((data) => {
                setSetting(setting =>
                    setting.map(item =>
                        item.id === data.id
                            ? { ...item, name: data.name, enable: data.enable }
                            : item
                    )
                )
            })
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
                                        <td className='enableContainer'>
                                            <div className='enableDiv'>
                                                {setting.enable === true ?
                                                    <Form.Check
                                                        checked
                                                        type={'switch'}
                                                        key={plus()}
                                                        className={'swith'}
                                                        onChange={() => {
                                                            switchValue(setting);
                                                        }}
                                                    /> :
                                                    <Form.Check
                                                        type={'switch'}
                                                        key={plus()}
                                                        className={'swith'}
                                                        onChange={() => {
                                                            switchValue(setting);
                                                        }}
                                                    />}
                                            </div>
                                        </td>
                                        <td className='messageBox'>
                                            <Row>

                                                <Form.Label className='messageTop'>
                                                    {setting.name}
                                                </Form.Label>
                                                <Form.Text className='messageBot'>
                                                    {setting.help}
                                                </Form.Text>

                                            </Row>
                                        </td>
                                    </tr>
                                )}
                                
                            </tbody>
                        </table>
                        : <></>}
                </Card.Body>
                <Card.Footer className='cardFooterContainer'>
                    <div className='cardFooter'>
                        <Button variant="primary" onClick={() => click()}>
                            Сохранить
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default MessageSettings;