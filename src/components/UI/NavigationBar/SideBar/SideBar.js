import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { RiChatPollLine, RiCustomerService2Line, RiHome2Line, RiLineChartLine, RiLogoutBoxRLine, RiMenuUnfoldFill, RiTeamFill, RiUser2Fill, RiUserAddLine, RiUserFollowFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import LocalServise from '../../../../servise/httpServise/LocalServise';
import { COMPANY_ADD, COMPANY_LIST, INDICATOR_RESULT, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ADD, USER_LIST } from '../../../../utils/const';
import SearchLable from '../../SearchForm/SearchLable';
import "./SideBarCSs.css";

const SideBar = ({ show, isRoleAdmin, resultName }) => {
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
    return (

        <Col sm={2} className={show ? 'SideNav active' : 'SideNav'}>
            <ul>
                <li>
                    <SearchLable backSearch={search} />
                </li>
                <li>
                    <Link to={"/"} className='Link'>
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10}>
                                    Home page
                                </Col>
                                <Col sm={1}>
                                    <RiHome2Line className='icon LinkHiden' />
                                </Col>
                            </Row>
                        </span>
                    </Link>
                </li>
                {isRoleAdmin ?
                    <>
                        <li>
                            <Link to={"/"} className='Link'>
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
                            <span className='textNav ' onClick={() => showAccountLink()} >
                                <Row>
                                    <Col sm={10}>
                                        Accounts
                                    </Col>
                                    <Col sm={1}>
                                        <RiTeamFill className='icon LinkHiden' />
                                    </Col>
                                </Row>
                            </span>
                        </li>
                        {accountLink ?
                            <ul>
                                <li>
                                    <Link to={USER_LIST} className='Link'>
                                        <span className='textNav ' >
                                            <Row>
                                                <Col sm={10}>
                                                    List
                                                </Col>
                                                <Col sm={1}>
                                                    <RiMenuUnfoldFill className='icon LinkHiden menu' />
                                                </Col>
                                            </Row>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={USER_ADD} className='Link'>
                                        <span className='textNav ' >
                                            <Row>
                                                <Col sm={10}>
                                                    Add
                                                </Col>
                                                <Col sm={1}>
                                                    <RiUserAddLine className='icon LinkHiden menu' />
                                                </Col>
                                            </Row>
                                        </span>
                                    </Link>
                                </li>
                            </ul>

                            : <></>}
                        <li>
                            <span className='textNav ' onClick={() => showResultLink()} >
                                <Row>
                                    <Col sm={10}>
                                        Results
                                    </Col>
                                    <Col sm={1}>
                                        <RiLineChartLine className='icon LinkHiden' />
                                    </Col>
                                </Row>
                            </span>
                        </li>
                        {resultLink ?
                            <ul>
                                {Object.entries(resultName).map((data) => (
                                    <li key={plus()}>
                                        <Link to={INDICATOR_RESULT.split('/')[1] + '/' + data[0]} onClick={() => window.location.refresh()} className='Link'>
                                            <span className='textNav ' >
                                                <Row>
                                                    <Col sm={9}>
                                                        {data[1]}
                                                    </Col>
                                                    <Col sm={3}>
                                                        <RiChatPollLine className='icon LinkHiden menu' />
                                                    </Col>
                                                </Row>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            : <></>}
                        <li>
                            <span className='textNav ' onClick={() => showHelp()}>
                                <Row>
                                    <Col sm={10}>
                                        Help
                                    </Col>
                                    <Col sm={1}>
                                        <RiCustomerService2Line className='icon LinkHiden' />
                                    </Col>
                                </Row>
                            </span>
                        </li>
                        {help ?
                            <ul>
                                <li>
                                    <Link to={COMPANY_LIST} className='Link'>
                                        <span className='textNav ' >
                                            <Row>
                                                <Col sm={10}>
                                                    (For tests) Company List
                                                </Col>
                                                <Col sm={1}>
                                                    <RiMenuUnfoldFill className='icon LinkHiden menu' />
                                                </Col>
                                            </Row>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={COMPANY_ADD} className='Link'>
                                        <span className='textNav ' >
                                            <Row>
                                                <Col sm={10}>
                                                    (For tests) Company add
                                                </Col>
                                                <Col sm={1}>
                                                    <RiUserAddLine className='icon LinkHiden menu' />
                                                </Col>
                                            </Row>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={REGISTRATION_ROUTE} className='Link'>
                                        <span className='textNav ' >
                                            <Row>
                                                <Col sm={10}>
                                                    (For tests) Registration admin
                                                </Col>
                                                <Col sm={1}>
                                                    <RiUserFollowFill className='icon LinkHiden menu' />
                                                </Col>
                                            </Row>
                                        </span>
                                    </Link>
                                </li>
                            </ul>

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