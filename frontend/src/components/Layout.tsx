'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  DollarSign,
  FileText,
  Activity,
  Menu,
  X,
  User,
  Bell
} from 'lucide-react';

const CrescentLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 10 C30 10 15 25 15 45 C15 65 30 80 50 80 C40 80 30 70 30 50 C30 30 40 20 50 20 C50 20 50 10 50 10 Z" />
  </svg>
);

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const NavLink = ({ icon, label, href, active = false, onClick }: NavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      active
        ? 'bg-white text-[#1e3a5f] font-medium'
        : 'text-gray-300 hover:bg-[#2d4a6f] hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/' },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Billing', href: '/billing' },
    { icon: <FileText className="w-5 h-5" />, label: 'Claims', href: '/claims' },
    { icon: <Activity className="w-5 h-5" />, label: 'Operations', href: '/operations' },
  ];

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

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={pathname === item.href}
                onClick={() => setIsSidebarOpen(false)}
              />
            ))}
          </nav>

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
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4 md:px-8">
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
                    Bridging the gap between price and power
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

        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
