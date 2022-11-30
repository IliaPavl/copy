import React from 'react';
import { Button } from 'react-bootstrap';
import { INDICATOR_RESULT } from '../../../utils/const';

const ButtonsTable = ({ uncheck, cheackAll, getBox }) => {
        let url = window.location.pathname.split('/');
        // <Button className="m-1 radius" onClick={() => uncheck()}>uncheck</Button>
        // <Button className="m-1 radius" onClick={() => cheackAll()}>cheackAll</Button>
        if ('/' + url[1] === INDICATOR_RESULT) {
            return(
                <></>
            )

        } else {

                return (
                    
                        <Button variant="danger" className='m-1 ' onClick={event => getBox(event)}>Удалить</Button>
                    
                );
            
        }
};

export default React.memo(ButtonsTable);