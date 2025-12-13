'use client'

import { TableauViz } from '@tableau/embedding-api';
import { useState, useEffect, useRef } from 'react';
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

// --- COMPONENTS ---

const CrescentLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 10 C30 10 15 25 15 45 C15 65 30 80 50 80 C40 80 30 70 30 50 C30 30 40 20 50 20 C50 20 50 10 50 10 Z" />
  </svg>
);

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</h3>
      <div className="p-3 bg-blue-50 rounded-xl text-[#1e3a5f]">{icon}</div>
    </div>
    <div className="space-y-2">
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-green-600 flex items-center gap-1 font-medium">
        <TrendingUp className="w-4 h-4" />
        {change}
      </p>
    </div>
  </div>
);

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavLink = ({ icon, label, active = false, onClick }: NavLinkProps) => (
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

// --- TABLEAU COMPONENT (Internal) ---

interface TableauEmbedProps {
  src: string;
  width?: string;
  height?: string;
}

function TableauEmbed({ src, width = "100%", height = "600px" }: TableauEmbedProps) {
  const vizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let viz: TableauViz | null = null;

    const loadViz = async () => {
      if (vizRef.current) {
        viz = new TableauViz();
        viz.src = src;
        viz.width = width;
        viz.height = height;
        viz.hideTabs = true;
        vizRef.current.appendChild(viz);
      }
    };

    loadViz();

    return () => {
      if (vizRef.current && viz) {
        vizRef.current.removeChild(viz);
      }
    };
  }, [src, width, height]);

  return <div ref={vizRef} className="rounded-xl overflow-hidden shadow-sm border border-gray-200" />;
}

// --- MAIN APP COMPONENT ---

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  // State for metrics
  const [totalBilling, setTotalBilling] = useState('$0.00');
  const [claimsCount, setClaimsCount] = useState('0');

  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Billing' },
    { icon: <FileText className="w-5 h-5" />, label: 'Claims' },
    { icon: <Activity className="w-5 h-5" />, label: 'Operations' },
  ];

  useEffect(() => {
    fetch('http://localhost:8080/api/billing/transactions')
      .then(response => response.json())
      .then(data => {
        const total = data.reduce((sum: number, t: any) => sum + t.amount, 0);
        setTotalBilling(new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(total));
      })
      .catch(err => console.error("Error fetching transactions:", err));

    fetch('http://localhost:8080/api/billing/claims')
      .then(response => response.json())
      .then(data => {
        setClaimsCount(data.length.toLocaleString());
      })
      .catch(err => console.error("Error fetching claims:", err));
  }, []);

  const metrics = [
    {
      title: 'Total Billing',
      value: totalBilling,
      change: '+12% from last month',
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: 'Claims Processed',
      value: claimsCount,
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
                active={activePage === item.label}
                onClick={() => handleNavClick(item.label)}
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
          {activePage === 'Dashboard' && (
            <>
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-[#1e3a5f] mb-2">Dashboard</h3>
                <p className="text-gray-600 text-lg">Overview of your key metrics and performance indicators</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold text-[#1e3a5f] mb-1">Financial Performance</h4>
                    <p className="text-gray-600">Claims analytics and billing insights</p>
                  </div>

                  <TableauEmbed
                    src="https://public.tableau.com/views/Claims_17655924387060/Dashboard1"
                    height="600px"
                  />
                </div>
              </div>

              <div className="mt-8 bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-[#1e3a5f] mb-1">Recent Activity</h4>
                  <p className="text-gray-600">Latest updates and notifications</p>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'New claim submitted', time: '2 hours ago' },
                    { title: 'Payment processed successfully', time: '4 hours ago' },
                    { title: 'Patient record updated', time: '6 hours ago' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center shadow-sm">
                        <Activity className="w-6 h-6 text-[#1e3a5f]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activePage === 'Billing' && (
            <>
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-[#1e3a5f] mb-2">Billing</h3>
                <p className="text-gray-600 text-lg">Transaction analytics and billing insights</p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold text-[#1e3a5f] mb-1">Billing Transactions</h4>
                    <p className="text-gray-600">Number of transactions by type</p>
                  </div>

                  <TableauEmbed
                    src="https://public.tableau.com/app/profile/mariam.mandwee/viz/BillingTransactions/NumberofTransactionsbyType"
                    height="600px"
                  />
                </div>
              </div>
            </>
          )}

          {activePage === 'Claims' && (
            <>
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-[#1e3a5f] mb-2">Claims</h3>
                <p className="text-gray-600 text-lg">Claims processing and analytics</p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold text-[#1e3a5f] mb-1">Claims Analysis</h4>
                    <p className="text-gray-600">Detailed claims breakdown and metrics</p>
                  </div>

                  <TableauEmbed
                    src="https://public.tableau.com/views/Claims_17655924387060/Dashboard1"
                    height="600px"
                  />
                </div>
              </div>
            </>
          )}

          {activePage === 'Operations' && (
            <>
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-[#1e3a5f] mb-2">Operations</h3>
                <p className="text-gray-600 text-lg">Operational insights and insurance payer analytics</p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold text-[#1e3a5f] mb-1">Insurance Payers</h4>
                    <p className="text-gray-600">Active vs inactive insurance payers</p>
                  </div>

                  <TableauEmbed
                    src="https://public.tableau.com/app/profile/mariam.mandwee/viz/IntegrateDataVisualizations/ActivevsInactiveInsurancePayers"
                    height="600px"
                  />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
