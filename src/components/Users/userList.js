import React, { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import TableBootsTrap from "../BootstratTable/TableBootsTrap";

const ListBook = () => {
    let [headerTable, setHeaderTable] = useState([
        { title: 'id' },
        { title: 'Title' },
        { title: 'Author' },
        { title: 'ISBN' },
        { title: 'Price' },
        { title: 'Language' },
        { title: 'Genre' },
        { title: 'Actions' },
    ])
    let [rowsTable, setRowsTable] = useState([
        {
            id: 1,
            Title: "abra",
            Author: 'email1',
            ISBN: 'isbn1',
            Price: 'price1',
            Language: 'RUS',
            Genre: 'chem',
            Actions: 'actions2'
        },
        {
            id: 2,
            Title: "cadabra",
            Author: 'email2',
            ISBN: 'isbn2',
            Price: 'price2',
            Language: 'RUS',
            Genre: 'chem2',
            Actions: 'actions1'
        },
        {
            id: 5,
            Title: "cadabra",
            Author: 'email2',
            ISBN: 'isbn2',
            Price: 'price2',
            Language: 'RUS',
            Genre: 'chem2',
            Actions: 'actions1'
        },
        {
            id: 3,
            Title: "cadabra",
            Author: 'email2',
            ISBN: 'isbn2',
            Price: 'price2',
            Language: 'RUS',
            Genre: 'chem2',
            Actions: 'actions1'
        },
        {
            id: 0,
            Title: "abra",
            Author: 'email1',
            ISBN: 'isbn1',
            Price: 'price1',
            Language: 'RUS',
            Genre: 'chem',
            Actions: 'actions2'
        },
    ])

    async function switchData(data) {
        if (data === "Users") {
            setHeaderTable([
                { title: 'id' },
                { title: 'Title' },
                { title: 'Author' },
                { title: 'ISBN' },
                { title: 'Price' },
                { title: 'Language' },
                { title: 'Genre' },
                { title: 'Actions' },
            ])
            setRowsTable([
                {
                    id: 1,
                    Title: "abra",
                    Author: 'email1',
                    ISBN: 'isbn1',
                    Price: 'price1',
                    Language: 'RUS',
                    Genre: 'chem',
                    Actions: 'actions2'
                },
                {
                    id: 2,
                    Title: "cadabra",
                    Author: 'email2',
                    ISBN: 'isbn2',
                    Price: 'price2',
                    Language: 'RUS',
                    Genre: 'chem2',
                    Actions: 'actions1'
                },
                {
                    id: 5,
                    Title: "cadabra",
                    Author: 'email2',
                    ISBN: 'isbn2',
                    Price: 'price2',
                    Language: 'RUS',
                    Genre: 'chem2',
                    Actions: 'actions1'
                },
                {
                    id: 3,
                    Title: "cadabra",
                    Author: 'email2',
                    ISBN: 'isbn2',
                    Price: 'price2',
                    Language: 'RUS',
                    Genre: 'chem2',
                    Actions: 'actions1'
                },
                {
                    id: 0,
                    Title: "abra",
                    Author: 'email1',
                    ISBN: 'isbn1',
                    Price: 'price1',
                    Language: 'RUS',
                    Genre: 'chem',
                    Actions: 'actions2'
                },
            ]);
        } else if (data === "Clients") {
            setHeaderTable([
                { title: 'id' },
                { title: 'Title1' },
                { title: 'Author' },

            ])
            setRowsTable([
                {
                    id: 1,
                    Title1: "abra3",
                    Author: 'email1',
                },
                {
                    id: 13,
                    Title1: "abra1",
                    Author: 'email1',
                },
                {
                    id: 8,
                    Title1: "abra7",
                    Author: 'email1',
                },
            ])
        }
    }

    useEffect(() => {
        setHeaderTable(headerTable)
        setRowsTable(rowsTable)
    }, [rowsTable,headerTable]);

    return (
        <Card className={"border-1 m-1"}>
            <Card.Header>
                <div style={{ float: "left" }}>
                    List
                </div>
            </Card.Header>
            <Card.Body>
                <TableBootsTrap head={headerTable} rows={rowsTable} switchData={switchData} />
                <br />
            </Card.Body>
        </Card>
    );
};

export default ListBook;