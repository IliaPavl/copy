import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
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

    PageServise.setLastPage()

    const search = (seachMessege) => {
        ResultHttpServise.searchClientsResult(seachMessege).then((respons) => {
            let k = ResultServise.setRows(respons.data)
            if (k.length === 0) {
                toast.warning("No one indicator none exist");
            }
            setRowsTable(k)
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    };

    async function setTableResult() {
        setHeaderTable(ResultServise.setHeader())
        ResultHttpServise.getAllClientsResult().then((respons) => {
            let k = ResultServise.setRows(respons.data)
            if (k.length === 0) {
                toast.warning("No one indicator none exist");
            }
            setRowsTable(k)
        }).catch((error) => {
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
        setTableResult();
    }, []);


    useEffect(() => {
    }, [box]);

    useEffect(() => {
    }, [sortV]);

    const [chartL,setL] =useState(true)

    async function sw(){
        setL(!chartL)
    }

    return (
        <Container>
            <Card className={"border-1 m-1"} >
                <Card.Header>
                    <div style={{ float: "right" }}>
                        Chart
                    </div>
                </Card.Header>
                <Card.Body >
                    <Row>
                        <LineChart data={rowsTable} sw={chartL}/>
                    </Row>
                    <Row>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                            <ToggleButton id="tbg-radio-1" value={1} variant='outline-primary' onClick={() => sw()}>
                                Line
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-2" value={2} variant='outline-primary' onClick={() => sw()}>
                                Bar
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                </Card.Body>
            </Card>
            <Card className={"border-1 m-1"}>
                <Card.Header>
                    <div style={{ float: "right" }}>
                        IndicatorResult
                    </div>
                </Card.Header>
                <Card.Body>
                    <TableBootsTrap setBox={setBox} head={headerTable} rows={rowsTable} sorting={sorting} search={search} />
                    <br />
                </Card.Body>
            </Card>
        </Container>

    );
};


export default React.memo(IndicatorResult);