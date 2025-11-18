import React from "react";
import { User, Settings } from 'lucide-react';

// --- 2. NavItem Helper Component ---
const NavItem = ({ icon: Icon, label, isCollapsed, isActive = false, onClick }) => (
    <div
        onClick={onClick} // ✅ Make sure clicks trigger navigation
        className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-150 
            ${isActive 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400'
            }
            ${isCollapsed ? 'justify-center' : ''}`}
        title={isCollapsed ? label : ''}
    >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!isCollapsed && <span className="ml-3 text-sm font-medium">{label}</span>}
    </div>
);

export default NavItem;
