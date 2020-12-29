import React from 'react';
import { Box, Code, Switch, Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link'
import {  Td } from './Table';
import { useAuth } from '@/lib/auth';
import DeleteBookButton from './DeleteBookButton';
import { updateBook } from '@/lib/db';
import { mutate } from 'swr';

const BooksRow = ({ id, name, author, description, isbn, status, imageUrl, publisher}) => {
      const auth = useAuth();
  const isChecked = status === 'active';

  const toggleBook = async () => {
    await updateBook(id, { status: isChecked ? 'pending' : 'active' });
    mutate(['/api/books', auth.user.token]);
  };

  return (
     <Box as="tr" key={id}>
            <Td fontSize="sm"> 
      <Image 
      width="300px" 
      src={imageUrl || "https://via.placeholder.com/80x120"} alt="image"/>
    </Td>
            <Td fontSize="sm" fontWeight="medium">
              <NextLink href="/book/[bookId]" as={`/book/${id}`}>
                <Link>{name}</Link>
                </NextLink></Td>
            <Td fontSize="sm">{author}</Td>
            <Td fontSize="sm">{description}</Td>
            <Td fontSize="sm">{publisher}</Td>
          
            <Td>
              <Switch
                colorScheme="teal"
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