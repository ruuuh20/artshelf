import Head from 'next/head';
import { Button, Flex, Text, Code, Icon } from '@chakra-ui/react';
import useSWR from 'swr'
import { useAuth } from '@/lib/auth';
import LibrariesTableSkeleton from '@/components/LibrariesTableSkeleton';
import LibrariesTable from '@/components/LibrariesTable';
import LibraryTableHeader from '@/components/LibraryTableHeader';
import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import fetcher from '@/utils/fetcher';
// import { storage } from '@/lib/firebase-admin'

const Dashboard = () => {

  
// storage.ref('61qq4bcMpFL.jpgmage.jpg').getDownloadURL()
//   .then((url) => {
//     console.log(url)
//   })
const { user }= useAuth();
 const { data } = useSWR(user ? ['/api/libraries', user.token] : null, fetcher);

  if (!data) {
    return (
    <DashboardShell>
      <LibraryTableHeader />
        <LibrariesTableSkeleton />
    </DashboardShell>
            )
  }


return (
    <DashboardShell>
      <LibraryTableHeader />
        {data.libraries.length ? <LibrariesTable libraries={data.libraries} /> : <EmptyState />}
    </DashboardShell>
        )
};

export default Dashboard;