import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Offcanvas } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientServise from '../../servise/funtionService/ClientServise';
import UserServise from '../../servise/funtionService/UserServise';
import ClientHttpServise from '../../servise/httpServise/ClientHttpServise';
import TableBootsTrap from "../UI/BootstratTable/TableBootsTrap";
import UserProfileEdit from './UserProfileEdit';
import "./profile.css";



const ListBook = ({ update }) => {
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
            setBox([])
        }
    }

    useMemo(() => {

    }, [box, rowsTable]);

    useEffect(() => {
    }, [sortV]);
    const [showSettings, setShowSettings] = useState(false);
    const handleShow = () => {  setShowSettings(!showSettings) };
    async function updateProfile() {
        console.log("new")
        return true;
    }
    return (
        <div className='userListContainer'>
            <Col >
                <Button variant="info" className='m-1 ' onClick={() => handleShow()}>Создать</Button>
            </Col>
            <TableBootsTrap withCheack={true} withSearch={true} setBox={deleteUsers} head={headerTable} rows={rowsTable} switchData={switchData} sorting={sorting} search={search} add={true} />
            <Offcanvas responsive={"xl"} show={showSettings} onHide={handleShow} placement={'end'} className={"offcanvas"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Создать нового пользователя</Offcanvas.Title>
                </Offcanvas.Header>
                    <Offcanvas.Body>
                        <UserProfileEdit isNew={true} update={updateProfile} />
                    </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default ListBook;