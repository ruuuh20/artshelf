import React from 'react';
import {
  Box,
  Button,
  Flex,
  Link,
  Avatar,
  Icon
} from '@chakra-ui/react';
import NextLink from 'next/link'
import Footer from './Footer'

import { useAuth } from '@/lib/auth';
import AddLibraryModal from './AddLibraryModal'

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <>
    <Box 
    // h="100vh"
    >
      <Flex backgroundColor="#121212" mb={16} w="full" color="#FAF7EB">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
        >
          <Flex>
            <NextLink href="/" passHref>
            <Icon name="logo" size="24px" mr={8} />
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
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
        
        {children}
      </Flex>
    </Box>
    <Footer />
    </>
  );
};

export default DashboardShell;