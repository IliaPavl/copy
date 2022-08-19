import React from 'react';
import {Form} from 'react-bootstrap';

const TableRow = ({value, updateData}) => {
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
                <td key={data[1]}>{data[1]}</td>
            ))}
        </tr>
        </tbody>
    );
};

export default TableRow;