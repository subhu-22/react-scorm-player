// src/Pages/Dashboard.jsx - MODIFIED with Tailwind Colors
import React from 'react';
import { Box, Grid, Card, CardContent, LinearProgress, Typography, useTheme, styled } from '@mui/material';
import { People, BarChart as BarIcon, AttachMoney, School, TrendingUp, TrendingDown } from '@mui/icons-material';
import { PieChart, BarChart } from '@mui/x-charts';

// --- Tailwind Color Mappings ---
// Using specific Tailwind shades for a clean, consistent look
const TAILWIND_COLORS = {
    BLUE: '#3b82f6',    // Tailwind Blue 500
    LIGHT_BLUE: '#22d3ee', // Tailwind Cyan 400
    INDIGO: '#6366f1',  // Tailwind Indigo 500
    GREEN: '#10b981',   // Tailwind Emerald 500 (Success)
    YELLOW: '#f59e0b',  // Tailwind Amber 500 (Warning/Progress)
    RED: '#ef4444',     // Tailwind Red 500 (Error)
    NEUTRAL_DIVIDER: '#d1d5db', // Tailwind Gray 300
    NEUTRAL_BG_DARK: '#1f2937', // Tailwind Gray 800 (for Dark Mode)
};

// --- Sample Data (Updated with Tailwind Colors) ---
const SCORM_PROGRESS = [
    { id: 'moduleA', title: 'Intro to Product Management', progress: 100 },
    { id: 'moduleB', title: 'Vite/SCORMZIP Example', progress: 60 },
    { id: 'moduleC', title: 'Sales Strategy & Tools', progress: 30 },
];

const pieData = [
    { label: 'Completed', value: 2, color: TAILWIND_COLORS.BLUE },
    { label: 'In Progress', value: 1, color: TAILWIND_COLORS.YELLOW },
    { label: 'Not Started', value: 0, color: TAILWIND_COLORS.RED },
];

const paymentData = [
    { type: 'Initiated Payments', value: 65200, label: '65.2k', color: TAILWIND_COLORS.BLUE },
    { type: 'Authorized Payments', value: 54800, label: '54.8k', color: TAILWIND_COLORS.INDIGO },
    { type: 'Successful Payments', value: 48600, label: '48.6k', color: TAILWIND_COLORS.LIGHT_BLUE },
    { type: 'Payouts to Merchants', value: 38300, label: '38.3k', color: TAILWIND_COLORS.GREEN },
    { type: 'Completed Transactions', value: 32900, label: '32.9k', color: TAILWIND_COLORS.GREEN },
];

const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 13000 },
    { month: 'Apr', revenue: 18000 },
];

// Summary cards configuration - Using color names to map to Tailwind hexes
const SUMMARY_CARDS = [
    { title: 'Users', value: 1245, change: 10, icon: <People fontSize="small" />, colorKey: 'BLUE' },
    { title: 'Traffic', value: 8932, change: -5, icon: <BarIcon fontSize="small" />, colorKey: 'RED' },
    { title: 'Revenue', value: '$12,540', change: 25, icon: <AttachMoney fontSize="small" />, colorKey: 'GREEN' },
];

// --- Custom Components and Styling ---

// Custom styled Card for a modern, elevated look
const ElevatedCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[4],
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
        boxShadow: theme.shadows[8],
    },
    // Use Tailwind-style dark background for dark mode
    backgroundColor: theme.palette.mode === 'dark' ? TAILWIND_COLORS.NEUTRAL_BG_DARK : theme.palette.background.paper,
}));

// A cleaner summary card component
const SummaryMetricCard = ({ title, value, change, icon, colorKey }) => {
    const theme = useTheme();
    const isPositive = change >= 0;
    const ChangeIcon = isPositive ? TrendingUp : TrendingDown;
    
    // Map the key to the corresponding Tailwind hex color
    const mainColor = TAILWIND_COLORS[colorKey];
    const lightColor = `${mainColor}20`; // Simple way to create a light background tint
    const changeColor = isPositive ? TAILWIND_COLORS.GREEN : TAILWIND_COLORS.RED;

    return (
        <ElevatedCard sx={{ minHeight: 120 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="caption" color="text.secondary" fontWeight="bold">
                        {title.toUpperCase()}
                    </Typography>
                    <Box
                        sx={{
                            p: 0.5,
                            borderRadius: '50%',
                            // Tailwind light background tint and main text color
                            bgcolor: lightColor, 
                            color: mainColor,
                        }}
                    >
                        {icon}
                    </Box>
                </Box>

                <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                    {value}
                </Typography>

                <Box display="flex" alignItems="center" mt={0.5}>
                    <ChangeIcon fontSize="inherit" sx={{ color: changeColor, mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: changeColor }}>
                        {`${isPositive ? '+' : ''}${change}%`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        vs last month
                    </Typography>
                </Box>
            </CardContent>
        </ElevatedCard>
    );
};

const Dashboard = () => {
    const theme = useTheme();
    
    // Function to render the Payment Funnel/Waterfall style
    const renderPaymentFunnel = () => (
        <ElevatedCard sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="text.primary" fontWeight="bold">
                Payments Overview (Funnel)
            </Typography>

            <Box display="flex" sx={{ height: 300, overflowX: 'auto', py: 2 }}>
                {paymentData.map((data, index) => (
                    <Box key={data.type} sx={{ 
                        minWidth: 100, 
                        mr: 3, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        position: 'relative', // Set relative for absolute positioning of connector
                    }}>
                        {/* Value and Label */}
                        <Typography variant="h6" fontWeight="bold">{data.label}</Typography>
                        <Typography variant="caption" color="text.secondary" align="center" sx={{ mb: 1 }}>{data.type}</Typography>
                        
                        {/* Bar (using Box height to simulate variable bar length) */}
                        <Box
                            sx={{
                                width: 40,
                                height: `${(data.value / paymentData[0].value) * 200}px`,
                                bgcolor: data.color, // Uses Tailwind-mapped color
                                borderRadius: 1,
                                opacity: 0.9,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    opacity: 1,
                                    transform: 'scale(1.05)'
                                }
                            }}
                        />

                        {/* Connector (simulating the link between bars) */}
                        {index < paymentData.length - 1 && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: `${75 + (data.value / paymentData[0].value) * 200}px`, // Adjusted top position
                                    left: '100%',
                                    width: 30,
                                    borderBottom: `2px dashed ${TAILWIND_COLORS.NEUTRAL_DIVIDER}`, // Tailwind Gray 300
                                    transform: 'translateY(-50%)'
                                }}
                            />
                        )}
                    </Box>
                ))}
            </Box>
        </ElevatedCard>
    );

    return (
        <Box sx={{ p: 4 }}>
        <Typography
  variant="h4"
  gutterBottom
  fontWeight="bold"
  sx={{
    color: theme.palette.mode === 'dark'
      ? TAILWIND_COLORS.BLUE
      : '#000000',
  }}
>
  Overview
        </Typography>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-4">
  {SUMMARY_CARDS.map((card, idx) => (
    <div key={idx}>
      <SummaryMetricCard {...card} />
    </div>
  ))}
        </div>



        {/* Charts (Row 2) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-4">
  {/* Payment Funnel / Waterfall - takes 8/12 columns */}
  <div className="md:col-span-6">
    {renderPaymentFunnel()}
  </div>

  {/* Monthly Revenue - takes 4/12 columns */}
  <div className="md:col-span-6">
    <ElevatedCard className="p-4 h-full flex flex-col">
      <Typography
        variant="h6"
        gutterBottom
        color="text.primary"
        fontWeight="bold"
      >
        Monthly Revenue
      </Typography>

      <div className="flex-1">
        <BarChart
          xAxis={[{ scaleType: 'band', data: revenueData.map(d => d.month) }]}
          series={[{
            data: revenueData.map(d => d.revenue),
            color: TAILWIND_COLORS.GREEN, // Tailwind Green
            label: 'Revenue'
          }]}
          height={250}
          margin={{ top: 10, right: 10, left: 50, bottom: 20 }}
        />
      </div>
    </ElevatedCard>
  </div>
          </div>


  {/* SCORM Status and Progress (Row 3) */}
    {/* SCORM Row */}
     <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-4">
  {/* Pie Chart Status - 4/12 columns */}
  <div className="md:col-span-5">
    <ElevatedCard className="p-4 h-full flex flex-col">
      <Typography variant="h6" gutterBottom color="text.primary" fontWeight="bold">
        SCORM Module Status
      </Typography>
      <div className="flex-1">
        <PieChart
          series={[{ 
            data: pieData.map(d => ({ ...d, color: d.color })),
            innerRadius: 30,
            outerRadius: 80,
            paddingAngle: 3,
            cornerRadius: 5,
          }]}
          width={400} 
          height={250}
          legend={{ direction: 'column', position: { vertical: 'middle', horizontal: 'right' } }}
        />
      </div>
    </ElevatedCard>
  </div>

  {/* Module Progress - 8/12 columns */}
  <div className="md:col-span-5">
    <ElevatedCard className="p-4 h-full flex flex-col">
      <Typography variant="h6" gutterBottom color="text.primary" fontWeight="bold">
        Module Completion
      </Typography>
      <div className="mt-2 flex-1 flex flex-col justify-start">
        {SCORM_PROGRESS.map((module) => (
          <div key={module.id} className="mb-4">
            <div className="flex items-center mb-1">
              <School fontSize="small" color="action" className="mr-2" />
              <Typography variant="body1" fontWeight="medium" className="flex-grow">
                {module.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${module.progress}%`}
              </Typography>
            </div>
            <LinearProgress
              variant="determinate"
              value={module.progress}
              sx={{ 
                height: 8, 
                borderRadius: 5,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: module.progress === 100 ? TAILWIND_COLORS.GREEN : TAILWIND_COLORS.BLUE,
                },
              }}
            />
          </div>
        ))}
      </div>
    </ElevatedCard>
  </div>
     </div>

  </Box>
    );
};

export default Dashboard;