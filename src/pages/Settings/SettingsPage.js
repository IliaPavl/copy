import React from 'react';
import SettingBack from '../../components/Settings/SettingBack';
import PageServise from '../../servise/funtionService/PageServise';

const SettingsPage = () => {
    PageServise.setLastPage()
    return (
        <div>
            <SettingBack/>
        </div>
    );
};

export default SettingsPage;