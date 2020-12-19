import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useAuth } from '@/lib/auth'

import { Button, Heading, Text, Code, Flex } from '@chakra-ui/react';
import { Camera } from 'react-feather';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();

  
  return (
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
   
    </Flex>
  )
}
