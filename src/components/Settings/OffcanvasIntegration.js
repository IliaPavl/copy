import React, { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Offcanvas } from 'react-bootstrap';
import LocalServise from '../../servise/httpServise/LocalServise';
import { AMO_SECRET, AMO_ID } from '../../utils/const';
import DropDownOutSucses from '../UI/DropDown/DropDownOutSucses';
import amoButton from './amoButton';
import InputFile from './Inputs/InputFile';
import InputPassword from './Inputs/InputPassword';
import InputText from './Inputs/InputText';
import './Settings.css';

const OffcanvasIntegration = ({ testIntegration, id, editType, file, enableType, show, onHide, placement, isNewIntegr, newIntegration, types, eViews, plus, setComment, setName, isError, editData, save }) => {
    let [val, setVal] = useState('');

    useEffect(() => { }, [newIntegration])
    async function eT(value) {
        setVal(value);
        enableType(value);
    }
    useEffect(() => {
        if (show === true && Array.isArray(eViews)) {
            if(eViews.length!==0 || val!=="не выбрано")
                amoButton.start();
        }
        
        console.log(val)
    }, [eViews,val])

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
                                    data-client-id={AMO_ID}
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
                                            defaultValue={newIntegration.viewName !== undefined ? newIntegration.viewName : newIntegration.ViewName}
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
                                            defaultValue={newIntegration.testComment !== undefined ? newIntegration.testComment : newIntegration.TestComment}
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
                                            data-client-id={AMO_ID}
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
                        {eViews !== null && eViews !== "" && eViews !== undefined && editType !== 'amoCRM' ?
                            eViews.map((data) => (
                                data.addInfo !== undefined && data.addInfo !== "" || data.AddInfo !== undefined && data.AddInfo !== "" ?
                                    <>
                                        {data.addInfo === "OpenFile" ?
                                            file !== "" ?
                                                <>
                                                    <InputGroup key={plus()} className="mt-2">
                                                        <Form.Label >Выбранный файл: {file}</Form.Label>
                                                    </InputGroup>
                                                    <InputFile plus={plus} isError={isError} data={data} editData={editData} />
                                                </>
                                                :
                                                <div className="mt-2">
                                                    <InputFile plus={plus} isError={isError} data={data} editData={editData} className="mt-2" />
                                                </div>

                                            : <></>}
                                        {data.AddInfo === "OpenFile" ?
                                            file !== "" ?
                                                <>
                                                    <InputGroup key={plus()} className="mt-2">
                                                        <Form.Label >Выбранный файл: {file}</Form.Label>
                                                    </InputGroup>
                                                    <InputFile plus={plus} isError={isError} data={data} editData={editData} />
                                                </>
                                                :
                                                <div className="mt-2">
                                                    <InputFile plus={plus} isError={isError} data={data} editData={editData} className="mt-2" />
                                                </div>

                                            : <></>}
                                        {data.addInfo === "Pass" ?
                                            <InputPassword plus={plus} isError={isError} data={data} editData={editData} defaultValue={data.Pwd}>
                                            </InputPassword>
                                            : <></>}
                                        {data.AddInfo === "Pass" ?
                                            <InputPassword plus={plus} isError={isError} data={data} editData={editData} defaultValue={data.Pwd}>
                                            </InputPassword>
                                            : <></>}
                                    </>
                                    :
                                    <>
                                        {data.type === "CHR" ?
                                            <>
                                                {data.link !== undefined ?
                                                    <InputText plus={plus} isError={isError} data={data} editData={editData} defaultValue={data.link}>
                                                    </InputText> : <></>}
                                                {data.usr !== null && data.usr !== undefined ?
                                                    <InputText plus={plus} isError={isError} data={data} editData={editData} defaultValue={data.usr}>
                                                    </InputText> : <></>}
                                                {data.ref !== null && data.srvr !== undefined ?
                                                    <InputText plus={plus} isError={isError} data={data} editData={editData} defaultValue={data.ref}>
                                                    </InputText> : <></>}
                                                {data.srvr !== null && data.srvr !== undefined ?
                                                    <InputText plus={plus} isError={isError} data={data} editData={editData} defaultValue={data.srvr}>
                                                    </InputText> : <></>}
                                            </> : <></>}
                                        {data.Type === "CHR" ?
                                            <>
                                                {data.Link !== undefined ?
                                                    <InputText plus={plus} isError={isError} data={data} editData={editData} defaultValue={data.Link}>
                                                    </InputText> : <></>}
                                                {data.Usr !== undefined && data.Usr !== null ?
                                                    <InputText plus={plus} isError={isError} data={data} editData={editData} defaultValue={data.Usr}>
                                                    </InputText> : <></>}
                                                {data.Ref !== undefined && data.Ref !== null ?
                                                    <InputText plus={plus} isError={isError} data={data} editData={editData} defaultValue={data.Ref}>
                                                    </InputText> : <></>}
                                                {data.Srvr !== undefined && data.Srvr !== null ?
                                                    <InputText plus={plus} isError={isError} data={data} editData={editData} defaultValue={data.Srvr}>
                                                    </InputText> : <></>}
                                            </> : <></>}
                                        {data.type === "SHR" || data.Type === "SHR" ?
                                            <>
                                                <div className="mt-2">
                                                    {data.viewName}
                                                </div>
                                            </> : <></>}
                                        {data.Type === "SHR" ?
                                            <>
                                                <div className="mt-2">
                                                    {data.ViewName}
                                                </div>
                                            </> : <></>}
                                    </>

                            ))
                            : <></>}
                    </Form>

                    <Card.Footer className='cardFooterContainer mt-2'>
                        <div className='cardFooterLeft'>
                            <Button onClick={() => testIntegration()}>
                                Тест
                            </Button>
                        </div>
                        <div className='cardFooter'>
                            <Button onClick={() => save()} >
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