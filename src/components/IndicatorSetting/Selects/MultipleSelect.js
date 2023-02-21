import React, { useEffect } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const MultipleSelect = ({ data, setSelect, def, isAll, switchToAll }) => {
    const handleTypeSelect = e => {
        setSelect(e);
    };
    useEffect(() => {
        console.info()
    }, [def])
    return (
        <Row>
            <Col className='selectSwitch' sm={2}>
            <InputGroup.Text className='selectSwitch switchColor' >
                <Form.Check
                    type="switch"
                    label="Все"
                    onClick={() => switchToAll()}
                />
            </InputGroup.Text>
            </Col>
            <Col > <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                defaultValue={def !== null && def !== undefined ? def : []}
                onChange={handleTypeSelect}
                options={data}
                isDisabled={isAll === 'true' ? true : false}
            />
            </Col>
        </Row>
    );
};

export default MultipleSelect;