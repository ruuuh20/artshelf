import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormLabel, Input, Button, Textarea} from '@chakra-ui/react';
import Book from '@/components/Book';
import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import { createBook} from '@/lib/db';
// import { getAllBooks, getAllLibraries, getLibrary } from '@/lib/db-admin';
import LibraryHeader from '@/components/LibraryHeader'

import useSWR, { mutate } from 'swr';
import fetcher from '@/utils/fetcher';

// export async function getStaticProps(context) {
//   const [libraryId, route] = context.params.library;
//   const { books } = await getAllBooks(libraryId, route);
//   const { library } = await getLibrary(libraryId);
//   return {
//     props: {
//       initialBooks: books,
//       library
//     },
//     revalidate: 1
//   };
// }

// export async function getStaticPaths() {
//   const { libraries } = await getAllLibraries();
//   const paths = libraries.map((library) => ({
//     params: {
      
//       library: [library.id.toString()]
//       // library: ['hello']
//     }
//   }));
//   console.log(paths[1])

//   return {
//     paths,
//     fallback: true
//   };
// }


// const BooksPage = ({ initialBooks, library }) => {
const BooksPage = () => {
   const { user, loading } = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  // const [allBooks, setAllBooks] = useState(initialBooks);
  // const [libraryId, route] = router.query.library;
  const libraryAndRoute = router.query?.library;
  const libraryId = libraryAndRoute ? libraryAndRoute[0] : null;
  const route = libraryAndRoute ? libraryAndRoute[1] : null;
  const booksApi = route
    ? `/api/books/${libraryId}/${route}`
    : `/api/books/${libraryId}`;

  // useEffect(() => {
  //   setAllBooks(initialBooks);
  // }, [initialBooks]);

  const { data: libraryData } = useSWR(`/api/library/${libraryId}`, fetcher);
  const { data: booksData } = useSWR(booksApi, fetcher);

  const library = libraryData?.library;
  const allBooks = booksData?.books;

  const onSubmit = (e) => {
    e.preventDefault();

    const newBook= {
      libraryAuthorId: library.authorId,
      libraryId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      // libraryId: router.query.libraryId,
      description: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };
    inputEl.current.value = '';
    // setAllBooks([newBook, ...allBooks]);
    createBook(newBook);
    mutate(
      booksApi,
      async (data) => ({
        books: [newBook, ...data.books]
      }),
      false
    );
  };

  const LoginOrLeaveBook = () =>
    user ? (
      <Button
        type="submit"
        isDisabled={!libraryData || !booksData}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        Leave Feedback
      </Button>
    ) : (
      // <LoginButtons />
      <div>hi</div>
    );

      console.log(booksData)
  return (
    <DashboardShell>
      <LibraryHeader 
      // isLibraryOwner={true}
      isLibraryOwner={library?.authorId === user?.uid}
      library={library} 
      libraryId={libraryId} 
      route={route}
      />
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      
        <Box as="form" onSubmit={onSubmit}>
         <FormControl my={8}>
           <Textarea
              ref={inputEl}
              id="comment"
              placeholder="Leave a comment"
              isDisabled={!user}
              h="100px"
            />
            {!loading && <LoginOrLeaveBook />}
            
          </FormControl>
        </Box>
     
      {allBooks && 
      allBooks.map((book, index) => (
        <Book key={book.id} settings={library?.settings} isLast={index === allBooks.length - 1} {...book} />
      ))}
    </Box>
    </DashboardShell>
  );
};

export default BooksPage;