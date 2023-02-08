import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Offcanvas, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import InputPatternService from '../../servise/funtionService/InputPatternService';
import integrationService from "../../servise/httpServise/IntegrationService";
import DropDownOutSucses from '../UI/DropDown/DropDownOutSucses';
import Amo from './Amo';
import './Settings.css';

const IntegrationSetting = () => {
    const [types, setTypes] = useState([]);
    let [name, setName] = useState('');
    let [comment, setComment] = useState('');
    let [eViews, setEViews] = useState([]);
    const [list, setList] = useState([]);
    const [views, setViews] = useState([]);
    const [newIntegration, setNewIntegration] = useState();
    let [isNewIntegr, setIsNewInt] = useState(false);
    let [file, setFile] = useState('');
    let [errors, setErrors] = useState([]);
    let [id, setid] = useState("");
    let [source, setSource] = useState(0);
    let [isOn, setIsOn] = useState(0);
    let [isPfone, setIsPfone] = useState(false)
    window.onresize = function (event) {
        if (event.target.innerWidth < 780)
            setIsPfone(true)
        else
            setIsPfone(false)
    };
    useEffect(() => {
        integrationService.getIntegrationList().then(data => {
            setList(data.data);
        })
        integrationService.getIntegrationSettings().then(data => {
            setTypes(data.data.types);
            setViews(data.data.jsonViews);
        })
        if (window.innerWidth < 780)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, [])

    let number = 1;

    function plus() {
        number++;
        return number;
    }
    async function editData(data, value) {
        setEViews(eViews.map(item =>
            JSON.stringify(item.viewName) === JSON.stringify(data.viewName)
                ? { ...item, fullPath: value }
                : item
        ))
    }

    async function switchValue(link) {
        setList(list.map(item =>
            JSON.stringify(link) === JSON.stringify(item)
                ? { ...item, enable: !link.enable }
                : item
        ))
    }

    async function del() {
        let l = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].enable === true) {
                l += 1;
            }
        }
        if (l !== 0)
            toast.promise(
                integrationService.deleteIntegration(list).then((response) => {
                    toast.success(response.data);
                    integrationService.getIntegrationList().then(data => {
                        setList(data.data);
                    })
                    integrationService.getIntegrationSettings().then(data => {
                        setTypes(data.data.types);
                        setViews(data.data.jsonViews);
                    })
                }).catch((error) => {
                    let message = error.request.responseText.split('"');
                    toast.error(message[3]);
                }), {
                pending: "Please wait... ",
            })
        else {
            toast.warning("Выберите интеграции для удаления")
        }

    }

    const [show, setShow] = useState(false);

    const handleClose = () => { setEViews(null); setFile(""); setid(""); setIsOn(0); setSource(0); setName(""); setComment(""); setErrors([]); setShow(false) };
    const handleShow = () => setShow(true);

    async function newIntegr() {
        setIsNewInt(true);
        setNewIntegration(null);
        handleShow();
    }
    useEffect(() => {
    }, [show])

    async function edit(id) {
        setid(id);
        setIsNewInt(false);
        handleShow();
        integrationService.getIntegrationOne(id).then(data => {
            setSource(data.data.source);
            setNewIntegration(data.data);
            setEViews(data.data.json);
            setIsOn(data.data.isOn);
            setName(data.data.viewName);
            setComment(data.data.testComment);
            const f = data.data.json[0].fullPath.split("\\");
            setFile(f[f.length - 1]);
            setErrorStatrt(data.data.json);
        })
    }

    function setErrorStatrt(json) {
        if (json !== null) {
            let err = [];
            err.push({ item: "name", error: false, text: "" })
            err.push({ item: "comment", error: false, text: "" })
            for (let i = 0; i < json.length; i++)
                err.push({ item: json[i].viewName, error: false, text: "" })
            setErrors(err);
        }
    }

    function isError(viewName) {
        for (let i = 0; i < errors.length; i++)
            if (errors[i].item === viewName) {
                return errors[i].error;
            }
    }

    function cheakError(json) {
        let b = []
        for (let k = 0; k < json.length; k++)
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].item === json[k].viewName) {
                    let err = { item: json[k].viewName, error: false, text: "" }
                    if (json[k].id_type === 3 && json[k].addInfo === "OpenFile")
                        if (json[k].type === "CHR") {
                            err.text = InputPatternService.intputChar(json[k].fullPath);
                        } else if (json[k].type === "INT") {
                            err.text = InputPatternService.intputInt(json[k].fullPath);
                        }
                        else if (json[k].type === "DEC") {
                            err.text = InputPatternService.intputDec(json[k].fullPath);
                        }
                    if (err.text === '')
                        err.error = false;
                    else
                        err.error = true;
                    b.push(err);
                    break;
                }
            }
        setErrors(b);
        return b;
    }

    async function enableType(typeName) {
        if (typeName !== null)
            for (let i = 0; i < types.length; i++) {
                if (types[i].name === typeName) {
                    let d = [];
                    for (let data = 0; data < views.length; data++)
                        if (views[data].id_type === types[i].type_id)
                            d.push(views[data]);
                    setEViews(d);
                    setErrorStatrt(d);
                    setSource(types[i].type_id)
                    break;
                }
            }
    }

    function save() {
        let k = [];
        Object.assign(k, eViews)
        let er1 = { fullPath: name, type: "CHR", viewName: "name" }
        let er2 = { fullPath: comment, type: "CHR", viewName: "comment" }
        k.push(er1)
        k.push(er2)
        let err = false;
        let b = cheakError(k);
        for (let k = 0; k < b.length; k++) {
            if (b[k].error === true) {
                err = true;
                break;
            }
        }

        if (err === false) {
            toast.promise(
                integrationService.setIntegration(name, comment, eViews, id, source, isOn).then((responce) => {
                    if (responce.data === 1)
                        toast.warning("Такое имя есть");
                    else if (responce.data === 2)
                        toast.error("Проверьте заполненные вами поля");
                    else if (responce.data === 3)
                        toast.error("У вас нету прав для это действия");
                    else if (responce.data === 0)
                        toast.success("Сохранено");
                    integrationService.getIntegrationList().then(data => {
                        setList(data.data);
                    })
                    integrationService.getIntegrationSettings().then(data => {
                        setTypes(data.data.types);
                        setViews(data.data.jsonViews);
                    })
                }).catch((error) => {
                    let message = error.request.responseText.split('"');
                    toast.error(message[3]);
                }), {
                pending: "Please wait... ",
            })
        }
    }


    return (
        <Container className='mb-5'>
            <Card className='noBorder'>
                <Card.Header className='noBorder BlueBack CardHead'>
                    Настройки интеграций
                </Card.Header>
                <Card.Body className='noBorder'>
                    <Col>
                        <Row>
                            <Button onClick={() => newIntegr()} className='buttonIntegation m-2'>
                                Новая интеграция
                            </Button>
                            <Button className='buttonIntegation m-2' onClick={() => del()}>
                                Удалить интеграции
                            </Button>
                        </Row>
                        <Row className={"scrollTable"}>
                            {list.length !== 0 ?
                                <Table variant='table-bordered table-hover' style={{ height: 70 }} className={"scrollTable"}>
                                    <thead className="thead-dark ">
                                        <tr>
                                            <th>

                                            </th>
                                            <th>
                                                Тип интеграции
                                            </th>
                                            <th>
                                                Название
                                            </th>
                                            <th>
                                                Комментарий
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-light" key={plus()}>
                                        {list.map(list =>
                                            <tr key={plus()}>
                                                <td className='enableContainer'>
                                                    <div className='enableDiv'>
                                                        {list.enable === true ?
                                                            <Form.Check
                                                                checked
                                                                type={'checkbox'}
                                                                key={plus()}
                                                                className={isPfone ? 'swith_P' : 'swith'}
                                                                onChange={() => {
                                                                    switchValue(list);
                                                                }}
                                                            /> :
                                                            <Form.Check
                                                                type={'checkbox'}
                                                                key={plus()}
                                                                className={isPfone ? 'swith_P' : 'swith'}
                                                                onChange={() => {
                                                                    switchValue(list);
                                                                }}
                                                            />}
                                                    </div>
                                                </td>
                                                <td onClick={() => edit(list.id_integration)}>
                                                    {list.typeName}

                                                </td>
                                                <td onClick={() => edit(list.id_integration)}>
                                                    {list.nameIntegration}
                                                </td>
                                                <td onClick={() => edit(list.id_integration)}>
                                                    {list.comment}
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </Table>
                                : <></>}
                        </Row>
                    </Col>
                </Card.Body>
            </Card>

            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>

                    <Offcanvas.Title className='CardHead'>{isNewIntegr === true ? <>Новая интеграция </> : <>Интеграция '{newIntegration != null ? newIntegration.viewName : ''}' </>} </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Card className='noBorder'>
                        <Form>
                            {newIntegration === null && types !== null ?
                                <div className="mt-2">
                                    <DropDownOutSucses values={types} setEnabledStatus={enableType} />
                                </div> : <></>}
                            <InputGroup className="mt-2">
                                <InputGroup.Text className='settingForm' >
                                    Название
                                </InputGroup.Text>
                                {newIntegration != null ?
                                    <Form.Control
                                        defaultValue={newIntegration.viewName}
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => { setName(e.target.value) }}
                                        className={isError("name") === true ? "errorBorder" : ""}
                                    />
                                    : <Form.Control
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => { setName(e.target.value) }}
                                        className={isError("name") === true ? "errorBorder" : ""}
                                    />}

                            </InputGroup>
                            <InputGroup className='mt-2'>
                                <InputGroup.Text className='settingForm'>
                                    Комментарий
                                </InputGroup.Text>
                                {newIntegration != null ?
                                    <Form.Control as="textarea"
                                        defaultValue={newIntegration.testComment}
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => { setComment(e.target.value) }}
                                        className={isError("comment") === true ? "errorBorder" : ""}
                                    /> :
                                    <Form.Control as="textarea"
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => { setComment(e.target.value) }}
                                        className={isError("comment") === true ? "errorBorder" : ""}
                                    />}

                            </InputGroup>

                            {eViews !== null ?
                                eViews.map((data) => (
                                    data.addInfo === "OpenFile" ?
                                        <>
                                            {file !== "" ?
                                                <>
                                                    <InputGroup key={plus()} className="mt-2">
                                                        <Form.Label>Выбрвнный файл: {file}</Form.Label>
                                                    </InputGroup>
                                                    <InputGroup key={plus()} >
                                                        <Form.Control type="file" className={isError(data.viewName) === true ? "errorBorder " : ""} onChange={(e) => editData(data, e.target.value)} />
                                                    </InputGroup>
                                                </>
                                                :
                                                <>
                                                    <InputGroup key={plus()} className="mt-2">
                                                        <Form.Control type="file" className={isError(data.viewName) === true ? "errorBorder " : ""} onChange={(e) => editData(data, e.target.value)} />
                                                    </InputGroup></>}
                                        </>

                                        :
                                        <>
                                            <InputGroup key={plus()} className={isError(data.viewName) === true ? "errorBorder mt-2" : "mt-2"}>
                                                <InputGroup.Text className={isError(data.viewName) === true ? "settingForm errorBorder" : ""}>
                                                    {data.viewName}
                                                </InputGroup.Text>
                                                <Form.Control
                                                    defaultValue={data.fullPath}
                                                    aria-describedby="basic-addon1"
                                                    onChange={(e) => editData(data, e.target.value)}
                                                    className={isError(data.viewName) === true ? "errorBorder" : ""}
                                                />

                                            </InputGroup>
                                        </>

                                )) : <></>}
                        </Form>
                        <Card.Footer className='cardFooterContainer mt-2'>
                            <div className='cardFooter'>
                                {eViews !== null ?
                                    eViews.length !== 0 ?
                                        <Button onClick={() => save()}>
                                            Сохранить
                                        </Button> : <Button disabled onClick={() => save()}>
                                            Сохранить
                                        </Button>
                                    : <></>}
                            </div>
                        </Card.Footer>
                    </Card>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default IntegrationSetting;