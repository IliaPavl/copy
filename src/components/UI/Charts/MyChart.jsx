import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import React, { useEffect, useState } from 'react';
import "./Wrapper.css";

const MyChart = ({ enableTypeChart, title, data ,navigatorChange,series,subTitle}) => {

    let state = {
        options: {
            autoSize: true,
            title: {
                text: title,
                fontSize: 18,
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
                    title: {
                        text: '$',
                    },
                    nice: true,
                },
            ],
            legend: {
                position: 'bottom',
                item: {
                    paddingY: 15,
                },
            },
            padding: {
                bottom: 30,
            },
            navigator: {
                min: navigatorChange,
                max: 1
            },
        },
    };
    let [optionsChart, setOptions] = useState(state.options)

    useEffect(()=>{
    },[])

    useEffect(()=>{
        setOptions(state.options);
    },[series])

    useEffect(() => {
        setOptions(state.options)
    }, [data])
    useEffect(() => {
        setOptions(state.options)
    }, [subTitle])

    useEffect(() => {
        setOptions(state.options)
    }, [navigatorChange])
    useEffect(() => {
        setOptions(state.options)
    }, [enableTypeChart])

    return (
        <>
            <div className="wrapper">
                <AgChartsReact options={optionsChart} />
            </div>
        </>
    );
};

export default MyChart;