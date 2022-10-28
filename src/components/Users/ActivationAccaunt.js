import React, { useEffect, useState } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../components/UI/CSS/Auth.css';
import { LOGIN_ROUTE } from '../../utils/const';
import AuthServise from '../../servise/funtionService/AuthService'
import { toast } from 'react-toastify';
const ActivationAccaunt = () => {
    const [message,setMessage] = useState('');
  useEffect(()=>{
    let url = window.location.pathname.split('/');
        toast.promise(
            AuthServise.activateAccaunt(url[2]).then((respons) => {
                setMessage(respons.data.message)
            })
            .catch((error) => {
                let message = error.request.responseText.split('"');
                toast.error(message[3]);
            }), {
            pending: "Please wait... ",
        })
  },[])
        
   
    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Card className="p-5 loginForm">
                <h2 className="m-auto"> Activation </h2>
                <Card.Body className="m-auto">
                    <Row>
                        <p> Your accaunt has been : <Link to={LOGIN_ROUTE}><strong>{message}</strong></Link></p>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ActivationAccaunt;