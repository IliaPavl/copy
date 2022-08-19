import React, { useState } from 'react';
import TableBootsTrap from './TableBootsTrap'

const SetTable = () => {
  const [headerTable, setHeaderTable] = useState([
    { title: 'id' },
    { title: 'email' },
    { title: 'login' },
    { title: 'role' },
  ])
  const [rowsTable, setRowsTable] = useState([
    { id: 5, email: 'email3', login: 'login', role: 'role' },
    { id: 2, email: 'email1', login: 'login', role: 'role' },
    { id: 3, email: 'email5', login: 'login', role: 'role' },
  ])
  return (
    <TableBootsTrap head={headerTable} rows={rowsTable} />
  );
};

export default SetTable;