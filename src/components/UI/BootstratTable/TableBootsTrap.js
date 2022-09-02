import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import '../CSS/componentCss.css';
import SearchWithButton from '../SearchForm/SearchWithButton';
import ButtonsTable from './ButtonsTable';
import TableHead from './TableHead';
import TableRow from './TableRow';

const TableBootsTrap = ({ head, rows, switchData, sorting, search, setBox }) => {
    let massiv = []
    function getBox(event) {
        const conf = window.confirm(`Are you sure?`);
        if (conf) {
            setBox(massiv)
        }
    }

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

    return (
        <Container className='mt-2'>
            <Col>
                <Row>
                    <Col><SearchWithButton backSearch={search} /></Col>
                </Row>
                <Col>
                    <ButtonsTable uncheck={uncheck} cheackAll={cheackAll} getBox={getBox} />
                </Col>
                <Row className={'scrollTable'}>
                    <Table variant='table-bordered table-hover'>
                        <TableHead values={head} sorting={sorting} />
                        {rows.length ?
                            rows.map((type) => (
                                <TableRow key={type.id} value={type} updateData={updateData} />
                            )) : <tbody><tr><td>Нету значений</td></tr></tbody>}
                    </Table>
                </Row>
            </Col>
        </Container>
    );
};
export default React.memo(TableBootsTrap);