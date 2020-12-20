import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex
} from '@chakra-ui/react';

import AddLibraryModal from './AddLibraryModal';

const LibraryTableHeader = () => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Libraries</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Libraries</Heading>
      <AddLibraryModal>+ Add Library</AddLibraryModal>
    </Flex>
  </>
);

export default LibraryTableHeader;