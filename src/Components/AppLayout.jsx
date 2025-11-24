// src/Components/AppLayout.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';

const AppLayout = ({ children, courseCatalog = {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer when resizing to desktop to avoid stuck open
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileOpen]);

  return (
    <div className="flex h-screen">
      <Sidebar
        currentCourseKey={null}
        setCurrentCourseKey={() => {}}
        isCollapsed={isCollapsed}
        toggleCollapsed={() => setIsCollapsed(s => !s)}
        courseCatalog={courseCatalog}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col">
        <AppHeader
          theme="light"
          toggleTheme={() => {}}
          // This prop name must match the header's prop: onMobileMenuToggle
          onMobileMenuToggle={() => setMobileOpen(o => !o)}
        />

        <main className="p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
