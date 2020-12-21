import React from 'react';

import { Table, Tr, Th, Td } from './Table';

import BookRow from './BookRow'

const BooksTable = (props) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th width="50px">{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {props.books.map((book) => (
          <BookRow key={book.id} {...book} />
        ))}
      </tbody>
    </Table>
  );
};

export default BooksTable;