import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useAuth } from '@/lib/auth'
import Link from 'next/link'
import { Box, Stack, Button, Heading, Text, Code, Flex } from '@chakra-ui/react';
import { Camera } from 'react-feather';
import { getAllBooks, getLibrary } from '@/lib/db-admin';
import Book from '@/components/Book';
import Logo from '@/components/Logo'

// const LIB_ID = '9TRU3Q9SKpIGVCU0vxz4';
const LIB_ID = 'ZzcZ0n23HPQP0tH0cw5C';

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
    <Box color="brand.blue">
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      maxW="1250px"
      margin="0 auto"
      w="full"
      px={8}
      pb="4rem"
      backgroundColor="#fff"
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
        <title>Bookreads</title>
      </Head>
       <Logo className="main-logo"/>
       
        <Text mt="1.5rem" fontSize={["16px", "16px", "24px"]}>A place to catalog your books.</Text>
        <hr id="dec-line" />
        {auth.user ? (
          <Button as="a" href="/dashboard">Dashboard</Button>
        ) : (
          <Stack width="500px" flexDirection={"column"} justifyContent="center" alignItems={"center"} mt={4}> 
          <Box>
            <Link href='/login' >
                <a className="link-login">Log in with email</a>
            </Link>
            <br />
           
          </Box>
          <Box>
            <Button
                onClick={(e) => auth.signinWithGoogle()}
                backgroundColor="white"
                color="gray.900"
                variant="outline"
                border="2px"
                borderColor="brand.blue"
                mt={3}
                size="sm"
                _hover={{ bg: 'gray.100' }}
                _active={{
                  bg: 'gray.100',
                  transform: 'scale(0.95)'
                }}
              >
                Sign In with Google
            </Button>
          </Box>
          <Box>or</Box>
          <Box> you can <Link href='/signup'>
                  <a className="link-login">sign up with email</a>
            </Link></Box>
          </Stack>
        )
        }
          
    </Flex>
    </Box>

      <Box
        display="flex"
        flexDirection="row"
        width="full"
        maxWidth="1080px"
        margin="0 auto"
        mt={8}
      >
  
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
