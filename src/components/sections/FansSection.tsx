/* ------------------------------------------------------------------
   FANS SECTION
   - Subscriptions / Top-fans sekmeleri
   - All / Renews / New-subscribers filter ribbon
   - Tarih aralığı seçimi (DateSelector)
   - Sağda Summary + Top Fan kartı
------------------------------------------------------------------- */

import React, { useState } from 'react';
import { subDays } from 'date-fns';
import { Range } from '../types';

import SubTabs from '../SubTabs';
import DateSelector from '../DateSelector';
import FansChart from '../charts/FansChart';
import FanCard from '../cards/FanCard';
import EmptyState from '../EmptyState';
import { useCsvData } from '../../hooks/useCsvData';

/* ---------- yardımcı tipler ---------- */
type Tab = { id: string; label: string };
type FilterId = 'all' | 'renews' | 'new-subscribers';

/* ------------------------------------------------------------------
   BİLEŞEN
------------------------------------------------------------------- */
const FansSection = () => {
  /* ---------- state ---------- */
  const [activeSubTab, setActiveSubTab] =
    useState<'subscriptions' | 'top-fans'>('subscriptions');
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [dateRange, setDateRange] = useState<Range>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });

  /* ---------- CSV data hooks ---------- */
  const { data: subscribersData, loading: subsLoading } = useCsvData<{
    id: number;
    name: string;
    username: string;
    price: string;
    duration: string;
    status: string;
    totalSpent: string;
    lastActive: string;
  }>('/data/subscribers.csv');

  const { data: topFansData, loading: fansLoading } = useCsvData<{
    id: number;
    name: string;
    username: string;
    totalSpent: string;
    subscriptionMonths: number;
    tips: string;
    messages: number;
    lastActive: string;
    joinDate: string;
  }>('/data/top_fans.csv');

  /* ---------- sekmeler ---------- */
  const subTabs: Tab[] = [
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'top-fans', label: 'Top fans' },
  ];

  const filterTabs: { id: FilterId; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'renews', label: 'Renews' },
    { id: 'new-subscribers', label: 'New subscribers' },
  ];

  /* ---------------- SOL ANA İÇERİK ---------------- */
  const renderContent = () => {
    if (activeSubTab === 'subscriptions') {
      if (subsLoading) return <EmptyState message="Loading subscribers..." />;
      
      const totalRevenue = subscribersData.reduce((sum, sub) => {
        const spent = parseFloat(sub.totalSpent.replace('$', ''));
        return sum + spent;
      }, 0);

      return (
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-semibold">
                {subscribersData.length} Subscriber, ${totalRevenue.toFixed(2)}
              </span>
              <span className="text-green-600 text-sm">↗ 100%</span>
            </div>
            <FansChart dateRange={dateRange} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-3">Subscriber</th>
                  <th className="pb-3 text-right">Price</th>
                  <th className="pb-3 text-right">Duration</th>
                  <th className="pb-3 text-right">Total Spent</th>
                  <th className="pb-3 text-right">Status</th>
                  <th className="pb-3 text-right">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {subscribersData.map((s) => (
                  <tr key={s.id} className="border-b border-gray-100">
                    <td className="py-4 font-medium">{s.name}</td>
                    <td className="py-4 text-right">{s.price}</td>
                    <td className="py-4 text-right">{s.duration}</td>
                    <td className="py-4 text-right text-green-600">
                      {s.totalSpent}
                    </td>
                    <td className="py-4 text-right">{s.status}</td>
                    <td className="py-4 text-right text-sm text-gray-500">
                      {s.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    /* top-fans */
    if (activeSubTab === 'top-fans') {
      if (fansLoading) return <EmptyState message="Loading top fans..." />;
      
      return topFansData.length ? (
        <div className="p-6 space-y-6">
          {topFansData.map((f) => (
            <div
              key={f.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{f.name}</h4>
                  <p className="text-gray-500">{f.username}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    <div>Joined: {f.joinDate}</div>
                    <div>Messages: {f.messages}</div>
                    <div>Tips: {f.tips}</div>
                    <div>Subscription months: {f.subscriptionMonths}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {f.totalSpent}
                  </div>
                  <div className="text-sm text-gray-500">Total spent</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No fans yet" />
      );
    }

    return null;
  };

  /* ------------- SAĞ PANEL ------------- */
  const SummaryRow = ({
    label,
    value,
    trend,
  }: {
    label: string;
    value: string;
    trend?: string;
  }) => (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <div className="text-right">
        <div className="font-semibold">{value}</div>
        {trend && <div className="text-green-600 text-sm">{trend}</div>}
      </div>
    </div>
  );

  const getSummaryContent = () => {
    if (activeSubTab === 'subscriptions') {
      const totalRevenue = subscribersData.reduce((sum, sub) => {
        const spent = parseFloat(sub.totalSpent.replace('$', ''));
        return sum + spent;
      }, 0);
      
      const avgPrice = subscribersData.length > 0 
        ? subscribersData.reduce((sum, sub) => {
            const price = parseFloat(sub.price.replace('$', ''));
            return sum + price;
          }, 0) / subscribersData.length
        : 0;

      return (
        <div className="space-y-4">
          <SummaryRow label="Subscribers" value={subscribersData.length.toString()} trend="↗ 100%" />
          <SummaryRow label="New subs / Renews" value="1 / 0" />
          <SummaryRow label="Subscription earnings" value={`$${totalRevenue.toFixed(2)}`} trend="↗ 100%" />
          <SummaryRow label="Avg. subscription price" value={`$${avgPrice.toFixed(2)}`} />
        </div>
      );
    }

    if (activeSubTab === 'top-fans')
      return (
        <div className="text-gray-500">
          Your most valuable supporters ranked by total spending.
        </div>
      );

    return null;
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="flex space-x-6">
      {/* SOL TARAF */}
      <div className="flex-1 space-y-6">
        <SubTabs
          tabs={subTabs}
          activeTab={activeSubTab}
          onTabChange={(id) => setActiveSubTab(id as typeof activeSubTab)}
        />

        <DateSelector
          value={dateRange}
          onChange={(_, r) => setDateRange(r)}
        />

        {/* filter ribbon sadece subscriptions için */}
        {activeSubTab === 'subscriptions' && (
          <div className="border-b border-gray-200">
            <nav className="flex space-x-6 px-6">
              {filterTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveFilter(t.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    activeFilter === t.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200">
          {renderContent()}
        </div>
      </div>

      {/* SAĞ PANEL */}
      <div className="w-80 flex-shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold mb-4">Summary</h3>
          {getSummaryContent()}

          {activeSubTab === 'subscriptions' && (
            <div className="mt-6">
              <h4 className="font-medium mb-4">Top Fan</h4>
              {topFansData.length ? <FanCard /> : <EmptyState message="No fans yet" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FansSection;