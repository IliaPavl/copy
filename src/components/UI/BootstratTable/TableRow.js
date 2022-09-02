import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { COMPANY_LIST, COMPANY_PROFILE, USER_LIST, USER_PROFILE } from '../../../utils/const';

const TableRow = ({ value, updateData }) => {

    async function cheakUrl() {
       
        let url = window.location.pathname.split('/');
        console.log(url[1])
        if ('/'+url[1] === USER_LIST) {
            window.location.assign(USER_PROFILE + '/' + value.id);
        } else if ('/'+url[1] === COMPANY_LIST) {
            window.location.assign(COMPANY_PROFILE + '/' + value.id);
        }

    }
    let number = 1;

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
                    <td key={plus()} onClick={() => { cheakUrl() }}>{data[1]}</td>
                ))}

            </tr>
        </tbody>
    );
};

export default React.memo(TableRow);