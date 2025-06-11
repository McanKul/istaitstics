import React from 'react';
import { inRange, Range } from '../types';

interface Props {
  dateRange: Range;
}

const raw = [
  { id: 'subscriptions', name: 'Subscriptions', gross: 3, net: 2.4, date: '2025-06-05' },
  { id: 'messages', name: 'Messages', gross: 3, net: 2.4, date: '2025-06-05' },
];

const EarningsTable = ({ dateRange }: Props) => {
  const rows = raw.filter((r) => inRange(new Date(r.date), dateRange));

  const totals = rows.reduce(
    (s, r) => ({ gross: s.gross + r.gross, net: s.net + r.net }),
    { gross: 0, net: 0 }
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="pb-3">Earnings</th>
            <th className="pb-3 text-right">Gross</th>
            <th className="pb-3 text-right">Net</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-medium">Total</td>
            <td className="py-2 text-right">${totals.gross.toFixed(2)}</td>
            <td className="py-2 text-right">${totals.net.toFixed(2)}</td>
          </tr>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="py-2">{r.name}</td>
              <td className="py-2 text-right">${r.gross.toFixed(2)}</td>
              <td className="py-2 text-right">${r.net.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EarningsTable;
