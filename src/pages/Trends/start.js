import React from 'react';
import Trends from '../../components/Trends/Trends';
import PageServise from '../../servise/funtionService/PageServise';

const Start = () => {
    PageServise.setLastPage()
    return (
        <div>
            <Trends/>
        </div>
    );
};

export default Start;