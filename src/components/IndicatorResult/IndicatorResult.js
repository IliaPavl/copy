import React, { useEffect, useState } from 'react';
import { Card, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    let [page, setPage] = useState('');
    let [buferRow, setBufer] = useState([]);
    let [enable, setE] = useState([]);
    let [groupLinks, setGroupLinks] = useState([]);
    //const [links, setLinks] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const handleShow = () => setShowSettings(!showSettings);
    let [enableTypeChart, setEnableType] = useState('');
    let [results, setResults] = useState([]);
    let [type, setType] = useState(2);

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

    async function set(value) {
        setEnableType(value.trim())
    }


    let [types, setTypes] = useState([]);

    useEffect(() => {
        if (types.length === 0)
            setTypes([{ id: 1, item: 'line' }, { id: 2, item: 'column' }, { id: 3, item: 'scatter' }, { id: 4, item: 'area' }])
        let u = window.location.pathname.split('/')[2];
        setPage(u);
        //__________________________________________________________________________
        if (LocalServise.getUserName() !== "error")
            UserServise.bars(u).then((data) => {
                if (data.isAdmin) {
                    let dataL = data.linkMonitors;
                    for (let i in dataL) {
                        if (u === dataL[i].idResult) {
                            ResultHttpServise.getIndicatorSettings(dataL[i].idResult).then((data2) => {
                                types.forEach(type => {
                                    if (type.id === data2.data.diagType_ID)
                                        setEnableType(type.item);
                                })
                            }).catch((error) => { toast.error(error) });

                            let h = [];
                            h.push(dataL[i].nameResult + ', ' + dataL[i].typeResult);
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
                            //setLinks(links);
                            break;
                        }
                    }
                } else {
                    // setLinks([]);
                }
            }).catch(() => {
                //setLinks([]);
            });
        //__________________________________________________________________________   
    }, [location, types]);

    async function setBuferData() {
        if (groupLinks.length !== 0) {
            let enable2 = [];
            (groupLinks).map((data) => (
                enable2.push(data.nameResult + ', ' + data.typeResult)
            ))
            setE(enable2);
            setHeaderTable(ResultServise.setHeader())
            if (buferRow.length !== 0) {
                let isNew = true;

                groupLinks.forEach(async (url) => {
                    buferRow.forEach(result => {
                        if (result.id === url.idResult)
                            isNew = false
                    })
                })
                if (isNew) {
                    let buferChartData = [];
                    groupLinks.forEach(async (url) => {
                        results.forEach(result => {
                            if (result.nameResult === url.idResult)
                                buferChartData.push({ values: result.yearChartData, id: result.nameResult })
                        })
                    })
                    for (let i in groupLinks) {
                        if (buferChartData[i].id === groupLinks[i].idResult) {
                            let name = groupLinks[i].nameResult;
                            let units = groupLinks[i].typeResult;
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
            } else {
                let b = [];
                groupLinks.forEach((url) => {
                    results.forEach(result => {
                        if (result.nameResult === url.idResult)
                            b.push({ values: result.yearChartData, id: result.nameResult })
                    })
                })
                setB(b);

            }
        }
    }
    let [buferChartData, setB] = useState([])

    useEffect(() => {
        if (buferChartData !== null)
            if (buferChartData !== undefined)
                if (buferChartData.length !== 0) {
                    for (let i in groupLinks) {
                        if (buferChartData[i].id === groupLinks[i].idResult) {
                            let name = groupLinks[i].nameResult;
                            let units = groupLinks[i].typeResult;
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
    }, [buferChartData])

    useEffect(() => {
        setBuferData();
    }, [groupLinks, buferRow, results])

    useEffect(() => {
        let url = window.location.pathname.split('/')[2]
        setPage(url);
        let isNew = true;
        if (page !== '') {
            results.forEach(result => {
                if (result.nameResult === page)
                    isNew = false
            })
            if (isNew) {
                setHeaderTable(ResultServise.setHeader())
                ResultHttpServise.getAllClientsResult(page + "/" + type).then((respons) => {

                    if (results.length === 0) {
                        let data = [];
                        data.push(respons.data);
                        setResults(data);
                    } else {
                        let isNew = true;
                        results.forEach(result => {
                            if (result.nameResult === respons.data.nameResult)
                                isNew = false
                        })
                        if (isNew) {
                            setResults([...results, respons.data]);
                        }
                    }
                    setRowsTable(ResultServise.setRows(respons.data.tableData));
                }).catch((error) => {
                    let message = error.request.responseText.split('"');
                    console.log(message[3])
                })
            }
        }
    }, [page, results]);

    useEffect(() => {

        if (page !== '') {
            setHeaderTable(ResultServise.setHeader())
            ResultHttpServise.getAllClientsResult(page + "/" + type).then((respons) => {
                let data = [];
                data.push(respons.data);
                setResults(data);
                setRowsTable(ResultServise.setRows(respons.data.tableData));
                let buferChartData = [];
                groupLinks.forEach(async (url) => {
                    data.forEach(result => {
                        if (result.nameResult === url.idResult)
                            buferChartData.push({ values: result.yearChartData, id: result.nameResult })
                    })
                })
                for (let i in groupLinks) {
                    if (buferChartData[i].id === groupLinks[i].idResult) {
                        let name = groupLinks[i].nameResult;
                        let units = groupLinks[i].typeResult;
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
            }).catch((error) => {
                let message = error.request.responseText.split('"');
                console.log(message[3])
            })
        }
    }, [type]);

    const [tableShow, setTableShow] = useState(false);
    const showTable = () => { setTableShow(!tableShow) }

    return (
        <Container className={"mb-5"}>
            <Card className={"border-1 m-1"} >
                <Navbar expand="lg" className='Navigate'>
                </Navbar>
                <SetDataChart setType={setType} chartData={buferRow} titleChart={enable} rowsName={groupLinks} options={enableTypeChart} showTable={showTable} />
            </Card>
            <Offcanvas show={tableShow} onHide={showTable} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Таблица результатов</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <TableBootsTrap head={headerTable} rows={rowsTable} sorting={sorting} withSearch={false} withCheack={false} />
                </Offcanvas.Body>
            </Offcanvas>
            <Offcanvas show={showSettings} onHide={handleShow} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Настройки графика</Offcanvas.Title>
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