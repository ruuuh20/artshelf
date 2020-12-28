import React from 'react';

import { Table, Tr, Th, Td } from './Table';

import BooksRow from './BookRow'

const BooksTable = (props) => {
  console.log(props)
  return (
    <Table size="lg">
      <thead>
        <Tr backgroundColor="brand.yellow">
          <Th>-</Th>
          <Th color="brand.blue" width="150px">Title</Th>
          <Th color="brand.blue" width="120px">Author</Th>
          <Th color="brand.blue">Description</Th>
          <Th color="brand.blue">Publisher/Series</Th>
          <Th color="brand.blue">ISBN</Th>
          <Th color="brand.blue">Active</Th>
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