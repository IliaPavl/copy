import React from 'react';
import Registration from "../../components/AuthComponents/Registration";
import PageServise from '../../servise/funtionService/PageServise';

const RegistrationPage = () => {
    PageServise.setLastPage()
    return (
        <Registration/>
    );
};

export default RegistrationPage;