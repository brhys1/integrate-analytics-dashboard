'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  DollarSign,
  FileText,
  Activity,
  Menu,
  X,
  User,
  TrendingUp,
  Users,
  Bell
} from 'lucide-react';

// Crescent Moon Logo Component
const CrescentLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      <path d="M50 10 C30 10 15 25 15 45 C15 65 30 80 50 80 C40 80 30 70 30 50 C30 30 40 20 50 20 C50 20 50 10 50 10 Z" />
    </svg>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="p-2 bg-blue-50 rounded-lg text-[#1e3a5f]">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-green-600 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {change}
        </p>
      </div>
    </div>
  );
};

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavLink = ({ icon, label, active = false, onClick }: NavLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        active
          ? 'bg-white text-[#1e3a5f] font-medium'
          : 'text-gray-300 hover:bg-[#2d4a6f] hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Billing' },
    { icon: <FileText className="w-5 h-5" />, label: 'Claims' },
    { icon: <Activity className="w-5 h-5" />, label: 'Operations' },
  ];

  const metrics = [
    {
      title: 'Total Billing',
      value: '$1,247,890',
      change: '+12% from last month',
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: 'Claims Processed',
      value: '3,456',
      change: '+8% from last month',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: 'Active Patients',
      value: '12,789',
      change: '+5% from last month',
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const handleNavClick = (label: string) => {
    setActivePage(label);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#1e3a5f] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between p-6 border-b border-[#2d4a6f]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <CrescentLogo className="w-7 h-7 text-[#1e3a5f]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Integrate</h1>
                <p className="text-xs text-gray-300">Healthcare</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1 hover:bg-[#2d4a6f] rounded"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                icon={item.icon}
                label={item.label}
                active={activePage === item.label}
                onClick={() => handleNavClick(item.label)}
              />
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-[#2d4a6f]">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#2d4a6f] cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1e3a5f] font-medium">
                JD
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-300">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4 md:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6 text-[#1e3a5f]" />
              </button>
              <div className="flex items-center gap-3">
                <CrescentLogo className="w-8 h-8 text-[#1e3a5f] md:hidden" />
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f]">
                    Integrate Analytics Dashboard
                  </h2>
                  <p className="text-sm text-gray-500 hidden sm:block">
                    bridging the gap between price and power.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 md:p-8">
          {/* Page Title */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">
              {activePage}
            </h3>
            <p className="text-gray-600">
              Overview of your key metrics and performance indicators
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                icon={metric.icon}
              />
            ))}
          </div>

          {/* Additional Content Area */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h4 className="text-lg font-semibold text-[#1e3a5f] mb-4">
              Recent Activity
            </h4>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-[#1e3a5f]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Activity Item {item}
                    </p>
                    <p className="text-xs text-gray-500">
                      2 hours ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
