import React from 'react';
import Search from './SearchWithButton';


const SetSearch = () => {
    const search = (seachMessege) => {
        console.log(seachMessege)
    };
    return (
        <Search backSearch={search} />
    );
};

export default SetSearch;