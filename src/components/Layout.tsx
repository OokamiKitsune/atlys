import React, { ReactNode } from 'react';
import Menubar from './MenuBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Menubar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;

