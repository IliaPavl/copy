import { AgChartsReact } from 'ag-charts-react';
import React, { useEffect, useState } from 'react';
import "./Wrapper.css";

const MyChart = ({ enableTypeChart, title, data, navigatorChange, series, subTitle }) => {
    let state = {
        options: {
            autoSize: true,
            title: {
                text: title,
                fontSize: 12,
            },
            subtitle: {
                text: subTitle,
            },
            theme: {

                overrides: {
                    cartesian: {
                        series: {
                            line: {
                                highlightStyle: {
                                    series: {
                                        dimOpacity: 0.2,
                                        strokeWidth: 4,
                                    },
                                },
                                marker: { enabled: true },
                            },
                        },
                    },
                }
            },
            data: data,
            series: series,
            axes: [
                {
                    type: 'category',
                    position: 'bottom',
                },
                {
                    type: 'number',
                    position: 'left',
                    nice: true,
                },
            ],
            legend: {
                enabled: false,
            },
            padding: {
                bottom: 30,
            },
            navigator: {
                enabled: true,
                height: 50,
                min: navigatorChange,
                max: 1,
                margin: 20,
                mask: {
                    fill: 'blue',
                    strokeWidth: 1,
                    fillOpacity: 0.1,
                },
                minHandle: {
                    width: 20,
                    height: 60,
                    gripLineGap: 4,
                    gripLineLength: 30,
                    strokeWidth: 1,
                },
                maxHandle: {
                    width: 20,
                    height: 60,
                    gripLineGap: 4,
                    gripLineLength: 30,
                    strokeWidth: 1,
                },
            },

        },
    };
    let [optionsChart, setOptions] = useState(state.options)

    useEffect(() => {
        setOptions(state.options);
    }, [series, data, subTitle, title, navigatorChange, enableTypeChart,state.options])

    return (
        <>
            <div className="wrapper chart">
                <AgChartsReact options={optionsChart} />
            </div>
        </>
    );
};

export default MyChart;