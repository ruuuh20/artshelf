import React from 'react';

import { Table, Tr, Th, Td } from './Table';

import BooksRow from './BookRow'

const BooksTable = (props) => {
  console.log(props)
  return (
    <Table size="lg">
      <thead>
        <Tr>
          <Th>-</Th>
          <Th width="150px">Title</Th>
          <Th width="120px">Author</Th>
          <Th>Description</Th>
          <Th>Publisher/Series</Th>
          <Th>ISBN</Th>
          <Th>Active</Th>
          <Th width="50px">{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {props.books.map((book) => (
          <BooksRow key={book.id} {...book} />
        ))}
      </tbody>
    </Table>
  );
};

export default BooksTable;