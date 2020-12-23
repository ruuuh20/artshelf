import React from 'react';
import { Box, Heading, Text, Divider, Flex, Image } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

const Book = ({ author, description, name, isbn, other, createdAt, settings, imageUrl, isLast, provider }) => (
  <Box borderRadius={4} maxWidth="700px" w="full">
    <Flex align="center" justify="center" direction="column">
    <Box width={200}>
      <Image src={imageUrl || "https://via.placeholder.com/200x250"} alt="image" mb={8} />
    </Box>
    <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
      {name ? name : 'hi'}
    </Heading>
   
   
      {settings?.timestamp && (
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
    )}
 
    <Text color="gray.800">{description}</Text>
     </Flex>
    <Divider borderColor="gray.200" backgroundColor="gray.200" mt={8} mb={8} />
  </Box>
);

export default Book;