import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const InputPassword = ({ plus, isError, data, editData, defaultValue }) => {
    return (
        <InputGroup key={plus()} className={isError(data.viewName) === true ? "errorBorder mt-2" : "mt-2"}>
            <InputGroup.Text className={isError(data.viewName) === true ? "settingForm errorBorder" : "settingForm"}>
                {data.viewName}
            </InputGroup.Text>
            <Form.Control
                type="password"
                defaultValue={defaultValue}
                aria-describedby="basic-addon1"
                onChange={(e) => editData(data, e.target.value)}
                className={isError(data.viewName) === true ? "errorBorder" : ""}
            />

        </InputGroup>
    );
};

export default InputPassword;