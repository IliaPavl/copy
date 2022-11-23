import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, InputGroup, ListGroup, Modal, Row, Table } from 'react-bootstrap';
import { AiOutlineAreaChart, AiOutlineBarChart, AiOutlineDotChart, AiOutlineLineChart } from "react-icons/ai";
import MultiRangeSlider from "../UI/Range/multirangeslider";
import { RiArrowRightUpLine } from "react-icons/ri";
import ResultHttpServise from '../../servise/httpServise/ResultHttpServise';
import { toast } from 'react-toastify';



const ModalSettings = ({ show, handleClose, saveChenge, data, isAdmin }) => {
    let red = 0;
    let green = 100;
    
    let [l, setL] = useState([]);
    let [planRange, setPlan] = useState(data.indPlan)
    const [minValue, set_minValue] = useState(0);
    const [maxValue, set_maxValue] = useState(100);
    let [periodEnable, setPeriodEnable] = useState("Month")
    let [listPeriod, setListPeriod] = useState([{ id: 3, title: "Month" }, { id: 1, title: "Day" }, { id: 2, title: "Week" }, { id: 4, title: "Quarter" }, { id: 5, title: "Year" }])
    let [typeChart, setTypeChart] = useState(data.typeChart)

    async function click() {
        saveChenge(l, minValue, maxValue, planRange, periodEnable, typeChart, data.idResult);
        handleClose();
    }
    let number = 1;

    function plus() {
        number++;
        return number;
    }

    async function switchLink(link) {
        setL(l.map(item =>
            JSON.stringify(link.idUser) === JSON.stringify(item.idUser)
                ? { ...item, enable: switchCh(item.enable) }
                : item
        ))
    }
    function switchCh(value) {
        if (value === true)
            return false;
        else
            return true;
    }
    useEffect(() => {
    }, [data])

    useEffect(() => {
        if (show === true) {
            console.log(data.idResult);
            ResultHttpServise.getIndicatorSettings(data.idResult).then((data2) => {
                set_minValue(data2.data.percentRed);
                set_maxValue(data2.data.percentGreen);
                setPlan(data2.data.indPlan);
                setTypeChart(data2.data.diagType_ID);
                setPeriodEnable(data2.data.periodType);
            }).catch((error) => { toast.error(error)});
            setL(data.userAccessList);
        }
    }, [show])
    const [min,setMin] =useState(0);
    const [max,setMax] =useState(100);
    const handleInput = (e) => {
        if(e.maxValue - e.minValue <=12){
            console.log("!")
        }
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };
    return (
        <Modal show={show} onHide={() => handleClose()} >
            <Modal.Header closeButton>
                <Modal.Title>Access monitors for user</Modal.Title>
            </Modal.Header>
            <Modal.Body className='accessOv accordionItem'>
                {data.length !== 0 ?
                    <Container>
                        <ListGroup variant="flush" >
                            <ListGroup.Item key={data.idResult + "3"} className={'accordionItem'}>
                                <span><h5>Indicator settings</h5></span>
                                <ListGroup>
                                    <ListGroup.Item className='containerSlider'>
                                        <Form.Label>
                                            Range status values
                                        </Form.Label>
                                        <div className='mt-3'>
                                            <MultiRangeSlider
                                                min={min}
                                                max={max}
                                                ruler={false}
                                                barLeftColor='red'
                                                step={12}
                                                barRightColor='green'
                                                barInnerColor='yellow'
                                                minValue={minValue}
                                                maxValue={maxValue}
                                                onInput={(e) => {
                                                    handleInput(e);
                                                }}
                                            />
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='accordionItem'>
                                        <Form.Group controlId="formBasicPlan">
                                            <Form.Label className='textAccordionItem'>
                                                Plan for your indicator
                                            </Form.Label>
                                            <InputGroup >
                                                <InputGroup.Text id="basic-addon1">Plan</InputGroup.Text>
                                                <InputGroup.Text>{data.typeResult}</InputGroup.Text>
                                                <Form.Control
                                                    placeholder=""
                                                    aria-label=""
                                                    aria-describedby="basic-addon1"
                                                    value={planRange}
                                                    onChange={(e) => { setPlan(e.target.value) }}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </ListGroup.Item>
                                    <ListGroup.Item className='accordionItem'>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className='textAccordionItem'>
                                                Calculation period <RiArrowRightUpLine />
                                            </Form.Label>
                                            <Form.Select aria-label="Floating label select example" onChange={(e) => setPeriodEnable(e.target.value)}>
                                                {listPeriod.map(period => <option value={period.id}>{period.title} </option>)}
                                            </Form.Select>
                                        </Form.Group>
                                    </ListGroup.Item>
                                </ListGroup>
                            </ListGroup.Item>
                            <ListGroup.Item key={data.idResult + "1"} className={'accordionItem'}>
                                <span><h5>Chart settings</h5></span>
                                <Row className='m-3 '>
                                    {typeChart === 1 ? <AiOutlineLineChart className='chartSVGSettingsSet' /> : <AiOutlineLineChart onClick={() => setTypeChart(1)} className='chartSVGSettings' />}
                                    {typeChart === 2 ? <AiOutlineBarChart className='chartSVGSettingsSet' /> : <AiOutlineBarChart onClick={() => setTypeChart(2)} className='chartSVGSettings' />}
                                    {typeChart === 3 ? <AiOutlineDotChart className='chartSVGSettingsSet' /> : <AiOutlineDotChart onClick={() => setTypeChart(3)} className='chartSVGSettings' />}
                                    {typeChart === 4 ? <AiOutlineAreaChart className='chartSVGSettingsSet' /> : <AiOutlineAreaChart onClick={() => setTypeChart(4)} className='chartSVGSettings' />}
                                </Row>
                            </ListGroup.Item>
                            {isAdmin === true ?
                                <ListGroup.Item key={data.idResult + "2"} className={'accordionItem'}>
                                    <span><h5>Users settings</h5></span>
                                    <Form>
                                        <Col>
                                            <Table variant='table-bordered table-hover' style={{ height: 70 }}>
                                                <tbody className="table-light">
                                                    {l.map(value => (
                                                        <tr key={value.idUser}>
                                                            <td>
                                                                <Form.Check
                                                                    checked={value.enable}
                                                                    type={'switch'}
                                                                    key={plus()}
                                                                    onChange={() => {
                                                                        switchLink(value);
                                                                    }}
                                                                />
                                                            </td>
                                                            <td >{value.nameUser}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Form>
                                </ListGroup.Item>
                                :
                                <></>
                            }

                        </ListGroup>
                    </Container>
                    : <></>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => click()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSettings;