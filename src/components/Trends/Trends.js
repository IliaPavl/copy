import React, { useEffect, useState } from 'react';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';
import UserServise from '../../servise/funtionService/UserServise';
import GroupTrend from './GroupTrend';
import './GroupTrend.css';
import './Colors.css';
import PfoneGroupTrend from './PfoneGroupTrend';
import { MdAttachMoney } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

const Trends = () => {
    const [colors, setColors] = useState([
        { colorBack: "GreenBack", colorBorder: "GreenBorder" },
        { colorBack: "BlueBack", colorBorder: "BlueBorder" }])
    let [cards, setcards] = useState([]);
    useEffect(() => {

        UserServise.trends().then((data) => { setcards(data) })
        if (window.innerWidth < 1000)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, [])
    useEffect(() => {
        if (cards !== null)
            cards.map(firstGroup => {
                if (firstGroup.monitor.length !== 0 && firstGroup.linkMonitor.length !== 0) {

                }
            }
            )
    }, [cards])

    let number = 1;

    function plus() {
        number++;
        return number;
    }
    async function reload() {
        UserServise.trends().then((data) => { setcards(data) })

    }

    let [isPfone, setIsPfone] = useState(false)

    window.onresize = function (event) {
        if (event.target.innerWidth < 1000)
            setIsPfone(true)
        else
            setIsPfone(false)
    };
    let colorNumber = 0;
    function getColorNumber() {
        if (colorNumber >= colors.length - 1)
            colorNumber = 0;
        else colorNumber += 1;
        return colorNumber;
    }
    let n = 0;
    function newColor() {
        n = getColorNumber();
    }
    return (
        <>
            {cards !== null ?
                cards.map(firstGroup =>
                    !firstGroup.null ?
                        !isPfone ?
                            <Container>
                                {newColor()}
                                <Card className={colors[n].colorBorder + " m-2 mb-5"} key={plus()}>
                                    <Accordion defaultActiveKey={"j"}>
                                        <Accordion.Item eventKey={"j"}>
                                            {firstGroup.monitor.length !== 0 ?
                                                <Accordion.Button className={colors[n].colorBack + " CardHead"}>
                                                    {firstGroup.nameMonitor === "Продажи" || firstGroup.nameMonitor === "Финансы" ?
                                                        <><MdAttachMoney className='svgTrends' /> {firstGroup.nameMonitor}</> :
                                                        firstGroup.nameMonitor === "Клиенты" ?
                                                            <><BsFillPeopleFill className='svgTrends' />  {firstGroup.nameMonitor}</> : <></>
                                                    }

                                                </Accordion.Button>
                                                : <></>}
                                            <Accordion.Body>
                                                <Row >
                                                    <Col xs={12} md={8}>
                                                        {firstGroup.monitor.length !== 0 ?
                                                            firstGroup.monitor.map(cardGroup =>
                                                                !cardGroup.null ?
                                                                    <Row key={plus()}>
                                                                        <GroupTrend ingroup={cardGroup} reload={reload} stylesIn={colors[n]} />
                                                                    </Row>
                                                                    :
                                                                    <></>
                                                            )
                                                            :
                                                            <Row key={plus()}>
                                                                <GroupTrend ingroup={firstGroup} reload={reload} stylesIn={colors[n]} />
                                                            </Row>}
                                                    </Col>
                                                    <Col xs={6} md={4}>
                                                        <Card>
                                                            <Card.Header>
                                                                Данные (в разработке)
                                                            </Card.Header>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Card>
                            </Container>
                            :
                            <>
                                {newColor()}
                                <Card className={colors[n].colorBorder + " m-2  mb-5"} key={plus()}>
                                    <Accordion defaultActiveKey={"jk"}>
                                        <Accordion.Item eventKey={"jk"}>
                                            {firstGroup.monitor.length !== 0 ?
                                                <Accordion.Button className={colors[n].colorBack + " CardHead"}>
                                                    {firstGroup.nameMonitor === "Продажи" || firstGroup.nameMonitor === "Финансы" ?
                                                        <><MdAttachMoney className='svgTrends' /> {firstGroup.nameMonitor}</> :
                                                        firstGroup.nameMonitor === "Клиенты" ?
                                                            <><BsFillPeopleFill className='svgTrends' />  {firstGroup.nameMonitor}</> : <></>
                                                    }
                                                </Accordion.Button>
                                                : <></>}
                                            <Accordion.Body className='noMP'>
                                                <Col >
                                                    {firstGroup.monitor.length !== 0 ?
                                                        firstGroup.monitor.map(cardGroup =>
                                                            !cardGroup.null ?
                                                                <Row key={plus()} className={'delBsgutter'} >
                                                                    <PfoneGroupTrend ingroup={cardGroup} reload={reload} stylesIn={colors[n]} />
                                                                </Row>
                                                                :
                                                                <></>
                                                        )
                                                        :
                                                        <Row key={plus()}>
                                                            <PfoneGroupTrend ingroup={firstGroup} reload={reload} stylesIn={colors[n]} />
                                                        </Row>}
                                                </Col>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Card>
                            </>
                        :
                        <></>
                )
                : <></>
            }
        </>
    );
};

export default React.memo(Trends);
