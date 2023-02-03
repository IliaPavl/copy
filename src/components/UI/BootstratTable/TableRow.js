import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { COMPANY_LIST, COMPANY_PROFILE, USER_LIST, USER_EDIT, USER_PROFILE } from '../../../utils/const';
import '../CSS/componentCss.css';

const TableRow = ({ value, updateData, withCheack, variant }) => {

    const [url, setUrl] = useState('')
    async function cheakUrl() {
        let url = window.location.pathname.split('/');
        if ('/' + url[1] === USER_LIST || '/' + url[1] === USER_PROFILE) {
            setUrl(USER_EDIT + '/' + value.id);
        } else if ('/' + url[1] === COMPANY_LIST) {
            setUrl(COMPANY_PROFILE + '/' + value.id);
        }
    }

    useEffect(() => {
        cheakUrl();
    })

    let number = 1;

    function plus2() {
        number++;
        return number;
    }

    return (
        <tbody className="table-light" key={plus2()}>
            <tr key={plus2()}>
                {withCheack ?
                    <td key={plus2()}>
                        {variant === "switch" ?
                            <Form.Check
                                type={'switch'}
                                id={value.id}
                                key={"kb"}
                                onClick={() => {
                                    updateData(value.id)
                                }}
                                key={plus2()}
                            /> :
                            <Form.Check
                                type={'checkbox'}
                                key={"kh"}
                                id={value.id}
                                onClick={() => {
                                    updateData(value.id)
                                }}
                                key={plus2()}
                            />
                        }
                    </td>
                    : <></>
                }

                {Object.entries(value).map((data) => (
                    data[0]!== "id"&& data[0]!=="Клиент" && data[0]!=="RegistrationLink" ? <td key={plus2()}> <Link to={url} className="linkRow" key={plus2()}> {data[1]}</Link></td>:<></>
                ))}
            </tr>
        </tbody>
    );
};

export default React.memo(TableRow);