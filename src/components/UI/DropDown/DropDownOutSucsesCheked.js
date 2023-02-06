import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";

const DropDownOutSucsesCheked = ({ values, setEnabledBox, enabledStatus }) => {
    let [head, setHead] = useState('')
    let obj = enabledStatus;
    async function hederSet(role) {
        if (obj != null) {
            let temp = obj.slice();
            var myIndex = temp.indexOf(role);
            if (myIndex !== -1) {
                if (obj.length === 1)
                    alert("User have at least one role!")
                else
                    obj = obj.filter(function (f) { return f !== role })
            } else {
                obj = [...obj, role];
            }
        }
        setHead(obj)
        setEnabledBox(obj)
    }

    useEffect(() => {
        setHead(enabledStatus)
    }, [enabledStatus]);



    return (
        <Dropdown className="d-grid gap-2">
            <Dropdown.Toggle variant="outline-success">
                {head === '' ? <span>Загрузка</span> : head + ' '}
            </Dropdown.Toggle>

            <Dropdown.Menu >
                {values.length ?
                    values.map((type) => (
                        <Dropdown.Item size="lg" key={type.item} value={type.item} onClick={() =>
                            hederSet(type.item)
                        }>{type.item}</Dropdown.Item>
                    )) : <p> Нету айтемов</p>}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default React.memo(DropDownOutSucsesCheked);