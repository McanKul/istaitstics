import React from 'react';
import { useCsvData } from '../../hooks/useCsvData';

const VisitorsTable = () => {
  const { data: visitorsData, loading } = useCsvData<{
    stat: string;
    guests: number;
    users: number;
    total: number;
  }>('/src/data/visitors_table.csv');

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
              <th className="pb-3 font-medium">Stat</th>
              <th className="pb-3 text-right font-medium">Guests</th>
              <th className="pb-3 text-right font-medium">Users</th>
              <th className="pb-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {visitorsData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-b-0">
                <td className="py-4 font-medium text-gray-900">{row.stat}</td>
                <td className="py-4 text-right text-gray-700">{row.guests}</td>
                <td className="py-4 text-right text-gray-700">{row.users}</td>
                <td className="py-4 text-right font-semibold text-gray-900">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorsTable;