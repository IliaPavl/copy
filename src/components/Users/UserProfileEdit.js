import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import UserServise from '../../servise/funtionService/UserServise';
import UserHttpServise from '../../servise/httpServise/UserHttpServise';
import { URL_EDIT_USER, URL_NEW_USER } from '../../utils/const';
import DropDownOutSucses from '../UI/DropDown/DropDownOutSucses';
import Access from './Access';


const UserProfile = ({ isNew, update }) => {
    let [isNewUser, setIsNew] = useState(isNew);
    let [status, setStatus] = useState([])
    let [company, setCompany] = useState([])
    let [role, setRole] = useState([])
    let [links, setLinks] = useState([]);
    let [statusE, setStatusE] = useState('')
    let [companyE, setCompanyE] = useState('')
    let [roleE, setRoleE] = useState([])

    async function setAxiosClients() {
        UserHttpServise.getClientUser().then((respons) => {
            setCompany(UserServise.setClientUser(respons))
        }).catch((error) => { toast.error(error) })
    }

    async function setAxiosStatusUser() {
        UserHttpServise.getStatusUser().then((respons) => {
            setStatus(UserServise.setStatusUser(respons))
        }).catch((error) => { toast.error(error) })
    }

    async function setRoleUser(values) {
        setRoleE(values)
    }

    async function setAxiosRoleUser() {

        UserHttpServise.getRoleUser().then((respons) => {
            setRole(UserServise.setRoleUser(respons))
        }).catch((error) => { toast.error(error) })
    }

    let [login, setLogin] = useState('')
    let [fioUser, setFio] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [repit, setRepit] = useState('')


    const [showAccess, setShowAccess] = useState(false);

    const handleClose = () => setShowAccess(false);
    const handleShow = () => setShowAccess(true);

    async function setUserInfo() {
        let url = window.location.pathname.split('/');
        UserHttpServise.getUser(URL_EDIT_USER + '/' + url[2]).then((respons) => {
            setLinks(respons.data.accessUserInCompany)
            setLogin(respons.data.login)
            setFio(respons.data.fio)
            setEmail(respons.data.email)
            setPassword('')
            setRepit('')
            setCompanyE(respons.data.company)
            setStatusE(respons.data.status)
            let k = respons.data.role.split(',')
            let values = [];
            for (let j in k) {
                if (k[j].trim() !== "")
                    values.push(k[j].trim())
            }
            setRoleE(values)
        }).catch((error) => { toast.error(error) })
    }

    async function getAccessList() {
        UserServise.setUserProfile().then(obj => {
            obj.data[3].map(l => { l.checked = 0 })
            setLinks(obj.data[3])
        }).catch((error) => { toast.error(error) })
    }

    async function submitForm(event) {
        event.preventDefault()
        if (password !== repit) {
            toast.error("Пароли не совпадают !")
        } else {
            let url = window.location.pathname.split('/');
            if (!isNewUser)
                toast.promise(
                    UserHttpServise.updateUser(login, fioUser, email, password, roleE, statusE, companyE, URL_EDIT_USER + '/' + url[2], links).then((respons) => {
                        toast.success(respons.data)
                    }).catch((error) => { toast.error(error) }), { pending: "Please wait... ", })
            else {
                toast.promise(
                    UserHttpServise.updateUser(login, fioUser, email, password, roleE, statusE, companyE, URL_NEW_USER, links).then((respons) => {
                        toast.success(respons.data)
                        update();
                    }).catch((error) => { toast.error(error) }), { pending: "Please wait... ", })
            }
        }
    }

    useEffect(() => {

    }, [links])

    useEffect(() => {
        if(isNewUser!== null){
        setAxiosClients()
        setAxiosStatusUser()
        setAxiosRoleUser()
        if (!isNewUser)
            setUserInfo()
        else
            getAccessList()
        }
        if (window.innerWidth < 900)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, [])

    useEffect(() => {
        if (isNewUser)
            if (company.length !== 0)
                setCompanyE(company[0].item)
    }, [company, isNewUser])

    useEffect(() => {
        if (isNewUser)
            if (status.length !== 0)
                setStatusE(status[1].item)
    }, [status, isNewUser])

    useEffect(() => {
        if (isNewUser)
            if (role.length !== 0) {
                let r = []
                r.push(role[1].item)
                setRoleE(r);
            }
    }, [role, isNewUser])


    async function saveChenge(links) {
        setLinks(links)
    }
    let [isPfone, setIsPfone] = useState(false)
    window.onresize = function (event) {
        if (event.target.innerWidth < 900)
            setIsPfone(true)
        else
            setIsPfone(false)
    };
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <Card className={"border-1 m-1 cardContainer "} >
                <Card.Header>
                    <div style={{ float: "left" }}>
                        Подтвердить изменения пользователя
                    </div>
                </Card.Header>
                <Card.Body >
                    <Form onSubmit={event => { submitForm(event) }}>
                        <Row >
                            <div className='containerFirstEdit'>Логин:</div>
                            <Form.Control className={isPfone ? 'containerSecondAdd':'containerSecondEdit'}  type="text" placeholder="Введите логин" value={login} onChange={e => setLogin(e.target.value)} />
                        </Row>
                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>ФИО:</div>
                            <Form.Control className={isPfone ? 'containerSecondAdd':'containerSecondEdit'} type="text" placeholder="Введите фио " value={fioUser} onChange={e => setFio(e.target.value)} />
                        </Row>
                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>Почта:</div>
                            <Form.Control className={isPfone ? 'containerSecondAdd':'containerSecondEdit'} type="email" autocomplete="username email" placeholder="Введите почту" value={email} onChange={e => setEmail(e.target.value)} />
                        </Row>
                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>Роль:</div>
                            <div className={isPfone ? 'containerSecondAdd_ch':'containerSecondEdit_ch'}>
                                <DropDownOutSucses values={role} setEnabledStatus={setRoleUser} enabledStatus={roleE} />
                            </div>
                        </Row>
                        {!isNew ? <Row className='mt-2'>
                            <div className='containerFirstEdit'>Статус:</div>
                            <div className={isPfone ? 'containerSecondAdd_ch':'containerSecondEdit_ch'}>
                                <DropDownOutSucses values={status} setEnabledStatus={setStatusE} enabledStatus={statusE} />
                            </div>
                        </Row> : <></>}

                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>Показатели:</div>
                            <Button variant={isPfone ? "outline-primary containerSecondAdd_b":"outline-primary containerSecondEdit_b"} onClick={handleShow}>
                                Показатели
                            </Button>
                            <Access show={showAccess} handleClose={handleClose} links={links} saveChenge={saveChenge} />
                        </Row>
                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>Пароль:</div>
                            <Form.Control className={isPfone ? 'containerSecondAdd':'containerSecondEdit'} type="password" name="password" autocomplete="new-password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)} />
                        </Row>
                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>Повторите:</div>
                            <Form.Control className={isPfone ? 'containerSecondAdd':'containerSecondEdit'} type="password" name="passwordRepit" autocomplete="new-password" placeholder="Повторите пароль" value={repit} onChange={e => setRepit(e.target.value)} />
                        </Row>
                        <Form.Group as={Row} xs={isPfone ? 2:3} className="m-3 d-flex justify-content-center">
                            <Button variant="primary" type="submit">
                                Сохранить
                            </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default React.memo(UserProfile);