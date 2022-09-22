import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DropdownMonth from '../DropDown/DropdownMonth';
import DropDownOutSucses from '../DropDown/DropDownOutSucses';
import MyChart from './MyChart';

const SetDataChart = ({ chartData, titleChart }) => {
    const types = [{ item: 'line' }, { item: 'column' }, { item: 'scatter' }, { item: 'area' }];
    let [enableTypeChart, setEnableType] = useState('line');
    let [enableCustomData, setEnabled] = useState(false);
    let [buferData, setBuferData] = useState([]);
    let [series, setSeries] = useState([]);
    let [allMonth, setAllMonth] = useState();
    let [numberMoth, setNumberMonth] = useState([]);
    let [lastWeek, setLastWeek] = useState(0);
    let [customData, setCustomData] = useState([]);
    let [title, setTitle] = useState('');
    let [navigate, setNavigate] = useState(1);
    let [subTitle, setSubTitle] = useState('');
    let nameMonth = [
        {
            text: "Январь",
            value: "1"
        },
        {
            text: "Февраль",
            value: "2"
        },
        {
            text: "Март",
            value: "3"
        },
        {
            text: "Апрель",
            value: "4"
        },
        {
            text: "Май",
            value: "5"
        },
        {
            text: "Июнь",
            value: "6"
        },
        {
            text: "Июль",
            value: "7"
        },
        {
            text: "Август",
            value: "8"
        },
        {
            text: "Сентябрь",
            value: "9"
        },
        {
            text: "Октябрь",
            value: "10"
        },
        {
            text: "Ноябрь",
            value: "11"
        },
        {
            text: "Декабрь",
            value: "12"
        }
    ];
    let formSeries = [
        {
            type: enableTypeChart,
            xKey: 'day',
            yKey: 'first',
            yName: 'NULL',
        },
        {
            type: enableTypeChart,
            xKey: 'day',
            yKey: 'all',
            yName: 'ALL',
        },
        {
            type: enableTypeChart,
            xKey: 'day',
            yKey: 'summ',
            yName: 'summ',
        },
        {
            type: enableTypeChart,
            xKey: 'day',
            yKey: 'avg',
            yName: 'AVG',
        },
    ];

    useEffect(() => {
    }, [subTitle])

    useEffect(() => {
        setTitle(titleChart)

    }, [titleChart])

    useEffect(() => {
        setSubTitle("Последний год")
        if (chartData.length !== 0) {
            let data = []
            let allMonth = 0;
            let nowMonth = 0;
            let lastDay;
            let lastYear;
            setLastWeek(0)
            for (let i in chartData) {
                let d = chartData[i].day.split('-');
                let dat = new Date(d[2], (d[1] - 1), d[0]);
                data.push(dat);
            }
            let lenghtDate = data.length;
            lastYear = data[lenghtDate - 1].getFullYear()
            let nowYear = lastYear;
            lastDay = data[lenghtDate - 1];
            let week = data[lenghtDate - 1];
            let numberMonth = [];
            let numberMonthClear = [];
            week.setDate(lastDay.getDate() - 7);
            let m = new Date(week.getFullYear() + "-" + (week.getMonth() + 1) + "-" + week.getDate());
            week.setDate(lastDay.getDate() + 7);
            let d = 0;
            for (let i = lenghtDate - 1; i >= 0; i--) {
                if (i === lenghtDate - 1) {
                    nowMonth = data[i].getMonth() + 1;
                    numberMonth.push(nowMonth);
                } else {
                    nowMonth = data[i].getMonth() + 1;
                    numberMonth.push(nowMonth);
                    if ((data[i].getMonth() + 1) === nowMonth) {
                        allMonth++;
                        numberMonthClear.push(nowMonth)
                    }
                }
                if (data[i] > m) {
                    d++;
                }
                if (data[i].getFullYear() !== nowYear) {
                    nowYear = data[i].getFullYear();
                }
            }
            numberMonthClear.reverse()
            setNumberMonth(numberMonthClear);
            setLastWeek(d);
            setAllMonth(allMonth);
            let customChartData = [];

            for (let y = 0; y <= lastYear - nowYear; y++) {
                let localDay = [];
                let localMonth = [];
                let YearNull = 0;
                let YearAll = 0;
                let YearSumm = 0;
                let YearAvg = 0;
                numberMonthClear.map(month => {
                    localDay = []
                    let allSum = 0;
                    let allAll = 0;
                    let allNull = 0;
                    let allAvg = 0;
                    for (let i = lenghtDate - 1; i >= 0; i--) {
                        if (data[i].getFullYear() === (lastYear - y) && data[i].getMonth() + 1 === month) {
                            localDay.push({
                                date: data[i].getDate() + "-" + (data[i].getMonth() + 1) + "-" + data[i].getFullYear(),
                                null: chartData[i].first,
                                summ: chartData[i].summ,
                                all: chartData[i].all,
                                avg: chartData[i].avg,
                            })
                            allSum += chartData[i].summ;
                            allAll += chartData[i].all;
                            allNull += chartData[i].first;
                            allAvg += chartData[i].avg;
                        }
                    }
                    YearAll += allAll;
                    YearAvg += allAvg;
                    YearNull += allNull;
                    YearSumm += allSum;
                    localDay.reverse();
                    localMonth.push({
                        month: nameMonth[Number(month) - 1].text,
                        allDays: localDay,
                        Allnull: allNull,
                        Allsumm: allSum,
                        Allall: allAll,
                        Allavg: allAvg,
                    })
                })
                customChartData.push(
                    {
                        year: (lastYear - y),
                        allMonth: localMonth,
                        yearAll: YearAll,
                        yearNull: YearNull,
                        yearSumm: YearSumm,
                        yearAvg: YearAvg,
                    })
            }
            setCustomData(customChartData);
            setBuferData(customChartData[0].allMonth);
            let names = ["Allnull", "Allall", "Allsumm", "Allavg"]
            setSeriesLocal(names, 'month', enableTypeChart);
            setEnabled(true);
        }
    }, [chartData])

    let [hotMonth, setHotMonth] = useState('');
    let [navigatorChange, setNavigator] = useState(0);

    async function setSeriesLocal(names, xValueName, enableTypeChart) {
        let localSeries = [];
        let name = '';

        for (let i = 0; i < formSeries.length; i++) {
            if (i == 0) {
                name = names[i];
            }
            else if (i == 1) {
                name = names[i];
            }
            else if (i == 2) {
                name = names[i];
            }
            else if (i == 3) {
                name = names[i];
            }
            localSeries.push({
                type: enableTypeChart,
                xKey: xValueName,
                yKey: name,
                yName: formSeries[i].yName,
            })
        }
        setSeries(localSeries)
    }

    async function navigateFunction(enableTypeChart, navigate) {
        if (customData.length !== 0)
            if (navigate === 1) {
                setSubTitle('За все время')
                setBuferData(customData[0].allMonth);
                let names = ["Allnull", "Allall", "Allsumm", "Allavg"]
                setSeriesLocal(names, 'month', enableTypeChart);
                setNavigator(0);
            } else if (navigate === 2) {
                setSubTitle('Последний год')
                setBuferData(customData[0].allMonth);
                let names = ["Allnull", "Allall", "Allsumm", "Allavg"]
                setSeriesLocal(names, 'month', enableTypeChart);
                setNavigator(0);
            } else if (navigate === 3) {
                setSubTitle('За последний месяц')
                setBuferData(customData[0].allMonth[allMonth - 1].allDays)
                let names = ["null", "all", "summ", "avg"]
                setSeriesLocal(names, 'date', enableTypeChart);
                setNavigator(0);
            } else if (navigate === 4) {
                setSubTitle('За последнюю неделю')
                setNavigator((1 - (lastWeek / ((customData[0].allMonth[allMonth - 1].allDays.length - 1)))));
                setBuferData(customData[0].allMonth[allMonth - 1].allDays)
                let names = ["null", "all", "summ", "avg"]
                setSeriesLocal(names, 'date', enableTypeChart);
            }
            else setNavigator(0);
    }

    async function set(value) {
        setEnableType(value.trim())
    }

    useEffect(() => {
        navigateFunction(enableTypeChart, navigate);
    }, [navigate])

    useEffect(() => {
        navigateFunction(enableTypeChart, navigate);
    }, [enableTypeChart])

    useEffect(() => {
        if (hotMonth.length !== 0) {
            let isMoth = true;
            for (let i in numberMoth) {
                if (Number(numberMoth[i]) === Number(hotMonth.value)) {
                    for (let n = 0; n < customData[0].allMonth.length; n++) {
                        if (customData[0].allMonth[n].month === hotMonth.text) {
                            setNavigator(0);
                            setSubTitle('Данные за ' + hotMonth.text)
                            setBuferData(customData[0].allMonth[n].allDays)
                            let names = ["null", "all", "summ", "avg"]
                            setSeriesLocal(names, 'date', enableTypeChart);
                            isMoth = false;
                        }
                    }
                }
            }
            if (isMoth) toast.warning("Нет данных в " + hotMonth.text)
        }
    }, [hotMonth])

    async function lm() {
        setSubTitle('За последний месяц')
        setNavigate(3);
        setBuferData(customData[0].allMonth[allMonth - 1].allDays);
        let names = ["null", "all", "summ", "avg"];
        setSeriesLocal(names, 'date', enableTypeChart);
        setNavigator(0);
    }

    return (
        <div>
            <Row className='mb-2'>
                <Row>
                <Col>
                    <DropDownOutSucses values={types} enabledStatus={enableTypeChart} setEnabledStatus={set} />
                </Col>
                <Col>
                    <DropdownMonth setEnable={setHotMonth} />
                </Col>
                </Row>
                <Row>
                <Col>
                    <Button onClick={() => setNavigate(1)}>За все время</Button>
                </Col>
                <Col>
                    <Button onClick={() => setNavigate(2)}>За последний год</Button>
                </Col>
                <Col>
                    <Button onClick={() => lm()}>За последний месяц</Button>
                </Col>
                <Col>
                    <Button onClick={() => setNavigate(4)}>За последнюю неделю</Button>
                </Col>
                </Row>
            </Row>
            {enableCustomData ? <><MyChart enableTypeChart={enableTypeChart} title={title} data={buferData} navigatorChange={navigatorChange} series={series} subTitle={subTitle} /></> : <></>}
        </div>
    );
};

export default SetDataChart;