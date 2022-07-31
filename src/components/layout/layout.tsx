import { ReactNode } from 'react';
import { Meta } from './meta';
import { SideNav } from './side-nav';

type Props = {
  children?: ReactNode;
  title?: string;
};

export function Layout({ children, title = 'This is the default title' }: Props) {
  return (
    <>
      <Meta />
      <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
        <SideNav />
        <>{children}</>
      </div>
    </>
  );
}
