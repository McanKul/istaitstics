import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { inRange, Range } from '../types';

export interface Transaction {
  id: number;
  dateISO?: string;
  date?: string;
  time?: string;
  description: string;
  user: string;
  amount: number;
  fee: number;
}

interface Props {
  dateRange: Range;
  data: Transaction[];
}

const TransactionTable: React.FC<Props> = ({ dateRange, data }) => {
  // Önce dateRange filtresi
  const rows = data.filter((t) =>
    inRange(
      t.dateISO
        ? new Date(t.dateISO)
        : new Date(`${t.date} ${t.time}`),
      dateRange
    )
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
            <th className="pb-3">Date</th>
            <th className="pb-3 text-right">Amount</th>
            <th className="pb-3 text-right">Fee</th>
            <th className="pb-3 text-right">Net</th>
            <th className="pb-3 w-8"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => {
            const iso = t.dateISO
              ? new Date(t.dateISO)
              : new Date(`${t.date} ${t.time}`);

            return (
              <tr key={t.id} className="border-b border-gray-100">
                <td className="py-4">
                  <div className="font-medium">
                    {iso.toLocaleString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t.description}{' '}
                    <span className="text-blue-600">{t.user}</span>
                  </div>
                </td>
                <td className="py-4 text-right">${t.amount.toFixed(2)}</td>
                <td className="py-4 text-right">${t.fee.toFixed(2)}</td>
                <td className="py-4 text-right">
                  ${(t.amount - t.fee).toFixed(2)}
                </td>
                <td className="py-4">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </button>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500">
                No transactions
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
