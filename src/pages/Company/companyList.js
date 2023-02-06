import React from 'react';
import ListUser from "../../components/Users/userList";
import PageServise from '../../servise/funtionService/PageServise';


const CompanyLIst = () => {
    PageServise.setLastPage()
    return (
        <div>
            <ListUser/>
        </div>
    );
};

export default CompanyLIst;