import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Leaf,
  Package,
  Lightbulb,
  Play,
  User,
  LogOut,
  Menu,
  X,
  Info,
  Globe,
  Scan
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    logout();
    navigate('/about');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Navbar items in the exact order requested
  const navItems = [
    { path: '/about', label: i18n.t('nav_about'), icon: Info },
    { path: '/waste-options', label: i18n.t('nav_waste_options'), icon: Package },
    { path: '/suggestions', label: i18n.t('nav_suggestions'), icon: Lightbulb },
    { path: '/recommendations', label: i18n.t('nav_ai_plan'), icon: Leaf },
    { path: '/weather', label: i18n.t('nav_weather'), icon: Lightbulb },
    { path: '/disease-detector', label: i18n.t('nav_disease'), icon: Scan },
    { path: '/tutorials', label: i18n.t('nav_tutorials'), icon: Play },
    { path: '/profile', label: i18n.t('nav_profile'), icon: User },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  // Only show navbar if user is authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/about" className="flex items-center space-x-2 flex-shrink-0">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              Agri Waste Optimizer
            </span>
            <span className="text-xl font-bold text-gray-900 sm:hidden">
              AWO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActivePath(item.path)
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 ml-2"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {i18n.t('logout')}
            </button>

            <div className="relative ml-4">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Select Language"
              >
                <Globe className="h-5 w-5 text-gray-600" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                  <button onClick={() => { changeLanguage('en'); setIsLangMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">English</button>
                  <button onClick={() => { changeLanguage('hi'); setIsLangMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">हिंदी (Hindi)</button>
                  <button onClick={() => { changeLanguage('te'); setIsLangMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">తెలుగు (Telugu)</button>
                  <button onClick={() => { changeLanguage('ta'); setIsLangMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">தமிழ் (Tamil)</button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${isActivePath(item.path)
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              {i18n.t('logout')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;