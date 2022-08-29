import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";


const DropDownCompany = ({values,setEnabledStatus,enabledStatus}) => {
    let [head, setHead] = useState()

    function hederSet(enabledStatus){
        if(enabledStatus==null){
            setHead("Not selected")
        }else{
            setHead(enabledStatus)
        }
        setEnabledStatus(enabledStatus)
    }

    useEffect(() => {
        hederSet(enabledStatus)
    },[enabledStatus]);

    return (
        <Dropdown className="d-grid gap-2">
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                {head}
            </Dropdown.Toggle>

            <Dropdown.Menu >
                <Dropdown.Header>
                    Not selected
                </Dropdown.Header>
                {values.length ?
                    values.map((type) => (
                        <Dropdown.Item size="lg" key={type.item} value={type.item} onClick={() => hederSet(type.item+" ")}>{type.item}</Dropdown.Item>
                    )) : <p> Not one select Item</p>}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropDownCompany;