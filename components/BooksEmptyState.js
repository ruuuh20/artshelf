import React from 'react';
import { Heading, Flex, Text } from '@chakra-ui/react';

const BooksEmptyState = () => (
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
      There aren't any books.
    </Heading>
    <Text mb={4}>Share your Library</Text>
  </Flex>
);

export default BooksEmptyState;