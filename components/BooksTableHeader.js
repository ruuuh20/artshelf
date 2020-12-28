import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex
} from '@chakra-ui/react';
import NextLink from 'next/link'

const BooksTableHeader = ({ libraryName }) => (
  <>
    <Breadcrumb fontSize="sm">
      <BreadcrumbItem>
      <NextLink href="/books" passHref>
        <BreadcrumbLink>Books</BreadcrumbLink>
      </NextLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>All Books</Heading>
    </Flex>
  </>
);

export default BooksTableHeader;