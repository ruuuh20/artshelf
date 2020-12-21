// import { useRef, useState } from 'react';
// import { useRouter } from 'next/router';
// import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
// import Book from '@/components/Book';
// import { useAuth } from '@/lib/auth';
// import { createBook} from '@/lib/db';
// import { getAllBooks, getAllLibraries } from '@/lib/db-admin';

// export async function getStaticProps(context) {
//   const libraryId = context.params.libraryId;
//   const { books } = await getAllBooks(libraryId);

//   return {
//     props: {
//       initialBooks: books
//     },
//     revalidate: 1
//   };
// }

// export async function getStaticPaths() {
//   const { libraries } = await getAllLibraries();
//   const paths = libraries.map((library) => ({
//     params: {
//       libraryId: library.id.toString()
//     }
//   }));

//   return {
//     paths,
//     fallback: true
//   };
// }

// const BooksPage = ({ initialBooks }) => {
//   const auth = useAuth();
//   const router = useRouter();
//   const inputEl = useRef(null);
//   const [allBooks, setAllBooks] = useState(initialBooks);

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const newBook= {
//       author: auth.user.name,
//       authorId: auth.user.uid,
//       libraryId: router.query.libraryId,
//       description: inputEl.current.value,
//       createdAt: new Date().toISOString(),
//       provider: auth.user.provider,
//       status: 'pending'
//     };
//     inputEl.current.value = '';
//     setAllBooks([newBook, ...allBooks]);
//     createBook(newBook);
//   };

//   return (
  
//     <Box
//       display="flex"
//       flexDirection="column"
//       width="full"
  
//     >
//       {auth.user && (
//         <Box as="form" onSubmit={onSubmit}>
//          <FormControl my={8}>
//             <FormLabel htmlFor="comment">Comment</FormLabel>
//             <Input ref={inputEl} id="comment" placeholder="Leave a comment" />
//             <Button mt={4} type="submit" fontWeight="medium" isDisabled={router.isFallback}>
//               Add Comment
//             </Button>
//           </FormControl>
//         </Box>
//       )}
//       {allBooks.map((book) => (
//         <Book key={book.id} {...book} />
//       ))}
//     </Box>
 
//   );
// };

// export default BooksPage;