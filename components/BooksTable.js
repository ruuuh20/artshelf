import React from 'react';

import { Table, Tr, Th, Td } from './Table';

import BookRow from './BookRow'

const BooksTable = (props) => {
  return (
    <Table size="lg">
      <thead>
        <Tr>
          <Th>Image</Th>
          <Th>Title</Th>
          <Th>Description</Th>
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