import Head from 'next/head';
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { Container, Heading, Flex, Box, Image, SimpleGrid, Text, Center} from "@chakra-ui/react";
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
          <Box flex="1" paddingRight={["0", "50px", "50px"]} paddingTop={["20px", "0", "0"]}>
            <Heading mb="0" fontSize={{ base: "24px", md: "42px", lg: "50px" }}>{book.name}</Heading>
            <Text mb="1rem" fontSize={{ base: "16px", md: "20px", lg: "24px" }} textAlign="right" as="i" color="gray.500">{book.author}</Text>
            <Text marginTop="2rem" color="gray.800">{book.description}</Text>
          </Box>
          <Box w={["200px", "300px", "300px"]} margin="0 auto">
            <Image
            width="100%" 
              src={book.imageUrl || "https://via.placeholder.com/400x300"}
            ></Image>
          </Box>
          </>
          )
          : <Text>loading...</Text>
          }
        </Flex>
          { book ? (
            <>
        <Box marginTop="5rem">
          <SimpleGrid columns={[2, null, 3]} spacing="40px">
            <Box padding="10px" height="80px"><Text fontWeight="bold">Pages</Text>
            <Text>{book.pages}</Text></Box>
            <Box padding="10px" height="80px">
              <Text fontWeight="bold">Publisher</Text>
            <Text>{book.publisher}</Text>
            </Box>
            <Box padding="10px" height="80px">
              <Text fontWeight="bold">Other</Text>
            <Text>{book.other}</Text>
            </Box>
            <Box padding="10px" height="80px">
              <Text fontWeight="bold">Release year</Text>
            <Text>---</Text>
            </Box>
            <Box padding="10px" height="80px">
               <Text fontWeight="bold">ISBN</Text>
            <Text>{book.isbn}</Text>
            </Box>
          </SimpleGrid>
          
        </Box>
        <Center lineHeight="1.5" mt="5rem">
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
