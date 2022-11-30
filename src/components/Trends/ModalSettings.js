import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, ListGroup, Modal, Row, Table } from 'react-bootstrap';
import { AiOutlineAreaChart, AiOutlineBarChart, AiOutlineDotChart, AiOutlineLineChart } from "react-icons/ai";
import { toast } from 'react-toastify';
import ResultHttpServise from '../../servise/httpServise/ResultHttpServise';



const ModalSettings = ({ show, handleClose, saveChenge, data, isAdmin }) => {
    let [redPlan, setRedPlan] = useState(0);
    let [greenPlan, setGreenPlan] = useState(0);
    let [l, setL] = useState([]);
    let [planRange, setPlan] = useState(data.indPlan)
    let [minValue, set_minValue] = useState();
    let [maxValue, set_maxValue] = useState();
    let [periodEnable, setPeriodEnable] = useState("Month")
    //let [listPeriod, setListPeriod] = useState([ { id: 1, title: "Day" }, { id: 2, title: "Week" }, { id: 4, title: "Quarter" },{ id: 3, title: "Month" }, { id: 5, title: "Year" }])
    let [listPeriod, setListPeriod] = useState([{ id: 3, title: "Month" }])
    let [typeChart, setTypeChart] = useState(data.typeChart)

    async function click() {
        if(!warning){
        saveChenge(l, minValue, maxValue, planRange, periodEnable, typeChart, data.idResult);
        handleClose();
        } else{
            toast.warning("Проверьте введённые вами данные");
        }
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
        if (show === true) {
            ResultHttpServise.getIndicatorSettings(data.idResult).then((data2) => {
                setRedPlan(data2.data.indPlan / 100 * data2.data.percentRed);
                setGreenPlan(data2.data.indPlan / 100 * data2.data.percentGreen);
                set_minValue(data2.data.percentRed);
                set_maxValue(data2.data.percentGreen);
                setPlan(data2.data.indPlan);
                setTypeChart(data2.data.diagType_ID);
                setPeriodEnable(data2.data.periodType);
                setL(data.userAccessList);
            }).catch((error) => { toast.error(error) });

        } else {
            set_minValue(null);
            set_maxValue(null);
            setPlan(null);
            setTypeChart(null);
            setPeriodEnable(null);
            setL([]);
        }
    }, [show])
    let [warning,setWarning] =useState(false);
    async function setMin(value) {
        if (value !== null)
            if (value < 0)
                {toast.warning("Красная граница не может быть меньше 0");setWarning(true);}
            else if (value > 100)
                {toast.warning("Красная граница не может быть больше 100");setWarning(true);}
            else if (value > maxValue)
                {toast.warning("Красная граница не может быть больше зелёной");setWarning(true);}
            else if (maxValue - value < 20)
                {toast.warning("Между зелёной границей и красной должно быть минимум 20%");setWarning(true);}
            else { setMin(value); setRedPlan(planRange / 100 * value);setWarning(false); }
    }
    async function setMax(value) {
        if (value !== null)
            if (value < 0)
                {toast.warning("Зелёная граница не может быть меньше 0");setWarning(true);}
            else if (value < minValue)
                {toast.warning("Зелёная граница не может быть меньше красной");setWarning(true);}
            else if (value - minValue < 20)
                {toast.warning("Между зелёной границей и красной должно быть минимум 20%");setWarning(true);}
            else if (value > 100)
                {toast.warning("Зелёная граница не может быть больше 100");setWarning(true);}
            else { setMax(value); setGreenPlan(planRange / 100 * value);setWarning(false); }
    }

    return (
        <Modal show={show} onHide={() => handleClose()} >
            <Modal.Header closeButton>
                <Modal.Title>Настройки "{data.nameResult}" </Modal.Title>
            </Modal.Header>
            <Modal.Body className='accessOv accordionItem'>
                {data.length !== 0 ?
                    <Container>
                        <ListGroup variant="flush" >
                            <ListGroup.Item key={data.idResult + "3"} className={'accordionItem'} >
                                <span><h5>Границы статуса</h5></span>
                                <ListGroup>
                                    <ListGroup.Item className='accordionItem listBorderNone mb-2'>
                                        <InputGroup >
                                            <InputGroup.Text className={"withP"}>Красная граница % :  </InputGroup.Text>
                                            <Form.Control
                                                placeholder=""
                                                aria-describedby="basic-addon1"
                                                defaultValue={minValue}
                                                className={'modalRed'}
                                                onChange={(e) => { setMin(e.target.value) }}
                                            />
                                            <InputGroup.Text className='modalLastTextSecond'>{redPlan}</InputGroup.Text>
                                        </InputGroup>
                                        <InputGroup >
                                            <InputGroup.Text className={"withP"}>Зелёная граница % :  </InputGroup.Text>
                                            <Form.Control
                                                placeholder=""
                                                aria-describedby="basic-addon1"
                                                defaultValue={maxValue}
                                                className={'modalGreen'}
                                                onChange={(e) => { setMax(e.target.value) }}
                                            />
                                            <InputGroup.Text className='modalLastTextSecond'>{greenPlan}</InputGroup.Text>
                                        </InputGroup>
                                    </ListGroup.Item>

                                    <ListGroup.Item className='accordionItem listBorderNone'>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text className={"withP"}>План показателя :  </InputGroup.Text>
                                            <Form.Control
                                                placeholder=""
                                                aria-label=""
                                                aria-describedby="basic-addon1"
                                                value={planRange}
                                                onChange={(e) => { setPlan(e.target.value) }}
                                            />
                                            <InputGroup.Text className='modalLastTextSecond'>{data.typeResult}</InputGroup.Text>
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text className={"withP"}>Период :</InputGroup.Text>
                                            <Form.Select aria-label="Floating label select example" onChange={(e) => setPeriodEnable(e.target.value)}>
                                                {listPeriod.map(period => <option value={period.id}>{period.title} </option>)}
                                            </Form.Select>
                                        </InputGroup>
                                    </ListGroup.Item>
                                </ListGroup>
                            </ListGroup.Item>
                            <ListGroup.Item key={data.idResult + "1"} className={'accordionItem'}>
                                <span><h5>Вид графика</h5></span>
                                <Row className='m-3 '>
                                    {typeChart === 1 ? <AiOutlineLineChart className='chartSVGSettingsSet' /> : <AiOutlineLineChart onClick={() => setTypeChart(1)} className='chartSVGSettings' />}
                                    {typeChart === 2 ? <AiOutlineBarChart className='chartSVGSettingsSet' /> : <AiOutlineBarChart onClick={() => setTypeChart(2)} className='chartSVGSettings' />}
                                    {typeChart === 3 ? <AiOutlineDotChart className='chartSVGSettingsSet' /> : <AiOutlineDotChart onClick={() => setTypeChart(3)} className='chartSVGSettings' />}
                                    {typeChart === 4 ? <AiOutlineAreaChart className='chartSVGSettingsSet' /> : <AiOutlineAreaChart onClick={() => setTypeChart(4)} className='chartSVGSettings' />}
                                </Row>
                            </ListGroup.Item>
                            {isAdmin === true && l.length !== 0 ?
                                <ListGroup.Item key={data.idResult + "2"} className={'accordionItem'}>
                                    <span><h5>Настройки доступа</h5></span>
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
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSettings;