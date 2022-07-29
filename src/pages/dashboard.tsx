import type { NextPage } from 'next';
import Head from 'next/head';

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>mapper | Dashboard</title>
        <meta name="description" content="mapper | Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Dashboard
        </h1>
      </main>
    </>
  );
};

export default Dashboard;
