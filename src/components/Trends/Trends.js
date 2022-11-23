import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import UserServise from '../../servise/funtionService/UserServise';
import GroupTrend from './GroupTrend';
import './GroupTrend.css';
import PfoneGroupTrend from './PfoneGroupTrend';

const Trends = () => {
    let [cards, setcards] = useState([]);
    useEffect(() => {
        UserServise.trends().then((data) => {  setcards(data) })
        if (window.innerWidth < 1000)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, [])
    useEffect(() => {
    }, [cards])

    let number = 1;

    function plus() {
        number++;
        return number;
    }
    async function reload(){
        UserServise.trends().then((data) => {  setcards(data) })

    }

    let [isPfone, setIsPfone] = useState(false)

    window.onresize = function (event) {
        if (event.target.innerWidth < 1000)
            setIsPfone(true)
        else
            setIsPfone(false)
    };
    return (
        <>
        {cards !== null ? 
            cards.map(firstGroup =>
                !firstGroup.null ?
                    !isPfone ?
                        <Container>
                            <Card className='m-2' key={plus()}>
                                <Card.Header>
                                    {firstGroup.nameMonitor}
                                </Card.Header>
                                <Card.Body>
                                    <Row >
                                        <Col xs={12} md={8}>
                                            {firstGroup.monitor.map(cardGroup =>
                                                !cardGroup.null ?
                                                    <Row key={plus()}>
                                                        <GroupTrend ingroup={cardGroup} reload={reload} />
                                                    </Row>
                                                    :
                                                    <></>
                                            )}
                                        </Col>
                                        <Col xs={6} md={4}>
                                            <Card>
                                                <Card.Header>
                                                    Another info
                                                </Card.Header>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Container>
                        :
                        <Card className='m-2 mb-5' key={plus()}>
                            <Card.Header>
                                {firstGroup.nameMonitor}
                            </Card.Header>
                            <Col >
                                {firstGroup.monitor.map(cardGroup =>
                                    !cardGroup.null ?
                                        <Row key={plus()} className={'delBsgutter'} >
                                            <PfoneGroupTrend ingroup={cardGroup} reload={reload}/>
                                        </Row>
                                        :
                                        <></>
                                )}
                            </Col>
                        </Card>
                    : <></>
            )
            :<></>
        }
        </>
    );
};

export default React.memo(Trends);