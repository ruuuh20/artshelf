import React from 'react';
import {
  Box,
  Button,
  Flex,
  Link,
  Avatar,
  Image,
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
          alignItems="center"
          justifyContent="space-between"
          pt="1.2rem"
          pb="1.2rem"
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          backgroundColor="#fff"
        >
          <Flex alignItems="center">
            <NextLink href="/" passHref>
             <a>
            <Logo className="header-logo" />
            </a>
            </NextLink>
             <NextLink href="/dashboard" passHref>
            <Link mr={4} ml="-70px">Libraries</Link>
            </NextLink>
             <NextLink href="/books" passHref>
            <Link>Books</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
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
          height="350px"
          overflow="hidden"
        >
          <Image src="/hero.jpg" width="100%" transform="translateY(-170px)" />
        </Box>
        )
        }
        
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8} pt="80px" bg="#fff">
        {children}
      </Flex>
    </Box>
    <Footer />
    </>
  );
};

export default DashboardShell;