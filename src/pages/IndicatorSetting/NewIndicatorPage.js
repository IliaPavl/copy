import React from 'react';
import NewIndicator from '../../components/IndicatorSetting/NewIndicator';
import PageServise from '../../servise/funtionService/PageServise';

const NewIndicatorPage = () => {
    PageServise.setLastPage();
    return (
        <NewIndicator />
    );
};

export default NewIndicatorPage;