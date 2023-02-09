import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputPatternService from '../../servise/funtionService/InputPatternService';
import UserServise from '../../servise/funtionService/UserServise';
import UserHttpServise from '../../servise/httpServise/UserHttpServise';
import { URL_EDIT_USER, URL_NEW_USER, USER_LIST } from '../../utils/const';
import DropDownOutSucses from '../UI/DropDown/DropDownOutSucses';
import Access from './Access';


const UserProfile = ({ isNew, update,close }) => {
    let [isNewUser, setIsNew] = useState();
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

    let [errorlogin, setErrorlogin] = useState('');
    let [errorPass, setErrorPass] = useState('');
    let [errorEmail, setErrorEmail] = useState('');

    let [iserrorlogin, setIsErrorlogin] = useState('');
    let [iserrorPass, setIsErrorPass] = useState('');
    let [iserrorEmail, setIsErrorEmail] = useState('');


    function isLogin(value) {
        setErrorlogin(InputPatternService.loginInput(value));
        setLogin(value);
    }

    function isPass(value) {
        if (isNewUser) {
            if (value === '' || value === null)
                setErrorPass('')
            else
                setErrorPass(InputPatternService.passwordInput(value));
        }
        else
            setErrorPass(InputPatternService.passwordInput(value));
        setPassword(value);
    }

    function isRepit(value) {
        setRepit(value);
    }

    function isEmail(value) {
        setErrorEmail(InputPatternService.emailInput(value));
        setEmail(value);
    }


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
            const arr = obj.data[3].map(obj=>({...obj, checked: 0}));
            setLinks(arr)
           
        }).catch((error) => { toast.error(error) })
    }

    const navigate =useNavigate();
    async function submitForm(event) {
        
        event.preventDefault()
        if (password !== repit)
            toast.error("Пароли не совпадают !")
        else if (errorlogin === '' && errorPass === '' && errorEmail === '') {
            let url = window.location.pathname.split('/');
            if (!isNewUser)
                toast.promise(
                    UserHttpServise.updateUser(login, fioUser, email, password, roleE, statusE, companyE, URL_EDIT_USER + '/' + url[2], links).then((respons) => {
                        navigate(USER_LIST);
                        toast.success("Сотрудник изменён")
                        update();
                        close();
                    }).catch((error) => { toast.error(error) }), { pending: "Please wait... ", })
            else {
                toast.promise(
                    UserHttpServise.updateUser(login, fioUser, email, password, roleE, statusE, companyE, URL_NEW_USER, links).then((respons) => {
                        toast.success("Сотрудник создан")
                        update();
                        close();
                    }).catch((error) => { toast.error(error) }), { pending: "Please wait... ", })
            }
        }
        else
        {
            if(errorlogin === '')
            setIsErrorlogin('')
            else
            setIsErrorlogin('err')
            if(errorPass === '')
            setIsErrorPass('')
            else
            setIsErrorPass('err')
            if(errorEmail === '')
            setIsErrorEmail('')
            else
            setIsErrorEmail('err')
            toast.warning("Проверьте введённые вами данные");
        }
        
    }

    useEffect(() => {

    }, [links, isNew])

    useEffect(() => {
        setIsNew(isNew);
        if (isNew !== null) {
            setAxiosClients()
            setAxiosStatusUser()
            setAxiosRoleUser()
            if (!isNew)
                setUserInfo()
            else {
                getAccessList();
                isLogin('');
                isEmail('');
            }

        }
        if (window.innerWidth < 900)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, [isNew])

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
            <Card className={isPfone ? "border-1 m-1 cardContainerPfone " : "border-1 m-1 cardContainer "} >
                <Card.Header>
                    <div style={{ float: "left" }}>
                        Подтвердить изменения пользователя
                    </div>
                </Card.Header>
                <Card.Body >
                    <Form onSubmit={event => { submitForm(event) }}>
                        <Row >
                            <div className='containerFirstEdit'>Логин:</div>
                            <Form.Control className={isPfone ? 'containerSecondAdd' : 'containerSecondEdit'} type="text" placeholder="Введите логин" defaultValue={login} onChange={e => isLogin(e.target.value)} />
                            {iserrorlogin === '' ? <></> : <Form.Text muted>
                                <span className='textError'>{errorlogin}</span>
                            </Form.Text>}
                        </Row>
                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>ФИО:</div>
                            <Form.Control className={isPfone ? 'containerSecondAdd' : 'containerSecondEdit'} type="text" placeholder="Введите фио " value={fioUser} onChange={e => setFio(e.target.value)} />
                        </Row>
                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>Почта:</div>
                            <Form.Control className={isPfone ? 'containerSecondAdd' : 'containerSecondEdit'} type="email" placeholder="Введите почту" value={email} onChange={e => isEmail(e.target.value)} />
                            {iserrorEmail === '' ? <></> : <Form.Text muted>
                                <span className='textError'>{errorEmail}</span>
                            </Form.Text>}
                        </Row>
                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>Роль:</div>
                            <div className={isPfone ? 'containerSecondAdd_ch' : 'containerSecondEdit_ch'}>
                                <DropDownOutSucses values={role} setEnabledStatus={setRoleUser} enabledStatus={roleE} />
                            </div>
                        </Row>
                        {!isNew ? <Row className='mt-2'>
                            <div className='containerFirstEdit'>Статус:</div>
                            <div className={isPfone ? 'containerSecondAdd_ch' : 'containerSecondEdit_ch'}>
                                <DropDownOutSucses values={status} setEnabledStatus={setStatusE} enabledStatus={statusE} />
                            </div>
                        </Row> : <></>}

                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>Показатели:</div>
                            <Button variant={isPfone ? "outline-primary containerSecondAdd_b" : "outline-primary containerSecondEdit_b"} onClick={handleShow}>
                                Показатели
                            </Button>
                            <Access show={showAccess} handleClose={handleClose} links={links} saveChenge={saveChenge} />
                        </Row>
                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>Пароль:</div>
                            <Form.Control className={isPfone ? 'containerSecondAdd' : 'containerSecondEdit'} type="password" name="password" placeholder="Введите пароль" defaultValue={password} onChange={e => isPass(e.target.value)} />
                            {iserrorPass === '' ? <></> : <Form.Text muted>
                                <span className='textError'>{errorPass}</span>
                            </Form.Text>}
                        </Row>
                        <Row className='mt-2'>
                            <div className='containerFirstEdit'>Повторите:</div>
                            <Form.Control className={isPfone ? 'containerSecondAdd' : 'containerSecondEdit'} type="password" name="passwordRepit" placeholder="Повторите пароль" defaultValue={repit} onChange={e => isRepit(e.target.value)} />
                        </Row>
                        <Form.Group as={Row} xs={isPfone ? 2 : 3} className="m-3 d-flex justify-content-end">
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