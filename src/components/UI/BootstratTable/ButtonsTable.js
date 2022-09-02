import React from 'react';
import { Button } from 'react-bootstrap';
import { INDICATOR_RESULT } from '../../../utils/const';

const ButtonsTable = ({ uncheck, cheackAll, getBox }) => {
        let url = window.location.pathname.split('/');

        if ('/' + url[1] === INDICATOR_RESULT) {
            return(
                <div></div>
            )

        } else {

                return (
                    <div>
                        <Button className="m-1 radius" onClick={() => uncheck()}>uncheck</Button>
                        <Button className="m-1 radius" onClick={() => cheackAll()}>cheackAll</Button>
                        <Button className="m-1 radius" onClick={event => getBox(event)}>delete</Button>
                    </div>
                );
            
        }
};

export default React.memo(ButtonsTable);