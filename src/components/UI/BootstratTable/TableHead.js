import React from 'react';
import '../CSS/TableBootsTrap.css';

const TableHead = ({ values, sorting }) => {
    return (
        <thead className="thead-dark ">
            <tr>
                <th></th>
                {values.length ?
                    values.map((value) => (
                        <th
                            key={value.title}
                            onClick={() => { sorting(value.title) }}
                        ><p className='gain-center'>{value.title}</p></th>
                    )) :
                    <th>Нету значений</th>}
            </tr>
        </thead>
    );
};

export default TableHead;