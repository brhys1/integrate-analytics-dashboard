'use client'

import { useState, useEffect } from 'react';
import { DollarSign, FileText, TrendingUp, Users, Activity } from 'lucide-react';
import Layout from '@/components/Layout';
import TableauEmbed from '@/components/TableauEmbed';

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

export default function Home() {
  const [totalBilling, setTotalBilling] = useState('$0.00');
  const [claimsCount, setClaimsCount] = useState('0');

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

  return (
    <Layout>
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
    </Layout>
  );
}
