import Head from 'next/head';
import { Button, Flex, Text, Code, Icon } from '@chakra-ui/react';
import useSWR from 'swr'
import { useAuth } from '@/lib/auth';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import fetcher from '@/utils/fetcher';


const Dashboard = () => {
  const { user }= useAuth();
 const { data } = useSWR(user ? ['/api/libraries', user.token] : null, fetcher);
console.log(data)
  if (!data) {
    return (
    <DashboardShell>
        <SiteTableSkeleton />
    </DashboardShell>
            )
  }


return (
    <DashboardShell>
        {data.libraries ? <SiteTable libraries={data.libraries} /> : <EmptyState />}
    </DashboardShell>
        )
};

export default Dashboard;