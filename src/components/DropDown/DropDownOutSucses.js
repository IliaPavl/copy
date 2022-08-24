import React, { useEffect, useState } from 'react';
import { Dropdown } from "react-bootstrap";


const DropDownCompany = ({values}) => {
    let [head, setHead] = useState()

    useEffect(() => {
        hederSet(null)
    },[]);

    function hederSet(nameCompany){
        if(nameCompany==null){
            setHead("Not selected")
        }else{
            setHead(nameCompany)
        }
    }

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