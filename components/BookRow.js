import React, { useState } from 'react';
import { Box, Code, Switch, IconButton } from '@chakra-ui/react';

import {  Td } from './Table';
import { useAuth } from '@/lib/auth';
import DeleteBookButton from './DeleteBookButton';
import { updateBook } from '@/lib/db';
import { mutate } from 'swr';

const BooksRow = ({ id, name, author, description, route, status}) => {
      const auth = useAuth();
  const isChecked = status === 'active';

  const toggleBook = async () => {
    await updateBook(id, { status: isChecked ? 'pending' : 'active' });
    mutate(['/api/books', auth.user.token]);
  };

  return (
     <Box as="tr" key={id}>
            <Td> book image</Td>
            <Td fontWeight="medium">{name}</Td>
            <Td>{description}</Td>
            <Td>
              <Code>{route || '/'}</Code>
            </Td>
            <Td>
              <Switch
                colorScheme="green"
                onChange={toggleBook}
                isChecked={isChecked}
              />
            </Td>
            <Td>
              <DeleteBookButton bookId={id} />
            </Td>
          </Box>
  );
};

export default BooksRow;