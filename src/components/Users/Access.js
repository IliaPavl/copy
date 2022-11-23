import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Table } from 'react-bootstrap';
import TableHead from '../UI/BootstratTable/TableHead';
import '../UI/CSS/componentCss.css';
import "./profile.css";

const Access = ({ show, handleClose, links, saveChenge }) => {
    let [l, setL] = useState([]);
    const title = { title: "Path" };
    const monitor = { title: "Monitor" };
    const type = { title: "Type" };
    const [head, setHead] = useState([])
    async function click() {
        saveChenge(l);
        handleClose();
    }
    useEffect(() => {
    }, [head])

    useEffect(() => {
    }, [l])


    useEffect(() => {
        let maxValue = 0;
        let header=[];
        links.forEach(link => { if(link.path.length>maxValue) {maxValue=link.path.length}})
        for(let i = 0;i<maxValue;i++)
        header.push(title);
        header.push(monitor);
        header.push(type);
        setHead(header);
        setL(links);
    }, [links])

    function switchCh(value) {
        if (value === 1)
            return 0;
        else
            return 1;
    }

    async function switchLink(link) {
        setL(l.map(item =>
            JSON.stringify(link) === JSON.stringify(item)
                ? { ...item, checked: switchCh(item.checked) }
                : item
        ))
    }

    let number = 1;

    function plus() {
        number++;
        return number;
    }
    let [sortV, setSortV] = useState('');

    useEffect(() => {
    }, [sortV]);

    const sorting = (sortValue) => {
        setSortV(sortValue)
        if (sortV === sortValue) {
            setL([...l].sort(function (a, b) {
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
            setL([...l].sort(function (a, b) {
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

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Access monitors for user</Modal.Title>
            </Modal.Header>
            <Modal.Body className='accessOv'>
                <Form>
                    <Col>
                        <Table variant='table-bordered table-hover' style={{ height: 70 }} className={"scrollTable"}>
                            <TableHead values={head} withCheack={true} sorting={sorting} />
                            <tbody className="table-light">
                                {l.map(value => (
                                    <tr>
                                        <td>
                                            {value.checked === 1 ?
                                                <Form.Check
                                                    checked
                                                    type={'switch'}
                                                    key={plus()}
                                                    onChange={() => {
                                                        switchLink(value);
                                                    }}
                                                /> :
                                                <Form.Check
                                                    type={'switch'}
                                                    key={plus()}
                                                    onChange={() => {
                                                        switchLink(value);
                                                    }}
                                                />}
                                        </td>
                                        {value.path.map(value => <td >{value}</td>)}
                                        <td >{value.name}</td>
                                        <td >{value.type}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => click()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Access;