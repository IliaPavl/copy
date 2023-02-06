import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Form } from 'react-bootstrap';
import integrationService from "../../servise/httpServise/IntegrationService";
const ModalSettings = ({ show, handleClose, id_member }) => {
    let [info, setInfo] = useState();
    useEffect(() => {
        if (id_member !== undefined) {
            integrationService.getIndicatorMember(id_member).then(res => {
                setInfo(res.data);
            })
        }
    }, [id_member])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='CardHead'>Настройки переменной</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='mt-1'>
                    <div className='modalInputFirst_P'>Название:</div>
                    <div className='modalInputSecond_P'>{info !== undefined ? info.memName : <></>}</div>
                </Row>

                <Row className='mt-1'>
                    <div className='modalInputFirst_P'>Описание: </div>
                    <div className='modalInputSecond_P'>{info !== undefined ? info.memDescription : <></>}</div>
                </Row>
                <Row className='mt-1'>
                    <div className='modalInputFirst_P'>Ед. Изм.: </div>
                    <div className='modalInputSecond_P'>{info !== undefined ? info.units : <></>}</div>
                </Row>

                <Row className='mt-1'>
                    <div className='modalInputFirst_P'>Название агента: </div>
                    <div className='modalInputSecond_P '>{info !== undefined ? info.agDescription : <></>}</div>
                </Row >
                <Row className='mt-1'>
                    <div className='modalInputFirst_P'>Источник данных : </div>
                    <div className='modalInputSecond_P '>{info !== undefined ? info.dataSource : <></>}</div>
                </Row>
                <Row className='mt-1'>
                    <div className='modalInputFirst_P'>Поисковый запрос: </div>
                    <Form.Control as="textarea" className='modalInputSecond_P ' value={info !== undefined ? info.memScript : ''} />
                </Row>

                <Row className='mt-1'>
                    <div className='modalInputFirst_P '>Параметры запроса: </div>
                    <Form.Control as="textarea" className='modalInputSecond_P' value={info !== undefined ? info.memParam : ''} />
                </Row>
                <Row className='mt-1'>
                    <div className='modalInputFirst_P'>Прочие настройки: </div>
                    <Form.Control as="textarea" className='modalInputSecond_P ' value={info !== undefined ? info.memOther : ''} />
                </Row >
                <Row className='mt-1'>
                    <div className='modalInputFirst_P'>Тестовое значение: </div>
                    <Form.Control as="textarea" readOnly={true} className='modalInputSecond_P ' value={info !== undefined ? info.memTest : ''} />
                    {/* <input type="text" readOnly={true} className='containerSecond_P ' value={info !== undefined ? info.memTest : ''}/> */}
                </Row>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSettings;