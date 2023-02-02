import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { RiLineChartLine, RiLogoutBoxRLine, RiTeamLine, RiUser2Fill,RiSettings3Line,RiFileSettingsLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import LocalServise from '../../../../servise/httpServise/LocalServise';
import { HOME_PAGE, INDICATOR_LIST, LOGIN_ROUTE, SETTINGS_NOTIFICATION, USER_LIST, USER_PROFILE } from '../../../../utils/const';
import SearchLable from '../../SearchForm/SearchLable';
import "./SideBarCSs.css";

const SideBar = ({ show, isRoleAdmin, showBurger,isUser }) => {
    async function Logout() {
        LocalServise.logoutUser();
        window.location.assign(LOGIN_ROUTE)
        showBurger();
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
                {isUser === true ? 
                <li>
                    <Link to={USER_PROFILE} className='Link' onClick={()=> showBurger()}>
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10} className='firstCol'>
                                    Профиль
                                </Col>
                                <Col sm={1} className='sekondCol'>
                                    <RiUser2Fill className='icon LinkHiden' />
                                </Col>
                            </Row>
                        </span>
                    </Link>
                </li>:<></>}
                {isUser === true ? 
                <li>
                    <Link to={SETTINGS_NOTIFICATION} className='Link' onClick={()=> showBurger()}>
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10} className='firstCol'>
                                    Настройки
                                </Col>
                                <Col sm={1} className='sekondCol'>
                                    <RiSettings3Line className='icon LinkHiden' />
                                </Col>
                            </Row>
                        </span>
                    </Link>
                </li>:<></>}
                {isRoleAdmin === true ? 
                <li>
                    <Link to={INDICATOR_LIST} className='Link' onClick={()=> showBurger()}>
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10} className='firstCol'>
                                    Показатели
                                </Col>
                                <Col sm={1} className='sekondCol'>
                                    <RiFileSettingsLine className='icon LinkHiden' />
                                </Col>
                            </Row>
                        </span>
                    </Link>
                </li> : <></>}

                {isRoleAdmin === true ? 
                <li>
                    <Link to={USER_LIST} className='Link' onClick={()=> showBurger()}>
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10} className='firstCol'>
                                    Пользователи
                                </Col>
                                <Col sm={1} className='sekondCol'>
                                    <RiTeamLine className='icon LinkHiden' />
                                </Col>
                            </Row>
                        </span>
                    </Link>
                </li> : <></>}
                {isUser === true ?     
                <li>
                    <Link to={HOME_PAGE} className='Link' onClick={()=> showBurger()}>
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10} className='firstCol'>
                                    Мониторы
                                </Col>
                                <Col sm={1} className='sekondCol'>
                                    <RiLineChartLine className='icon LinkHiden' />
                                </Col>
                            </Row>
                        </span>
                    </Link>
                </li>:<></>}
                <li>
                    <Link to={LOGIN_ROUTE} className='Link' onClick={Logout} >
                        <span className='textNav ' >
                            <Row>
                                <Col sm={10} className='firstCol'>
                                    Выйти
                                </Col>
                                <Col sm={1} className='sekondCol'>
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