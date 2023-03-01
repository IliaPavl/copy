import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import integrationService from "../../servise/httpServise/IntegrationService";
import IntegrationSelect from './Selects/IntegrationSelect';
import MultipleSelect from './Selects/MultipleSelect';
const NewIndicator = () => {
    const [integrations, setIntegrations] = useState([]);
    let [enableIntegr, setEnableIntegr] = useState();
    const [menegers, setMenegers] = useState([]);
    const [piplines, setPiplines] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const [statusesALL, setStatusesALL] = useState([]);
    const [type, setType] = useState([
        { value: 1, label: "чем больше, тем лучше" },
        { value: -1, label: "чем меньше, тем лучше" }
    ]);
    const [dateCalculate, setDateCalculate] = useState([
        { value: 1, label: "день" },
        { value: 2, label: "неделя" },
        { value: 3, label: "месяц" },
        { value: 4, label: "год" },
        { value: -1, label: "прощлый день" },
        { value: -2, label: "прошлая неделя" },
        { value: -3, label: "прошлый месяц" },
        { value: -4, label: "прошлый год" },
    ]);
    const [dataFormat, setDataFormat] = useState([
        { value: "quantity", label: "Колличество" },
        { value: "summ", label: "Сумма сделок" },
        { value: "average", label: "Средняя сумма сделок" }
    ]);

    let [name, setName] = useState("");
    let [comment, setComment] = useState("");
    let [typeE, setTypeE] = useState([]);
    let [piplinesE, setPiplinesE] = useState([]);
    let [statusesE, setStatusesE] = useState([]);
    let [dateCalculateE, setDateCalculateE] = useState([]);
    let [menegersE, setMenegersE] = useState([]);
    let [dataFormatE, setDataFormatE] = useState([]);


    let [isAllmenegers, setIsAllmenegers] = useState('false');
    let [isAllpipline, setIsAllpipline] = useState('false');
    let [isAllstatus, setIsAllstatus] = useState('false');

    useEffect(() => {
        if (piplinesE.length !== 0) {
            let setData = [];
            statusesALL.forEach((statuses) => {
                statuses.forEach((status) => {
                    if (status.id_pipeline === piplinesE.value)
                        setData.push(status);
                })
            })
            setStatuses(setData);
        }
        else {
            setStatuses([])
        }
        if (isAllpipline === "true") {
            let setData = [];
            piplines.forEach((pipe) => {
                statusesALL.forEach((statuses) => {
                    statuses.forEach((status) => {
                        if (status.id_pipeline === pipe.value)
                            setData.push(status);
                    })
                })
            })
            setStatuses(setData);
        }
    }, [piplinesE, isAllpipline])

    useEffect(() => {
        integrationService.getIntegrationList().then(data => {
            data.data.map(item => {
                item.value = item.id_integration;
                item.label = item.nameIntegration;
            }
            )
            setIntegrations(data.data);
        })
    }, [])

    async function setEnableIntegrF(e) {
        setEnableIntegr(e);
        toast.promise(
        integrationService.getAmoData(e.id_integration).then((response) => {
            setPiplines(response.data.pipelines);
            setMenegers(response.data.users);
            setStatusesALL(response.data.statuses);
            toast.success("Данные загружены")
        }).catch((ex) => console.log(ex)), {
            pending: "Please wait... ",
        });
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
    function isStatusPipeline() {
        let isStatus = [];
        let p = [];
        let s = [];

        if (isAllpipline !== "true")
            p = piplinesE
        else
            p = piplines;
        if (isAllstatus !== "true")
            s = statusesE
        else {
            p.forEach((pipe) => {
                statusesALL.forEach((statuses) => {
                    statuses.forEach((status) => {
                        if (status.id_pipeline === pipe.value)
                            s.push(status);
                    })
                })
            })
        }
        p.forEach(pipe => {
            for (let x = 0; x < s.length; x++) {
                if (pipe.value === s[x].id_pipeline) {
                    isStatus.push(true);
                    break;
                }
            }
        })
        if (isStatus.length !== p.length)
            return false;
        else
            return true;
    }

    async function save() {
        for (let x = 0; x < 1; x++) {
            if (name === "") { toast.warning("Создайте имя для показателя"); break; }
            if (comment === "") { toast.warning("Создайте комментарий для показателя"); break; }
            if (dateCalculateE.length === 0) { toast.warning("Выберите время расчёта"); break; }
            if (piplinesE.length === 0)
                if (isAllpipline === "false") { toast.warning("Выберите воронку"); break; }
            if (statusesE.length === 0)
                if (isAllstatus === "false") { toast.warning("Выберите статус воронки"); break; }
            if (menegersE.length === 0)
                if (isAllmenegers === 'false') { toast.warning("Выберите менеджеров"); break; }
            if (dateCalculateE.length === 0) { toast.warning("Выберите время расчёта"); break; }
            if (dataFormatE.length === 0) { toast.warning("Выберите формат вывода данных"); break; }
            if (typeE.length === 0) { toast.warning("Выберите тип показателя"); break; }
            if (isStatusPipeline()) {
                let pipe, meneger, status;
                if (isAllstatus === "true")
                    status = statuses;
                else
                    status = statusesE;

                if (isAllmenegers === "true")
                    meneger = menegers;
                else
                    meneger = menegersE;

                if (isAllpipline === "true")
                    pipe = piplines;
                else
                    pipe = piplinesE;
                let filter = {
                    pipelines: pipe,
                    menegers: meneger,
                    statuses: status
                }
                let data = {
                    name: name,
                    comment: comment,
                    filter: filter,
                    type: typeE,
                    dataFormat: dataFormat,
                    dateCalculate: dateCalculateE
                }

                toast.promise(
                    integrationService.newIngicator(JSON.stringify(data), enableIntegr.id_integration).then((response) => {
                        toast.success("Сохранено");
                    }).catch((error) => {
                        let message = error.request.responseText.split('"');
                        toast.error(message[3]);
                    }), {
                    pending: "Please wait... ",
                })

            }
            else
                toast.warning("Воронки и их статусы не совпадают")
        }
    }

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
                                                    Название
                                                </Form.Label>
                                                <FormControl value={name} onChange={(e) => setName(e.target.value)} />

                                            </Form.Group>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Form.Group>
                                                <Form.Label className=' m-1 ' >
                                                    Комментарий
                                                </Form.Label>
                                                <Form.Control as="textarea" value={comment} onChange={(e) => setComment(e.target.value)} />
                                            </Form.Group>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Form.Group>
                                                <Form.Label className=' m-1 ' >
                                                    Воронки продаж
                                                </Form.Label>
                                                <IntegrationSelect data={piplines} setSelect={setPiplinesE} />
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
                                                <MultipleSelect data={statuses} setSelect={setStatusesE} isAll={isAllstatus} switchToAll={switchStatus} />
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
                                                <IntegrationSelect data={dateCalculate} setSelect={setDateCalculateE} />
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
                                        <Row className='mt-2'>
                                            <Form.Group>
                                                <Form.Label className=' m-1 ' >
                                                    Тип показателя
                                                </Form.Label>
                                                <IntegrationSelect data={type} setSelect={setTypeE} />
                                                <Form.Text className=' m-1 ' >
                                                    Выберите тип показателя, больше - лучше или наоборот.
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