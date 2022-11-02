import React, { useEffect, useState } from 'react';
import { Accordion, ButtonGroup, Card, Container, Nav, Navbar, Offcanvas, Row } from "react-bootstrap";
import { RiSettings3Line } from "react-icons/ri";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import ResultServise from '../../servise/funtionService/ResultServise';
import UserServise from '../../servise/funtionService/UserServise';
import LocalServise from '../../servise/httpServise/LocalServise';
import ResultHttpServise from '../../servise/httpServise/ResultHttpServise';
import TableBootsTrap from "../UI/BootstratTable/TableBootsTrap";
import SetDataChart from '../UI/Charts/SetDataChart';
import DropDownOutSucses from '../UI/DropDown/DropDownOutSucses';
import './indicator.css';



const IndicatorResult = () => {
    let location = useLocation();
    let [headerTable, setHeaderTable] = useState([])
    let [rowsTable, setRowsTable] = useState([])
    let [sortV, setSortV] = useState('');
    let [box, setBox] = useState([])
    let [page, setPage] = useState('');
    let [buferRow, setBufer] = useState([]);
    let [enable, setE] = useState([]);
    let [groupLinks, setGroupLinks] = useState([]);
    const [links, setLinks] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const handleShow = () => setShowSettings(!showSettings);
    const types = [{ item: 'line' }, { item: 'column' }, { item: 'scatter' }, { item: 'area' }];
    let [enableTypeChart, setEnableType] = useState('line');
    let [optionChart, setOptionChart] = useState('line');
    let [results, setResults] = useState([]);
    let [pathname, setPathName] = useState(window.location.pathname);

    let [isPfone, setIsPfone] = useState(true)
    window.onresize = function (event) {
        if (event.target.innerWidth < 535)
            setIsPfone(true)
        else
            setIsPfone(false)
    };
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



    const search = (seachMessege) => {
    };

    async function set(value) {
        setEnableType(value.trim())
    }

    async function setResultRows(obj) {
        if (results.length === 0) {
            let data = [];
            data.push(obj);
            setResults(data);
        } else {

            let isNew = true;
            results.forEach(result => {
                if (result.nameResult === obj.nameResult)
                    isNew = false
            })
            if (isNew) {
                setResults([...results, obj]);
            }
        }
    }

    async function setAllResults(url) {
        setHeaderTable(ResultServise.setHeader())
        ResultHttpServise.getAllClientsResult(url).then((respons) => {
            setResultRows(respons.data)
            setRowsTable(ResultServise.setRows(respons.data));
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

    async function setBuferRows(urls) {
        let buferChartData = [];
        urls.forEach(async (url) => {
            results.forEach(result => {
                if (result.nameResult === url.idResult)
                    buferChartData.push({ values: result.yearChartData, id: result.nameResult })
            })
        })
        for (let i in urls) {
            if (buferChartData[i].id === urls[i].idResult) {
                let name = urls[i].nameResult;
                let units = urls[i].typeResult;
                buferChartData[i].values.forEach(data => {
                    Object.assign(data, { [name]: data.yearSumma, units: units });
                    data.monthChartData.forEach(data => {
                        Object.assign(data, { [name]: data.monthSumma, units: units });
                        data.monthChartData.forEach(data => {
                            Object.assign(data, { [name]: data.dateSumma, units: units });
                        })
                    })
                })
                setBufer(buferChartData);
                break;
            }
        }
    }

    async function setTableResultList(urls) {
        setHeaderTable(ResultServise.setHeader())
        if (buferRow.length !== 0) {
            let isNew = true;

            urls.forEach(async (url) => {
                buferRow.forEach(result => {
                    if (result.id === url.idResult)
                        isNew = false
                })
            })
            if (isNew) {
                setBuferRows(urls);
            }
        } else {
            setBuferRows(urls);
        }
    }

    async function setEnabled(string) {
        (links).map((data) => {
            if (data.nameResult === string.nameResult) {
                let h = [];
                h.push(data.nameResult + ' ' + data.typeResult + ',')
                setE(h);
                setPage(data.idResult);
                setAllResults(data.idResult);
                let h2 = []
                h2.push(data)
                setGroupLinks(h2);
                return;
            }
        })
    }

    async function groupL(id) {
        let newItem = true;
        for (let i in groupLinks) {
            if (groupLinks[i].idResult === id.idResult) {
                newItem = false
                groupLinks.splice(i, 1)
                let enable2 = [];
                (groupLinks).map((data) => {
                    enable2.push(data.nameResult + ' ' + data.typeResult + ', ')
                })
                setE(enable2);
                setTableResultList(groupLinks);
                const ll = groupLinks.slice();
                setGroupLinks(ll);
            }
        }
        if (newItem)
            setGroupLinks([...groupLinks, id]);
    }

    async function groupALL(links) {
        const dat = Array.from(links);
        setGroupLinks(dat)
        let enable2 = [];
        (dat).map((data) => {
            enable2.push(data.nameResult + ' ' + data.typeResult + ', ')
        })
        setE(enable2);
        setTableResultList(dat);
    }

    async function setRange(monthStart, yearStart, monthEnd, yearEnd) {
        let dataCh = [];

        buferRow.map((buf) => {
            let date = new Date(buf.ResultDate);
            if (date.getFullYear() >= yearStart && date.getFullYear() <= yearEnd)
                if (date.getMonth() >= monthStart && date.getMonth() <= monthEnd)
                    dataCh.push(buf)
        })
    }

    useEffect(() => {
        let u = window.location.pathname.split('/')[2];
        setPage(u);
        //__________________________________________________________________________    
        if (LocalServise.getUserName() !== "error")
                UserServise.bars().then((data) => {
                    if (data.isAdmin) {
                        let dataL = data.linkMonitors;
                        for (let i in dataL) {

                            if (u === dataL[i].idResult) {
                                let h = [];
                                h.push(dataL[i].nameResult + ' ' + dataL[i].typeResult + ',');
                                setE(h);
                                let h2 = []
                                h2.push(dataL[i])
                                setGroupLinks(h2);

                                let setGroup = dataL[i].previosMonitor;
                                let setMonitor = dataL[i].nameMonitor;
                                let links = []

                                dataL.forEach(data => {
                                    if (setGroup === data.previosMonitor && setMonitor === data.nameMonitor)
                                        links.push(data)
                                })
                                setLinks(links);
                                break;
                            }
                        }
                    } else {
                        setLinks([]);
                    }
                }).catch(() => {
                    setLinks([]);
                });
        //__________________________________________________________________________   
        if (window.innerWidth < 535)
            setIsPfone(true)
        else
            setIsPfone(false)

    }, [location]);

    useEffect(() => {
        if (groupLinks.length !== 0) {
            let enable2 = [];
            (groupLinks).map((data) => {
                enable2.push(data.nameResult + ' ' + data.typeResult + ', ')
            })
            setE(enable2);
            setTableResultList(groupLinks);
        }
    }, [groupLinks, results])

    useEffect(() => {

    }, [buferRow, links, sortV, rowsTable])

    useEffect(() => {
        let url = window.location.pathname.split('/')[2]
        setPage(url);
        let isNew = true;
        if (page !== '') {
            results.forEach(result => {
                if (result.nameResult === page)
                    isNew = false
            })
            if (isNew)
                setAllResults(page);
        }
    }, [page]);

    return (
        <Container className={"mb-5"}>
            <Card className={"border-1 m-1"} >
                <Navbar expand="lg" className='Navigate'>
                    <Container>
                        <Navbar.Collapse id="basic-navbar-nav mt-2">
                            <Nav
                                className='Navigate me-auto justify-content-end'
                                justify variant="tabs" defaultActiveKey="/home"
                            >
                                {/* <Nav.Item key={"tfyghjklKLjhgftyu"} >
                            <ButtonGroup style={{ height: '100%' }}>
                                <Nav.Link eventKey={"fgvbhnjkml"} className='Link' onClick={() => groupALL(links)}> Все ссылки</Nav.Link>
                            </ButtonGroup>
                        </Nav.Item> */}
                                {(links).map((data) => (
                                    <Nav.Item key={uuidv4()} className='L'  >
                                        <ButtonGroup style={{ height: '100%' }} className='L'>
                                            <Nav.Link className='L' eventKey={data.nameResult} onClick={() => setEnabled(data)}> {data.nameResult}</Nav.Link>
                                            {/* <Button variant="info" onClick={() => groupL(data)}>+</Button> */}
                                        </ButtonGroup>
                                    </Nav.Item>
                                ))}

                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Nav><RiSettings3Line className='icon' onClick={handleShow} /></Nav>
                    </Container>
                </Navbar>
                <Card.Body >
                    <Row>
                        <SetDataChart chartData={buferRow} titleChart={enable} rowsName={groupLinks} options={enableTypeChart} />
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
                                <TableBootsTrap setBox={setBox} head={headerTable} rows={rowsTable} sorting={sorting} search={search} withSearch={false} withCheack={false} />
                                <br />
                            </Card.Body>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card>
            <Offcanvas show={showSettings} onHide={handleShow} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Chart settings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav.Item>
                        <DropDownOutSucses values={types} enabledStatus={enableTypeChart} setEnabledStatus={set} />
                    </Nav.Item>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};


export default React.memo(IndicatorResult);