'use client'

import Layout from '@/components/Layout';
import TableauEmbed from '@/components/TableauEmbed';

export default function Claims() {
  return (
    <Layout>
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
    </Layout>
  );
}
