import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";


const DropDownCompany = ({ values, setEnabledStatus, enabledStatus }) => {
    let [head, setHead] = useState('')

    function hederSet(e) {
        if (e == null) {
            setHead("Not selected")
        } else {
            setHead(e)
        }
        setEnabledStatus(e)
    }

    useEffect(() => {
        async function hederSet(enabledStatus) {
            if (enabledStatus == null) {
                setHead("Not selected")
            } else {
                setHead(enabledStatus)
            }

            setEnabledStatus(enabledStatus)
        }
        hederSet(enabledStatus)
    }, [enabledStatus]);

    return (
        <Dropdown className="d-grid gap-2">
            <Dropdown.Toggle variant="outline-success" >
                {head === '' ? <span>Загрузка</span> : head}
            </Dropdown.Toggle>

            <Dropdown.Menu >
                <Dropdown.Header>
                    Не выбрано
                </Dropdown.Header>
                {values.length ?
                    values.map((type) => (
                        <Dropdown.Item size="lg" key={type.item} value={type.item} onClick={() => hederSet(type.item)}>{type.item}</Dropdown.Item>
                    )) : <p> Нету айтемов</p>}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default React.memo(DropDownCompany);