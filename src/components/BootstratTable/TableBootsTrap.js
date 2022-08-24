import React, {useEffect, useState} from 'react';
import {Container, Table, Col, Row, Button} from 'react-bootstrap';
import TableRow from './TableRow';
import TableHead from './TableHead';
import SearchWithButton from '../SearchForm/SearchWithButton';
import '../CSS/componentCss.css'

const TableBootsTrap = ({head, rows, switchData}) => {

    let [table, setTable] = useState([])

    useEffect(() => {
        setTable(rows)
    }, [rows]);

    let massiv = []

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

    const sorting = (sortValue) => {
        setTable([...table].sort((a, b) => a[sortValue].toString().localeCompare(b[sortValue].toString())))
    };

    const search = (seachMessege) => {
        console.log(seachMessege)
    };

    function getBox() {
        console.log(massiv);
    }

    return (
        <Container className='mt-2'>
            <Col>
                <Col>
                    <Button className="m-1 radius" onClick={() => switchData("Users")}>Пользователи</Button>
                    <Button className="m-1 radius" onClick={() => switchData("Clients")}>Клиенты</Button>
                </Col>
                <Row>
                    <Col><SearchWithButton backSearch={search}/></Col>
                </Row>
                <Col>
                    <Button className="m-1 radius" onClick={() => uncheck()}>uncheck</Button>
                    <Button className="m-1 radius" onClick={() => cheackAll()}>cheackAll</Button>
                    <Button className="m-1 radius" onClick={() => getBox()}>getBox</Button>
                </Col>
                <Row className={'scrollTable'}>
                    <Table variant='table-bordered table-hover'>
                        <TableHead values={head} sorting={sorting}/>
                        {table.length ?
                            table.map((type) => (
                                <TableRow key={type.id} value={type} updateData={updateData}/>
                            )) : <p> Нету значений</p>}
                    </Table>
                </Row>
            </Col>
        </Container>
    );
};
export default TableBootsTrap;