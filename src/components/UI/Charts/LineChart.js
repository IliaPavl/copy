import React, { useEffect, useState } from 'react';
import SetDataChart from './SetDataChart';

const LineChart = ({ data, sw ,title}) => {

    let chart1 = [];
    let chart2 = [];
    let chart3 = [];
    let chart4 = [];



    data = data.sort((a, b) => {
        let d = a.ResultDate.split('-');
        let f = b.ResultDate.split('-');
        return new Date(d[2], d[1], d[0]) - new Date(f[2], f[1], f[0])
    });

    async function chartList(data) {
        chart1 = [];
        chart2 = [];
        chart3 = [];
        chart4 = [];
        let listData = data.map((d) => d.ResultDate);
        for (let i = 0; i < listData.length; i++) {
            data.map((d) => {
                if (listData[i] === d.ResultDate) {
                    if (d.ResultComment === null)
                        chart1.push(Number(d.IndResult));
                    else if (d.ResultComment === '1')
                        chart2.push(Number(d.IndResult));
                    else if (d.ResultComment === '2')
                        chart3.push(Number(d.IndResult));
                    else if (d.ResultComment === '3')
                        chart4.push(Number(d.IndResult));
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
        let outData = []
        for (let k = 0; k < listData.length; k++) {
            outData.push({ day: listData[k], first: chart1[k], all: chart2[k], summ: chart3[k], avg: chart4[k], });
        }

        return outData;
    }

    let [charts, setCharts] = useState([]);

    useEffect(() => {
        chartList(data).then((obj) => { setCharts(obj); })
    }, [data])

    return (
        <>
            <SetDataChart chartData={charts} titleChart={title}/>
        </>

    );
};

export default LineChart;