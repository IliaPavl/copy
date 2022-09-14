import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const LineChart = ({ data }) => {

    data = data.sort((a, b) => {return new Date(b.ResultDate) - new Date(a.ResultDate)});
    const [chartData, setChartData] = useState({
        labels: data.map((d) => new Date(d.ResultDate).getUTCMonth()+':'+ new Date(d.ResultDate).getFullYear()),
        datasets: [
            {
                label: "Indicator result",
                data: data.map((d) => d.IndResult)
            }
        ]
    });

    async function setChart() {
        setChartData({
            labels: data.map((d) => new Date(d.ResultDate).getMonth()),
            datasets: [
                {
                    label: "Indicator result",
                    data: data.map((d) => d.IndResult)
                }
            ]
        })
    }

    useEffect(() => {
        if (chartData.labels.length === 0) {
            setChart()
            console.log(data.length)
        }
    }, [chartData])
    const [variant, setVariant] = useState(true)

    return (
        <>
        {variant ?<Line data={chartData} /> : <Bar data={chartData} />  }
        </>
        
    );
};

export default LineChart;