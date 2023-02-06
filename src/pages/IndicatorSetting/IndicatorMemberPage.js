import React from 'react';
import IndicatorMember from '../../components/IndicatorSetting/IndicatorMember';
import PageServise from '../../servise/funtionService/PageServise';

const IndicatorMemberPage = () => {
    PageServise.setLastPage()
    return (
        <IndicatorMember/>
    );
};

export default IndicatorMemberPage;