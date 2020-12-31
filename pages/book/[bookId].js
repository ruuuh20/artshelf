import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { Container, Heading, Flex, Box, Image, SimpleGrid } from "@chakra-ui/react";
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
        <Flex justifyContent="space-between">
          <Heading fontSize="4rem" mb={8}>{book ? book.name : 'loading'}</Heading>
           <Text as={p}>{book ? book.description : ''}</Text>
          <Box size="350px">
            <Image
            width="100%" 
              src={book ? book.imageUrl || "https://via.placeholder.com/400x300" : 'loading'}
            ></Image>
          </Box>
        </Flex>
        <Flex>
          <SimpleGrid minChildWidth="120px" spacing="40px">
            <Box bg="tomato" height="80px"><Text fontWeight="bold">Pages</Text>
            <Text>{book ? book.pages : ''}</Text></Box>
            <Box bg="tomato" height="80px"></Box>
            <Box bg="tomato" height="80px"></Box>
            <Box bg="tomato" height="80px"></Box>
            <Box bg="tomato" height="80px"></Box>
          </SimpleGrid>
        </Flex>
      </Container>
    </DashboardShell>
  );
};

export default BookPage;
