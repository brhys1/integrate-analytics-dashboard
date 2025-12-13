'use client'

import Layout from '@/components/Layout';
import TableauEmbed from '@/components/TableauEmbed';

export default function Operations() {
  return (
    <Layout>
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
            src="https://public.tableau.com/views/IntegrateDataVisualizations/ActivevsInactiveInsurancePayers"
            height="600px"
          />
        </div>
      </div>
    </Layout>
  );
}
