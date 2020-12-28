import React from 'react';

import { Table, Tr, Th, Td } from './Table';

import BooksRow from './BookRow'

const BooksTable = (props) => {
  console.log(props)
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
      <GridItem pos="relative" colSpan={1} bg="tomato">
        <Image 
        src="https://source.unsplash.com/DhG6wSAtL8o/1200x800"
        // fit="cover"
         />
         <NextLink href="/library/[libraryId]" as={`/library/${props.books[0].id}`} passHref>
<Link>
         <Text as="h3" fontWeight="bold" fontSize="28px" pos="absolute" top="65%" left="50%" transform="translate(-50%, 0%)" color="brand.white">{libraries[0].name}</Text>
         </Link>
         </NextLink>
         </GridItem>
      <GridItem  pos="relative" colSpan={1} bg="#aa9593">
        <Image src="https://source.unsplash.com/YLSwjSy7stw/1200x800" />
        <Text as="h3" fontWeight="bold" fontSize="28px" pos="absolute" top="65%" left="50%" transform="translate(-50%, 0%)" color="brand.white">{libraries[1].name}</Text>
        </GridItem>
      <GridItem  pos="relative" colSpan={1} bg="papayawhip">
        <Image src="https://source.unsplash.com/mbKApJz6RSU/1200x800" />
        <Text as="h3" fontWeight="bold" fontSize="28px" pos="absolute" top="65%" left="50%" transform="translate(-50%, 0%)" color="brand.white">{libraries[0].name}</Text></GridItem>
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
          <Th color="brand.blue">ISBN</Th>
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