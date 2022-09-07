import React, { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageServise from '../../servise/funtionService/PageServise';
import ResultServise from '../../servise/funtionService/ResultServise';
import ResultHttpServise from '../../servise/httpServise/ResultHttpServise';
import TableBootsTrap from "../UI/BootstratTable/TableBootsTrap";

const IndicatorResult = () => {
    let [headerTable, setHeaderTable] = useState([])
    let [rowsTable, setRowsTable] = useState([])
    let [sortV, setSortV] = useState('');
    let [box, setBox] = useState([])

    PageServise.setLastPage()

    const search = (seachMessege) => {
        ResultHttpServise.searchClientsResult(seachMessege).then((respons) => {
            let k=ResultServise.setRows(respons.data)
            if(k.length === 0){
                toast.warning("No one indicator none exist");
            }
            setRowsTable(k)
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    };

    async function setTableResult() {
        setHeaderTable(ResultServise.setHeader())
        ResultHttpServise.getAllClientsResult().then((respons) => {
            let k=ResultServise.setRows(respons.data)
            if(k.length === 0){
                toast.warning("No one indicator none exist");
            }
            setRowsTable(k)
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

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

    useEffect(() => {
        setTableResult();
    }, []);

    async function deleteUser() {

    }

    useEffect(() => {
        deleteUser()
    }, [box]);

    useEffect(() => {
    }, [sortV]);



    return (
        <Card className={"border-1 m-1"}>
            <Card.Header>
                <div style={{ float: "left" }}>
                    IndicatorResult
                </div>
            </Card.Header>
            <Card.Body>
                <TableBootsTrap setBox={setBox} head={headerTable} rows={rowsTable} sorting={sorting} search={search} />
                <br />
            </Card.Body>
        </Card>
    );
};


export default React.memo(IndicatorResult);