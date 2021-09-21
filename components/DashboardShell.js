import React from 'react';
import {
  Box,
  Button,
  Flex,
  Link,
  Avatar,
  Image,
  Heading,
  Text
} from '@chakra-ui/react';
import NextLink from 'next/link'
// import Image from 'next/image'
import Footer from './Footer'
import Logo from './Logo'
import { useRouter } from 'next/router';

import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();
  const router = useRouter();
  const showBanner= router.pathname === '/dashboard' ? true : false;

  return (
    <>
    <Box 
    // h="100vh"
    >
      <Flex flexDirection="column" w="full" color="gray.900">
        <Flex
          alignItems={["end", "center"]}
          justifyContent="space-between"
          pt="1.2rem"
          pb="1.2rem"
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          backgroundColor="#fff"
        >
          <Flex alignItems={["flex-start", "center"]} flexDirection={["column", "row"]}>
            <NextLink href="/" passHref>
             <a>
            <Logo className="header-logo" />
            </a>
            </NextLink>
            <Box pt={["4%", "0"]}>
             <NextLink href="/dashboard" passHref>
            <Link mr={4} ml={["0", "-70px"]}>Libraries</Link>
            </NextLink>
             <NextLink href="/books" passHref>
            <Link>Books</Link>
            </NextLink>
            </Box>
          </Flex>
          <Flex justifyContent="center" alignItems="center"     flex-direction={["row-reverse", "initial"]}>
            { user && (
            <Button color="gray.900" variant="link" mr={2} onClick={() => signout()}>
              Log Out
            </Button>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
        {showBanner && (
        <Box
          maxW="1250px"
          margin="0 auto"
          w="full"
          height="220px"
          overflow="hidden"
        >
          {/* <Image src="/hero.jpg" width="100%" transform="translateY(-170px)" /> */}
          <Heading align="right" mt={4} as="h1" fontSize={{ base: "24px", md: "42px", lg: "50px" }}>Peak Books Database</Heading>
          <Text align="right" fontSize={{ base: "12px", md: "18px", lg: "26px" }}>Current Semester: Fall 2021</Text>
        </Box>
        )
        }
        
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8} pt="4%" pb="6%" bg="#fff">
        {children}
      </Flex>
    </Box>
    <Footer />
    </>
  );
};

export default DashboardShell;