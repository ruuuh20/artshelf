import Head from 'next/head';
import { Button, Flex, Text, Code, Icon } from '@chakra-ui/react';
import useSWR from 'swr'
import { useAuth } from '@/lib/auth';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import LibraryTableHeader from '@/components/LibraryTableHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import fetcher from '@/utils/fetcher';

const Dashboard = () => {

  const { user }= useAuth();
 const { data } = useSWR(user ? ['/api/libraries', user.token] : null, fetcher);

  if (!data) {
    return (
    <DashboardShell>
      <LibraryTableHeader />
        <SiteTableSkeleton />
    </DashboardShell>
            )
  }


return (
    <DashboardShell>

      <LibraryTableHeader />
        {data.libraries.length ? <SiteTable libraries={data.libraries} /> : <EmptyState />}
    </DashboardShell>
        )
};

export default Dashboard;