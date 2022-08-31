import React, { useState } from 'react';
import { Button, Form, FormControl } from "react-bootstrap";

const SearchWithButton = ({ backSearch }) => {
    const [search, setSearch] = useState('')
    const clickSearch = (event) => {
        event.preventDefault()
        backSearch(search)
    }
    return (

        <Form className="d-flex ml-auto m-1" onSubmit={event => clickSearch(event)}>
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Button
                className='ml-2'
                variant="outline-success"
                onClick={event => clickSearch(event)}
            >Search</Button>
        </Form>

    );
};

export default SearchWithButton;