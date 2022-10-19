import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const DropdownMonth = ({setEnable, noSelectValue ,isSelect}) => {
    let [head, setHead] = useState(noSelectValue)
    const [month,setMonth] = useState([
        {
            text: "Январь",
            value:  "1"
        },
        {
            text: "Февраль",
            value:  "2"
        },
        {
            text: "Март",
            value:  "3"
        },
        {
            text: "Апрель",
            value:  "4"
        },
        {
            text: "Май",
            value:  "5"
        },
        {
            text: "Июнь",
            value:  "6"
        },
        {
            text: "Июль",
            value:  "7"
        },
        {
            text: "Август",
            value:  "8"
        },
        {
            text: "Сентябрь",
            value:  "9"
        },
        {
            text: "Октябрь",
            value:  "10"
        },
        {
            text: "Ноябрь",
            value:  "11"
        },
        {
            text: "Декабрь",
            value:  "12"
        }
    ])

    async function set(value){
        setEnable(value)
        setHead(value.text)
    }

    useEffect(()=>{

    },[head]);
    useEffect(()=>{
        if(isSelect){

        }else{
            setEnable("")
            setHead(noSelectValue);
        }
    },[isSelect])

    return (
        <Dropdown className="d-grid gap-2" size="lg">
            <Dropdown.Toggle variant="primary" >
                {head === '' ? <span>Loading data</span> : head}
            </Dropdown.Toggle>

            <Dropdown.Menu >
                <Dropdown.Header>
                    Not selected
                </Dropdown.Header>
                {month.length ?
                    month.map((type) => (
                        <Dropdown.Item size="lg" key={type.value} value={type.value} onClick={() => set(type)}>{type.text}</Dropdown.Item>
                    )) : <p> Not one select Item</p>}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default React.memo(DropdownMonth);