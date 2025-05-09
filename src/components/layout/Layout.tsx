
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { cn } from '../../utils/cn';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main className={cn(
        "flex-1 overflow-auto transition-all duration-300",
        collapsed ? "ml-[70px]" : "ml-[250px]"
      )}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
