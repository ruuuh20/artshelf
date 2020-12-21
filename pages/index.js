import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useAuth } from '@/lib/auth'

import { Box, Stack, Button, Heading, Text, Code, Flex } from '@chakra-ui/react';
import { Camera } from 'react-feather';
import { getAllBooks, getLibrary } from '@/lib/db-admin';
import Book from '@/components/Book';
import BookLink from '@/components/BookLink';

const LIB_ID = '9TRU3Q9SKpIGVCU0vxz4';

export async function getStaticProps(context) {
  const { books} = await getAllBooks(LIB_ID);
  const { library } = await getLibrary(LIB_ID)

  return {
    props: {
      allBooks: books,
      library
    },
    revalidate: 1
  };
}


export default function Home( { allBooks , library }) {

  const auth = useAuth();
  
  return (
    <>
    <Box bg="gray.100">
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
           <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('artshelf-auth')) {
                window.location.href = "/dashboard"
              }
            `
          }}
        />
        <title>Artshelf app</title>
  
      </Head>

        <Heading fontWeight="normal">Artshelf</Heading>
<Camera />
        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        <Text>A place to catalog your art books.</Text>
        {auth.user ? (
          <Button as="a" href="/dashboard">Dashboard</Button>
        ) : (
<Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>Sign in</Button>
        )}
      
        <div>
          {auth?.user?.email}
        </div>
        {auth.user ? (
           <Button
            as="a"
            href="/dashboard"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            mt={4}
            size="lg"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)'
            }}
          >
            View Dashboard
          </Button>
        ) : (
          <Stack>
            <Button
              onClick={(e) => auth.signinWithGitHub()}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              leftIcon="github"
              mt={4}
              size="lg"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              Sign In with GitHub
            </Button>
            <Button
              onClick={(e) => auth.signinWithGoogle()}
              backgroundColor="white"
              color="gray.900"
              variant="outline"
              fontWeight="medium"
              leftIcon="google"
              mt={4}
              size="lg"
              _hover={{ bg: 'gray.100' }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)'
              }}
            >
              Sign In with Google
            </Button>
          </Stack>
          )
          }
  
    </Flex>
    </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
      >
        <BookLink paths={[LIB_ID]} 
        // siteId={LIB_ID} 
        />
        {allBooks.map((book, index) => (
          <Book 
          key={book.id}
          settings={library?.settings}
          isLast={index === allBooks.length - 1}
          {...book} />
        ))
      }
      </Box>
      </>
  )
}
