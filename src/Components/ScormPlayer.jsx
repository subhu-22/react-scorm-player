// src/Components/ScormPlayer.jsx
import React, { useEffect, useRef, useState } from "react";

const STORAGE_KEY_PREFIX = "scorm2004_";

// Full SCORM 2004 default data (with iSpring fields)
const defaultScormData = {
  // Core SCORM runtime
  "cmi.completion_status": "incomplete",
  "cmi.success_status": "unknown",
  "cmi.score.scaled": "",
  "cmi.score.raw": "",
  "cmi.score.min": "0",
  "cmi.score.max": "100",

  // Location / timing
  "cmi.location": "",
  "cmi.suspend_data": "",
  "cmi.launch_data": "",
  "cmi.session_time": "PT0S",
  "total_time": "0",
  "cmi.exit": "",

  // Extra SCORM metadata
  "cmi.completion_threshold": "",
  "cmi.credit": "credit",
  "cmi.entry": "",
  "cmi.max_time_allowed": "",
  "cmi.mode": "normal",
  "cmi.scaled_passing_score": "",
  "cmi.time_limit_action": "",

  // Structured objects
  "comments_from_learner": { childArray: [] },
  "comments_from_lms": { childArray: [] },
  "interactions": { childArray: [] },
  "objectives": { childArray: [] },
  "learner_preference": { audio_level: "1", language: "", delivery_speed: "1", audio_captioning: "0" },

  // Custom / LMS fields
  "learner_id": "",
  "learner_name": "",
  "learner_email": "",
  "pdf_content_id": null,
  "project_id": null,

  // Convenience
  "cmi.progress_measure": "",
};

function makeStorageKey(courseId) {
  return STORAGE_KEY_PREFIX + (courseId || "default");
}

function ScormPlayer({
  coursePath = "/scormzip/res/index.html",
  courseId = "scorm-2004-sample-course",
  autosaveOnCommit = true,
  commitEndpoint = "/api/scorm/save",
  iframeTitle = "SCORM",
}) {
  const iframeRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const lastErrorRef = useRef("0");
  const dataRef = useRef({ ...defaultScormData });
  const startTimeRef = useRef(null);

  /* ---------- Persist/load ---------- */
  function loadPersisted() {
    try {
      const raw = localStorage.getItem(makeStorageKey(courseId));
      if (raw) dataRef.current = { ...dataRef.current, ...JSON.parse(raw) };
    } catch (e) {
      console.warn("SCORM: failed to load persisted state", e);
    }
  }

  function persist() {
    try {
      localStorage.setItem(makeStorageKey(courseId), JSON.stringify(dataRef.current));
    } catch (e) {
      console.warn("SCORM: failed to persist", e);
    }
  }

  function addSessionTimeTo(durationIso) {
    const match = (durationIso || "").match(/^PT(\d+)S$/);
    const already = match ? parseInt(match[1], 10) : 0;
    const elapsedSec = Math.max(
      0,
      Math.floor((Date.now() - (startTimeRef.current || Date.now())) / 1000)
    );

    // Update total_time
    const prevTotal = parseInt(dataRef.current.total_time || "0", 10) || 0;
    dataRef.current.total_time = String(prevTotal + elapsedSec);

    return `PT${already + elapsedSec}S`;
  }

  /* ---------- SCORM API ---------- */
  function createScormApi() {
    return {
      Initialize: function () {
        loadPersisted();
        startTimeRef.current = Date.now();
        !initialized && setInitialized(true);
        lastErrorRef.current = "0";
        return "true";
      },
      Terminate: function () {
        if (!initialized) {
          lastErrorRef.current = "301";
          return "false";
        }
        dataRef.current["cmi.session_time"] = addSessionTimeTo(dataRef.current["cmi.session_time"]);
        persist();
        setInitialized(false);
        lastErrorRef.current = "0";
        return "true";
      },
      GetValue: function (element) {
        if (!element) {
          lastErrorRef.current = "201";
          return "";
        }
        lastErrorRef.current = "0";
        const val = dataRef.current[element];
        if (element === "cmi.suspend_data" && typeof val === "object") return JSON.stringify(val);
        return val || "";
      },
      SetValue: function (element, value) {
        if (!element) {
          lastErrorRef.current = "201";
          return "false";
        }
        if (element === "cmi.suspend_data" && typeof value === "object") {
          try {
            dataRef.current[element] = JSON.stringify(value);
          } catch (e) {
            lastErrorRef.current = "101";
            return "false";
          }
        } else {
          dataRef.current[element] = value;
        }
        lastErrorRef.current = "0";
        return "true";
      },
      Commit: async function () {
        dataRef.current["cmi.session_time"] = addSessionTimeTo(dataRef.current["cmi.session_time"]);
        persist();
        lastErrorRef.current = "0";

        if (autosaveOnCommit && commitEndpoint) {
          try {
            await fetch(commitEndpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                courseId,
                data: dataRef.current,
                timestamp: new Date().toISOString(),
              }),
            });
          } catch (e) {
            console.warn("SCORM commit POST failed:", e);
          }
        }
        return "true";
      },
      GetLastError: () => lastErrorRef.current || "0",
      GetErrorString: (code) =>
        ({
          "0": "No error",
          "101": "General exception",
          "201": "Invalid argument error",
          "301": "Not initialized",
        }[String(code)] || "Unknown error"),
      GetDiagnostic: function (code) {
        return this.GetErrorString(code);
      },
    };
  }

  /* ---------- Hook / expose API ---------- */
  useEffect(() => {
    const api = createScormApi();
    window.API_1484_11 = api;

    return () => {
      if (window.API_1484_11 === api) delete window.API_1484_11;
    };
  }, [courseId]);

  /* ---------- UI ---------- */
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 8, borderBottom: "1px solid #eee", display: "flex", gap: 12, alignItems: "center" }}>
        <strong>SCORM Player</strong>
        <span>Course: {courseId}</span>
        <span>Initialized: {String(initialized)}</span>

        <button
          onClick={() => {
            window.API_1484_11?.Commit();
            alert("Committed (localStorage). If server endpoint configured, a POST was attempted.");
          }}
        >
          Commit (save)
        </button>

        <button
          onClick={() => {
            localStorage.removeItem(makeStorageKey(courseId));
            dataRef.current = { ...defaultScormData };
            alert("SCORM local state reset for course: " + courseId);
          }}
        >
          Reset State
        </button>
      </div>

      <div style={{ flex: 1 }}>
        <iframe
          ref={iframeRef}
          title={iframeTitle}
          src={coursePath}
          style={{ width: "100%", height: "100%", border: 0 }}
        />
      </div>
    </div>
  );
}

export default ScormPlayer;
