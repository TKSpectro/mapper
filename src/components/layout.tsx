import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title?: string;
};

export function Layout({ children, title = 'This is the default title' }: Props) {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a className="mr-4">mapper</a>
          </Link>{' '}
          {session ? (
            <>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>{' '}
              |{' '}
              <Link href="/todo">
                <a>Todos</a>
              </Link>{' '}
              |{' '}
              <Link href="/components">
                <a>Components</a>
              </Link>{' '}
              |{' '}
              <Link href="/profile">
                <a>Profile</a>
              </Link>{' '}
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <a>Login</a>
              </Link>{' '}
            </>
          )}
        </nav>
      </header>
      {children}
    </div>
  );
}
