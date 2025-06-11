import React from 'react';

const VisitorsTable = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Top countries</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
              <th className="pb-3">Stat</th>
              <th className="pb-3 text-right">Guests</th>
              <th className="pb-3 text-right">Users</th>
              <th className="pb-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3">Profile visitors</td>
              <td className="py-3 text-right">4</td>
              <td className="py-3 text-right">10</td>
              <td className="py-3 text-right">14</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3">View duration</td>
              <td className="py-3 text-right">0h:00m</td>
              <td className="py-3 text-right">0h:00m</td>
              <td className="py-3 text-right">0h:00m</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorsTable;