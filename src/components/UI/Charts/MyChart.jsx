import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import React, { useEffect, useState } from 'react';
import Loading from '../Loader/Loading';
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
                // position: 'bottom',
                // item: {
                //     paddingY: 15,
                // },
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

    useEffect(() => {
        setOptions(state.options);
    }, [series,data,subTitle,title,navigatorChange,enableTypeChart])

    return (
        <>
            <div className="wrapper">
                <AgChartsReact options={optionsChart} />
            </div>
        </>
    );
};

export default MyChart;