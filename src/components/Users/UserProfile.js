import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import UserServise from '../../servise/funtionService/UserServise';
import UserHttpServise from '../../servise/httpServise/UserHttpServise';
import { URL_EDIT_USER } from '../../utils/const';
import DropDownOutSucses from '../UI/DropDown/DropDownOutSucses';
import DropDownOutSucsesCheked from '../UI/DropDown/DropDownOutSucsesCheked';


const UserProfile = () => {
    let [status, setStatus] = useState([])
    let [company, setCompany] = useState([])
    let [role, setRole] = useState([])

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

    async function setUserInfo() {
        let url = window.location.pathname.split('/');
        UserHttpServise.getUser(URL_EDIT_USER+'/'+url[2]).then((respons) => {
            setLogin(respons.data.login)
            setFio(respons.data.fio)
            setEmail(respons.data.email)
            setPassword('')
            setRepit('')
            setCompanyE(respons.data.company)
            setStatusE(respons.data.status)
            let k = respons.data.role.split(',')
            let values =[];
            for(let j in k){
                if(k[j].trim() !== "")
                values.push(k[j].trim())
            }
            setRoleE(values)
        }).catch((error) => { toast.error(error) })
    }

    async function submitForm(event){
        event.preventDefault()
        if(password !== repit){
            toast.error("repeat the password correctly!")
        } else {
            let url = window.location.pathname.split('/');
            UserHttpServise.updateUser(login,fioUser,email,password,roleE,statusE,companyE,URL_EDIT_USER+'/'+url[2]).then((respons) =>{
                toast.success(respons.data)
            }).catch((error) => { toast.error(error) })
        }
    }

    useEffect(() => {
        setAxiosClients()
        setAxiosStatusUser()
        setAxiosRoleUser()
        setUserInfo()
    }, [])


    return (
        <Container>
            <Card className={"border-1 m-1"}>
                <Card.Header>
                    <div style={{ float: "left" }}>
                        Confirm user
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={event => {submitForm(event)}}>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput1">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Login123" value={login} onChange={e => setLogin(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>User name</Form.Label>
                                <Form.Control type="text" placeholder="Surname Firstname Lastname " value={fioUser} onChange={e => setFio(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="12424235Le" value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 " controlId="exampleForm.ControlInput5">
                                <Form.Label>Repit password</Form.Label>
                                <Form.Control type="password" placeholder="12424235Le" value={repit} onChange={e => setRepit(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput6">
                                <Form.Label>Company</Form.Label>
                                <DropDownOutSucses values={company} setEnabledStatus={setCompanyE} enabledStatus={companyE} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput7">
                                <Form.Label>Role</Form.Label>
                                <DropDownOutSucsesCheked values={role} setEnabledBox={setRoleUser} enabledStatus={roleE} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput8">
                                <Form.Label>Status</Form.Label>
                                <DropDownOutSucses values={status} setEnabledStatus={setStatusE} enabledStatus={statusE} />
                            </Form.Group>
                        </Row>
                        <Form.Group as={Row} xs={3} className="mb-3 d-flex justify-content-center">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default React.memo(UserProfile);