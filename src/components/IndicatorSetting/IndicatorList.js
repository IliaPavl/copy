import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import integrationService from "../../servise/httpServise/IntegrationService";
import { INDICATOR_MEMBER, INEGTRATION_NEW } from '../../utils/const';

const IndicatorList = () => {
    const [list, setList] = useState([]);
    let [isPfone, setIsPfone] = useState(false)
    const navigate =useNavigate();
    window.onresize = function (event) {
        if (event.target.innerWidth < 780)
            setIsPfone(true)
        else
            setIsPfone(false)
    };
    useEffect(() => {
        integrationService.getIndicatorList().then(data => {
            setList(data.data);
        })
        if (window.innerWidth < 780)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, [])

    let number = 1;

    function plus() {
        number++;
        return number;
    }
    async function newIntegr() {
        navigate(INEGTRATION_NEW);
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
                    console.log(response.data);
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
    async function edit(id, name) {
        navigate(INDICATOR_MEMBER + "/" + id + "/" + name);
    }

    return (
        <Container className='mt-3'>
            <Card >
                <Card.Header className='noBorder BlueBack CardHead'>
                    Показатели
                </Card.Header>
                <Card.Body className='noBorder'>
                    <Col>
                        <Row>
                            <Button onClick={() => newIntegr()} className='buttonIntegation m-2' >
                                Новый показатель
                            </Button>
                            <Button className='buttonIntegation m-2' onClick={() => del()} disabled='true'>
                                Удалить показатель
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
                                                Статус
                                            </th>
                                            <th>
                                                Период расчёта, час
                                            </th>
                                            <th>
                                                Интервал расчёта
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-light" key={plus()}>
                                        {list.map(list =>
                                            <tr key={plus()}>
                                                <td className='enableContainer'>
                                                    <div className='enableDiv'>
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
                                                <td onClick={() => edit(list.idIndicator, list.nameIndicator)}>
                                                    {list.nameIndicator}
                                                </td>
                                                <td onClick={() => edit(list.idIndicator, list.nameIndicator)}>
                                                    {list.units}
                                                </td>
                                                <td onClick={() => edit(list.idIndicator, list.nameIndicator)}>
                                                    {list.status}
                                                </td>
                                                <td onClick={() => edit(list.idIndicator, list.nameIndicator)}>
                                                    {list.runPeriod}
                                                </td>
                                                <td onClick={() => edit(list.idIndicator, list.nameIndicator)}>
                                                    {list.interval}
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
    );
};

export default IndicatorList;