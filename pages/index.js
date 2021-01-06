import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useAuth } from '@/lib/auth'
import Link from 'next/link'
import { Box, Stack, Button, Heading, Text, Code, Flex } from '@chakra-ui/react';
import { Camera } from 'react-feather';
import { getAllBooks, getLibrary } from '@/lib/db-admin';
import Book from '@/components/Book';

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

export const Logo = () => (
<Link href="/">
<a>
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.45 13.6">
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <text
        transform="translate(0 11.05)"
        fontSize="{13}"
        fill="#231f20"
        fontFamily="Interstate-ExtraLight, Interstate"
        fontWeight="{200}"
        letterSpacing="-0.03em"
      >
        a
        <tspan x="6.47" y="{0}" letterSpacing="-0.02em">r</tspan>
        <tspan x="11.31" y="{0}" letterSpacing="-0.03em">t</tspan>
        <tspan
          x="15.39"
          y="{0}"
          fontFamily="Interstate-Regular, Interstate"
          fontWeight="{400}"
          letterSpacing="-0.06em"
        >
          r
        </tspan>
        <tspan
          x="20.06"
          y="{0}"
          fontFamily="Interstate-Regular, Interstate"
          fontWeight="{400}"
          letterSpacing="-0.04em"
        >
          e
        </tspan>
        <tspan
          x="26.73"
          y="{0}"
          fontFamily="Interstate-Regular, Interstate"
          fontWeight="{400}"
        >
          ads
        </tspan>
      </text>
    </g>
  </g>
</svg>  
</a>
</Link>
)

export default function Home( { allBooks , library }) {

  const auth = useAuth();
  
  return (
    <>
    <Box color="#484AB3">
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="80vh"
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
        <title>Artreads</title>
      </Head>
       <Logo />
        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        <Text>A place to catalog your art books.</Text>
        {auth.user ? (
          <Button as="a" href="/dashboard">Dashboard</Button>
        ) : (
          <Stack> 
          <Link href='/login'>
              <a>Login with email</a>
          </Link>
          <Link href='/signup'>
                <a>Sign up with email</a>
          </Link>
          <Button
              onClick={(e) => auth.signinWithGoogle()}
              backgroundColor="white"
              color="gray.900"
              variant="outline"
    
              border="2px"
              borderColor="#484AB3"
              mt={4}
              size="md"
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

      {/* <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
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
      </Box> */}
      </>
  )
}
