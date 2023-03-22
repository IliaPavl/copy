import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import InputPatternService from '../../servise/funtionService/InputPatternService';
import integrationService from "../../servise/httpServise/IntegrationService";
import LocalServise from '../../servise/httpServise/LocalServise';
import OffcanvasIntegration from './OffcanvasIntegration';
import './Settings.css';

const IntegrationSetting = () => {
    const [types, setTypes] = useState([]);
    let [editType, setEditType] = useState("");
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
            let obj = [
                data.data.jsonViewExel,
                data.data.jsonViewAmo,
                data.data.jsonViewsBitrix,
                data.data.jsonViews1CS,
                data.data.jsonViewsGoogleSheets
            ];
            setViews(obj);
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

    const handleClose = () => { setEditType(""); setEViews([]); setNewIntegration(null); setFile(""); setid(""); setIsOn(0); setSource(0); setName(""); setComment(""); setErrors([]); setShow(false) };
    const handleShow = () => setShow(true);

    async function newIntegr() {
        LocalServise.setIdIntegrationAmo("");
        setIsNewInt(true);
        setNewIntegration(null);
        handleShow();
    }
    useEffect(() => {
    }, [show])

    async function edit(id, type) {
        setid(id);
        setIsNewInt(false);
        handleShow();
        setEditType(type);
        integrationService.getIntegrationOne(id).then(data => {
            setSource(data.data.source);
            setNewIntegration(data.data);
            if (data.data.jsonData === "")
                setEViews([]);
            else
                setEViews(JSON.parse(data.data.jsonData));
            setIsOn(data.data.isOn); setName(data.data.viewName);
            setComment(data.data.testComment);
            if (data.data.jsonData !== "") {
                let f = JSON.parse(data.data.jsonData);
                if (f !== null) {
                    f = f[0].FullPath.split("\\");
                    setFile(f[f.length - 1]);
                } else
                    setFile('');
            }
            setErrorStatrt(data.data.json);
        })
    }

    function setErrorStatrt(json) {
        if (json !== null && json !== undefined && json !== "") {
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
        let isNull =true;
        if (typeName !== null)
            for (let i = 0; i < types.length; i++)
                if (types[i].name === typeName) {
                    const id_type = types[i].type_id;
                    for (let data = 0; data < views.length; data++) {
                        if (views[data].length !== 0)
                            if (views[data][0].id_type === id_type) {
                                let d = [];
                                for (let x = 0; x < views[data].length; x++)
                                    d.push(views[data][x]);

                                setEViews(d);
                                setErrorStatrt(d);
                                setSource(id_type)
                                isNull=false;
                            }
                    }
                    break;
                }
        if(isNull){
            setEViews([])
            setErrorStatrt([])
        }
    }

    function testIntegration() {
        let k = [];
        Object.assign(k, eViews)
        let er1 = { FullPath: name, Type: "CHR", ViewName: "name" }
        let er2 = { FullPath: comment, Type: "CHR", ViewName: "comment" }
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
                integrationService.testIntegration(name, comment, JSON.stringify(eViews), id, source, isOn).then((responce) => {
                    if (responce.data === "Ok")
                        toast.success("Результат теста: " + responce.data);
                    else
                        toast.error("Результат теста: " + responce.data);
                }).catch((error) => {
                    let message = error.request.responseText.split('"');
                    toast.error(message[3]);
                }), {
                pending: "Тестирование... ",
            })
        }
    }
    function save() {
        let k = [];
        Object.assign(k, eViews)
        let er1 = { FullPath: name, Type: "CHR", ViewName: "name" }
        let er2 = { FullPath: comment, Type: "CHR", ViewName: "comment" }
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
                integrationService.setIntegration(name, comment, JSON.stringify(eViews), id, source, isOn).then((responce) => {
                    if (responce.data === -1)
                        toast.error("Ошибка записи");
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
                            <Button onClick={() => newIntegr()} className='buttonIntegation m-2' >
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
                                                <td onClick={() => edit(list.id_integration, list.typeName)}>
                                                    {list.typeName}

                                                </td>
                                                <td onClick={() => edit(list.id_integration, list.typeName)}>
                                                    {list.nameIntegration}
                                                </td>
                                                <td onClick={() => edit(list.id_integration, list.typeName)}>
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
            <OffcanvasIntegration
                id={id}
                testIntegration={testIntegration}
                editType={editType}
                show={show}
                onHide={handleClose}
                placement={'end'}
                isNewIntegr={isNewIntegr}
                newIntegration={newIntegration}
                types={types}
                eViews={eViews}
                save={save}
                editData={editData}
                isError={isError}
                setName={setName}
                setComment={setComment}
                plus={plus}
                enableType={enableType}
                file={file}
            />
        </Container>
    );
};

export default IntegrationSetting;