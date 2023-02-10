import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import AmoHtttp from '../../servise/httpServise/AmoHtttp';

const Amo = () => {
    const constComment = "RM SYSTEM подключение к амо"
    const constName = "RM SYSTEM"
    let [urlData, setUrlData] = useState({})
    let [name, setName] = useState(constName);
    let [comment, setComment] = useState(constComment)
    let [test, setTest] = useState('')
    let [refresh, setRefresh] = useState('');

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
    }, [])
    useEffect(() => {
        console.log(urlData)
    }, [urlData])

    function testF() {
        toast.promise(
            AmoHtttp.testConnection(urlData).then((response) => {
                let data = response.data.split(':');
                if (data[0] === 'sucsess') {
                    toast.success("Успешно")
                    setRefresh(data[1]);
                } else {
                    setRefresh('');
                }
            }).catch((error) => { toast.error(error) }), { pending: "Please wait... ", })
    }
    useEffect(() => {
        console.info(refresh);
    }, [refresh])

    function save() {
        if (refresh !== '') {
            let jsonData = {
                Link: urlData.ref,
                Source_ID: "",
                Client_key: "0yM40qJllKsInxbFBzDAAbhzGILsbqiSDMmtL5G5MIYuLu6q62ArWGggXFeDVyQT",
                Refresh: refresh,
                Client_id: urlData.client_id,
            } 
            let obj = {
                id_integration:"",
                source:8,
                viewName: name,
                jsonData: JSON.stringify(jsonData),
                testComment:comment,
                isOn:0
            }
            toast.promise(
                AmoHtttp.saveAmo(obj).then((response) => {
                    console.info("___")
                    console.info(response)
                    console.info("___")
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
                            <Button className="mt-2 settingForm" onClick={() => testF()}>
                                Тест
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