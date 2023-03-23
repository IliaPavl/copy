import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const InputText = ({ plus, isError, data, editData, defaultValue }) => {
    let [val, setVal] = useState("");
    useEffect(() => {
        data.viewName !== undefined ?
            setVal(data.viewName)
            :
            setVal(data.ViewName)
    }, [data])
    return (
        <InputGroup key={plus()} className={isError(val) === true ? "errorBorder mt-2" : "mt-2"}>
            <InputGroup.Text className={isError(val) === true ? "settingForm errorBorder" : "settingForm"}>
                {val}
            </InputGroup.Text>
            <Form.Control
                defaultValue={defaultValue}
                aria-describedby="basic-addon1"
                onChange={(e) => editData(data, e.target.value)}
                className={isError(val) === true ? "errorBorder" : ""}
            />

        </InputGroup>
    );
};

export default InputText;