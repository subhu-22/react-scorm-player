// src/Components/Sidebar.jsx
import React from "react";
import { ArrowLeft, ArrowRight, BookOpen, User, Dock, Settings, ChartLine } from 'lucide-react';
import NavItem from './NavItem.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ currentCourseKey, setCurrentCourseKey, isCollapsed, toggleCollapsed, courseCatalog = {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainNav = [
    { label: 'Dashboard', icon: ChartLine, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/' },
    { label: 'Reports', icon: Dock, path: '/reports' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Admin Settings', icon: Settings, path: '/admin' },
  ];

  return (
    <div className={`flex-shrink-0 transition-all duration-300 bg-white border-r border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 ${isCollapsed ? 'w-16' : 'w-72'}`} style={{ height: '100vh' }}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className='flex items-center'>
            <span className="text-xl font-bold text-blue-500">Zoho Learn</span>
            <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">v1.0</span>
          </div>
        )}
        <button 
          onClick={toggleCollapsed} 
          className="p-1 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-600 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
        >
          {isCollapsed ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="p-2 space-y-1">
        {mainNav.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>

      {/* Course Catalog */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-t border-gray-200 mt-4 dark:border-gray-700">
          <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2 dark:text-gray-400">Available Modules</h3>
          <div className="space-y-2">
            {Object.keys(courseCatalog).map((key) => {
              const course = courseCatalog[key];
              const isActive = currentCourseKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setCurrentCourseKey(key)}
                  className={`w-full text-left p-2 rounded-lg transition-colors duration-150 flex flex-col ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-sm truncate">{course.title}</span>
                  <p className="text-xs text-gray-500 mt-0.5 truncate dark:text-gray-400">{course.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Collapsed mode for courses */}
      {isCollapsed && (
        <div className="p-2 border-t border-gray-200 mt-4 dark:border-gray-700">
          {Object.keys(courseCatalog).map((key) => {
            const isActive = currentCourseKey === key;
            return (
              <button
                key={key}
                onClick={() => setCurrentCourseKey(key)}
                title={courseCatalog[key].title}
                className={`w-full p-2 mb-2 rounded-lg flex justify-center items-center transition-colors duration-150 ${
                  isActive 
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <BookOpen className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
