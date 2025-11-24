// src/Components/AppHeader.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, ChevronDown, BookOpen, FileText, User, Settings } from 'lucide-react';

const AppHeader = ({ theme, toggleTheme, onMobileMenuToggle, navLinks, layout }) => {

  const location = useLocation(); // ✅ Track current path

  const FULL_NAV_LINKS = [
    { name: 'Dashboard', path: '/dashboard', icon: 'Home' },
    { name: 'My Courses', path: '/', icon: 'BookOpen' },
    { name: 'Reports', path: '/reports', icon: 'FileText' },
    { name: 'Profile', path: '/profile', icon: 'User' },
    { name: 'Admin Settings', path: '/admin', icon: 'Settings' },
  ];

  const moduleLinks = navLinks.filter(link => link.key);

  const isTopNavLayout = layout === 'Topnav';
  const isHorizontalNavVisible = isTopNavLayout;
  const shouldShowLogo = layout === 'Topnav' || layout === 'Sidenav';

  const buttonClasses = `p-2 rounded-full transition-colors
    ${theme === 'dark' ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;

  const headerClasses = `flex items-center justify-between h-16 px-4 shadow-md w-full
    ${isTopNavLayout
      ? 'bg-gray-900 text-white border-b border-gray-700'
      : 'bg-white text-gray-900 border-b border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700'}`;

  // ✅ NavItem using React Router Link
  const NavItem = ({ name, path, isActive, className = '' }) => (
    <Link
      to={path}
      onClick={(e) => e.stopPropagation()} // Prevent bubbling to sidebar
      className={`
        text-sm font-medium py-1 px-3 rounded-md transition-colors whitespace-nowrap
        ${isActive
          ? 'text-blue-400 bg-gray-700 dark:bg-gray-700'
          : 'text-gray-300 hover:text-white hover:bg-gray-700'}
        ${className}
      `}
    >
      {name}
    </Link>
  );

  return (
    <header className={headerClasses}>
      {/* LEFT: Logo & Mobile Menu Toggler */}
      <div className="flex items-center space-x-6">
        {(layout === 'Sidenav' || layout === 'Combo') && (
          <button
            onClick={onMobileMenuToggle}
            className="p-2 rounded-md md:hidden text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {shouldShowLogo && (
          <h1 className={`text-xl font-bold ml-2 ${isTopNavLayout ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            Zoho Learn
          </h1>
        )}
      </div>

      {/* CENTER: Horizontal Nav (Topnav only) */}
      {isHorizontalNavVisible && (
        <div className="flex items-center space-x-6 h-full">
          <nav className="hidden md:flex items-center space-x-1 h-full">
            {FULL_NAV_LINKS.map(link => (
              <NavItem
                key={link.name}
                name={link.name}
                path={link.path}
                isActive={location.pathname === link.path}
              />
            ))}

            {/* Module Dropdown */}
            {moduleLinks.length > 0 && (
              <div className="relative group">
                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()} // Prevent sidebar open
                  className="flex items-center text-sm font-medium py-1 px-3 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  Modules ({moduleLinks.length}) <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                <div className="absolute top-full left-0 mt-1 w-60 bg-gray-900 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50 p-2 border border-gray-700">
                  <p className="text-xs text-gray-500 p-1 mb-1 border-b border-gray-700">AVAILABLE MODULES</p>
                  {moduleLinks.map(link => (
                    <NavItem
                      key={link.name}
                      name={link.name}
                      path={link.path}
                      isActive={location.pathname === link.path}
                      className="block w-full text-left py-2 px-3 hover:bg-gray-700"
                    />
                  ))}
                </div>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* RIGHT: Controls */}
      <div className="flex items-center space-x-3">
        {/* Search Icon */}
        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className={buttonClasses} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Profile */}
        <Link to="/profile" className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors dark:hover:bg-gray-700">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">JD</div>
          <span className="text-sm font-medium text-blue-700 hidden sm:inline dark:text-gray-300">Jane Doe</span>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
