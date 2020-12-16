import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { auth } from 'firebase';
import { useAuth } from '@/lib/auth'

import { Button, Heading, Text, Code } from '@chakra-ui/react';

export default function Home() {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Artshelf app</title>
      
      </Head>

      <main className={styles.main}>
        <Heading fontWeight="normal">Artshelf</Heading>

        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        {auth.user ? (
          <Button onClick={(e) => auth.signout()}>Sign Out</Button>
        ) : (
<Button onClick={(e) => auth.signinWithGitHub()}>Sign in</Button>
        )}
        <div>
          {auth?.user?.email}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
