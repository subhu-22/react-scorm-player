import React from "react";
import ScormPlayer from "./Components/ScormPlayer.jsx";

function App() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          padding: 12,
          borderBottom: "1px solid #eee",
          background: "#fafafa",
        }}
      >
        <h1 style={{ margin: 0 }}>React SCORM Player</h1>
      </header>

      <main style={{ flex: 1 }}>
        <ScormPlayer coursePath="/scormzip/res/index.html" courseId="scorm" />
      </main>

      <footer 
        style={{
          padding: 8,
          borderTop: "1px solid #eee",
          textAlign: "center",
        }}
      >
        Simple SCORM 2004 dev player
      </footer>
    </div>
  );
}

export default App;
