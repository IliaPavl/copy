import React from 'react';
import Login from "../../components/AuthComponents/Login";
import PageServise from '../../servise/funtionService/PageServise';

const LoginPage = () => {
    PageServise.setLastPage()
    return (
        <Login />
    );
};

export default LoginPage;