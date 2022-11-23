import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { RiLineChartLine, RiLogoutBoxRLine, RiTeamLine, RiUser2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import LocalServise from '../../../../servise/httpServise/LocalServise';
import { HOME_PAGE, LOGIN_ROUTE, USER_LIST, USER_PROFILE } from '../../../../utils/const';
import SearchLable from '../../SearchForm/SearchLable';
import "./SideBarCSs.css";

const SideBar = ({ show, monitors, links, isRoleAdmin }) => {
    async function Logout() {
        LocalServise.logoutUser();
        window.location.assign(LOGIN_ROUTE)
    }

    const search = (seachMessege) => {
        console.log(seachMessege)
    };


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
                {isRoleAdmin === true ? <li>
                    <Link to={USER_LIST} className='Link'>
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10}>
                                    Users
                                </Col>
                                <Col sm={1}>
                                    <RiTeamLine className='icon LinkHiden' />
                                </Col>
                            </Row>
                        </span>
                    </Link>
                </li> : <></>}

                <li>
                    <Link to={HOME_PAGE} className='Link'>
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10}>
                                    Monitors
                                </Col>
                                <Col sm={1}>
                                    <RiLineChartLine className='icon LinkHiden' />
                                </Col>
                            </Row>
                        </span>
                    </Link>
                </li>
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