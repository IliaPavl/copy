import React, { useState } from 'react';
import { Button, Form, FormControl } from "react-bootstrap";

const SearchWithButton = ({ backSearch }) => {
    const [search, setSearch] = useState('')
    const clickSearch = () => {
        if (search !== null)
            if (search !== '') {
                backSearch(search)
                setSearch('')
            }
    }
    return (

        <Form className="d-flex ml-auto m-1">
            <FormControl
                type="Найти"
                placeholder="Найти"
                className="me-2"
                aria-label="Найти"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Button
                className='ml-2'
                variant="outline-success"
                onClick={() => clickSearch()}
            >Search</Button>
        </Form>

    );
};

export default React.memo(SearchWithButton);