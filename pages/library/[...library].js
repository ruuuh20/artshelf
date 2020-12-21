import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import Book from '@/components/Book';
import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import { createBook} from '@/lib/db';
import { getAllBooks, getAllLibraries, getLibrary } from '@/lib/db-admin';
import LibraryHeader from '@/components/LibraryHeader'

export async function getStaticProps(context) {
  const [libraryId, route] = context.params.library;
  const { books } = await getAllBooks(libraryId, route);
  const { library } = await getLibrary(libraryId);
  return {
    props: {
      initialBooks: books,
      library
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const { libraries } = await getAllLibraries();
  const paths = libraries.map((library) => ({
    params: {
      
      library: [library.id.toString()]
      // library: ['hello']
    }
  }));
  console.log(paths[1])

  return {
    paths,
    fallback: true
  };
}


const BooksPage = ({ initialBooks, library }) => {
   const { user, loading } = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allBooks, setAllBooks] = useState(initialBooks);
  const [libraryId, route] = router.query.library;

  useEffect(() => {
    setAllBooks(initialBooks);
  }, [initialBooks]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newBook= {
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
    setAllBooks([newBook, ...allBooks]);
    createBook(newBook);
  };

  return (
    <DashboardShell>
      <LibraryHeader 
      isLibraryOwner={true}
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
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input ref={inputEl} id="comment" placeholder="Leave a comment" />
            <Button mt={4} type="submit" fontWeight="medium" isDisabled={router.isFallback}>
              Add Comment
            </Button>
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