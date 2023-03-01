import React, { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Offcanvas } from 'react-bootstrap';
import LocalServise from '../../servise/httpServise/LocalServise';
import DropDownOutSucses from '../UI/DropDown/DropDownOutSucses';
import amoButton from './amoButton';
import './Settings.css';

const OffcanvasIntegration = ({ id, editType, file, enableType, show, onHide, placement, isNewIntegr, newIntegration, types, eViews, plus, setComment, setName, isError, editData, save }) => {
    let [val, setVal] = useState('');

    useEffect(() => { }, [newIntegration])
    async function eT(value) {
        setVal(value);
        enableType(value);
    }
    useEffect(() => {
        if (show === true)
            amoButton.start();
    }, [eViews])
    

    useEffect(() => {
        if (id !== null && id !== undefined && id !== "") {
            LocalServise.setIdIntegrationAmo(id)
        }
    }, [id])
    return (
        <Offcanvas show={show} onHide={onHide} placement={'end'}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='CardHead'>{isNewIntegr === true ? <>Новая интеграция </> : <>Интеграция '{newIntegration != null ? newIntegration.viewName : ''}' </>} </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Card className='noBorder'>
                    <Form>

                        {newIntegration === null && types !== null ?
                            <div className="mt-2">
                                <DropDownOutSucses values={types} setEnabledStatus={eT} enabledStatus={"не выбрано"} />
                            </div> : <></>}

                        {val === 'amoCRM' ?
                            <InputGroup className='mt-3'>
                                <Form.Text >
                                    <h5>
                                        Подключи нашу интеграцию в amoCRM.
                                    </h5>
                                </Form.Text>
                                <script
                                    className="amocrm_oauth"
                                    charSet="utf-8"
                                    data-client-id="8971ce16-0b0e-4a27-b2f0-5f0ea62bb5ea"
                                    data-title="Button"
                                    data-compact="false"
                                    data-class-name="className"
                                    data-color="default"
                                    data-state="state"
                                    data-error-callback="functionName"
                                    data-mode="popup"
                                    src="https://www.amocrm.ru/auth/button.js"
                                ></script>
                                <Form.Text >
                                    Нажмите на кнопку для подключения.
                                </Form.Text>
                            </InputGroup> : <>
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
                                {editType === 'amoCRM' ?
                                    <InputGroup className='mt-3'>
                                        <Form.Text >
                                            <h5>
                                                Переподключите вашу интеграцию
                                            </h5>
                                        </Form.Text>
                                        <script
                                            className="amocrm_oauth"
                                            charSet="utf-8"
                                            data-client-id="8971ce16-0b0e-4a27-b2f0-5f0ea62bb5ea"
                                            data-title="Button"
                                            data-compact="false"
                                            data-class-name="className"
                                            data-color="default"
                                            data-state="state"
                                            data-error-callback="functionName"
                                            data-mode="popup"
                                            src="https://www.amocrm.ru/auth/button.js"
                                        ></script>
                                        <Form.Text >
                                            Нажмите на кнопку для подключения.
                                        </Form.Text>
                                    </InputGroup>
                                    : <></>}
                            </>}

                        {eViews !== null && eViews !== "" && eViews !== undefined ?
                            eViews.map((data) => (
                                data.AddInfo !== undefined ?
                                    data.AddInfo === "OpenFile" ?
                                        <>
                                            {file !== "" ?
                                                <>
                                                    <InputGroup key={plus()} className="mt-2">
                                                        <Form.Label >Выбранный файл: {file}</Form.Label>
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
                                    : <></>))
                            : <></>}
                    </Form>

                    <Card.Footer className='cardFooterContainer mt-2'>
                        <div className='cardFooter'>
                            <Button onClick={() => save()}>
                                Сохранить
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OffcanvasIntegration;