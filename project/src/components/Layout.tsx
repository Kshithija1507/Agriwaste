import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Show navbar only when authenticated
  const showNavbar = isAuthenticated;

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;