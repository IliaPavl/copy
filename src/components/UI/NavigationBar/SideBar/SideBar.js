import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { RiLineChartLine, RiLogoutBoxRLine, RiUser2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import LocalServise from '../../../../servise/httpServise/LocalServise';
import { LOGIN_ROUTE, USER_PROFILE } from '../../../../utils/const';
import SearchLable from '../../SearchForm/SearchLable';
import Group from './Group';
import "./SideBarCSs.css";

const SideBar = ({ show, monitors, links }) => {
    async function Logout() {
        LocalServise.logoutUser();
        window.location.assign(LOGIN_ROUTE)
    }

    const [resultLink, setResultLink] = useState(false)
    async function showResultLink() {
        setResultLink(!resultLink);
    }

    const search = (seachMessege) => {
        console.log(seachMessege)
    };

    const [menu, setMenu] = useState([])

    useEffect(() => {
        let monitor = [];
        let showMonitors = [];
        let localLinks = [];
        for (let i in monitors) {
            showMonitors.push({ name: monitors[i].monitorLevel, value: false, })
            localLinks = [];
            for (let k in links) {
                if (monitors[i].monitorLevel === links[k].nameMonitor) {
                    localLinks.push(links[k]);
                }
            }
            if (monitor.length !== 0) {
                
                if (monitor[monitor.length - 1].level === monitors[i].level) {
                    monitor.push({
                        level: monitors[i].level,
                        monitorName: monitors[i].monitorLevel,
                        inMonitor: [],
                        links: [],
                    })
                    if (monitor[monitor.length - 1].monitorName === monitors[i].monitorLevel)
                        monitor[monitor.length - 1].links = localLinks;
                }
                else {
                    let inMonitor = {
                        level: monitors[i].level,
                        monitorName: monitors[i].monitorLevel,
                        inMonitor: [],
                        links: localLinks,
                    }
                    monitor[monitor.length - 1].inMonitor.push(inMonitor);
                }
            } else {
                monitor.push({
                    level: monitors[i].level,
                    monitorName: monitors[i].monitorLevel,
                    inMonitor: [],
                    links: [],
                })
            }
        }
        setMenu(monitor)
    }, [monitors])

    return (

        <Col sm={2} className={show ? 'SideNav active' : 'SideNav'}>
            <ul>
                <li>
                    <SearchLable backSearch={search} />
                </li>
                <li>
                    <Link to={USER_PROFILE} className='Link'>
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10}>
                                    Profile
                                </Col>
                                <Col sm={1}>
                                    <RiUser2Fill className='icon LinkHiden' />
                                </Col>
                            </Row>
                        </span>
                    </Link>
                </li>
                <li>
                    <span className='textNav ' onClick={() => showResultLink()} >
                        <Row>
                            <Col sm={10}>
                                Monitors
                            </Col>
                            <Col sm={1}>
                                <RiLineChartLine className='icon LinkHiden' />
                            </Col>
                        </Row>
                    </span>
                </li>
                {resultLink ?
                    <li>
                        <Group menu={menu}></Group>
                    </li>
                    :
                    <></>}
                <li>
                    <Link to={LOGIN_ROUTE} className='Link' onClick={Logout}>
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10}>
                                    Logout
                                </Col>
                                <Col sm={1}>
                                    <RiLogoutBoxRLine className='icon LinkHiden' />
                                </Col>
                            </Row>
                        </span>
                    </Link>
                </li>
            </ul>
        </Col>
    );
};

export default React.memo(SideBar);