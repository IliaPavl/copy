import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import integrationService from "../../servise/httpServise/IntegrationService";
import IntegrationSelect from './Selects/IntegrationSelect';
import MultipleSelect from './Selects/MultipleSelect';
const NewIndicator = () => {
    const [integrations, setIntegrations] = useState([]);
    let [enableIntegr, setEnableIntegr] = useState();
    const [menegers, setMenegers] = useState([]);
    const [piplines, setPiplines] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [dateStart, setDateStart] = useState([]);
    const [dataFormat, setDataFormat] = useState([{ value: "quantity", label: "Колличество" }, { value: "summ", label: "Сумма сделок" }, { value: "average", label: "Средняя сумма сделок" }]);

    let [piplinesE, setPiplinesE] = useState([]);
    let [statusesE, setStatusesE] = useState([]);
    let [dateStartE, setDateStartE] = useState([]);
    let [menegersE, setMenegersE] = useState([]);
    let [dataFormatE, setDataFormatE] = useState([]);


    let [isAllmenegers, setIsAllmenegers] = useState('false');
    let [isAllpipline, setIsAllpipline] = useState('false');
    let [isAllstatus, setIsAllstatus] = useState('false');

    useEffect(() => {
        integrationService.getIntegrationList().then(data => {
            data.data.map(item => {
                item.value = item.id_integration;
                item.label = item.nameIntegration;
            }
            )
            setMenegers(data.data);
            setMenegersE(data.data);
            setIntegrations(data.data);
        })
    }, [])

    async function setEnableIntegrF(e) {
        setEnableIntegr(e);
        integrationService.getAmoData(e.id_integration).then((response) => {
            console.log(response)
        }).catch((ex) => console.log(ex));
    }

    async function switchPiplene() {
        if (isAllpipline === 'false')
            setIsAllpipline('true')
        else
            setIsAllpipline('false')
    }

    async function switchStatus() {
        if (isAllstatus === 'false')
            setIsAllstatus('true')
        else
            setIsAllstatus('false')
    }

    async function switchMenegers() {
        if (isAllmenegers === 'false')
            setIsAllmenegers('true')
        else
            setIsAllmenegers('false')
    }
    async function save() {

    }
    useEffect(() => {
        // console.info(isAllmenegers);
    }, [isAllmenegers])
    let [d, setD] = useState();
    return (
        <Container className='mt-3  mb-5'>
            <Card >
                <Card.Header className='noBorder BlueBack CardHead'>
                    Новый показатель
                </Card.Header>
                <Card.Body className='noBorder'>
                    <Col>
                        <Row>
                            <IntegrationSelect data={integrations} setSelect={setEnableIntegrF} />
                        </Row>

                        <Row>
                            {enableIntegr !== null && enableIntegr !== undefined ?
                                enableIntegr.typeName === "amoCRM" ?
                                    <Col>
                                        <Row className='mt-2'>
                                            <Form.Group>
                                                <Form.Label className=' m-1 ' >
                                                    Воронки продаж
                                                </Form.Label>
                                                <MultipleSelect data={integrations} setSelect={setPiplinesE} isAll={isAllpipline} switchToAll={switchPiplene} />
                                                <Form.Text className=' m-1 ' >
                                                    Выберите воронку/ки из которой/ых будут браться сделки
                                                </Form.Text>
                                            </Form.Group>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Form.Group>
                                                <Form.Label className=' m-1 ' >
                                                    Статусы воронок
                                                </Form.Label>
                                                <MultipleSelect data={integrations} setSelect={setStatusesE} isAll={isAllstatus} switchToAll={switchStatus} />
                                                <Form.Text className=' m-1 ' >
                                                    Выберите статус/ы из которого/ых будут браться сделки
                                                </Form.Text>
                                            </Form.Group>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Form.Group>

                                                <Form.Label className=' m-1 ' >
                                                    Менеджеры воронок
                                                </Form.Label>
                                                <MultipleSelect data={menegers} setSelect={setMenegersE} isAll={isAllmenegers} switchToAll={switchMenegers} />
                                                <Form.Text className=' m-1 ' >
                                                    Выберите менеджера/ов от которого/ых будут поступать сделки
                                                </Form.Text>
                                            </Form.Group>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Form.Group>
                                                <Form.Label className=' m-1 ' >
                                                    Время расчёта
                                                </Form.Label>


                                                <Form.Text className=' m-1 ' >
                                                    Выберите время когда будет произведён
                                                </Form.Text>
                                            </Form.Group>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Form.Group>
                                                <Form.Label className=' m-1 ' >
                                                    Формат вывода данных
                                                </Form.Label>
                                                <IntegrationSelect data={dataFormat} setSelect={setDataFormatE} />
                                                <Form.Text className=' m-1 ' >
                                                    Выберите формат подсчёта данных
                                                </Form.Text>
                                            </Form.Group>
                                        </Row>
                                    </Col>
                                    : <div className='m-2'>Здесь ничего нету</div> :
                                <div className='m-2'>Выберите интергацию</div>}
                        </Row>
                    </Col>
                </Card.Body>
                <Card.Footer className='cardFooterContainer mt-2'>
                    <div className='cardFooter'>
                        <Button onClick={() => save()}>
                            Сохранить
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default NewIndicator;