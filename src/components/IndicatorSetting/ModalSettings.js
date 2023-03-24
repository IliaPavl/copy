import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Form, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import integrationService from "../../servise/httpServise/IntegrationService";
const ModalSettings = ({ show, handleClose, id_member }) => {
    let [info, setInfo] = useState();
    useEffect(() => {
        if (id_member !== undefined) {
            integrationService.getIndicatorMember(id_member).then(res => {
                setInfo(res.data);
                setTestValue(res.data.memTest)

            })
        }
    }, [id_member])

    let [testValue, setTestValue] = useState("");
    async function test() {
        setTestValue("...");
        toast.promise(
            integrationService.testIndicator(id_member).then((response) => {
                toast.success("Тест прошел успешно");
                setTestValue("Результат теста: "+response.data);
                console.log(response.data)
            }).catch((error) => {
                setTestValue("Последний верный расчёт: "+info.memTest);
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            }), {
            pending: "Please wait... ",
        })
    }
    useEffect(() => {  }, [info,testValue])

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
                    <Form.Control as="textarea" readOnly={true} className='modalInputSecond_P ' value={testValue} />
                    {/* <input type="text" readOnly={true} className='containerSecond_P ' value={info !== undefined ? info.memTest : ''}/> */}
                </Row>


            </Modal.Body>
            <Card.Footer className='cardFooterContainer mt-2'>
                <div className='cardFooterLeft'>
                    <Button variant="warning" onClick={test}>
                        Тест
                    </Button>
                </div>
                <div className='cardFooter'>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Закрыть
                    </Button>
                </div>
            </Card.Footer>

        </Modal>
    );
};

export default ModalSettings;