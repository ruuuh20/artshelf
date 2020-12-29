import React from 'react';
import { Box, Link, Grid, GridItem, Image , Text, Divider } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { parseISO, format } from 'date-fns';
import NextLink from 'next/link'
import DeleteLibraryButton from './DeleteLibraryButton'

const LibrariesTable = ({ libraries }) => {
  console.log(libraries)
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
          <Image src="https://source.unsplash.com/DhG6wSAtL8o/1200x800" />
          {libraries[0] ? (
          <NextLink href="/library/[libraryId]" as={`/library/${libraries[0].id}`} passHref>
            <Link>
              <Text as="h3" fontWeight="bold" fontSize="28px" pos="absolute" top="65%" left="50%" transform="translate(-50%, 0%)" color="brand.white">{libraries[0].name}</Text>
            </Link>
          </NextLink>
          ) : <Text as="h4" fontWeight="bold" >no library</Text>}
        </GridItem>
      <GridItem  pos="relative" colSpan={1} bg="#aa9593">
        <Image src="https://source.unsplash.com/YLSwjSy7stw/1200x800" />
         {libraries[1] ? (
        <NextLink href="/library/[libraryId]" as={`/library/${libraries[1].id}`} passHref>
        <Link>
        <Text as="h3" fontWeight="bold" fontSize="28px" pos="absolute" top="65%" left="50%" transform="translate(-50%, 0%)" color="brand.white">{libraries[1].name}</Text>
        </Link>
        </NextLink>
         ) : <Text as="h4" fontWeight="bold" >no library</Text>}
        </GridItem>
      <GridItem  pos="relative" colSpan={1} bg="papayawhip">
        <Image src="https://source.unsplash.com/mbKApJz6RSU/1200x800" />
         {libraries[2] ? (
            <NextLink href="/library/[libraryId]" as={`/library/${libraries[2].id}`} passHref>
        <Link>
        <Text as="h3" fontWeight="bold" fontSize="28px" pos="absolute" top="65%" left="50%" transform="translate(-50%, 0%)" color="brand.white">{libraries[2].name}</Text>
          </Link>
        </NextLink>
         ) : <Text as="h4" fontWeight="bold" textAlign="center">no library</Text>}
        </GridItem>
      </Grid>
      <Divider />
      </Box>
    <Table>
      <thead>
        <Tr backgroundColor="brand.green">
          <Th color="brand.blue">Name</Th>
          <Th color="brand.blue">Site Link</Th>
          <Th color="brand.blue">Books Link</Th>
          <Th color="brand.blue" >No. of books</Th>
          <Th color="brand.blue">{''}</Th>
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
    </>
  );
};

export default LibrariesTable;