// src/Components/NavItem.jsx
import React from "react";

// NavItem helper component
const NavItem = ({
  icon: Icon,
  label,
  compact = false,
  isActive = false,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`
   flex items-center p-2 rounded-lg cursor-pointer transition-all duration-150 select-none
   ${
     isActive
       ? "bg-blue-600 text-white"
       : "text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
   }
   ${compact ? "justify-center" : ""}
  `}
    title={compact ? label : ""}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") onClick && onClick();
    }}
  >
    <Icon className="w-5 h-5 flex-shrink-0" />
    {!compact && (
      <span className="ml-3 text-sm font-medium truncate">{label}</span>
    )}{" "}
  </div>
);

export default NavItem;
