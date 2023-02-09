import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BsCalendarCheck, BsTable } from "react-icons/bs";
import { toast } from 'react-toastify';
import Loading from '../Loader/Loading';
import MyChart from './MyChart';


const SetDataChart = ({ chartData, titleChart, rowsName, options, showTable, setType }) => {
    let [enableTypeChart, setEnableType] = useState('');
    let [enableCustomData, setEnabled] = useState(false);
    let [buferData, setBuferData] = useState([]);
    let [series, setSeries] = useState([]);
    let [customData, setCustomData] = useState([]);
    let [title, setTitle] = useState('');
    let [navigate, setNavigate] = useState(1);
    let [subTitle, setSubTitle] = useState('');
    let [hotMonth, setHotMonth] = useState('');
    let [navigatorChange, setNavigator] = useState(0);

    let [isPfone, setIsPfone] = useState(true)
    window.onresize = function (event) {
        if (event.target.innerWidth < 535)
            setIsPfone(true)
        else
            setIsPfone(false)
    };

    useEffect(() => {
        if(options!=='')
        setEnableType(options);
    }, [options])

    useEffect(() => {
        
        async function setSeriesLocal(xValueName, enableTypeChart) {
            let localSeries = [];
            for (let i = 0; i < rowsName.length; i++) {
                localSeries.push({
                    type: enableTypeChart,
                    xKey: xValueName,
                    yKey: rowsName[i].nameResult,
                    yName: rowsName[i].nameResult,
                })
            }
            setSeries(localSeries)
        }
        if(options!=='')
        if (chartData.length !== 0 && rowsName.length !== 0) {
            setCustomData(chartData);
           
            if (hotMonth.length !== 0) {
                let isMoth = true;
                chartData[0].values[chartData[0].values.length - 1].monthChartData.forEach(element => {
                    if (element.month === hotMonth.text) {
                        setSubTitle('Данные за ' + hotMonth.text)
                        setBuferData(element.monthChartData);
                        setSeriesLocal('parseDate', enableTypeChart);
                        setNavigator(0);
                        isMoth = false;
                    }
                });
                if (isMoth) toast.warning("Нет данных в " + hotMonth.text)
                else {
                    setEnabled(true);
                }

            } else {
                setSubTitle("Последний год")
                if (customData.length !== 0)
                    if (navigate === 1) {
                        setSubTitle('За все время')
                        setType(2);
                        const data = [];
                        customData[0].values.forEach(el => el.monthChartData.forEach(el2 => data.push(el2)))
                        setBuferData(data);
                        setSeriesLocal('month', enableTypeChart);
                        setNavigator(0);
                    } else if (navigate === 2) {
                        setType(3);
                        setSubTitle('Последний год')
                        const data = [];
                        customData[0].values.forEach(el => el.monthChartData.forEach(el2 => data.push(el2)))
                        setBuferData(data);
                        setSeriesLocal('month', enableTypeChart);
                        setNavigator(0);
                    } else if (navigate === 3) {
                        setSubTitle('За последний месяц')
                        let lastMonth = customData[0].values[customData[0].values.length - 1].monthChartData.length;
                        let value = customData[0].values[customData[0].values.length - 1].monthChartData[lastMonth - 1].monthChartData;
                        setBuferData(value);
                        setSeriesLocal('parseDate', enableTypeChart);
                        setNavigator(0);
                    } else if (navigate === 4) {
                        setSubTitle('За последнюю неделю')
                        let lastMonth = customData[0].values[customData[0].values.length - 1].monthChartData.length;
                        let value = customData[0].values[customData[0].values.length - 1].monthChartData[lastMonth - 1].monthChartData;
                        setBuferData(value);
                        setSeriesLocal('parseDate', enableTypeChart);
                        setNavigator(0);
                    } else if (navigate === 5) {
                        setType(1);
                        setSubTitle('По умолчанию')
                        const data = [];
                        customData[0].values.forEach(el => el.monthChartData.forEach(el2 => data.push(el2)))
                        setBuferData(data);
                        setSeriesLocal('month', enableTypeChart);
                        setNavigator(0);
                    }
                    else setNavigator(0);
                setEnabled(true);
            }
        }
        if(options!=='')
        if (hotMonth.length !== 0) {
            let isMoth = true;
            customData[0].values[customData[0].values.length - 1].monthChartData.forEach(element => {
                if (element.month === hotMonth.text) {
                    setSubTitle('Данные за ' + hotMonth.text)
                    setBuferData(element.monthChartData);
                    setSeriesLocal('parseDate', enableTypeChart)
                    isMoth = false;
                }
            });
            if (isMoth) toast.warning("Нет данных в " + hotMonth.text)
        } else {
            setHotMonth('');
        }
    }, [hotMonth, customData, enableTypeChart, rowsName, chartData, navigate, setType])

    useEffect(() => {
        if (window.innerWidth < 535)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, [])

    useEffect(() => {
        let t = "";
        if (titleChart.length !== 0)
            titleChart.forEach((title) => {
                t += title;
            })
        setTitle(t)
    }, [titleChart])

    const [timeSettings, setTimeSettings] = useState(false);
    const clickTimeSettings = () => { setTimeSettings(!timeSettings) }

    return (
        <div>
            {enableCustomData ?
                <>
                    <MyChart enableTypeChart={enableTypeChart} title={title} data={buferData} navigatorChange={navigatorChange} series={series} subTitle={subTitle} />
                </>
                : <Loading />}
            <Row className='mb-2 m-2'>
                <Row className='settings_Controller'>
                    <div className='svgImgContainer'>
                        <BsTable className='svgImg' onClick={() => { showTable() }} />
                    </div>
                    <div className='svgImgContainerLast' onClick={() => { clickTimeSettings() }}>
                        <BsCalendarCheck className='svgImg' />
                    </div>
                    {timeSettings ?
                        <div >
                            <Col className='m-2'>
                                {/* <Row className='buttonContainer'>
                                    <DropdownMonth className={"settingsButton"} setEnable={setHotMonth} noSelectValue={"Выберите месяц"} isSelect={isSelect} />
                                </Row> */}
                                <Row className='buttonContainer'>
                                    <Button className={"settingsButton"} onClick={() => setNavigate(5)} variant="primary">По умолчанию</Button><br />
                                </Row>
                                <Row className='buttonContainer'>
                                    <Button className={"settingsButton"} onClick={() => setNavigate(2)} variant="primary">За предыдущий год</Button><br />
                                </Row>
                                <Row className='buttonContainer'>
                                    <Button className={"settingsButton"} onClick={() => setNavigate(1)} variant="primary" >За все время</Button><br />
                                </Row>
                                {/* <Row className='buttonContainer'>
                                    <Button className={"settingsButton"} onClick={() => lm()} variant="primary" >За последний месяц</Button><br />
                                </Row>
                                <Row className='buttonContainer'>
                                    <Button className={"settingsButton"} onClick={() => setNavigate(4)} variant="primary" >За последнюю неделю</Button><br />
                                </Row> */}
                            </Col>
                        </div>
                        : <></>}
                </Row>
            </Row>
        </div>
    );
};

export default SetDataChart;