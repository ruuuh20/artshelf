import Head from 'next/head';
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { Container, Heading, Flex, Box, Image, SimpleGrid, Text, Center, Link} from "@chakra-ui/react";
import DashboardShell from "@/components/DashboardShell";

const BookPage = () => {
  const router = useRouter();
  const bookId = router.query?.bookId;
  const bookApi = `/api/book/${bookId}`;
  const { data: bookData } = useSWR(bookApi, fetcher);
  const book = bookData?.book;

  return (
    <>
     <Head>
    <title>Book Page</title>
  </Head>
    <DashboardShell>
      <Container maxW="60rem">
        <Flex flexDirection={['column-reverse', 'column-reverse', 'row']} justifyContent="space-between">
          { book ? (
          <>
          <Box flex="1" w={["200px", "300px", "300px"]} margin="0 auto" paddingRight={["0", "50px", "50px"]} paddingTop={["20px", "0", "0"]}>

            <Box borderRadius='15px' p='2.5rem' backgroundColor="#f1f1f1">
              <Image borderRadius='15px' m="0 auto"
              width="80%"
            src={book.imageUrl || "https://via.placeholder.com/400x300"}
              ></Image>
            </Box>
          </Box>
          <Box flex="1" >
            <Heading mb="0" fontSize={{ base: "24px", md: "30px", lg: "36px" }}>{book.name}</Heading>
            <Text mb="1rem" fontSize={{ base: "16px", md: "20px", lg: "24px" }}   color="gray.600">by {book.author}</Text>
            <Text marginTop="2rem" color="gray.800" width="100%">{book.description}</Text>
            <Text marginTop="2rem" color="gray.800">{book.category}</Text>
          </Box>
          
          </>
          )
          : <Text>loading...</Text>
          }
        </Flex>
          { book ? (
            <>
        <Box marginTop="5rem">
          <SimpleGrid textAlign="center" columns={[2, null, 3]} spacing="40px">
            <Box padding="10px" height="80px"><Text color="gray.500">Pages</Text>
            <Text >{book.pages}</Text></Box>
            <Box padding="10px" height="80px">
              <Text  color="gray.500">Publisher</Text>
            <Text>{book.publisher}</Text>
            </Box>
            <Box padding="10px" height="80px">
              <Text color="gray.500">Categories</Text>
            <Text> {book.categories ? book.categories[0] : 'n/a' }</Text>
            </Box>
            
            <Box padding="10px" height="80px">
               <Text  color="gray.500">ISBN</Text>
            <Text>{book.isbn}</Text>
            </Box>
            <Box padding="10px" height="80px">
               <Text color="gray.500">eBook</Text>
            <Text><Link href={book.ebook} isExternal>Available </Link></Text>
            </Box>
          </SimpleGrid>
          
        </Box>
        <Box mt="2rem" p="1.5rem" backgroundColor="rgba(160 180 181 / 50%)">
          
          <Text>Grade level:</Text> 
          <Text>Classes used:</Text>
        </Box>

        <Center lineHeight="1.5" mt="5rem" width="100%">
          {book.description}
        </Center>
        </>
          ) : <Text>loading...</Text>
          }       
      </Container>
    </DashboardShell>
    </>
  );
};

export default BookPage;
