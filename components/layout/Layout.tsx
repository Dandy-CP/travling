import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  pathname: string;
}

const Layout = ({ children, pathname }: LayoutProps) => {
  const isDashboardPage = pathname.includes('dashboard');

  return (
    <>
      {!isDashboardPage && (
        <div>
          <Navbar isDashboardPage={isDashboardPage} pathname={pathname} />
          {children}
          <Footer />
        </div>
      )}

      {isDashboardPage && (
        <div>
          <Navbar isDashboardPage={isDashboardPage} pathname={pathname} />
          <div className="flex flex-row">
            <Sidebar />
            <div className="w-full p-8">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
