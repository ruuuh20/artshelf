import React from 'react';
import { Heading, Flex, Text, Button } from '@chakra-ui/react';

import DashboardShell from './DashboardShell';
import AddLibraryModal from './AddLibraryModal'

const EmptyState = () => (
//   <DashboardShell>
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="lg" mb={2}>
        Add your libraries here.
      </Heading>
      <Text mb={4}>You can start by creating your first one!</Text>
    <AddLibraryModal>Add a library</AddLibraryModal>
    </Flex>
//   </DashboardShell>
);

export default EmptyState;