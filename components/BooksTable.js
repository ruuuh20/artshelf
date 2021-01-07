import React from 'react';
import { Box, Link, Grid, GridItem, Image , Text, Divider, Flex } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import NextLink from 'next/link'
import BooksRow from './BookRow'

const BooksTable = (props) => {
  return (
    <>
    <Box
      width="100vw"
      // bgColor="rgb(59, 55, 79)"
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
      marginBottom="3rem"
      position="relative"
    >
    <Grid
      paddingTop="2rem"
      paddingBottom="2rem"
      margin="0 auto"
      // h="600px"
     
      maxWidth="1250px"
      templateColumns="repeat(auto-fit,minmax(320px,1fr))"
    >
      <GridItem padding=".5rem .5rem 1.75rem .5rem" border="1px solid #ededeb" pos="relative" colSpan={1}>
        {props.books[0] ? (
        <Flex direction="column">
            <NextLink href="/book/[bookId]" as={`/book/${props.books[0].id}`} passHref>
              <Link>
            <Box pos="relative" height="300px" bg="rgb(170, 149, 147, .5)" _hover={{ opacity: '.5' }}>
              <Image src={props.books[0].imageUrl} pos="absolute" width="140px" left="50%" top="50%" transform="translate(-50%, -50%)" />
             </Box>
              </Link>
            </NextLink>
          <Text as="h3" marginTop="1rem" fontWeight="bold" fontSize="16px">{props.books[0].name}</Text>
         <Text mt=".5rem" color="gray.600" as="sub">{props.books[0].author}</Text>
         </Flex>
        ) : <Text>{''}</Text>}
      </GridItem>
      <GridItem padding=".5rem .5rem 1.75rem .5rem" border="1px solid #ededeb" pos="relative" colSpan={1}>
        {props.books[1] ? (
        <Flex direction="column">
          <NextLink href="/book/[bookId]" as={`/book/${props.books[1].id}`} passHref>
          <Link>
          <Box pos="relative" height="300px" bg="rgb(155, 163, 153, .5)" _hover={{ opacity: '.5' }}>
           <Image src={props.books[1].imageUrl} pos="absolute" width="140px" left="50%" top="50%" transform="translate(-50%, -50%)" />
          </Box>
          </Link>
        </NextLink>
         <Text marginTop="1rem" as="h3" fontWeight="bold" fontSize="16px">{props.books[1].name}</Text>
         <Text mt=".5rem" color="gray.600" as="sub">{props.books[1].author}</Text></Flex>
        ) : <Text>{''}</Text>}
      </GridItem>
      <GridItem padding=".5rem .5rem 1.75rem .5rem" border="1px solid #ededeb" pos="relative" colSpan={1}>
         {props.books[2] ? (
         <Flex direction="column">
         <NextLink href="/book/[bookId]" as={`/book/${props.books[2].id}`} passHref>
        <Link>
        <Box pos="relative" height="300px" bg="rgb(152, 185, 194, .5)" _hover={{ opacity: '.5' }}>
         <Image src={props.books[2].imageUrl} pos="absolute" width="140px" left="50%" top="50%" transform="translate(-50%, -50%)" />
         </Box>
        </Link>
        </NextLink>
        <Text marginTop="1rem" as="h3" fontWeight="bold" fontSize="16px">{props.books[2].name}</Text>
         <Text mt=".5rem" color="gray.600" as="sub">{props.books[2].author}</Text></Flex>
        ) : <Text>{''}</Text>}
      </GridItem>
      <GridItem padding=".5rem .5rem 1.75rem .5rem" border="1px solid #ededeb" pos="relative" colSpan={1}>
        {props.books[3] ? (
        <Flex direction="column">
          <NextLink href="/book/[bookId]" as={`/book/${props.books[3].id}`} passHref>
            <Link>
              <Box pos="relative" height="300px" bg="rgb(170, 149, 147)" _hover={{ opacity: '.5' }}>
              <Image src={props.books[3].imageUrl} pos="absolute" width="140px" left="50%" top="50%" transform="translate(-50%, -50%)" />
              </Box>
            </Link>
          </NextLink>
          <Text as="h3" marginTop="1rem" fontWeight="bold" fontSize="16px">{props.books[3].name}</Text>
           <Text mt=".5rem" color="gray.600" as="sub">{props.books[3].author}</Text>
        </Flex>
        ) : <Text>{''}</Text>}
      </GridItem>
      </Grid>
      <Divider />
      </Box>
    
    <Table size="lg">
      <thead>
        <Tr backgroundColor="brand.green">
          <Th>-</Th>
          <Th color="brand.blue" width="150px">Title</Th>
          <Th color="brand.blue" width="120px">Author</Th>
          <Th color="brand.blue">Description</Th>
          <Th color="brand.blue">Publisher/Series</Th>
        
          <Th color="brand.blue">Available</Th>
          <Th width="50px">{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {props.books.map((book) => (
          <BooksRow key={book.id} {...book} />
        ))}
      </tbody>
    </Table>
    </>
  );
};

export default BooksTable;