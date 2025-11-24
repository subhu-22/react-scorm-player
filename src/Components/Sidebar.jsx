// src/Components/Sidebar.jsx
import React, { useEffect, useState } from "react";
// icons
import { ArrowLeft, ArrowRight, BookOpen, User, Settings, LayoutDashboard, FileText, X } from 'lucide-react';
import NavItem from './NavItem.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({
 currentCourseKey,
 setCurrentCourseKey,
 isCollapsed,
 toggleCollapsed,
 courseCatalog = {},
 mobileOpen = false,
 setMobileOpen = () => {},
// ADDED: layout PROP
 layout 
}) => {
 const navigate = useNavigate();
 const location = useLocation();

 const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
 useEffect(() => {
 if (typeof window === 'undefined') return;
 const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, setMobileOpen]);

  const mainNav = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/' },
    { label: 'Reports', icon: FileText, path: '/reports' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Admin Settings', icon: Settings, path: '/admin' },
  ];

  const isIconOnlyMode = isMobile || isCollapsed;

  // ⭐️ REVISED LOGIC: Main links are only hidden if layout is 'Topnav' (where sidebar is hidden on desktop anyway)
  const shouldHideMainNav = layout === 'Topnav'; 
  const shouldRenderMainNav = !shouldHideMainNav || isMobile; // Main Nav links visible unless desktop Topnav

  // Sidebar should only render on desktop for Sidenav and Combo
  const shouldRenderSidebar = isMobile || layout === 'Sidenav' || layout === 'Combo';


  const baseContainer = 'transition-all duration-300 border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 min-w-0';
  const expandedWidth = 'flex-none w-72 md:w-72';
  const collapsedWidth  = 'flex-none w-16 md:w-16';
  const mdWidthClass = isCollapsed ? collapsedWidth : expandedWidth;

  const drawerBase = 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out bg-gray-900';
  const drawerOpen = 'translate-x-0';
  const drawerClosed = '-translate-x-full';

  if (!shouldRenderSidebar) {
    return null; // Do not render the sidebar component at all on desktop if layout is 'Topnav'
  }

  return (
    <>
      {/* Backdrop for mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={`
          ${isMobile 
            ? `${drawerBase} ${mobileOpen ? drawerOpen : drawerClosed} w-64` 
            : `${baseContainer} ${mdWidthClass} h-screen flex-col overflow-hidden transition-[width] duration-300 ease-in-out`
          }
          md:relative md:translate-x-0 md:z-auto bg-gray-900 text-white flex-shrink-0
        `}
        aria-hidden={isMobile ? !mobileOpen : false}
      >
        <div className="flex flex-col h-full overflow-hidden">

          {/* Header/Collapse Button Section (Logo/Icon always shown) */}
          <div className="flex items-center justify-between p-3 h-16 border-b border-gray-700 flex-shrink-0">
            
            {/* LOGO/TITLE/ICON DISPLAY LOGIC */}
            {isMobile || !isCollapsed ? (
                /* Expanded or Mobile Drawer - Always show full logo/title */
                <div className="flex items-center space-x-2 overflow-hidden min-w-0">
                    <span className="text-xl font-bold text-blue-500 truncate">Zoho Learn</span>
                    <span className="text-xs ml-1 text-gray-400">v1.0</span>
                </div>
            ) : (
                /* Collapsed (Desktop) - Always show 'Z' Icon */
                <div className="w-12 flex items-center justify-center flex-none">
                    <div className="w-6 h-6 flex items-center justify-center text-xl font-bold text-blue-500">Z</div>
                </div>
            )}
            {/* End Logo/Icon Logic */}

            {/* COLLAPSE BUTTON (Always visible on desktop, right-aligned) */}
            <div className="flex items-center gap-2 flex-none">
              {isMobile && (
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md text-gray-400 hover:bg-gray-700" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              )}

              {!isMobile && (
                <button onClick={toggleCollapsed} className="inline-flex p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-blue-400 focus:outline-none" aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                  {isCollapsed ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>

          {/* Navigation Scrollable Area */}
          <nav className="p-2 space-y-1 overflow-y-auto flex-1 min-w-0">
            
            {/* MAIN NAVIGATION RENDERING: Always shows, unless desktop Topnav */}
            {shouldRenderMainNav && (
                mainNav.map((item) => (
                    <NavItem
                      key={item.label}
                      onClick={() => { navigate(item.path); if (isMobile) setMobileOpen(false); }}
                      icon={item.icon}
                      label={item.label}
                      compact={isIconOnlyMode}
                      isActive={location.pathname === item.path}
                    />
                ))
            )}

            {/* CONDITIONAL SEPARATOR */}
            {shouldRenderMainNav && <div className="py-2 border-t border-gray-700 mt-4" />}

            {/* Modules (Always shows if not hidden by icon-only mode) */}
            {!isIconOnlyMode ? (
              <div className="px-2 space-y-2">
                <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">Available Modules</h3>
                {Object.keys(courseCatalog).map((key) => {
                  const course = courseCatalog[key];
                  const isActive = currentCourseKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setCurrentCourseKey(key)}
                      className={`w-full text-left p-2 rounded-lg transition-colors duration-150 flex flex-col ${isActive ? 'bg-blue-600 text-white font-semibold' : 'text-gray-200 hover:bg-gray-700'}`}
                    >
                      <span className="text-sm truncate min-w-0">{course.title}</span>
                      <p className="text-xs text-gray-400 mt-0.5 truncate min-w-0">{course.description}</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {Object.keys(courseCatalog).map((key) => {
                  const isActive = currentCourseKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => { setCurrentCourseKey(key); if (isMobile) setMobileOpen(false); }}
                      title={courseCatalog[key].title}
                      className={`w-10 h-10 mx-auto rounded-md flex justify-center items-center transition-colors duration-150 ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-700'}`}
                    >
                      <BookOpen className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
            )}

          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;