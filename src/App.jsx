// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Components ---
import Sidebar from './Components/Sidebar.jsx';
import AppFooter from './Components/AppFooter.jsx';
import AppHeader from './Components/AppHeader.jsx';
import CustomizeTab from './Components/CustomizeTab.jsx';
import CustomizeDrawer from './Components/CustomizeDrawer.jsx';
import Dashboard from './pages/Dashboard.jsx';

// --- MUI imports ---
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// ⭐️ 1. Define Centralized Navigation Data (for both Sidebar and Topnav)
const NAV_LINKS = [
  // This is a mockup; replace 'HomeIcon' with an actual imported icon if needed
  { name: 'Dashboard', path: '/dashboard', icon: 'HomeIcon' },
  { name: 'Intro to PM', path: '/', key: 'moduleA' },
  { name: 'Vite/SCORMZIP', path: '/', key: 'moduleB' },
  { name: 'Sales Strategy', path: '/', key: 'moduleC' },
];

// SCORM Simulator (omitted for brevity)
const SCORM_API_SIMULATOR = {
  setValue: (element, value) => console.log(`SCORM API: Setting ${element} to "${value}"`),
  getValue: (element) => {
    const data = { 'cmi.core.lesson_status': 'incomplete', 'cmi.core.score.raw': '0', 'cmi.core.total_time': '0000:00:00' };
    return data[element] || '';
  },
  terminate: () => console.log('SCORM API: Terminated session.'),
  initialize: () => console.log('SCORM API: Initialized session.'),
};

// Course Catalog (omitted for brevity)
const COURSE_CATALOG = {
  moduleA: { id: "module-a", title: "Intro to Product Management", path: "/dummy_scorm/index.html", description: "Foundational concepts and roles in modern product management." },
  moduleB: { id: "module-b", title: "Vite/SCORMZIP Example", path: "/scormzip/res/index.html", description: "Advanced example of SCORM packaging and asset loading." },
  moduleC: { id: "module-c", title: "Sales Strategy & Tools", path: "/dummy_scorm/index.html", description: "Tactics for improving pipeline conversion and closing deals." },
};

// SCORM Player Component (omitted for brevity)
const ScormPlayer = ({ coursePath, courseId, title }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(null);
    SCORM_API_SIMULATOR.initialize();
    return () => SCORM_API_SIMULATOR.terminate();
  }, [courseId]);

  const handleIframeLoad = () => SCORM_API_SIMULATOR.setValue('cmi.core.entry', 'resume');
  const handleError = () => setErrorMessage(`Error loading "${title}". Check path: ${coursePath}`);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="p-3 border-b border-gray-200 bg-white shadow-sm flex justify-between items-center dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-700 truncate dark:text-white">{title}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">SCORM 2004 Standard</span>
        </div>
      </div>
      {errorMessage && (
        <div className="p-4 bg-red-100 text-red-700 flex items-center space-x-3 rounded-b-lg border-b border-red-300 dark:bg-red-900 dark:text-red-300 dark:border-red-700">
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        <iframe
          key={courseId}
          src={coursePath}
          title={title}
          className="w-full h-full border-0"
          onLoad={handleIframeLoad}
          onError={handleError}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

// MAIN APP
const App = () => {
  const [currentCourseKey, setCurrentCourseKey] = useState('moduleB');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Theme state: can be 'light', 'dark', or 'system'
  const [theme, setTheme] = useState('light');

  // ⭐️ NEW LAYOUT STATE
  // 'Combo', 'Sidenav', 'Topnav'
  const [layout, setLayout] = useState('Combo');

  const currentCourse = COURSE_CATALOG[currentCourseKey];
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // --- MUI Theme ---
  const muiTheme = createTheme({
    palette: {
      mode: theme === 'system' ? 'light' : theme,
    },
  });

  // --- Theme Logic (Applies the class to HTML tag) ---
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (targetTheme) => {
      if (targetTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (theme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(systemPrefersDark ? 'dark' : 'light');
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  const handleCustomizeClick = () => {
    setIsCustomizeOpen(true);
  };

  const handleCustomizeClose = () => {
    setIsCustomizeOpen(false);
  };

  // Determine if the Sidebar should be rendered based on the layout state
  const shouldRenderSidebar = layout === 'Combo' || layout === 'Sidenav';
  const shouldRenderAppHeader = layout === 'Combo' || layout === 'Topnav';

  return (
    <div className='relative'>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <div className={`flex relative h-screen font-sans ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>

            {/* ⭐️ CONDITIONAL SIDEBAR RENDERING */}
            {shouldRenderSidebar && (
              <Sidebar
                currentCourseKey={currentCourseKey}
                setCurrentCourseKey={setCurrentCourseKey}
                isCollapsed={isSidebarCollapsed}
                toggleCollapsed={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                courseCatalog={COURSE_CATALOG}
                // 👇 NEW PROPS
                navLinks={NAV_LINKS}
                layout={layout}
              />
            )}

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">

              {/* ⭐️ CONDITIONAL APP HEADER RENDERING */}
              {shouldRenderAppHeader && (
                <AppHeader
                  currentCourse={currentCourse}
                  theme={theme}
                  toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  // 👇 NEW PROPS
                  navLinks={NAV_LINKS}
                  layout={layout}
                />
              )}

              <main className="flex-1 overflow-auto p-4 md:p-6">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <div className="bg-white rounded-xl shadow-2xl h-full overflow-hidden dark:bg-gray-800">
                        <ScormPlayer
                          coursePath={currentCourse.path}
                          courseId={currentCourse.id}
                          title={currentCourse.title}
                        />
                      </div>
                    }
                  />
                  <Route path="/dashboard" element={<Dashboard theme={theme} />} />
                </Routes>
              </main>

              <AppFooter currentCourse={currentCourse} />

              {/* ⭐️ CUSTOMIZE DRAWER WITH ALL PROPS */}
              <CustomizeDrawer
                open={isCustomizeOpen}
                onClose={handleCustomizeClose}
                theme={theme}
                setTheme={setTheme}
                layout={layout}
                setLayout={setLayout}
              />

            </div>

            <div className='absolute top-40 -right-14'>
              <CustomizeTab onClick={handleCustomizeClick} />
            </div>

          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;