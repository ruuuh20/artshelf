import React from 'react';
import { Box, Link, Grid, GridItem, Image , Text, Divider } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import NextLink from 'next/link'
import DeleteLibraryButton from './DeleteLibraryButton'

const LibrariesTable = ({ libraries }) => {
  return (
    <>
    <Box
      // width="100vw"
      // bgColor="rgb(59, 55, 79, .3)"
      // left="50%"
      // right="50%"
      // marginLeft="-50vw"
      // marginRight="-50vw"
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
        templateColumns="repeat(auto-fit,minmax(320px,1fr))"
      >
        <GridItem pos="relative" colSpan={1} bg="gray.300" padding="1rem">
          {libraries[0] ? (
          <>
          <Image src="https://source.unsplash.com/DhG6wSAtL8o/1200x800" />
          <NextLink href="/library/[libraryId]" as={`/library/${libraries[0].id}`} passHref>
            <Link>
            <Text as="h3" textAlign="center" fontWeight="bold" fontSize={["14px", "24px"]} pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" color="brand.white">{libraries[0].name}</Text>
            </Link>
          </NextLink>
          </>
          ) : <Text as="h4" fontWeight="bold" >no library</Text>}
        </GridItem>
        <GridItem  pos="relative" colSpan={1} bg="#aa9593" padding="1rem">
         {libraries[1] ? (
          <>
          <Image src="https://source.unsplash.com/YLSwjSy7stw/1200x800" />
          <NextLink href="/library/[libraryId]" as={`/library/${libraries[1].id}`} passHref>
          <Link>
          <Text as="h3" textAlign="center" fontWeight="bold" fontSize={["14px", "24px"]} pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" color="brand.white">{libraries[1].name}</Text>
          </Link>
          </NextLink>
          </>
          ) : <Text as="h4" fontWeight="bold" >no library</Text>}
        </GridItem>
        <GridItem  pos="relative" colSpan={1} bg="papayawhip" padding="1rem">
         {libraries[2] ? (
          <>
          <Image src="https://source.unsplash.com/mbKApJz6RSU/1200x800" />
          <NextLink href="/library/[libraryId]" as={`/library/${libraries[2].id}`} passHref>
          <Link>
          <Text as="h3" textAlign="center" fontWeight="bold" fontSize={["14px", "24px"]} pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" color="brand.white">{libraries[2].name}</Text>
          </Link>
          </NextLink>
          </>
         ) : <Text as="h4" fontWeight="bold" textAlign="center">no library</Text>}
        </GridItem>
      </Grid>
      </Box>
    <Table>
      <thead>
        <Tr backgroundColor="brand.green">
          <Th color="brand.blue">Name</Th>
        
          <Th color="brand.blue">Books Link</Th>
       
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
            <Td>
                <NextLink href="/library/[libraryId]" as={`/library/${library.id}`} passHref>
<Link>View Books</Link>
                </NextLink>
              
            </Td>
            
          <Td><DeleteLibraryButton libraryId={library.id} /></Td>
          </Box>
        ))}
      </tbody>
    </Table>
    </>
  );
};

export default LibrariesTable;