import React from 'react';
import '../CSS/TableBootsTrap.css';

const TableHead = ({ values, sorting, withCheack }) => {
    return (
        <thead className="thead-dark ">
            <tr>
                {withCheack ?
                    <th></th>
                    : <></>
                }
                {values.length ?
                    values.map((value) => (
                        <th
                            key={value.title}
                            onClick={() => { sorting(value.title) }}
                        ><p>{value.title}</p></th>
                    )) :
                    <th>Нету значений</th>}
            </tr>
        </thead>
    );
};

export default React.memo(TableHead);