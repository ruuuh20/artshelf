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

export const Logo = () => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.87 21.94">
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <text
        transform="translate(0 11.29)"
        fontSize="{13}"
        fill="#231f20"
        fontFamily="AktivGrotesk-Hair, Aktiv Grotesk"
        letterSpacing="-0.03em"
      >
        a
        <tspan x="6.2" y="{0}" letterSpacing="-0.01em">r</tspan>
        <tspan x="10.37" y="{0}" letterSpacing="-0.03em">t</tspan>
      </text>
      <text
        transform="translate(14.78 11.14)"
        fontSize="{13}"
        fill="#231f20"
        fontFamily="AktivGrotesk-Regular, Aktiv Grotesk"
        letterSpacing="-0.06em"
      >
        r
        <tspan x="3.93" y="{0}" letterSpacing="-0.03em">eads</tspan>
      </text>
    </g>
  </g>
</svg>
)

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
            <Logo />
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
        <Box>
              <Image src="/hero.jpg" width="100%" height="350px" />

        </Box>
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