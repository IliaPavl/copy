import React, { useEffect, useState } from 'react';
import { Accordion, Card, Container, Nav, Row } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageServise from '../../servise/funtionService/PageServise';
import ResultServise from '../../servise/funtionService/ResultServise';
import ResultHttpServise from '../../servise/httpServise/ResultHttpServise';
import TableBootsTrap from "../UI/BootstratTable/TableBootsTrap";
import LineChart from '../UI/Charts/LineChart';

const IndicatorResult = () => {
    let [headerTable, setHeaderTable] = useState([])
    let [rowsTable, setRowsTable] = useState([])
    let [sortV, setSortV] = useState('');
    let [box, setBox] = useState([])
    let [page, setPage] = useState('');
    let [buferRow, setBufer] = useState([]);

    PageServise.setLastPage()

    const search = (seachMessege) => {
        ResultHttpServise.searchClientsResult(seachMessege).then((respons) => {
            let k = ResultServise.setRows(respons.data)
            if (k.length === 0) {
                toast.warning("No one indicator none exist");
            }
            setRowsTable(k)
            setBufer(k);
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    };

    async function setTableResult(url) {
        setHeaderTable(ResultServise.setHeader())
        ResultHttpServise.getAllClientsResult(url).then((respons) => {
            let k = ResultServise.setRows(respons.data)
            setRowsTable(k)
            setBufer(k);
        }).catch((error) => {
            setRowsTable(ResultServise.setRows(null))
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

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

    useEffect(() => {
        let url = window.location.pathname.split('/')[2]
        setPage(url);
        if (page !== '')
            setTableResult(page);
        else
            setTableResult(url);
    }, [page]);

    const [resultName, setResulName] = useState([]);




    function getData() {
        let data = [];
        let val = 0;
        for (let year = 2021; year < 2022; year++) {
            for (let month = 1; month <= 3; month++) {
                let sum = 0;
                for (let day = 1; day <= 29; day++) {
                    val = randomInteger(2, 55);
                    sum += val;
                    if (day < 29) {
                        data.push({
                            ClientInt: 1,
                            LastSession_ID: 1,
                            IndResult: val,
                            ResultDate: day + '-' + month + '-' + year,
                            ResultComment: '1'
                        })
                    }
                    else {
                        data.push({
                            ClientInt: 1,
                            LastSession_ID: 1,
                            IndResult: sum,
                            ResultDate: day + '-' + month + '-' + year,
                            ResultComment: '2'
                        })
                    }
                }
            }
        }
        return data;
    }

    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }


    useEffect(() => {
        setPage(window.location.pathname.split('/')[2]);
        setTableResult(window.location.pathname.split('/')[2]);
        ResultHttpServise.getNameResult().then((respons) => {
            setResulName(respons.data.nameResult)
            Object.entries(respons.data.nameResult).map((data) => {
                if (data[0] === window.location.pathname.split('/')[2])
                    setE(data[1])
            })
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }, []);

    let [enable, setE] = useState('');

    async function setEnabled(string) {
        Object.entries(resultName).map((data) => {
            if (data[0] === string) {
                setE(data[1])
                setPage(data[0]);
                setTableResult(data[0]);
            }
        })
    }

    useEffect(() => {
    }, [box]);

    useEffect(() => {
    }, [sortV]);

    const [chartL, setL] = useState(true)

    async function sw() {
        setL(!chartL)
    }

    async function setRange(monthStart, yearStart, monthEnd, yearEnd) {
        let dataCh = [];

        buferRow.map((buf) => {
            let date = new Date(buf.ResultDate);
            if (date.getFullYear() >= yearStart && date.getFullYear() <= yearEnd)
                if (date.getMonth() >= monthStart && date.getMonth() <= monthEnd)
                    dataCh.push(buf)

            console.log(date.getDate() + monthStart)
        })
        console.log(dataCh)
    }

    return (
        <Container>
            <Card className={"border-1 m-1"} >
                <Card.Header className='nav'>
                    <Nav justify variant="tabs" defaultActiveKey="/home">
                        {Object.entries(resultName).map((data) => (
                            <Nav.Item key={data[0]}>
                                <Nav.Link eventKey={data[0]} onClick={() => setEnabled(data[0])}> {data[1]}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </Card.Header>
                <Card.Body >
                    <Row>
                        <Card.Body ><h4> {enable}</h4></Card.Body>
                        <LineChart data={buferRow} sw={chartL} title={enable} />
                    </Row>

                </Card.Body>
            </Card>
            <Card className={"border-1 m-1 mb-5"}>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <div style={{ float: "right" }}>
                                IndicatorResult
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Card.Body>
                                <TableBootsTrap setBox={setBox} head={headerTable} rows={rowsTable} sorting={sorting} search={search} />
                                <br />
                            </Card.Body>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card>
        </Container>

    );
};


export default React.memo(IndicatorResult);