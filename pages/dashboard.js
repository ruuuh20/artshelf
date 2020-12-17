import Head from 'next/head';
import { Button, Flex, Text, Code, Icon } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';

const Dashboard = () => {
  const auth = useAuth();
  console.log(auth.user)

  if (!auth.user) {
    return 'Loading...';
  }

  return <EmptyState />;
};

export default Dashboard;