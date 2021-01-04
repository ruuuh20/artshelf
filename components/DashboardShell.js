import React from 'react';
import {
  Box,
  Button,
  Flex,
  Link,
  Avatar,
  Icon,
  Center
} from '@chakra-ui/react';
import NextLink from 'next/link'
import Image from 'next/image'
import Footer from './Footer'

import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <>
    <Box 
    // h="100vh"
    >
      <Flex flexDirection="column" w="full" color="gray.900">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          backgroundColor="#fff"
        >
          <Flex>
            <NextLink href="/" passHref>
            <Image src='./logo.svg' alt='logo' />
            </NextLink>
             <NextLink href="/dashboard" passHref>
            <Link mr={4}>Libraries</Link>
            </NextLink>
             <NextLink href="/books" passHref>
            <Link>Books</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            { user && (
            <Button color="brand.white" variant="link" mr={2} onClick={() => signout()}>
              Log Out
            </Button>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
        <Center h="100px">
              <Image src="/hero.jpg" width="100%" />

        </Center>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8} bg="#fff">
        
        {children}
      </Flex>
    </Box>
    <Footer />
    </>
  );
};

export default DashboardShell;