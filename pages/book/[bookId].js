import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { Container, Heading, Flex, Box, Image } from "@chakra-ui/react";
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
          <Heading mb={8}>{book.name}</Heading>
          <Box>
            <Image
              src={book.imageUrl || "https://via.placeholder.com/400x300"}
            ></Image>
          </Box>
        </Flex>
      </Container>
    </DashboardShell>
  );
};

export default BookPage;
