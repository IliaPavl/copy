import React, { useEffect, useMemo, useState } from 'react';
import { Card } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import ClientServise from '../../servise/funtionService/ClientServise';
import UserServise from '../../servise/funtionService/UserServise';
import ClientHttpServise from '../../servise/httpServise/ClientHttpServise';
import UserHttpServise from '../../servise/httpServise/UserHttpServise';
import { COMPANY_LIST, USER_LIST } from '../../utils/const';
import TableBootsTrap from "../UI/BootstratTable/TableBootsTrap";
import { toast } from 'react-toastify';


const ListBook = () => {
    let [headerTable, setHeaderTable] = useState([])
    let [rowsTable, setRowsTable] = useState([])
    let [sortV, setSortV] = useState('');
    let [box, setBox] = useState([])


    async function switchData(data) {

        if (data === "Users") {
            setTableUsers()
        } else if (data === "Clients") {
            setTableClients()
        }

    }

    const search = (seachMessege) => {
        if (window.location.pathname === USER_LIST) {
            UserHttpServise.findUsers(seachMessege).then((respons) => {
                setRowsTable(UserServise.setRowsUsers(respons.data))
            }).catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            })
        } else if (window.location.pathname === COMPANY_LIST) {
            ClientHttpServise.findClient(seachMessege).then((respons) => {
                setRowsTable(ClientServise.setRowsClients(respons.data))
            }).catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            })
        }
    };

    async function setTableUsers() {
        setHeaderTable(UserServise.setHeadUsers())
        UserHttpServise.getAllUsers().then((respons) => {
            setRowsTable(UserServise.setRowsUsers(respons.data))
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })
    }

    async function setTableClients() {
        setHeaderTable(ClientServise.setHeadClients())
        ClientHttpServise.getAllClients().then((respons) => {
            setRowsTable(ClientServise.setRowsClients(respons.data))
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
        if (window.location.pathname === USER_LIST) {
            setTableUsers()
        } else if (window.location.pathname === COMPANY_LIST) {
            setTableClients()
        }
    }, []);

    async function deleteUsers(box) {
        console.log(box)
        if (box.length !== 0) {
            ClientHttpServise.deleteUser(box).then((respons) => {
                console.log(box.length)
                toast.success(respons.data)
                if (window.location.pathname === USER_LIST) {
                    setTableUsers()
                } else if (window.location.pathname === COMPANY_LIST) {
                    setTableClients()
                }
            }).catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            })
            setBox([])
        }
    }

    useMemo(() => {

    }, [box,rowsTable]);

    useEffect(() => {
    }, [sortV]);



    return (
        <Card className={"border-1 m-1"}>
            <Card.Header>
                <div style={{ float: "left" }}>
                    List
                </div>
            </Card.Header>
            <Card.Body>
                <TableBootsTrap setBox={deleteUsers} head={headerTable} rows={rowsTable} switchData={switchData} sorting={sorting} search={search} />
                <br />
            </Card.Body>
        </Card>
    );
};

export default ListBook;