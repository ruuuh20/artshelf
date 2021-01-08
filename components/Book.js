import React from 'react';
import { Box, Heading, Text, Divider, Flex, Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link'

const Book = ({ id, author, description, overview, name, imageUrl, isLast, provider }) => (
  <Box borderRadius={4} maxWidth="700px" w="full" padding="1rem" >
    <Flex align="center" justify="center" direction="column">
    <Box width={200}>
      <Image src={imageUrl || "https://via.placeholder.com/200x250"} alt="image" mb={8} />
    </Box>
    <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
      {name ? name : 'loading'}
    </Heading>
   
   
      {author && (
      <Text color="gray.500" mb={4} fontSize="xs">
        {author}
      </Text>
    )}
 
    <Text color="gray.800" noOfLines={[1, 2, 3]} isTruncated>{overview}</Text>
    {id && (  
       <NextLink href="/book/[bookId]" as={`/book/${id}`} passHref><Link><Text color="gray.500" fontSize="xs">View book</Text></Link></NextLink>
       )
    }
     </Flex>
    <Divider borderColor="gray.200" backgroundColor="gray.200" mt={8} mb={8} />
  </Box>
);

export default Book;