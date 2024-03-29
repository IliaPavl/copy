import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";

const DropDownPrimary = ({ values, setEnabledStatus, enabledStatus, noSelectValue }) => {
    let [head, setHead] = useState('')

    function hederSet(enabledStatus) {
        if (enabledStatus == null) {
            setHead(noSelectValue)
        } else {
            setHead(enabledStatus)
        }
        setEnabledStatus(enabledStatus)
    }

    useEffect(() => {
        hederSet(enabledStatus)
    }, [enabledStatus]);

    return (
        <Dropdown className="d-grid gap-2">
            <Dropdown.Toggle variant="primary" >
                {head === '' ? <span>Загрузка</span> : head}
            </Dropdown.Toggle>

            <Dropdown.Menu >
                <Dropdown.Header>
                    Не выбрано
                </Dropdown.Header>
                {values.length ?
                    values.map((type) => (
                        <Dropdown.Item size="lg" key={type.item} value={type.item} onClick={() => hederSet(type.item + " ")}>{type.item}</Dropdown.Item>
                    )) : <p> Нету айтемов</p>}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropDownPrimary;