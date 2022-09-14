import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { COMPANY_LIST, COMPANY_PROFILE, USER_LIST, USER_PROFILE } from '../../../utils/const';
import '../CSS/componentCss.css';

const TableRow = ({ value, updateData }) => {

    const [url,setUrl] =useState('')
    async function cheakUrl() {
        let url = window.location.pathname.split('/');
        console.log(url[1])
        if ('/'+url[1] === USER_LIST) {
            setUrl(USER_PROFILE + '/' + value.id);
        } else if ('/'+url[1] === COMPANY_LIST) {
            setUrl(COMPANY_PROFILE + '/' + value.id);
        }
    }
    let number = 1;

    useEffect(()=>{
        cheakUrl();
    })

    function plus(){
        number++;
        return number;
    }

    return (
        <tbody className="table-light">
            <tr>
                <td>
                    <Form.Check
                        type={'checkbox'}
                        id={value.id}
                        onClick={() => {
                            updateData(value.id)
                        }}
                    />
                </td>

                {Object.entries(value).map((data) => (
                    <td key={plus()}><Link to={url} className="linkRow"> {data[1]}</Link></td>
                ))}

            </tr>
        </tbody>
    );
};

export default React.memo(TableRow);