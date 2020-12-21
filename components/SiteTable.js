import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { parseISO, format } from 'date-fns';
import NextLink from 'next/link'
import DeleteLibraryButton from './DeleteLibraryButton'

const SiteTable = ({ libraries }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Books Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {libraries.map((library) => (
          <Box as="tr" key={library.id}>
             <Td>
                <NextLink
                  href="/library/[libraryId]"
                  as={`/library/${library.id}`}
                  passHref
                >
                  <Link fontWeight="medium">{library.name}</Link>
                </NextLink>
              </Td>
            <Td>{library.url}</Td>
            <Td>
                <NextLink href="/library/[libraryId]" as={`/library/${library.id}`} passHref>
<Link>View Books</Link>
                </NextLink>
              
            </Td>
            <Td>{format(parseISO(library.createdAt), 'PPpp')}</Td>
          <Td><DeleteLibraryButton libraryId={library.id} /></Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;