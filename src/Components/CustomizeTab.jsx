import React from 'react';
import { Settings } from 'lucide-react';
import '../index.css'; // Ensure the CSS file is imported

const CustomizeTab = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" flex items-center gap-2 px-4 py-2 mt-22 bg-white text-slate-700 shadow rounded-l-lg "
      style={{ transform: 'translateY(-50%) rotate(90deg)' }}
    >
      {/* Nested div for spinning icon */}
      <div className="animate-spin-slow mt-3">
        <Settings size={16} className="text-blue-600 mt" />
      </div>
      <span className="font-semibold text-xs tracking-wide uppercase mt-1.5">
        Customize
      </span>
    </button>
  );
};

export default CustomizeTab;
