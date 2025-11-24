// Components/CustomizeDrawer.jsx

import React from 'react';

import { Drawer, Typography, IconButton } from '@mui/material';



// Icons

import CloseIcon from '@mui/icons-material/Close';

import LightModeIcon from '@mui/icons-material/LightMode';

import DarkModeIcon from '@mui/icons-material/DarkMode';

import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';

import RestartAltIcon from '@mui/icons-material/RestartAlt';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';



// ⭐️ UPDATED PROPS: Added navColor and setNavColor

const CustomizeDrawer = ({

  open,

  onClose,

  theme,

  setTheme,

  layout,

  setLayout,

  sidenavShape,

  setSidenavShape,

  navColor,      // ⭐️ NEW PROP

  setNavColor    // ⭐️ NEW PROP

}) => {



  // Layout options for mapping

  const layoutOptions = [

    { key: 'Sidenav', label: 'Sidenav' },

    { key: 'Topnav', label: 'Topnav' },

    { key: 'Combo', label: 'Combo' },

  ];



  // Sidenav Shape options for mapping (REARRANGED: Default, Stacked, Slim)

  const sidenavShapeOptions = [

    { key: 'Default', label: 'Default', description: 'Standard width, full text.' },

    { key: 'Stacked', label: 'Stacked', description: 'Icons stacked on the left.' },

    { key: 'Slim', label: 'Slim', description: 'Collapsed view, icons only.' },

  ];



  // ⭐️ NEW: Nav Color options for mapping (based on image_85b915.png)

  const navColorOptions = [

    { key: 'Default', label: 'Default', colorClass: 'bg-white dark:bg-slate-900', ringColor: 'ring-gray-300 dark:ring-gray-600' },

    { key: 'Vibrant', label: 'Vibrant', colorClass: 'bg-gradient-to-br from-teal-400 to-blue-500', ringColor: 'ring-teal-400' },

  ];

   

  // Utility Component for Layout Schematics (Using pure Sidenav logic)

  const LayoutSchematic = ({ layoutType }) => {

    // Tailwind CSS to create the visual schematic based on layoutType

    return (

      <div className="w-full h-full flex flex-col items-center justify-center p-1 relative">

        {/* Top Bar (Header) - Only render Top Bar for Topnav and Combo */}

        {layoutType !== 'Sidenav' && (

            <div className={`w-full h-2 bg-slate-400 dark:bg-slate-500 rounded-t-sm`} />

        )}

        <div className="flex w-full flex-1">

          {/* Sidebar for Sidenav/Combo */}

          {layoutType !== 'Topnav' && (

            <div className="w-[30%] h-full bg-blue-600/70 dark:bg-blue-700/70 rounded-bl-lg"></div>

          )}

          {/* Content Area */}

          <div className="flex-1 h-full bg-slate-300 dark:bg-slate-600 rounded-br-lg"></div>

        </div>

      </div>

    );

  };

   

  // Utility Component for Sidenav Shape Schematics (Using slimmer Slim logic)

  const ShapeSchematic = ({ shapeType }) => {

    // ⭐️ Using w-1/4 for Slim

    const sidebarWidth = shapeType === 'Slim' ? 'w-1/4' : 'w-1/3';

   

    return (

      <div className="w-full h-full flex p-1 relative">

        {/* Sidebar */}

        <div className={`${sidebarWidth} h-full bg-blue-600/70 dark:bg-blue-700/70 rounded-l-lg p-1`}>

          {/* Inner element to distinguish shapes */}

          {shapeType === 'Stacked' ? (

            // Stacked: Very thin primary bar

            <div className="w-1/4 h-full bg-blue-800 rounded-lg"></div>

          ) : (

            // Default/Slim: Single block

            <div className="w-full h-full bg-blue-800 rounded-lg"></div>

          )}

        </div>

        {/* Content Area */}

        <div className="flex-1 h-full bg-slate-300 dark:bg-slate-600 rounded-r-lg"></div>

      </div>

    );

  };





  return (

    <Drawer

      anchor="right"

      open={open}

      onClose={onClose}

      PaperProps={{

        sx: { width: 360 },

      }}

    >

      <div className="h-full flex flex-col bg-white dark:bg-[#0F172A] text-gray-800 dark:text-white">

       

        {/* HEADER */}

        <div className="flex justify-between items-center px-6 py-5 bg-slate-100 dark:bg-[#113644] border-b dark:border-slate-700">

          <Typography variant="h6" fontWeight="bold" className="dark:text-white">

            Customize

          </Typography>



          <div className="flex items-center gap-2">

            {/* Reset Button (Now resets Nav Color too) */}

            <button

              onClick={() => {

                setTheme('light');

                setLayout('Combo');

                setSidenavShape('Default');

                setNavColor('Default'); // ⭐️ RESET Nav Color

              }}

              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-teal-200 bg-emerald-100 dark:bg-teal-900/50 rounded-lg hover:bg-emerald-200 dark:hover:bg-teal-900 transition-colors"

            >

              <RestartAltIcon fontSize="small" />

              Reset

            </button>



            <IconButton onClick={onClose} size="small" className="dark:bg-slate-800/50 dark:hover:bg-slate-700">

              <CloseIcon className="text-gray-600 dark:text-slate-300" fontSize="small" />

            </IconButton>

          </div>

        </div>



        {/* BODY */}

        <div className="p-6 flex-1 overflow-y-auto">

         

          {/* --- 1. Theme Mode Section (Existing) --- */}

          <div className="mb-8">

            <Typography variant="subtitle1" fontWeight="600" className="mb-4 dark:text-gray-100">

              Theme Mode

            </Typography>

            {/* SEGMENTED CONTROL (Existing code) */}

            <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100 dark:bg-[#1E293B] rounded-xl border dark:border-slate-700">

              <button onClick={() => setTheme('light')} className={`flex items-center justify-center space-x-1 py-2 rounded-lg transition-colors text-sm font-medium ${theme === 'light' ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'}`}>

                <LightModeIcon fontSize="small" /><span>Light</span>

              </button>

              <button onClick={() => setTheme('dark')} className={`flex items-center justify-center space-x-1 py-2 rounded-lg transition-colors text-sm font-medium ${theme === 'dark' ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'}`}>

                <DarkModeIcon fontSize="small" /><span>Dark</span>

              </button>

              <button onClick={() => setTheme('system')} className={`flex items-center justify-center space-x-1 py-2 rounded-lg transition-colors text-sm font-medium ${theme === 'system' ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'}`}>

                <SettingsSystemDaydreamIcon fontSize="small" /><span>System</span>

              </button>

            </div>

          </div>



      
         

          {/* --- 3. Layout Selection Section (Navigation Menu) (Moved down) --- */}

          <div className="mb-8">

            <Typography variant="subtitle1" fontWeight="600" className="mb-4 dark:text-gray-100">

              Navigation Menu

            </Typography>



            <div className="grid grid-cols-3 gap-4">

              {layoutOptions.map((option) => (

                <div

                  key={option.key}

                  className={`flex flex-col items-center cursor-pointer`}

                  onClick={() => setLayout(option.key)}

                >

                  <div

                    className={`

                      w-full h-24 p-2 rounded-xl border-2 transition-all relative

                      ${layout === option.key

                        ? 'border-blue-600 dark:border-blue-500'

                        : 'border-gray-200 dark:border-slate-700 hover:border-blue-400'}

                      bg-gray-100 dark:bg-slate-800

                    `}

                  >

                    {layout === option.key && (

                      <CheckCircleOutlineIcon

                        className="absolute top-1 right-1 text-blue-600 dark:text-blue-400 z-10"

                        fontSize="small"

                      />

                    )}

                    {/* Schematic Layout Placeholder */}

                      <LayoutSchematic layoutType={option.key} />

                  </div>

                  <Typography

                    variant="caption"

                    fontWeight="medium"

                    className={`mt-2 ${layout === option.key ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}

                  >

                    {option.label}

                  </Typography>

                </div>

              ))}

            </div>

          </div>



            {/* --- 4. Sidenav Shape Section (Existing) --- */}

            {(layout === 'Sidenav' || layout === 'Combo') && (

            <div className="mb-8">

              <Typography variant="subtitle1" fontWeight="600" className="mb-4 dark:text-gray-100">

                Sidenav Shape

              </Typography>



              <div className="grid grid-cols-3 gap-4">

                {sidenavShapeOptions.map((option) => (

                  <div

                    key={option.key}

                    className={`flex flex-col items-center cursor-pointer`}

                    onClick={() => setSidenavShape(option.key)}

                  >

                    <div

                      className={`

                        w-full h-24 p-2 rounded-xl border-2 transition-all relative

                        ${sidenavShape === option.key

                          ? 'border-blue-600 dark:border-blue-500'

                          : 'border-gray-200 dark:border-slate-00 hover:border-blue-400'}

                        bg-gray-100 dark:bg-slate-800

                      `}

                    >

                      {sidenavShape === option.key && (

                        <CheckCircleOutlineIcon

                          className="absolute top-1 right-1 text-blue-600 dark:text-blue-400 z-10"

                          fontSize="small"

                        />

                      )}

                      {/* Schematic Sidenav Shape Placeholder */}

                        <ShapeSchematic shapeType={option.key} />

                    </div>

                    <Typography

                      variant="caption"

                      fontWeight="medium"

                      className={`mt-2 ${sidenavShape === option.key ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}

                    >

                      {option.label}

                    </Typography>

                  </div>

                ))}

              </div>

            </div>

          )}


              {/* --- 2. Nav Color Section (NEW) --- */}

          <div className="mb-8">

            <Typography variant="subtitle1" fontWeight="600" className="mb-4 dark:text-gray-100">

              Nav Color

            </Typography>



            <div className="grid grid-cols-3 gap-4">

              {navColorOptions.map((option) => (

                <div

                  key={option.key}

                  className={`flex flex-col items-center cursor-pointer`}

                  onClick={() => setNavColor(option.key)}

                >

                  <div

                    className={`

                      w-20 h-20 p-1 flex items-center justify-center rounded-xl border-2 transition-all relative

                      ${navColor === option.key

                        ? 'border-blue-600 dark:border-blue-500'

                        : 'border-gray-200 dark:border-slate-700 hover:border-blue-400'}

                      bg-gray-100 dark:bg-slate-800

                    `}

                  >

                    <div

                      className={`w-14 h-14 rounded-full ring-2 ${option.ringColor} ${option.colorClass}`}

                    >

                      {/* Inner circle color visualization */}

                    </div>



                    {navColor === option.key && (

                      <CheckCircleOutlineIcon

                        className="absolute top-1 right-1 text-blue-600 dark:text-blue-400 z-10"

                        fontSize="small"

                      />

                    )}

                  </div>

                  <Typography

                    variant="caption"

                    fontWeight="medium"

                    className={`mt-2 ${navColor === option.key ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}

                  >

                    {option.label}

                  </Typography>

                </div>

              ))}

            </div>

          </div>


        </div>

      </div>

    </Drawer>

  );

};



export default CustomizeDrawer;