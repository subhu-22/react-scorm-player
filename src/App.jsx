// App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar.jsx';
import NavItem from './Components/NavItem.jsx';
import AppFooter from './Components/AppFooter.jsx';
import AppHeader from './Components/AppHeader.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// SCORM Simulator
const SCORM_API_SIMULATOR = {
  setValue: (element, value) => console.log(`SCORM API: Setting ${element} to "${value}"`),
  getValue: (element) => {
    const data = { 'cmi.core.lesson_status': 'incomplete', 'cmi.core.score.raw': '0', 'cmi.core.total_time': '0000:00:00' };
    return data[element] || '';
  },
  terminate: () => console.log('SCORM API: Terminated session.'),
  initialize: () => console.log('SCORM API: Initialized session.'),
};

// Course Catalog
const COURSE_CATALOG = {
  moduleA: { id: "module-a", title: "Intro to Product Management", path: "/dummy_scorm/index.html", description: "Foundational concepts and roles in modern product management." },
  moduleB: { id: "module-b", title: "Vite/SCORMZIP Example", path: "/scormzip/res/index.html", description: "Advanced example of SCORM packaging and asset loading." },
  moduleC: { id: "module-c", title: "Sales Strategy & Tools", path: "/dummy_scorm/index.html", description: "Tactics for improving pipeline conversion and closing deals." },
};

// SCORM Player Component
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
  const [theme, setTheme] = useState('light');
  const currentCourse = COURSE_CATALOG[currentCourseKey];

  // --- MUI Theme ---
  const muiTheme = createTheme({
    palette: {
      mode: theme, // 'light' or 'dark'
    },
  });

  // Toggle theme
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);

    if (next === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  // Apply Tailwind dark class on initial load or theme change
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline /> {/* Global MUI dark/light styles */}
      <Router>
        <div className={`flex h-screen font-sans ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
          {/* Sidebar */}
          <Sidebar
            currentCourseKey={currentCourseKey}
            setCurrentCourseKey={setCurrentCourseKey}
            isCollapsed={isSidebarCollapsed}
            toggleCollapsed={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            courseCatalog={COURSE_CATALOG}
          />

          {/* Main content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <AppHeader
              currentCourse={currentCourse}
              theme={theme}
              toggleTheme={toggleTheme}
            />

            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <Routes>
                {/* SCORM Player */}
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

                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard theme={theme} />} />
              </Routes>
            </main>

            <AppFooter currentCourse={currentCourse} />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
