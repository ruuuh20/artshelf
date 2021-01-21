import Head from 'next/head'
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import BooksEmptyState from '@/components/BooksEmptyState';
import DashboardShell from '@/components/DashboardShell';
import BooksTable from '@/components/BooksTable';
import BooksTableHeader from '@/components/BooksTableHeader';
import BooksTableSkeleton from '@/components/BooksTableSkeleton';

const MyBooks = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/books', user.token] : null, fetcher);
  if (!data) {
    return (
      <DashboardShell>
        <BooksTableHeader />
        <BooksTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <>
     <Head>
    <title>Books</title>
  </Head>
    <DashboardShell>
      <BooksTableHeader />
      {data.books.length ? (
        <BooksTable books={data.books} />
      ) : (
        <BooksEmptyState />
      )}
    </DashboardShell>
    </>
  );
};

export default MyBooks;