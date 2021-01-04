import React from 'react';
import {
  Box,
  Button,
  Flex,
  Link,
  Avatar,
  Image
  Icon,
  Center
} from '@chakra-ui/react';
import NextLink from 'next/link'
// import Image from 'next/image'
import Footer from './Footer'

import { useAuth } from '@/lib/auth';

export const Logo = () => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.45 13.6" className="logo-svg">
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
            <Button color="gray.900" variant="link" mr={2} onClick={() => signout()}>
              Log Out
            </Button>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
        </Flex>
        <Box
         maxW="1250px"
          margin="0 auto"
           w="full"
           height="350px"
           overflow="hidden"
          >
              <Image src="/banner.jpg" width="100%"  />

        </Box>
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