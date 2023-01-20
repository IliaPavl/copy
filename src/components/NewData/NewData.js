import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import InputPatternService from '../../servise/funtionService/InputPatternService';
import ResultServise from '../../servise/funtionService/ResultServise';
import ResultHttpServise from '../../servise/httpServise/ResultHttpServise';
import '../Trends/Colors.css';
import '../Trends/GroupTrend.css';
import TableBootsTrap from '../UI/BootstratTable/TableBootsTrap';
import './NewData.css';

const NewData = () => {
    let [headerTable, setHeaderTable] = useState([]);
    let [rowsTable, setRowsTable] = useState([]);
    let [formData, setFormData] = useState('');
    let [sortV, setSortV] = useState('');
    let [errorP, setErrorP] = useState('');
    let [errorPE, setErrorPE] = useState('');
    let [value, setValue] = useState(0);
    let [comment, setComment] = useState('');
    let [localUrl, setUrl] = useState()
    let [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        let url = window.location.pathname.split('/');
        setUrl(url);
        setHeaderTable(ResultServise.setHeader())
        ResultHttpServise.getIndicatorValues(url).then((respons) => {
            console.log(respons.data);
            if (respons.data.sessionStatus !== 3) {
                setRowsTable(ResultServise.setRows(respons.data.chartData));
                setFormData(respons.data);
                setIsLoaded(true);
            } else
                setIsLoaded(false);
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }, [])


    const sorting = (sortValue) => {
        setSortV(sortValue)
        if (sortV === sortValue) {
            setRowsTable([...rowsTable].sort(function (a, b) {
                if (b[sortValue] > a[sortValue]) {
                    return 1;
                }
                if (b[sortValue] < a[sortValue]) {
                    return -1;
                }
                return 0;
            }))
            setSortV(sortValue + '1')
        } else {
            setRowsTable([...rowsTable].sort(function (a, b) {
                if (a[sortValue] > b[sortValue]) {
                    return 1;
                }
                if (a[sortValue] < b[sortValue]) {
                    return -1;
                }
                return 0;
            }))
        }
    };
    async function setP(value) {
        let err = InputPatternService.valueIndicator(value);
        console.log(err)
        if (err !== '')
            setErrorP(err);
        else setErrorP('');
        setValue(value);
    }

    async function click() {
        if (errorP === '') {
            setErrorPE('');
            ResultHttpServise.setIndicatorValues(localUrl, value, comment).then((data) => {
                toast.success("значения сохранены");
            }).catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            })
        } else {
            setErrorPE(errorP);
            toast.warning("Проверьте введённые вами данные");
        }
    }

    return (
        <>
            {isLoaded === false ?
                <Container className='cardErrorData'>
                    <Row className='divErrorData'>
                        <h5>
                            Время работы сессии истекло!
                        </h5>
                    </Row>

                </Container>
                :
                <Container className={"mt-2 cardNewData"}>
                    <Card>
                        <Card.Header>
                            <span>
                                <h5>
                                    {formData.Lenght !== 0 ? <>"{formData.clientIndName}", {formData.unit}</> : <></>}
                                </h5>
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush" >
                                <ListGroup.Item key={"8"} className={'accordionItem'}>
                                    <span >
                                        <h6>Таблица результатов показателя
                                        </h6>
                                    </span>
                                    <div className='newDataTable'>
                                        <TableBootsTrap head={headerTable} rows={rowsTable} sorting={sorting} withSearch={false} withCheack={false} />
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item key={"9"} className={'accordionItem mt-3'}>
                                    <InputGroup.Text >
                                        {formData.Lenght !== 0 ? <>{formData.memDescription}, {formData.unitM}</> : <></>}
                                    </InputGroup.Text>
                                    <InputGroup >
                                        <InputGroup.Text >
                                            {formData.startDate}
                                        </InputGroup.Text>
                                        <Form.Control
                                            value={value}
                                            aria-describedby="basic-addon1"
                                            className={errorPE === '' ? '' : 'modalError'}
                                            onChange={(e) => { setP(e.target.value) }}
                                        />
                                    </InputGroup>
                                    {errorPE === '' ? <></> :
                                        <Form.Text muted>
                                            <span className='modalTextError'>  {errorPE}</span>
                                        </Form.Text>}

                                    <FloatingLabel controlId="floatingTextarea2" label="Комментарий" className='mt-3'>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Коментарий к показателю"
                                            style={{ height: '100px' }}
                                            onChange={(e) => { setComment(e.target.value) }}
                                        />
                                    </FloatingLabel>
                                </ListGroup.Item>
                            </ListGroup>
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
            }
        </>
    );
};

export default NewData;