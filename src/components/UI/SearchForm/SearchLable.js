import React from 'react';
import {Form, FormControl} from "react-bootstrap";

const SearchLable = ({backSearch}) => {
    return (
        <Form className="d-flex ml-auto m-1">
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={e => backSearch(e.target.value)}
            />
        </Form>
    );
};

export default SearchLable;