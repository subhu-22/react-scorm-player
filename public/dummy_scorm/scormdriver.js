// SCORM 2004 API Driver for Dummy Course
// This script initializes the SCORM API and provides interaction buttons

let API = null;

// Function to find the SCORM API in parent windows
function findAPI(win) {
  let depth = 0;
  let maxDepth = 10; // Prevent infinite loop
  while (win && depth < maxDepth) {
    if (win.API_1484_11) {
      return win.API_1484_11;
    }
    win = win.parent;
    depth++;
  }
  return null;
}

// Initialize API when page loads
window.addEventListener('load', function () {
  API = findAPI(window);
  if (API) {
    console.log('SCORM API found');
    document.getElementById('output').innerHTML += '<p>SCORM API initialized successfully.</p>';
  } else {
    console.error('SCORM API not found');
    document.getElementById('output').innerHTML += '<p>Error: SCORM API not found.</p>';
  }

  // Set up button event listeners
  document.getElementById('initBtn').addEventListener('click', function () {
    if (API) {
      const result = API.Initialize('');
      document.getElementById('output').innerHTML += `<p>Initialize: ${result}</p>`;
    }
  });

  document.getElementById('setBtn').addEventListener('click', function () {
    if (API) {
      const result = API.SetValue('cmi.completion_status', 'completed');
      document.getElementById('output').innerHTML += `<p>Set Completion Status: ${result}</p>`;
    }
  });

  document.getElementById('getBtn').addEventListener('click', function () {
    if (API) {
      const value = API.GetValue('cmi.completion_status');
      document.getElementById('output').innerHTML += `<p>Get Completion Status: ${value}</p>`;
    }
  });

  document.getElementById('commitBtn').addEventListener('click', function () {
    if (API) {
      const result = API.Commit('');
      document.getElementById('output').innerHTML += `<p>Commit: ${result}</p>`;
    }
  });

  document.getElementById('terminateBtn').addEventListener('click', function () {
    if (API) {
      const result = API.Terminate('');
      document.getElementById('output').innerHTML += `<p>Terminate: ${result}</p>`;
    }
  });
});
