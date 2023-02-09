import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import integrationService from "../../servise/httpServise/IntegrationService";
import './indicatorCss.css';
import ModalSettings from './ModalSettings';
const IndicatorMember = () => {
    const [list, setList] = useState([]);
    const [info, setInfo] = useState()
    let [isPfone, setIsPfone] = useState(false)
    window.onresize = function (event) {
        if (event.target.innerWidth < 780)
            setIsPfone(true)
        else
            setIsPfone(false)
    };
    useEffect(() => {
        let u = window.location.pathname.split('/');
        integrationService.getIndicatorMemberList(u[3]).then(data => {
            setList(data.data.memberList);
            if (data.data.indicatorClients !== null)
                setInfo(data.data.indicatorClients[0]);
        })
        if (window.innerWidth < 780)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, [])
    useEffect(() => {
    }, [info])

    let number = 1;

    function plus() {
        number++;
        return number;
    }
    async function newIntegr() {

    }

    async function switchValue(link) {
        setList(list.map(item =>
            JSON.stringify(link) === JSON.stringify(item)
                ? { ...item, enable: !link.enable }
                : item
        ))
    }

    async function del() {
        let l = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].enable === true) {
                l += 1;
            }
        }
        if (l !== 0)
            toast.promise(
                integrationService.deleteIntegration(list).then((response) => {

                }).catch((error) => {
                    let message = error.request.responseText.split('"');
                    toast.error(message[3]);
                }), {
                pending: "Please wait... ",
            })
        else {
            toast.warning("Выберите показатель для удаления")
        }

    }
    async function edit(id) {
        setData(id);
        handleShow();
    }
    let [data, setData] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <><ModalSettings show={show} handleClose={handleClose} id_member={data} />
            <Container className='mt-3 mb-5'>

                <Card >
                    <Card.Header className='noBorder BlueBack CardHead'>
                        Настройки показателя
                    </Card.Header>
                    <Card.Body>
                        {isPfone ?
                            <>
                                <Row>
                                    <div className='containerFirst_P'>Индикатор:</div>
                                    <div className='containerSecond_P '>{info !== undefined ? info.nameIndicator : <></>}</div>
                                </Row>

                                <Row>
                                    <div className='containerFirst_P'>Описание: </div>
                                    <Form.Control as="textarea" readOnly='true' className='containerSecond_P' value={info !== undefined ? info.description : ''} />
                                </Row>
                                <Row>
                                    <div className='containerFirst_P'>Группа: </div>
                                    <div className='containerSecond_P'>{info !== undefined ? info.group : <></>}</div>
                                </Row>

                                <Row>
                                    <div className='containerFirst_P'>Статус: </div>
                                    <div className='containerSecond_P '>{info !== undefined ? info.status : <></>}</div>
                                </Row>
                                <Row>
                                    <div className='containerFirst_P'>Интервал: </div>
                                    <div className='containerSecond_P '>{info !== undefined ? info.interval : <></>}</div>
                                </Row>
                                <Row>
                                    <div className='containerFirst_P'>Период расчёта: </div>
                                    <div className='containerSecond_P '>{info !== undefined ? info.runPeriod : <></>}</div>
                                </Row>

                                <Row>
                                    <div className='containerFirst_P'>Ед.Изм.: </div>
                                    <div className='containerSecond_P '>{info !== undefined ? info.units : <></>}</div>
                                </Row>
                                <Row>
                                    <div className='containerFirst_P'>Формула: </div>
                                    <div className='containerSecond_P '>{info !== undefined ? info.formula : <></>}</div>
                                </Row>
                            </>
                            :
                            <>
                                <Row>
                                    <Col sm={6}>
                                        <Row>
                                            <div className='containerFirst'>Индикатор:</div>
                                            <div className='containerSecond name'>{info !== undefined ? <>{info.nameIndicator}</> : <></>}</div>
                                        </Row>

                                        <Row>
                                            <div className='containerFirst'>Описание: </div>
                                            <Form.Control as="textarea" readOnly='true' className='containerSecond description' value={info !== undefined ? info.description : ''} />
                                        </Row>

                                    </Col>
                                    <Col sm={2}>
                                        <Row>
                                            <div className='containerFirst unit_F'>Ед.Изм.: </div>
                                            <div className='containerSecond unit'>{info !== undefined ? <>{info.units}</> : <></>}</div>
                                        </Row>

                                    </Col >
                                    <Col sm={4}>
                                        <Row>
                                            <div className='containerFirst'>Статус: </div>
                                            <div className='containerSecond '>{info !== undefined ? <>{info.status}</> : <></>}</div>
                                        </Row>
                                        <Row>
                                            <div className='containerFirst'>Интервал: </div>
                                            <div className='containerSecond '>{info !== undefined ? <>{info.interval}</> : <></>}</div>
                                        </Row>
                                        <Row>
                                            <div className='containerFirst '>Период расчёта: </div>
                                            <div className='containerSecond '>{info !== undefined ? <>{info.runPeriod}</> : <></>}</div>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col sm={4}>
                                        <Row>
                                            <div className='containerFirst'>Группа: </div>
                                            <div className='containerSecond'>{info !== undefined ? <>{info.group}</> : <></>}</div>
                                        </Row>
                                    </Col>
                                    <Col sm={4}>
                                        <Row>
                                            <div className='containerFirst'>Формула: </div>
                                            <div className='containerSecond '>{info !== undefined ? <>{info.formula}</> : <></>}</div>
                                        </Row>
                                    </Col>
                                </Row>
                            </>

                        }
                    </Card.Body>
                    <Card.Body className='noBorder'>
                        <Col>
                            <Row>
                                <Button onClick={() => newIntegr()} className={isPfone ? 'buttonIntegation_P m-2' : 'buttonIntegation m-2'} disabled='true'>
                                    Новая переменная
                                </Button>
                                <Button className={isPfone ? 'buttonIntegation_P m-2' : 'buttonIntegation m-2'} onClick={() => del()} disabled='true'>
                                    Удалить переменную
                                </Button>
                            </Row>
                            <Row className={'scrollTable'}>
                                {list.length !== 0 ?
                                    <Table variant='table-bordered table-hover' style={{ height: 70 }} className={"scrollTable"}>
                                        <thead className="thead-dark ">
                                            <tr>
                                                <th>

                                                </th>
                                                <th>
                                                    Название
                                                </th>
                                                <th>
                                                    Ед.изм.
                                                </th>
                                                <th>
                                                    Описание
                                                </th>
                                                <th>
                                                    Внешнее название
                                                </th>
                                                <th>
                                                    Источник
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-light" key={plus()}>
                                            {list.map(list =>
                                                <tr key={plus()}>
                                                    <td className='enableContainer'>
                                                        <div className='enableDiv padding5'>
                                                            {list.enable === true ?
                                                                <Form.Check
                                                                    checked
                                                                    type={'checkbox'}
                                                                    key={plus()}
                                                                    className={isPfone ? 'swith_P' : 'swith'}
                                                                    onChange={() => {
                                                                        switchValue(list);
                                                                    }}
                                                                /> :
                                                                <Form.Check
                                                                    type={'checkbox'}
                                                                    key={plus()}
                                                                    className={isPfone ? 'swith_P' : 'swith'}
                                                                    onChange={() => {
                                                                        switchValue(list);
                                                                    }}
                                                                />}
                                                        </div>
                                                    </td>
                                                    <td onClick={() => edit(list.id)}>
                                                        {list.memName}
                                                    </td>
                                                    <td onClick={() => edit(list.id)}>
                                                        {list.units}
                                                    </td>
                                                    <td onClick={() => edit(list.id)}>
                                                        {list.memDescription}
                                                    </td>
                                                    <td onClick={() => edit(list.id)}>
                                                        {list.viewName}
                                                    </td>
                                                    <td onClick={() => edit(list.id)}>
                                                        {list.dataSource}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                    : <></>}
                            </Row>
                        </Col>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default IndicatorMember;