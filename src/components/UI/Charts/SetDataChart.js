import React, { useEffect, useState } from 'react';
import { Button, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DropdownMonth from '../DropDown/DropdownMonth';
import Loading from '../Loader/Loading';
import MyChart from './MyChart';

const SetDataChart = ({ chartData, titleChart, rowsName, options }) => {
    let [enableTypeChart, setEnableType] = useState('line');
    let [enableCustomData, setEnabled] = useState(false);
    let [buferData, setBuferData] = useState([]);
    let [series, setSeries] = useState([]);
    let [lastWeek, setLastWeek] = useState(0);
    let [customData, setCustomData] = useState([]);
    let [title, setTitle] = useState('');
    let [navigate, setNavigate] = useState(1);
    let [subTitle, setSubTitle] = useState('');
    let [hotMonth, setHotMonth] = useState('');
    let [navigatorChange, setNavigator] = useState(0);

    let [isSelect, setIsSelect] = useState(false);

    let [isPfone, setIsPfone] = useState(true)
    window.onresize = function (event) {
        if (event.target.innerWidth < 535)
            setIsPfone(true)
        else
            setIsPfone(false)
    };

    function setChartData() {

        if (chartData.length !== 0 && rowsName.length !== 0) {
            setCustomData(chartData);
            if (hotMonth.length !== 0) {
                let isMoth = true;
                chartData[0].values[chartData[0].values.length - 1].monthChartData.forEach(element => {
                    if (element.month === hotMonth.text) {
                        setSubTitle('Данные за ' + hotMonth.text)
                        setBuferData(element.monthChartData);
                        setSeriesLocal('dateCreate', enableTypeChart);
                        setNavigator(0);
                        isMoth = false;
                    }
                });
                if (isMoth) toast.warning("Нет данных в " + hotMonth.text)
                else {
                    setIsSelect(true);
                    setEnabled(true);
                }

            } else {
                setSubTitle("Последний год")
                navigateFunction(chartData, enableTypeChart, navigate);
                setEnabled(true);
            }
        }
    }

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

    async function navigateFunction(customData, enableTypeChart, navigate) {

        if (customData.length !== 0)
            if (navigate === 1) {
                setSubTitle('За все время')
                setBuferData(customData[0].values[customData[0].values.length - 1].monthChartData);
                setSeriesLocal('month', enableTypeChart);
                setNavigator(0);
            } else if (navigate === 2) {
                setSubTitle('Последний год')
                setBuferData(customData[0].values[customData[0].values.length - 1].monthChartData);
                setSeriesLocal('month', enableTypeChart);
                setNavigator(0);
            } else if (navigate === 3) {
                setSubTitle('За последний месяц')
                let lastMonth = customData[0].values[customData[0].values.length - 1].monthChartData.length;
                let value = customData[0].values[customData[0].values.length - 1].monthChartData[lastMonth - 1].monthChartData;
                setBuferData(value);
                setSeriesLocal('dateCreate', enableTypeChart);
                setNavigator(0);
            } else if (navigate === 4) {
                setSubTitle('За последнюю неделю')
                let lastMonth = customData[0].values[customData[0].values.length - 1].monthChartData.length;
                let value = customData[0].values[customData[0].values.length - 1].monthChartData[lastMonth - 1].monthChartData;
                setBuferData(value);
                setSeriesLocal('dateCreate', enableTypeChart);
                setNavigator(0);
                // let lastMonth=customData[0].values[customData[0].values.length - 1].monthChartData.length;
                // let value =  customData[0].values[customData[0].values.length - 1].monthChartData[lastMonth-1].monthChartData; 
                // let lastWeek = null;

                // setNavigator((1 - (lastMonth / ((customData[0].values[customData[0].values.length - 1].monthChartData.length - 1)))));
                // setBuferData(customData[0].values[customData[0].values.length - 1].monthChartData)
                // setSeriesLocal('dateCreate', enableTypeChart);
            }
            else setNavigator(0);
    }

    useEffect(() => {
        navigateFunction(customData, enableTypeChart, navigate);
        setHotMonth('');
        setIsSelect(false);
    }, [navigate])

    useEffect(() => {
        navigateFunction(customData, enableTypeChart, navigate);
    }, [enableTypeChart])

    useEffect(() => {
        setEnableType(options);
    }, [options])

    useEffect(() => {
        if (hotMonth.length !== 0) {
            let isMoth = true;
            customData[0].values[customData[0].values.length - 1].monthChartData.forEach(element => {
                if (element.month === hotMonth.text) {
                    setSubTitle('Данные за ' + hotMonth.text)
                    setBuferData(element.monthChartData);
                    setSeriesLocal('dateCreate', enableTypeChart);
                    setNavigator(0);
                    isMoth = false;
                }
            });
            if (isMoth) toast.warning("Нет данных в " + hotMonth.text)
            else
                setIsSelect(true)
        }
    }, [hotMonth])

    async function lm() {
        setSubTitle('За последний месяц')
        setNavigate(3);
        setBuferData(customData[0].monthChartData[customData[0].monthChartData.length - 1].monthChartData);
        setSeriesLocal('date', enableTypeChart);
        setNavigator(0);
    }
    useEffect(() => {
    }, [isPfone])

    useEffect(() => {
        if (window.innerWidth < 535)
            setIsPfone(true)
        else
            setIsPfone(false)
        window.onresize = function (event) {
            if (event.target.innerWidth < 535)
                setIsPfone(true)
            else
                setIsPfone(false)
        };
    }, [])

    useEffect(() => {
    }, [subTitle])

    useEffect(() => {
        let t = "";
        if (titleChart.length !== 0)
            titleChart.map((title) => {
                t += title;
            })
        setTitle(t)
    }, [titleChart])

    useEffect(() => {
        setChartData();
    }, [rowsName])

    useEffect(() => {
        setChartData();
    }, [chartData])

    return (
        <div>
            {enableCustomData ? <><MyChart enableTypeChart={enableTypeChart} title={title} data={buferData} navigatorChange={navigatorChange} series={series} subTitle={subTitle} /></> : <Loading />}
            <Row className='mb-2'>
                {isPfone ?
                    <Row>
                        <Row className='m-1'>
                            <DropdownMonth setEnable={setHotMonth} noSelectValue={"Select month"} isSelect={isSelect} />
                        </Row>
                        <Row className='m-1'>
                            <Button onClick={() => setNavigate(1)} size="lg" variant="primary" >  All time</Button>
                        </Row>
                        <Row className='m-1'>
                            <Button onClick={() => setNavigate(2)} size="lg" variant="primary" className='m-1'>  Last Year</Button>
                        </Row>
                        <Row className='m-1'>
                            <Button onClick={() => lm()} size="lg" variant="primary" className='m-1'>  Last month</Button>
                        </Row>
                        <Row className='m-1'>
                            <Button onClick={() => setNavigate(4)} size="lg" variant="primary" className='m-1'>  Last week</Button>
                        </Row>
                    </Row>
                    :
                    <ToggleButtonGroup type="checkbox" defaultValue={[1, 5]} className="mb-2">
                        <DropdownMonth setEnable={setHotMonth} noSelectValue={"Select month"} isSelect={isSelect} />
                        <ToggleButton id="tbg-check-1" value={2} onClick={() => setNavigate(1)} size="lg">
                            All time
                        </ToggleButton>
                        <ToggleButton id="tbg-check-2" value={3} onClick={() => setNavigate(2)} size="lg">
                            Last Year
                        </ToggleButton>
                        <ToggleButton id="tbg-check-3" value={4} onClick={() => lm()} size="lg">
                            Last month
                        </ToggleButton>
                        <ToggleButton id="tbg-check-3" value={5} onClick={() => setNavigate(4)} size="lg">
                            Last week
                        </ToggleButton>

                    </ToggleButtonGroup>}
            </Row>
        </div>
    );
};

export default SetDataChart;