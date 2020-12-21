import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, FormLabel, Input, Button } from '@chakra-ui/react';
import Book from '@/components/Book';
import BookLink from '@/components/BookLink';
import { getAllBooks, getAllLibraries, getLibrary } from '@/lib/db-admin';
import 'iframe-resizer/js/iframeResizer.contentWindow'

export async function getStaticProps(context) {
  const [libraryId, route] = context.params.library;
  const { books } = await getAllBooks(libraryId, route);
  const { library } = await getLibrary(libraryId)

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
    }
  }));

  return {
    paths,
    fallback: true
  };
}

const EmbeddedBooksPage = ({ initialBooks, library }) => {

  const router = useRouter();
  const inputEl = useRef(null);
 

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   const newBook= {
  //     author: auth.user.name,
  //     authorId: auth.user.uid,
  //     libraryId: router.query.libraryId,
  //     description: inputEl.current.value,
  //     createdAt: new Date().toISOString(),
  //     provider: auth.user.provider,
  //     status: 'pending'
  //   };
  //   inputEl.current.value = '';
  //   setAllBooks([newBook, ...allBooks]);
  //   createBook(newBook);
  // };

  return (

    <Box
      display="flex"
      flexDirection="column"
      width="full"
    >
    <BookLink paths={router?.query?.library || []} />
    initialBooks?.length ? (
 {initialBooks.map((book, index) => (
        <Book key={book.id} 
        settings={library?.settings}
        isLast={index === initialBooks.length - 1}
        {...book} 
        />
      ))}
    ) : (
      <Text>There are no books for this library.</Text>
    )
      
     
    </Box>
 
  );
};

export default EmbeddedBooksPage;