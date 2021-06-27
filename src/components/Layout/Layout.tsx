import React, { memo, useState } from 'react';

import './Layout.scss';
import Header from '../Header';
import Sidebar from '../Sidebar';

const Layout = memo(({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="c-Layout">
      <Header onMenuToggle={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="c-Layout__main" id="main-container">
        {children}
      </main>
    </div>
  );
});

export default Layout;
