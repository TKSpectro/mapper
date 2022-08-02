import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { Button } from '../ui/button';

export function SideNav() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <aside className="sticky top-0 flex flex-col w-full md:w-64 text-gray-700 bg-gray-100 dark:text-gray-200 dark:bg-gray-800 flex-shrink-0 md:h-screen">
      <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
        <Link href="/">
          <a className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline">
            mapper
          </a>
        </Link>
        <Button
          className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
          onClick={() => setOpen(!open)}
        >
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
            {!open && <HiOutlineMenuAlt3 className="w-6 h-6 text-gray-800" />}
            {open && <HiOutlineX className="h-6 w-6 text-gray-800" />}
          </svg>
        </Button>
      </div>
      <nav
        className={clsx('flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto', {
          block: open,
          hidden: !open,
        })}
      >
        {session && (
          <>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/todo">Todo</NavLink>
            <NavLink href="/components">Components</NavLink>
            <NavLink href="/profile">Profile</NavLink>
          </>
        )}
        {!session && <NavLink href="/auth/login">Login</NavLink>}
      </nav>
      <div
        className={clsx(
          'md:absolute md:block bottom-0 w-full py-4 px-8 md:px-4 border-t border-gray-500',
          {
            block: open,
            hidden: !open,
          },
        )}
      >
        <Link href="https://github.com/TKSpectro/mapper">
          <a>
            <FiGithub className="float-right w-6 h-6" />
          </a>
        </Link>
      </div>
    </aside>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const router = useRouter();
  const isCurrentRoute = router.route === href || router.route.startsWith(`${href}`);

  return (
    <Link href={href}>
      <a
        className={clsx(
          'block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline',
          {
            'bg-transparent': !isCurrentRoute,
            'bg-gray-200': isCurrentRoute,
          },
        )}
      >
        {children}
      </a>
    </Link>
  );
}
