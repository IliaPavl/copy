import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AmoHtttp from '../../servise/httpServise/AmoHtttp';
import LocalServise from '../../servise/httpServise/LocalServise';
import { AMO_SECRET, SETTINGS_INTEGRATION } from '../../utils/const';
import integrationService from "../../servise/httpServise/IntegrationService";

const Amo = () => {
    const constComment = "Focus подключение к амо"
    const constName = "Focus"
    let [urlData, setUrlData] = useState({})
    let [name, setName] = useState(constName);
    let [comment, setComment] = useState(constComment)
    let [refresh, setRefresh] = useState('');
    const navigate =useNavigate();

    useEffect(() => {
        let u = window.location.search.split("?");
        let codes = u[1].split("&");
        setUrlData({
            code: codes[0].split("=")[1],
            state: codes[1].split("=")[1],
            ref: codes[2].split("=")[1],
            platform: codes[3].split("=")[1],
            client_id: codes[4].split("=")[1]
        });
        if (LocalServise.getIdIntegrationAmo() !== null) {
            integrationService.getIntegrationOne(LocalServise.getIdIntegrationAmo()).then(data => {
                setName(data.data.viewName);
                setComment(data.data.testComment);
            })
        }

    }, [])
    useEffect(() => {
        console.log(urlData)
    }, [urlData])

    function testF() {
        toast.promise(
            refresh===''?
            AmoHtttp.testConnection(urlData).then((response) => {
                let data = response.data.split(':');
                if (data[0] === 'sucsess') {
                    toast.success("Успешное подключение")
                    setRefresh(data[1]);
                } else {
                    setRefresh('');
                }
            }).catch((error) => { toast.error(error) }):{}, { pending: "Please wait... ", })
    }

    useEffect(() => {
    }, [refresh])

    function save() {
        if (refresh !== '') {
            let jsonData = {
                ClientAmo_secret: AMO_SECRET,
                Refresh: refresh,
                ClientAmo_id: urlData.client_id,
                Link: "https://"+urlData.ref,
            }
            let obj = {
                id_integration: LocalServise.getIdIntegrationAmo(),
                source: 8,
                viewName: name,
                jsonData: JSON.stringify(jsonData),
                testComment: comment,
                isOn: 0
            }
            toast.promise(
                AmoHtttp.saveAmo(obj).then((responce) => {
                    if (responce.data === 1)
                        toast.warning("Такое имя есть");
                    else if (responce.data === 2)
                        toast.error("Проверьте заполненные вами поля");
                    else if (responce.data === 3)
                        toast.error("У вас нету прав для это действия");
                    else if (responce.data === 0)
                        toast.success("Сохранено");
                        setTimeout(() => { navigate(SETTINGS_INTEGRATION) }, 2000);
                }).catch((error) => { toast.error(error) }), { pending: "Please wait... ", })
        }
    }
    return (
        <Container>
            <Card className='mt-2 BlueBorder' >
                <Card.Header className='BlueBack CardHead'>
                    <h6>Интеграция Амо</h6>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col className="mb-2">
                            <InputGroup className="mt-2">
                                <InputGroup.Text className='settingForm' >
                                    Название
                                </InputGroup.Text>
                                <Form.Control
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => { setName(e.target.value) }}
                                    value={name}
                                    defaultValue={constName}
                                />

                            </InputGroup>
                            <InputGroup className='mt-2'>
                                <InputGroup.Text className='settingForm'>
                                    Комментарий
                                </InputGroup.Text>

                                <Form.Control as="textarea"
                                    aria-describedby="basic-addon1"
                                    value={comment}
                                    defaultValue={constComment}
                                    onChange={(e) => { setComment(e.target.value) }}
                                />

                            </InputGroup>
                            <Button className="mt-2" onClick={() => testF()}>
                                Тест подключения
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className='cardFooterContainer mt-2'>
                    <div className='cardFooter'>
                        {refresh !== '' ?
                            <Button onClick={() => save()}>
                                Сохранить
                            </Button>
                            :
                            <OverlayTrigger
                                key='bottom'
                                placement='bottom'
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}>
                                        Нужно проверить подключение к амо!
                                    </Tooltip>
                                }
                            >
                                <Button onClick={() => save()} disabled='true'>
                                    Сохранить
                                </Button>
                            </OverlayTrigger>
                        }
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Amo;