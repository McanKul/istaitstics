import React, { useState } from 'react';
import SubTabs from '../SubTabs';
import DateSelector from '../DateSelector';
import BalanceCard from '../BalanceCard';
import EarningsChart from '../charts/EarningsChart';
import EarningsTable from '../tables/EarningsTable';

import { subDays } from 'date-fns';
import { DateRange } from 'react-day-picker'; // ya da kendi type'ını oluştur



const OverviewSection = () => {
  const [activeSubTab, setActiveSubTab] = useState('earnings');

  const subTabs = [
    { id: 'earnings', label: 'Earnings' },
    { id: 'summary', label: 'Summary' },
    { id: 'top-highlights', label: 'Top highlights' },
    { id: 'activity-streak', label: 'Activity Streak' },
  ];

  const [dateRange, setDateRange] = useState<DateRange>({
  from: subDays(new Date(), 29),
  to: new Date()
  });

  const renderContent = () => {
    switch (activeSubTab) {
      case 'earnings':
        return (
          <div className="space-y-6">
            {/* All Time Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">All time</span>
                  <span className="text-lg font-semibold">$4.80</span>
                </div>
              </div>
            </div>

            {/* Current Period Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">May 08, 2025 - Jun 07, 2025</span>
                  <span className="text-lg font-semibold">$4.80</span>
                </div>
              </div>
              
              <div className="p-6">
                <EarningsChart dateRange={dateRange} />
                <EarningsTable dateRange={dateRange} />
              </div>
            </div>

            {/* Monthly Breakdowns */}
            <div className="space-y-4">
              {['June, 2025', 'May, 2025', 'April, 2025'].map((month, index) => (
                <div key={month} className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{month}</span>
                      <span className="text-lg font-semibold">
                        {index === 0 ? '$4.80' : '$0.00'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-6">Performance Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total Earnings</span>
                    <span className="font-semibold text-lg">$4.80</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Active Subscribers</span>
                    <span className="font-semibold text-lg">1</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-semibold text-lg">14</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Posts Published</span>
                    <span className="font-semibold text-lg">3</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6">Growth Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-gray-600">Subscriber Growth</span>
                    <span className="text-green-600 font-semibold text-lg">+100%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-gray-600">Revenue Growth</span>
                    <span className="text-green-600 font-semibold text-lg">+100%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-gray-600">Engagement Rate</span>
                    <span className="text-green-600 font-semibold text-lg">+250%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="text-blue-600 font-semibold text-lg">7.1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'top-highlights':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-lg font-semibold mb-6">Top Highlights</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900">First Subscriber! 🎉</h4>
                    <p className="text-blue-700">You gained your first subscriber Adam</p>
                    <span className="text-sm text-blue-600">June 5, 2025 • 2 days ago</span>
                  </div>
                  <div className="text-2xl">🎯</div>
                </div>
              </div>
              <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-green-900">Revenue Milestone</h4>
                    <p className="text-green-700">Reached $4.80 in total earnings</p>
                    <span className="text-sm text-green-600">June 5, 2025 • 2 days ago</span>
                  </div>
                  <div className="text-2xl">💰</div>
                </div>
              </div>
              <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-purple-900">Profile Views Spike</h4>
                    <p className="text-purple-700">14 profile views in the last 30 days</p>
                    <span className="text-sm text-purple-600">Ongoing trend</span>
                  </div>
                  <div className="text-2xl">📈</div>
                </div>
              </div>
              <div className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-orange-900">Top Creator Ranking</h4>
                    <p className="text-orange-700">You're in the top 93% of all creators!</p>
                    <span className="text-sm text-orange-600">Current status</span>
                  </div>
                  <div className="text-2xl">⭐</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'activity-streak':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-lg font-semibold mb-6">Activity Streak</h3>
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">3</div>
              <div className="text-xl text-gray-600 mb-2">Days Active</div>
              <div className="text-sm text-gray-500">Keep it up! You're building momentum</div>
            </div>
            
            <div className="mb-8">
              <h4 className="font-medium mb-4">This Week</h4>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{day}</div>
                    <div
                      className={`w-8 h-8 rounded mx-auto ${
                        i < 3 ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-blue-700">Current Streak</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-green-700">Longest Streak</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className="text-sm text-purple-700">This Week</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <div className="text-sm text-yellow-800">
                💡 <strong>Tip:</strong> Post content daily to maintain your streak and boost engagement!
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex space-x-6">
      <div className="flex-1 space-y-6">
        <SubTabs 
          tabs={subTabs} 
          activeTab={activeSubTab} 
          onTabChange={setActiveSubTab}
        />
        <DateSelector
        value={dateRange}
        onChange={(label, range) => {
          if (range?.from && range?.to) {
            setDateRange(range);
          }
        }}
      />

        {renderContent()}
      </div>

      <div className="w-80 flex-shrink-0">
        <BalanceCard
          variant="overview"
          data={{ visitors: 16, subsEarnings: 2.4, messages: 1 }}
        />
      </div>
    </div>
  );
};

export default OverviewSection;