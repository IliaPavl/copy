import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const InputFile = ({plus,isError,data,editData}) => {
    return (
        <InputGroup key={plus()} >
            <Form.Control type="file" className={isError(data.viewName) === true ? "errorBorder " : ""} onChange={(e) => editData(data, e.target.value)} />
        </InputGroup>
    );
}

export default InputFile;