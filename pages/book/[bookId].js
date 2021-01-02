import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { Container, Heading, Flex, Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import DashboardShell from "@/components/DashboardShell";

const BookPage = () => {
  const router = useRouter();

  const bookId = router.query?.bookId;
  const bookApi = `/api/book/${bookId}`;
  const { data: bookData } = useSWR(bookApi, fetcher);
  const book = bookData?.book;
  console.log(bookId);

  return (
    <DashboardShell>
      <Container maxW="60rem">
        <Flex flexDirection={['column-reverse', 'column-reverse', 'row']} justifyContent="space-between">
          { book ? (
          <>
          <Box padding="0 10px">
            <Heading fontSize={{ base: "24px", md: "40px", lg: "56px" }} mb={8}>{book.name}</Heading>
            <Text mb="1rem" textAlign="right" as="i" color="gray.500">{book.author}</Text>
            <Text color="gray.900">{book.description}</Text>
          </Box>
          <Box w="300px">
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
        <Box marginTop="5rem">
          { book ? (

        
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
            )
            : <Text>'loading...'</Text>
          }
        </Box>
      </Container>
    </DashboardShell>
  );
};

export default BookPage;
