import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex bg-light min-vh-100">
      <Sidebar open={sidebarOpen} />
      <div className="flex-grow-1 d-flex flex-column">
        <Header onToggleSidebar={() => setSidebarOpen((value) => !value)} />
        <main className="flex-grow-1 p-3 p-lg-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
