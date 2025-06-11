import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, Info } from 'lucide-react';
import StatementsBalanceCard from './StatementsBalanceCard';
import StatementsNavigation from './StatementsNavigation';

interface StatementsPageProps {
  onNavigateToStatistics: () => void;
}

const StatementsPage = ({ onNavigateToStatistics }: StatementsPageProps) => {
  const [activeSection, setActiveSection] = useState('earnings');

  const renderContent = () => {
    switch (activeSection) {
      case 'earnings':
        return (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">EARNINGS</h2>
                <div className="text-sm text-gray-500">Date/Time shown in local time (UTC +03:00)</div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                      <th className="pb-3">DATE & TIME</th>
                      <th className="pb-3 text-right">AMOUNT</th>
                      <th className="pb-3 text-right">FEE</th>
                      <th className="pb-3 text-right">NET</th>
                      <th className="pb-3">DESCRIPTION</th>
                      <th className="pb-3 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 text-sm">Jun 5, 2025 12:18 am</td>
                      <td className="py-4 text-right">$3.00</td>
                      <td className="py-4 text-right">$0.60</td>
                      <td className="py-4 text-right">$2.40</td>
                      <td className="py-4">
                        Payment for message from <span className="text-blue-600">Adam</span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">⋯</button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 text-sm">Jun 5, 2025 12:15 am</td>
                      <td className="py-4 text-right">$3.00</td>
                      <td className="py-4 text-right">$0.60</td>
                      <td className="py-4 text-right">$2.40</td>
                      <td className="py-4">
                        Subscription from <span className="text-blue-600">Adam</span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-gray-400 hover:text-gray-600">⋯</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'payout-requests':
        return (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">PAYOUT REQUESTS</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                <Info size={20} className="text-blue-500 flex-shrink-0" />
                <div className="text-blue-700">
                  Transactions can take up to 3-5 business days
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                      <th className="pb-3">DATE & TIME</th>
                      <th className="pb-3">INVOICE</th>
                      <th className="pb-3 text-right">AMOUNT</th>
                      <th className="pb-3 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-8 text-center text-gray-500" colSpan={4}>
                        No requests
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'earning-statistics':
        return (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">EARNING STATISTICS</h2>
                <div className="text-sm text-gray-500">Date/Time shown in UTC time zone</div>
              </div>

              {/* All time section */}
              <div className="mb-6">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">All time</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">$4.80</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Chart area */}
              <div className="mb-6">
                <div className="h-48 bg-gray-50 rounded-lg p-4 relative">
                  <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      points="0,95 100,95 200,95 300,95 350,20 400,95 500,95"
                    />
                  </svg>
                  <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-500">
                    <span>03 Jun 25</span>
                    <span>04 Jun 25</span>
                    <span>05 Jun 25</span>
                    <span>07 Jun 25</span>
                    <span>09 Jun 25</span>
                  </div>
                </div>
              </div>

              {/* Date range */}
              <div className="mb-6 flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>📅</span>
                  <span>From</span>
                  <span className="font-medium">Jun 2, 2025</span>
                  <span>To</span>
                  <span className="font-medium">Jun 9, 2025</span>
                </div>
              </div>

              {/* Earnings breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Subscriptions</span>
                  </div>
                  <div className="flex space-x-8">
                    <span>$3.00</span>
                    <span>$2.40</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span>Tips</span>
                  </div>
                  <div className="flex space-x-8">
                    <span>$0.00</span>
                    <span>$0.00</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    <span>Posts</span>
                  </div>
                  <div className="flex space-x-8">
                    <span>$0.00</span>
                    <span>$0.00</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Messages</span>
                  </div>
                  <div className="flex space-x-8">
                    <span>$3.00</span>
                    <span>$2.40</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Referrals</span>
                  </div>
                  <div className="flex space-x-8">
                    <span>$0.00</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-4">
                  <div className="flex justify-between items-center font-semibold">
                    <span>TOTAL</span>
                    <div className="flex space-x-8">
                      <span>GROSS $6.00</span>
                      <span>NET $4.80</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly breakdown */}
              <div className="mt-8">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">June, 2025</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">$4.80</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chargebacks':
        return (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">CHARGEBACKS</h2>
              <div className="py-8 text-center text-gray-500">
                No chargebacks found
              </div>
            </div>
          </div>
        );

      case 'referrals':
        return (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">REFERRAL EARNINGS STATEMENT</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                      <th className="pb-3">DATE & TIME</th>
                      <th className="pb-3">INVOICE</th>
                      <th className="pb-3 text-right">AMOUNT</th>
                      <th className="pb-3 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-8 text-center text-gray-500" colSpan={4}>
                        This list is empty
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onNavigateToStatistics}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">STATEMENTS</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <HelpCircle size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Left sidebar with balance card */}
        <div className="w-80 p-6">
          <StatementsBalanceCard />
          <StatementsNavigation 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StatementsPage;