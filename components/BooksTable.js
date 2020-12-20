import React from 'react';
import { Box, Code, Switch, IconButton } from '@chakra-ui/react';

import { Table, Tr, Th, Td } from './Table';
import DeleteBookButton from './DeleteBookButton';

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
          <Box as="tr" key={book.id}>
            <Td fontWeight="medium">{book.author}</Td>
            <Td>{book.text}</Td>
            <Td>
              <Code>{book.route || '/'}</Code>
            </Td>
            <Td>
              <Switch
                colorScheme="green"
                defaultIsChecked={book.status === 'active'}
              />
            </Td>
            <Td>
              <DeleteBookButton bookId={book.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default BooksTable;