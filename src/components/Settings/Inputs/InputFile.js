import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const InputFile = ({plus,isError,data,editData}) => {
    let [val, setVal] = useState("");
    useEffect(() => {
        data.viewName !== undefined ?
            setVal(data.viewName)
            :
            setVal(data.ViewName)
    }, [data])
    return (
        <InputGroup key={plus()} >
            <Form.Control type="file" className={isError(val) === true ? "errorBorder " : ""} onChange={(e) => editData(data, e.target.value)} />
        </InputGroup>
    );
}

export default InputFile;