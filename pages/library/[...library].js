import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormLabel, Input, Button, Textarea, Stack, Grid } from '@chakra-ui/react';
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
  const [newImageUrl, setNewImageUrl] = useState('')
   const { user, loading } = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const overviewEl = useRef(null);
  const nameEl = useRef(null)
  const authorEl = useRef(null)
  const publisherEl = useRef(null)
  const isbnEl = useRef(null)
  const pagesEl = useRef(null)
  const otherEl = useRef(null)
  const imageUrlEl = useRef(null)
 
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
      name: nameEl.current.value,
      author: authorEl.current.value,
      authorId: user.uid,
      publisher: publisherEl.current.value,
      description: inputEl.current.value,
      overview: overviewEl.current.value,
      isbn: isbnEl.current.value,
      pages: pagesEl.current.value,
      other: otherEl.current.value,
      imageUrl: newImageUrl,
   
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };
    inputEl.current.value = '';
    overviewEl.current.value = '';
    isbnEl.current.value = '';
    pagesEl.current.value = '';
    otherEl.current.value = '';
    nameEl.current.value = '';
    authorEl.current.value = '';
    user.uid = '';
  
    publisherEl.current.value = '';
    imageUrlEl.current.value= '';
    
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
        backgroundColor="brand.blue"
        color="white"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        Add book
      </Button>
    ) : (
     'log in'
    );

    const uploadFile = async e => {
      console.log("uploading")
      const files = e.target.files;
      const formData = new FormData();
      formData.append('file', files[0])
      formData.append('upload_preset', 'booksApp');

      const res = await fetch('https://api.cloudinary.com/v1_1/drc9j7ogf/image/upload', {
        method: 'POST',
        body: formData
      });

      const file = await res.json();
      setNewImageUrl(file.secure_url)
    }

  return (
    <>
     <Head>
    <title>Library Page</title>
  </Head>
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
           <Stack spacing={3}>
            <Input ref={nameEl} placeholder="Name of book" size="sm" />
            <Input ref={authorEl} placeholder="Author" size="sm" />
            <Input ref={publisherEl} placeholder="Publisher/Series" size="sm" />
            <Input ref={isbnEl} placeholder="ISBN" size="sm" />
            <Input ref={overviewEl} placeholder="Overview" size="sm" />
            <Input ref={pagesEl} placeholder="Pages" size="sm" />
            <Input ref={otherEl} placeholder="Other" size="sm" />
            
            <Textarea
                ref={inputEl}
                id="comment"
                placeholder="Description"
                isDisabled={!user}
                h="100px"
              />
            <Input ref={imageUrlEl} type="file" name="file" placeholder="Upload image" onChange={uploadFile} />
            </Stack>
            {!loading && <LoginOrLeaveBook />}
          </FormControl>
        </Box>
        </Box>
        <Box m
          margin="0 auto"
          maxWidth="1000px">
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={4}>
          {allBooks && 
          allBooks.map((book, index) => (
            <Book key={book.id} settings={library?.settings} isLast={index === allBooks.length - 1} {...book} />
          ))}
          </Grid>
      </Box>
    </DashboardShell>
    </>
  );
};

export default BooksPage;