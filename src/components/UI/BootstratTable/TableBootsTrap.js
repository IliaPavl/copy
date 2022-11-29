import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Offcanvas, Row, Table } from 'react-bootstrap';
import UserProfileEdit from '../../Users/UserProfileEdit';
import '../CSS/componentCss.css';
import Loading from '../Loader/Loading';
import SearchWithButton from '../SearchForm/SearchWithButton';
import ButtonsTable from './ButtonsTable';
import TableHead from './TableHead';
import TableRow from './TableRow';

const TableBootsTrap = ({ head, rows, sorting, search, setBox, withSearch, withCheack, add }) => {
    let massiv = []
    let [withAdd, setAdd] = useState(false);
    function getBox(event) {
        const conf = window.confirm(`Are you sure?`);
        if (conf) {
            setBox(massiv)
        }
    }
    useEffect(() => {
        if (add !== null)
            setAdd(add);
    })

    function uncheck() {
        let uncheck = document.getElementsByTagName('input');
        for (let i = 0; i < uncheck.length; i++) {
            if (uncheck[i].type === 'checkbox') {
                uncheck[i].checked = false;
            }
        }
        massiv = [];
    }

    function cheackAll() {
        massiv = []
        let check = document.getElementsByTagName('input');
        for (let i = 0; i < check.length; i++) {
            if (check[i].type === 'checkbox') {
                check[i].checked = true;
                massiv.push(check[i].id);
            }
        }
    }

    const updateData = (value) => {
        massiv.includes(value) ?
            massiv.splice(massiv.indexOf(value), massiv.indexOf(value) + 1)
            :
            massiv.push(value)
    };

    let number = 1;

    function plus() {
        number++;
        return number;
    }
    const [showSettings, setShowSettings] = useState(false);
    const handleShow = () => setShowSettings(!showSettings);
    async function updateProfile() {
        return true;
    }
    return (
        <Container className='mt-2'>
            <Col>
                <Row>
                    {withSearch ?
                        <Col sm={5}>
                            <SearchWithButton backSearch={search} />
                        </Col>
                        : <></>}

                    <Col sm={3}>
                        <Row>
                            {withAdd ?
                                <Col >
                                    <Button  variant="info" className='m-1 ' onClick={handleShow}>Создать</Button>
                                </Col>
                                : <></>}

                            {withCheack ?
                                <Col >
                                    <ButtonsTable uncheck={uncheck} cheackAll={cheackAll} getBox={getBox} />
                                </Col>
                                : <></>}
                        </Row>
                    </Col>

                    <Offcanvas responsive={"xl"} show={showSettings} onHide={handleShow} placement={'end'} className={"offcanvas"}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Создать нового пользователя</Offcanvas.Title>
                        </Offcanvas.Header>
                        <div className={"scrollTable"}>
                        <UserProfileEdit isNew={true} update={updateProfile} />
                        </div>
                    </Offcanvas>
                </Row>
                <Row className={'scrollTable'}>
                    {rows.length ?
                        <Table variant='table-bordered table-hover' style={{ height: 70 }} className={"scrollTable"}>
                            <TableHead key={plus()} values={head} sorting={sorting} withCheack={withCheack} />
                            {rows.map((type) => (
                                <TableRow key={plus()} value={type} updateData={updateData} withCheack={withCheack} />
                            ))}
                        </Table> :
                        <Loading />
                    }
                </Row>
            </Col>
        </Container>
    );
};
export default React.memo(TableBootsTrap);