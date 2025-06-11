import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const StatementsBalanceCard = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      {/* Banking Alert */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
        <div className="text-red-500 mt-0.5">⚠️</div>
        <div className="text-red-700">
          Please complete filling out your{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Banking information
          </a>
        </div>
      </div>

      {/* Top Creator Badge */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center space-x-2">
        <span className="text-yellow-500">⭐</span>
        <span className="text-blue-700 font-medium">
          YOU ARE IN THE TOP 93% OF ALL CREATORS!
        </span>
      </div>

      {/* Balance Section */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 font-medium">CURRENT BALANCE</span>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">$0.00</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-1">
            <span className="text-gray-600">PENDING BALANCE</span>
            <HelpCircle size={14} className="text-gray-400" />
          </div>
          <span className="text-xl font-bold text-gray-400">$4.80</span>
        </div>
      </div>

      {/* Manual Payouts */}
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700">Manual payouts</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
        <div className="text-sm text-gray-500 mb-4">Minimum withdrawal amount is $20</div>
        <button className="w-full bg-gray-300 text-gray-500 font-semibold py-2 px-4 rounded-full cursor-not-allowed">
          REQUEST WITHDRAWAL
        </button>
      </div>
    </div>
  );
};

export default StatementsBalanceCard;