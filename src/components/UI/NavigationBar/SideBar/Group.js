import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { INDICATOR_RESULT } from '../../../../utils/const';
import "./../SideBar/SideBarCSs.css";
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

const Group = ({ menu }) => {
    const [show, setShow] = useState([])
    const [menuLocal, setMenu] = useState([]);
    const [linkName, setLinkName] = useState([]);
    const navigate = useNavigate();
    const goToLink = (link) => navigate(INDICATOR_RESULT + "/" + link.idResult)

    useEffect(() => {
        if (menuLocal.length !== 0) {
            let datas = [];
            menuLocal.forEach(data => {
                data.links.forEach(linksLevel => {
                    if (data.level === linksLevel.previosMonitor && data.monitorName === linksLevel.nameMonitor)
                        datas.push(linksLevel);
                })
            })
            setLinkName(datas)
        }
    }, [menuLocal])

    useEffect(() => {

    }, [linkName, show])



    async function showResultLink(data) {
        if (data.links.length !== 0) {
            menu.forEach(menu =>
                data.links.forEach(link => {
                    if (menu.level === link.previosMonitor && menu.monitorName === link.nameMonitor)
                        goToLink(link);
                    //window.location.assign(INDICATOR_RESULT + "/" + link.idResult);
                })
            )
        }
        else
            setShow(show.map(el => el.name === data.monitorName ? ({ ...show[data.monitorName], show: !el.show, name: el.name }) : el));
    }


    useEffect(() => {
        if (menu.length !== 0) {
            let s = []
            if (menu.length !== 1)
                menu.forEach((data) => { s.push({ show: false, name: data.monitorName }) });
            else
                s.push({ show: false, name: menu.monitorName })
            setShow(s)
            setMenu(menu);
        }
    }, [])

    return (
        <>
            {menuLocal.length !== 0 ? <h1>
                {menuLocal.map(data => (
                    <li key={uuidv4()} >
                        <span className='textNav ' onClick={() => showResultLink(data)} >
                            <Row>
                                <Col sm={10}>
                                    {data.monitorName}
                                </Col>
                            </Row>
                        </span>
                        {show.length !== 0 ?
                            show.map((show) =>
                                show.name === data.monitorName ?
                                    show.show ?
                                        data.inMonitor.length !== 0 ?
                                            <Group menu={data.inMonitor} key={uuidv4()} />
                                            : <></> : <></> : <></>
                            )
                            : <></>}
                    </li>
                ))}</h1> : <></>}

        </>
    );

};

export default React.memo(Group);