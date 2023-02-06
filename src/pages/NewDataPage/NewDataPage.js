import React from 'react';
import NewData from '../../components/NewData/NewData';
import PageServise from '../../servise/funtionService/PageServise';

const NewDataPage = () => {
    PageServise.setLastPage()
    return (
        <div>
            <NewData/>
        </div>
    );
};

export default NewDataPage;