import React from 'react';
import '../CSS/TableBootsTrap.css';

const TableHead = ({ values, sorting, withCheack }) => {
    let number = 1;

    function plus() {
        number++;
        return number;
    }
    return (
        <thead className="thead-dark ">
            <tr key={plus()}>
                {withCheack ?
                    <th></th>
                    : <></>
                }
                {values.length ?
                    values.map((value) => (
                        <th
                        key={plus()}
                            onClick={() => { sorting(value.title) }}
                        ><p>{value.title}</p></th>
                    )) :
                    <th>Нету значений</th>}
            </tr>
        </thead>
    );
};

export default React.memo(TableHead);