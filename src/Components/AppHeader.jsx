// src/Components/AppHeader.jsx
import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';

const AppHeader = ({ currentCourse, theme, toggleTheme }) => {
  // Classes for the theme toggle button
  const buttonClasses = `p-2 rounded-full transition-colors
    ${theme === 'dark'
      ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;

  // Header container classes depending on theme
  const headerClasses = `flex items-center justify-between h-16 px-6 border-b border-gray-200 shadow-md
    ${theme === 'dark' ? 'bg-gray-800 text-white dark:border-gray-700' : 'bg-white text-gray-900 dark:border-gray-700'}`;

  return (
    <header className={headerClasses}>
      {/* Left side: Title */}
      <div className="text-xl font-medium">
        <span className="font-normal text-gray-500 dark:text-gray-400">Learning Platform / </span>
        {currentCourse.title}
      </div>

      {/* Right side: Buttons & profile */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={buttonClasses}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Menu Button */}
        <button className="p-2 rounded-full text-gray-900 hover:bg-gray-100 hover:text-blue-600 transition-colors dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-blue-400">
          <Menu className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors dark:hover:bg-gray-700">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
            JD
          </div>
        <span className="text-sm font-medium text-blue-700 hover:text-white hidden sm:inline dark:text-gray-500 dark:hover:text-white">
          Jane Doe
    </span>

        </div>
      </div>
    </header>
  );
};

export default AppHeader;
