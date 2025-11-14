import React, { useState } from "react";
import ScormPlayer from "./Components/ScormPlayer.jsx";

// --- 1. Define your Course Catalog ---
const COURSE_CATALOG = {
  moduleA: { 
    id: "module-a", 
    title: "Dummy SCORM Test Module", 
    path: "/dummy_scorm/index.html" 
  },
  moduleB: { 
    id: "module-b", 
    title: "Vite/SCORMZIP Example", 
    path: "/scormzip/res/index.html" 
  },
};
// ------------------------------------

function App() {
  // 2. Use state to manage the currently selected course key
  const [currentCourseKey, setCurrentCourseKey] = useState('moduleB'); 

  // Retrieve the current course details from the catalog
  const currentCourse = COURSE_CATALOG[currentCourseKey];

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      <header
        style={{
          padding: 12,
          borderBottom: "1px solid #eee",
          background: "#fafafa",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5em" }}>React SCORM Player</h1>
        
        {/* 3. Module Selector Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {Object.keys(COURSE_CATALOG).map(key => (
            <button
              key={key}
              onClick={() => setCurrentCourseKey(key)}
              style={{
                padding: '8px 12px',
                border: currentCourseKey === key ? '2px solid #007bff' : '1px solid #ccc',
                background: currentCourseKey === key ? '#e6f2ff' : '#fff',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: currentCourseKey === key ? 'bold' : 'normal',
              }}
            >
              {COURSE_CATALOG[key].title}
            </button>
          ))}
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* 4. Pass the dynamic path and ID to ScormPlayer */}
        <ScormPlayer 
          key={currentCourse.id} // IMPORTANT: Add a unique key to force the iframe to reload when the path changes
          coursePath={currentCourse.path} 
          courseId={currentCourse.id} 
        />
      </main>

      <footer
        style={{
          padding: 8,
          borderTop: "1px solid #eee",
          textAlign: "center",
          fontSize: "0.8em"
        }}
      >
        {currentCourse.title} - Simple SCORM 2004 dev player
      </footer>
    </div>
  );
}

export default App;