import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

const LineChart = ({ data, sw }) => {

    let chart1 = [];
    let chart2 = [];
    let chart3 = [];
    let chart4 = [];

    data = data.sort((a, b) => { return new Date(a.ResultDate) - new Date(b.ResultDate) });

    async function chartList() {
        chart1 = [];
        chart2 = [];
        chart3 = [];
        chart4 = [];
        let listData = data.map((d) => d.ResultDate);
        console.log(listData)
        for (let i = 0; i < listData.length; i++) {
            data.map((d) => {
                if (listData[i] === d.ResultDate) {
                    if (d.ResultComment === null)
                        chart1.push(d.IndResult);
                    else if (d.ResultComment === '1')
                        chart2.push(d.IndResult);
                    else if (d.ResultComment === '2')
                        chart3.push(d.IndResult);
                    else if (d.ResultComment === '3')
                        chart4.push(d.IndResult);
                }
            })
            if (chart1.length !== i + 1) {
                chart1.push(null);
            }
            if (chart2.length !== i + 1) {
                chart2.push(null);
            }
            if (chart3.length !== i + 1) {
                chart3.push(null);
            }
            if (chart4.length !== i + 1) {
                chart4.push(null);
            }
        }
    }

    const [chartData, setChartData] = useState({
        labels: str(),
        datasets: [
            {
                label: "Indicator result NULL",
                data: chart1,
                backgroundColor: 'rgb(255, 85, 0)'
            },
            {
                label: "Indicator result ALL",
                data: chart2,
                backgroundColor: 'rgb(0, 128, 255)'
            }, {
                label: "Indicator result SUM",
                data: chart3,
                backgroundColor: 'rgb(183, 0, 255)'
            }, {
                label: "Indicator result AVG",
                data: chart4,
                backgroundColor: 'rgb(255, 0, 0)'
            }
        ]
    });


    function str() {
        let m = []
        for (let n in data) {
            let month = new Date(data[n].ResultDate).getUTCMonth() + 1;
            m.push(new Date(data[n].ResultDate).getFullYear() + ":" + month)
        }
        return m;
    }

    async function setChart() {
        chartList().then(() =>
            setChartData({
                labels: str(),
                datasets: [
                    {
                        label: "Indicator result NULL",
                        data: chart1.map((d) => d),
                        backgroundColor: 'rgb(255, 85, 0)'
                    },
                    {
                        label: "Indicator result ALL",
                        data: chart2.map((d) => d),
                        backgroundColor: 'rgb(0, 128, 255)'
                    }, {
                        label: "Indicator result SUM",
                        data: chart3.map((d) => d),
                        backgroundColor: 'rgb(183, 0, 255)'
                    }, {
                        label: "Indicator result AVG",
                        data: chart4.map((d) => d),
                        backgroundColor: 'rgb(255, 0, 0)'
                    }
                ]
            })
        );
    }

    useEffect(() => {
        if (chartData.labels.length === 0) {
            setChart()
            console.log(data.length)
        }
    }, [chartData])


    return (
        <>
            {sw ? <Line data={chartData} /> : <Bar data={chartData} />}
        </>

    );
};

export default LineChart;