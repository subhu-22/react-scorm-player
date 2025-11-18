// AppFooter.jsx
import React from 'react';

const AppFooter = ({ currentCourse }) => {
  return (
    <footer className="flex justify-center items-center h-10 px-6 bg-gray-800 text-white text-xs border-t border-gray-700 dark:bg-gray-950 dark:border-gray-800">
      <p>
        Current Module: <span className="font-semibold text-blue-300">{currentCourse.title}</span> | SCORM API Status: <span className="text-green-400">Connected</span>
      </p>
    </footer>
  );
};

export default AppFooter;
