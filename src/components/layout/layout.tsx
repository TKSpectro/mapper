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
      <div className="w-full flex-col md:flex md:min-h-screen md:flex-row">
        <SideNav />
        <>{children}</>
      </div>
    </>
  );
}
