import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientServise from '../../servise/funtionService/ClientServise';
import UserServise from '../../servise/funtionService/UserServise';
import ClientHttpServise from '../../servise/httpServise/ClientHttpServise';
import TableBootsTrap from "../UI/BootstratTable/TableBootsTrap";
import "./profile.css";



const ListBook = ({ update }) => {
    let [headerTable, setHeaderTable] = useState([])
    let [rowsTable, setRowsTable] = useState([])
    let [sortV, setSortV] = useState('');

    async function switchData(data) {

        if (data === "Users") {
            setTableUsers()
        } else if (data === "Clients") {
            setTableClients()
        }

    }

    const search = (seachMessege) => {
        toast.promise(
            UserServise.findUsers(seachMessege).then(res => { if (res.length !== 0) setRowsTable(res) }), { pending: "Please wait... ", })
    };

    async function setTableUsers() {
        setHeaderTable(UserServise.setHeadUsers())
        UserServise.setRowsUsers().then(res => { setRowsTable(res); })
    }

    async function setTableClients() {
        setHeaderTable(ClientServise.setHeadClients())
        ClientServise.setRowsClients().then(res => setRowsTable(res))
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
        if (update)
            setTableUsers()
    }, [update])

    useEffect(() => {
        setTableUsers()
        if (window.innerWidth < 900)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, []);

    async function deleteUsers(box) {
        toast.promise(
            d(box), { pending: "Please wait... ", }
        );
    }
    async function d(box) {
        if (box.length !== 0) {
            ClientHttpServise.deleteUser(box).then((respons) => {
                toast.success(respons.data)
                setTableUsers()
            }).catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            })
        }
    }

    useEffect(() => {
    }, [sortV]);
    let [isPfone, setIsPfone] = useState(false)
    window.onresize = function (event) {
        if (event.target.innerWidth < 900)
            setIsPfone(true)
        else
            setIsPfone(false)
    };
    return (
        <div className={isPfone ? "userListPfone" : 'userListContainer'}>
            <TableBootsTrap withCheack={true} withSearch={true} setBox={deleteUsers} head={headerTable} rows={rowsTable} switchData={switchData} sorting={sorting} search={search} add={true} />
        </div>
    );
};

export default ListBook;