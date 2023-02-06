import React, { useEffect, useState } from 'react';
import { Accordion, Table } from 'react-bootstrap';
import { RiArrowRightDownLine, RiArrowRightLine, RiArrowRightUpLine, RiSettings3Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ResultHttpServise from '../../servise/httpServise/ResultHttpServise';
import { INDICATOR_RESULT } from '../../utils/const';
import './GroupTrend.css';
import ModalSettings from './ModalSettings';

const GroupTrend = ({ ingroup, reload, stylesIn }) => {

    let [dataLinks, setData] = useState([]);
    const navigate = useNavigate();
    const [showAccess, setShowAccess] = useState(false);
    let [group, setGroup] = useState(ingroup);
    let number = 1;

    function plus() { number++; return number; }
    const goToLink = (link) => navigate(INDICATOR_RESULT + "/" + link)
    async function s(links) { setData(links); }
    const handleShow = () => setShowAccess(true);
    const handl = () => { setShowAccess(!showAccess) };

    async function saveChenge(links, redRange, greenRange, planRange, periodEnable, typeChart, idIndicator, direction, planMonthTrend) {
        const settings = { links: links, redRange: redRange, greenRange: greenRange, planRange: planRange, periodEnable: periodEnable, typeChart: typeChart, idIndicator: idIndicator, direction: direction, trendMonth: planMonthTrend };
        toast.promise(
            ResultHttpServise.changeSettins(settings).then((respons) => {
                reload();
                toast.success(respons.data)
                const gr = group;
                gr.linkMonitor.map(l =>
                    l.idResult === links[0].idIndicator ?
                        l.userAccessList = links
                        :
                        l.userAccessList
                )
                setGroup(gr);
            }).catch((error) => { toast.error(error) }), { pending: "Please wait... ", })
        handl();
    }

    useEffect(() => {
        if (ingroup.length !== 0) {
            let newHead = [];
            newHead.push(
                { title: 'Название' },
                { title: 'Факт' },
                { title: 'План' },
                { title: 'Статус' },
                { title: 'Тренд' },
                { title: 'Дата' },
                { title: 'ед.' },
            )
            setGroup(ingroup);
        }
    }, [ingroup])



    return (
        <>
            <Accordion defaultActiveKey={group.nameMonitor} className={"cradsGroup"}>
                <Accordion.Item eventKey={group.nameMonitor}>
                    <Accordion.Button className={stylesIn.colorBack + " CardHeadAccordion"}> {group.nameMonitor} </Accordion.Button>
                    <Accordion.Body className={"scrollTable"}>
                        {group.monitor.length === 0 ?
                            <Table variant='table-bordered table-hover' style={{ height: 70 }} className={"scrollTable"} >
                                <thead className="thead-dark">
                                    <tr>
                                        <th >
                                            <div className='tablePCName'>
                                                Название
                                            </div>
                                        </th>
                                        <th>
                                            <div className='tablePfoneFact'>
                                                Факт
                                            </div>
                                        </th>
                                        <th>
                                            <div className='tablePfoneFact'>
                                                План
                                            </div>
                                        </th>
                                        <th>Статус</th>
                                        <th>Тренд</th>
                                        <th>
                                            <div className='tablePfoneDate'>
                                                Дата
                                            </div>
                                        </th>
                                        {/* <th>
                                            <div className='tablePfoneUnits'>
                                                Ед.изм.
                                            </div>
                                        </th> */}
                                    </tr>
                                </thead>
                                <tbody className="table-light">
                                    {group.linkMonitor.map(links =>
                                        <tr key={plus()}>
                                            <td onClick={() => goToLink(links.idResult)} id="name" className='tablePCName'>{links.nameResult}, {links.typeResult}</td>
                                            <td onClick={() => goToLink(links.idResult)} id="fact">{links.indFact}</td>
                                            <td onClick={() => goToLink(links.idResult)} id="plan">
                                                {links.indPlan !== 0 ? <>{links.indPlan}</> : <></>}
                                            </td>
                                            <td onClick={() => goToLink(links.idResult)} id="status">
                                                <div className="notification-container">
                                                    <span className={
                                                        links.indStatus === "1" ? "notification-container__text_Red" :
                                                            links.indStatus === "2" ? "notification-container__text_Yellow" :
                                                                links.indStatus === "3" ? "notification-container__text_Green" : ""}>
                                                        <div className='statusNumberContainer'>   {links.indStatusPercent}%</div>
                                                    </span>
                                                </div>
                                            </td >

                                            <td onClick={() => goToLink(links.idResult)} id="trend">
                                                {links.trend === "1" ? <RiArrowRightDownLine className='arrowDown' /> : <></>}
                                                {links.trend === "2" ? <RiArrowRightLine className='arrowHoriz' /> : <></>}
                                                {links.trend === "3" ? <RiArrowRightUpLine className='arrowUp' /> : <></>}
                                            </td>
                                            <td onClick={() => goToLink(links.idResult)} id="date">{links.parseMaxDate}</td>
                                            {/* <td onClick={() => goToLink(links.idResult)} id="units">{links.typeResult}</td> */}
                                            <td onClick={() => s(links)}> <RiSettings3Line onClick={() => handleShow()} className='chartSVG ' /></td>
                                        </tr>
                                    )}
                                </tbody>
                                <ModalSettings show={showAccess} handleClose={handl} saveChenge={saveChenge} data={dataLinks} isAdmin={group.admin} />
                            </Table>
                            :
                            <GroupTrend group={group.monitor} />
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default React.memo(GroupTrend);
