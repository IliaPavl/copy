import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import UserServise from '../../servise/funtionService/UserServise';
import UserHttpServise from '../../servise/httpServise/UserHttpServise';
import { URL_EDIT_USER, URL_NEW_USER } from '../../utils/const';
import DropDownOutSucses from '../UI/DropDown/DropDownOutSucses';
import DropDownOutSucsesCheked from '../UI/DropDown/DropDownOutSucsesCheked';
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
            setLinks(obj.data[3])
        }).catch((error) => { toast.error(error) })
    }

    async function submitForm(event) {
        event.preventDefault()
        if (password !== repit) {
            toast.error("repeat the password correctly!")
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

    let [isPfone, setIsPfone] = useState(false)
    window.onresize = function (event) {
        if (event.target.innerWidth < 770)
            setIsPfone(true)
        else
            setIsPfone(false)
    };

    useEffect(() => {

    }, [links])


    useEffect(() => {

        if (window.innerWidth < 770)
            setIsPfone(true)
        else
            setIsPfone(false)
    }, [])

    useEffect(() => {
        setAxiosClients()
        setAxiosStatusUser()
        setAxiosRoleUser()
        console.log(isNewUser);
        if (!isNewUser)
            setUserInfo()
        else
            getAccessList()
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
    useEffect(() => {
        if (isNewUser)
            setIsPfone(true);
    }, [isNewUser])

    async function saveChenge(links) {
        setLinks(links)
    }

    return (
        <Container className='mt-5'>
            <Card className={"border-1 m-1"}>
                <Card.Header>
                    <div style={{ float: "left" }}>
                        Confirm user
                    </div>
                </Card.Header>
                <Card.Body>
                    {isPfone ?
                        <Form onSubmit={event => { submitForm(event) }}>
                            <Row >
                                <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput1">
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control type="text" placeholder="Login123" value={login} onChange={e => setLogin(e.target.value)} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>User name</Form.Label>
                                    <Form.Control type="text" placeholder="Surname Firstname Lastname " value={fioUser} onChange={e => setFio(e.target.value)} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput6">
                                    <Form.Label>Company</Form.Label>
                                    <DropDownOutSucses values={company} setEnabledStatus={setCompanyE} enabledStatus={companyE} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput7">
                                    <Form.Label>Role</Form.Label>
                                    <DropDownOutSucsesCheked values={role} setEnabledBox={setRoleUser} enabledStatus={roleE} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput8">
                                    <Form.Label>Status</Form.Label>
                                    <DropDownOutSucses values={status} setEnabledStatus={setStatusE} enabledStatus={statusE} />
                                </Form.Group>
                            </Row>
                            <Row sm={1} className='mb-2 d-flex justify-content-center'>
                                <Row>
                                    <Row>
                                        <Form.Label>Access user monitors</Form.Label>
                                    </Row>
                                    <Row>
                                        <Button variant="outline-primary" onClick={handleShow}>
                                            Access monitors
                                        </Button>
                                    </Row>
                                </Row>
                                <Access show={showAccess} handleClose={handleClose} links={links} saveChenge={saveChenge} />
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="12424235Le" value={password} onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput5">
                                    <Form.Label>Repit password</Form.Label>
                                    <Form.Control type="password" placeholder="12424235Le" value={repit} onChange={e => setRepit(e.target.value)} />
                                </Form.Group>
                            </Row>


                            <Form.Group as={Row} xs={3} className="mb-3 d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>
                        :
                        <Form onSubmit={event => { submitForm(event) }}>
                            <Row>
                                <Col>
                                    <Row >
                                        <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput1">
                                            <Form.Label>Login</Form.Label>
                                            <Form.Control type="text" placeholder="Login123" value={login} onChange={e => setLogin(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>User name</Form.Label>
                                            <Form.Control type="text" placeholder="Surname Firstname Lastname " value={fioUser} onChange={e => setFio(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput3">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput6">
                                            <Form.Label>Company</Form.Label>
                                            <DropDownOutSucses values={company} setEnabledStatus={setCompanyE} enabledStatus={companyE} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput7">
                                            <Form.Label>Role</Form.Label>
                                            <DropDownOutSucsesCheked values={role} setEnabledBox={setRoleUser} enabledStatus={roleE} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput8">
                                            <Form.Label>Status</Form.Label>
                                            <DropDownOutSucses values={status} setEnabledStatus={setStatusE} enabledStatus={statusE} />
                                        </Form.Group>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput4">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="12424235Le" value={password} onChange={e => setPassword(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput5">
                                            <Form.Label>Repit password</Form.Label>
                                            <Form.Control type="password" placeholder="12424235Le" value={repit} onChange={e => setRepit(e.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row className='mb-2 d-flex justify-content-center'>
                                        <Row>
                                            <Row>
                                                <Form.Label>Access user monitors</Form.Label>
                                            </Row>
                                            <Row>
                                                <Button variant="outline-primary" onClick={handleShow}>
                                                    Access monitors
                                                </Button>
                                            </Row>
                                        </Row>
                                        <Access show={showAccess} handleClose={handleClose} links={links} saveChenge={saveChenge} />
                                    </Row>
                                </Col>
                            </Row>
                            <Form.Group as={Row} xs={3} className="mb-3 d-flex justify-content-center">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>
                    }
                </Card.Body>
            </Card>
        </Container>
    );
};

export default React.memo(UserProfile);