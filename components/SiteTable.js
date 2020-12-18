import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { parseISO, format } from 'date-fns';

const SiteTable = ({ libraries }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {libraries.map((library) => (
          <Box as="tr" key={library.url}>
            <Td fontWeight="medium">{library.name}</Td>
            <Td>{library.url}</Td>
            <Td>
              <Link>View Feedback</Link>
            </Td>
            <Td>{format(parseISO(library.createdAt), 'PPpp')}</Td>
          
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;