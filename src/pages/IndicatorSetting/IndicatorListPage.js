import React from 'react';
import IndicatorList from '../../components/IndicatorSetting/IndicatorList';
import PageServise from '../../servise/funtionService/PageServise';

const IndicatorListPage = () => {
    PageServise.setLastPage()
    return (
        <IndicatorList />
    );
};

export default IndicatorListPage;