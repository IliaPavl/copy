import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { RiCustomerService2Line, RiHome2Line, RiLineChartLine, RiLogoutBoxRLine, RiMenuUnfoldFill, RiTeamFill, RiUser2Fill, RiUserAddLine, RiUserFollowFill, } from "react-icons/ri";
import { Link } from 'react-router-dom';
import LocalServise from '../../../../servise/httpServise/LocalServise';
import { COMPANY_ADD, COMPANY_LIST, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ADD, USER_LIST, USER_PROFILE } from '../../../../utils/const';
import SearchLable from '../../SearchForm/SearchLable';
import Group from './Group';
import "./SideBarCSs.css";

const SideBar = ({ show, isRoleAdmin, monitors, links }) => {
    async function Logout() {
        LocalServise.logoutUser();
        window.location.assign(LOGIN_ROUTE)
    }

    const [accountLink, setAccountLink] = useState(false)
    async function showAccountLink() {
        setAccountLink(!accountLink);
    }

    const [resultLink, setResultLink] = useState(false)
    async function showResultLink() {
        setResultLink(!resultLink);
    }

    const [help, setHelp] = useState(false)
    async function showHelp() {
        setHelp(!help);
    }
    const search = (seachMessege) => {
        console.log(seachMessege)
    };

    let number = 1;

    function plus() {
        number++;
        return number;
    }

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

    useEffect(() => {

    }, [])

    return (

        <Col sm={2} className={show ? 'SideNav active' : 'SideNav'}>
            <ul>
                <li>
                    <SearchLable backSearch={search} />
                </li>
                {isRoleAdmin ?
                    <>
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
                            : <></>}

                    </>
                    : <></>
                }
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