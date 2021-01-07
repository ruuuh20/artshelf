import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useAuth } from '@/lib/auth'
import Link from 'next/link'
import { Box, Stack, Button, Heading, Text, Code, Flex } from '@chakra-ui/react';
import { Camera } from 'react-feather';
import { getAllBooks, getLibrary } from '@/lib/db-admin';
import Book from '@/components/Book';
import Logo from '@/components/Logo'

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

// export const Logo = () => (
// <Link href="/">
// <a>
//  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.45 13.6" className="main-logo">
//   <g id="Layer_2" data-name="Layer 2">
//     <g id="Layer_1-2" data-name="Layer 1">
//       <text
//         transform="translate(0 11.05)"
//         fontSize="{13}"
//         fill="#231f20"
//         fontFamily="Interstate-ExtraLight, Interstate"
//         fontWeight="{200}"
//         letterSpacing="-0.03em"
//       >
//         a
//         <tspan x="6.47" y="{0}" letterSpacing="-0.02em">r</tspan>
//         <tspan x="11.31" y="{0}" letterSpacing="-0.03em">t</tspan>
//         <tspan
//           x="15.39"
//           y="{0}"
//           fontFamily="Interstate-Regular, Interstate"
//           fontWeight="{400}"
//           letterSpacing="-0.06em"
//         >
//           r
//         </tspan>
//         <tspan
//           x="20.06"
//           y="{0}"
//           fontFamily="Interstate-Regular, Interstate"
//           fontWeight="{400}"
//           letterSpacing="-0.04em"
//         >
//           e
//         </tspan>
//         <tspan
//           x="26.73"
//           y="{0}"
//           fontFamily="Interstate-Regular, Interstate"
//           fontWeight="{400}"
//         >
//           ads
//         </tspan>
//       </text>
//     </g>
//   </g>
// </svg>  
// </a>
// </Link>
// )

// const newLogo = () => (
//   <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" x="0px" y="0px"
// 	 viewBox="0 0 595.3 841.9" style="enable-background:new 0 0 595.3 841.9;" xml:space="preserve">
// <g>
// 	<path d="M277,425.5h-0.6v-1c-0.5,0.7-1.3,1.2-2.3,1.2c-1.1,0-2.3-0.5-2.3-2.1c0-1.5,1.2-2.2,2.6-2.2c0.8,0,1.5,0.2,2,0.5v-1
// 		c0-1.3-0.6-1.8-1.8-1.8c-0.8,0-1.4,0.2-2,0.5l-0.2-0.5c0.6-0.3,1.3-0.5,2.2-0.5c1.5,0,2.3,0.6,2.3,2.2V425.5z M276.4,423.9v-1.6
// 		c-0.5-0.3-1.1-0.5-2-0.5c-1.1,0-2,0.6-2,1.7c0,1.2,0.8,1.7,1.8,1.7S275.9,424.6,276.4,423.9z"/>
// 	<path d="M282.3,418.7l-0.1,0.6c-0.3-0.1-0.6-0.2-1.1-0.2c-0.9,0-1.8,0.7-1.8,2.3v4.1h-0.6v-6.8h0.6v1.2c0.3-0.9,1.1-1.4,1.9-1.4
// 		C281.7,418.5,282.1,418.6,282.3,418.7z"/>
// 	<path d="M286.2,424.8l0,0.5c-0.4,0.2-0.7,0.2-1.2,0.2c-0.8,0-1.2-0.4-1.2-1.3v-5.1h-0.9v-0.5h0.9v-2.3l0.6-0.3v2.7h1.8v0.5h-1.8v5
// 		c0,0.6,0.2,0.9,0.8,0.9C285.6,425.1,285.9,425,286.2,424.8z"/>
// 	<path d="M291.6,418.8l-0.4,1.3c-0.3-0.2-0.6-0.2-1-0.2c-0.8,0-1.3,0.6-1.3,1.8v3.9h-1.3v-6.8h1.3v0.6c0.3-0.5,0.9-0.8,1.6-0.8
// 		C291,418.5,291.3,418.6,291.6,418.8z"/>
// 	<path d="M297.7,421.9c0,0.2,0,0.5,0,0.6h-4.5c0.1,1.3,0.9,1.9,1.7,1.9c0.6,0,1-0.2,1.5-0.5l0.8,0.9c-0.6,0.6-1.3,0.9-2.4,0.9
// 		c-1.6,0-3-1.3-3-3.5c0-2.3,1.2-3.6,3-3.6C296.8,418.5,297.7,420.1,297.7,421.9z M296.4,421.4c-0.1-0.9-0.5-1.7-1.6-1.7
// 		c-0.9,0-1.4,0.6-1.6,1.7H296.4z"/>
// 	<path d="M304.1,425.5h-1.3v-0.7c-0.5,0.5-1.1,0.8-1.9,0.8c-1.1,0-2.4-0.6-2.4-2.3c0-1.5,1.2-2.2,2.7-2.2c0.6,0,1.1,0.1,1.5,0.3
// 		v-0.5c0-0.7-0.5-1.2-1.3-1.2c-0.7,0-1.2,0.1-1.8,0.4l-0.5-1c0.6-0.4,1.4-0.6,2.3-0.6c1.5,0,2.6,0.7,2.6,2.3V425.5z M302.8,423.5v-1
// 		c-0.4-0.2-0.8-0.3-1.6-0.3c-0.9,0-1.4,0.4-1.4,1c0,0.7,0.4,1.1,1.3,1.1C301.8,424.4,302.4,424,302.8,423.5z"/>
// 	<path d="M311,425.5h-1.3v-0.7c-0.5,0.5-1.1,0.8-1.8,0.8c-1.5,0-2.6-1.1-2.6-3.7c0-2.3,1.3-3.4,2.7-3.4c0.7,0,1.3,0.4,1.7,0.8v-2.6
// 		l1.3-0.7V425.5z M309.7,423.5v-2.9c-0.3-0.4-0.9-0.9-1.6-0.9c-1,0-1.5,0.7-1.5,2.2c0,1.7,0.5,2.5,1.5,2.5
// 		C308.8,424.4,309.3,424,309.7,423.5z"/>
// 	<path d="M317.3,423.6c0,1.5-1.2,2-2.6,2c-0.9,0-1.9-0.4-2.6-0.9l0.6-1c0.6,0.4,1.4,0.7,2,0.7c0.8,0,1.2-0.3,1.2-0.8
// 		c0-0.5-0.6-0.8-1.6-1.1c-1.5-0.6-2-1.1-2-2.1c0-1.2,1-1.9,2.3-1.9c0.9,0,1.7,0.3,2.3,0.8l-0.6,1c-0.6-0.4-1.1-0.6-1.8-0.6
// 		c-0.7,0-0.9,0.3-0.9,0.6c0,0.3,0.2,0.6,1.3,1C316.5,421.9,317.3,422.3,317.3,423.6z"/>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// </svg>

// )

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
        <title>Artreads</title>
      </Head>
       <Logo />
       
        <Text mt={1}>A place to catalog your art books.</Text>
        {auth.user ? (
          <Button as="a" href="/dashboard">Dashboard</Button>
        ) : (
          <Stack width="500px" flexDirection="row" justifyContent="space-evenly" alignItems="center" mt={5} textAlign="center"> 
          <Box>
            <Link href='/login'>
                <a textDecoration="underline">Login with email</a>
            </Link>
          </Box>
          <Box>
            <Link href='/signup'>
                  <a textDecoration="underline">Sign up with email</a>
            </Link>
            <br />
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
