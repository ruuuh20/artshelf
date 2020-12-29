import React from 'react';
import { Box, Link, Grid, GridItem, Image , Text, Divider } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import NextLink from 'next/link'
import BooksRow from './BookRow'

const BooksTable = (props) => {
  return (
    <>
    <Box
      width="100vw"
      bgColor="rgb(59, 55, 79)"
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
      marginBottom="5rem"
      position="relative"
    >
    <Grid
      paddingTop="4rem"
      paddingBottom="4rem"
      margin="0 auto"
      // h="400px"
      gap={6}
      maxWidth="1250px"
      templateColumns="repeat(auto-fit,minmax(120px,1fr))"
    >
      <GridItem pos="relative" colSpan={1} bg="rgb(170, 149, 147)">
        {props.books[0] ? (
         <NextLink href="/book/[bookId]" as={`/book/${props.books[0].id}`} passHref>
          <Link>
          <Image src={props.books[0].imageUrl} pos="absolute" width="100px" left="50%" top="50%" transform="translate(-50%, 50%)" />
          <Text as="h3" fontWeight="bold" fontSize="24px"  color="brand.white">{props.books[0].name}</Text>
          </Link>
         </NextLink>
        ) : <Text>{''}</Text>}
      </GridItem>
      <GridItem  pos="relative" colSpan={1} bg="#aa9593">
         {props.books[1] ? (
          <NextLink href="/book/[bookId]" as={`/book/${props.books[1].id}`} passHref>
          <Link>
        <Text marginTop="1rem" as="h3" fontWeight="bold" fontSize="24px"  color="brand.white">{props.books[1].name}</Text>
        </Link></NextLink>
        ) : <Text>{''}</Text>}
      </GridItem>
      <GridItem  pos="relative" colSpan={1} bg="rgb(152, 185, 194)">
         {props.books[2] ? (
         <NextLink href="/book/[bookId]" as={`/book/${props.books[2].id}`} passHref>
<Link>
        <Text marginTop="1rem" as="h3" fontWeight="bold" fontSize="24px"  color="brand.white">{props.books[2].name}</Text>
        </Link></NextLink>
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
        
          <Th color="brand.blue">Active</Th>
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