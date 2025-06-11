/* ------------------------------------------------------------------
   REACH SECTION
   - Profile-visitors / Promotions / Trial-links / Tracking-links sekmeleri
   - All / Guests / Users filter ribbon  (sadece profile-visitors’ta)
   - Tarih aralığı (DateSelector) entegrasyonu
   - Sağ tarafta dinamik Summary paneli
   - VisitorsChart dateRange prop’u alır
------------------------------------------------------------------- */

import React, { useState } from 'react';
import { subDays } from 'date-fns';
import { Range } from '../types';

import SubTabs from '../SubTabs';
import DateSelector from '../DateSelector';
import VisitorsChart from '../charts/VisitorsChart';
import EmptyState from '../EmptyState';

/* -------- yardımcı tipler --------- */
type Tab = { id: string; label: string };
type FilterId = 'all' | 'guests' | 'users';

/* ------------------------------------------------------------------ */
const ReachSection = () => {
  /* ---------------- state ---------------- */
  const [activeSubTab, setActiveSubTab] = useState<
    'profile-visitors' | 'promotions' | 'trial-links' | 'tracking-links'
  >('profile-visitors');

  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const [dateRange, setDateRange] = useState<Range>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });

  /* ---------------- sekmeler ---------------- */
  const subTabs: Tab[] = [
    { id: 'profile-visitors', label: 'Profile visitors' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'trial-links', label: 'Trial links' },
    { id: 'tracking-links', label: 'Tracking links' },
  ];

  const filterTabs: { id: FilterId; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'guests', label: 'Guests' },
    { id: 'users', label: 'Users' },
  ];

  /* ---------------- örnek veriler ---------------- */
  const promotionsData = [
    {
      id: 1,
      name: 'Summer Special',
      discount: '50%',
      uses: 0,
      revenue: '$0.00',
      expires: 'Jul 31, 2025',
      status: 'Active',
    },
  ];

  const trialLinksData = [
    {
      id: 1,
      name: 'Free 7-day trial',
      clicks: 5,
      conversions: 1,
      revenue: '$3.00',
      created: 'Jun 01, 2025',
    },
  ];

  const trackingLinksData = [
    {
      id: 1,
      name: 'Instagram Bio',
      clicks: 12,
      conversions: 1,
      source: 'Instagram',
      created: 'May 15, 2025',
    },
  ];

  /* ----------------------------------------------------------------
     SOL ANA İÇERİK
  ----------------------------------------------------------------- */
  const renderContent = () => {
    /* --- PROFILE VISITORS --- */
    if (activeSubTab === 'profile-visitors')
      return (
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-semibold">20 Visitors</span>
              <span className="text-green-600 text-sm">↗ 300%</span>
            </div>
            <VisitorsChart dateRange={dateRange} />
          </div>

          {/* Basit tablo (Top countries) örneği */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-3">Country</th>
                  <th className="pb-3 text-right">Guests</th>
                  <th className="pb-3 text-right">Users</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3">Switzerland</td>
                  <td className="py-3 text-right">0</td>
                  <td className="py-3 text-right">11</td>
                  <td className="py-3 text-right">11</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3">United States</td>
                  <td className="py-3 text-right">5</td>
                  <td className="py-3 text-right">1</td>
                  <td className="py-3 text-right">6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    /* --- PROMOTIONS --- */
    if (activeSubTab === 'promotions')
      return promotionsData.length ? (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Promotions</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Create Promotion
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-3">Promotion</th>
                  <th className="pb-3 text-right">Discount</th>
                  <th className="pb-3 text-right">Uses</th>
                  <th className="pb-3 text-right">Revenue</th>
                  <th className="pb-3 text-right">Expires</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {promotionsData.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100">
                    <td className="py-4 font-medium">{p.name}</td>
                    <td className="py-4 text-right">{p.discount}</td>
                    <td className="py-4 text-right">{p.uses}</td>
                    <td className="py-4 text-right">{p.revenue}</td>
                    <td className="py-4 text-right">{p.expires}</td>
                    <td className="py-4 text-right">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState message="No promotions created yet" />
      );

    /* --- TRIAL LINKS --- */
    if (activeSubTab === 'trial-links')
      return trialLinksData.length ? (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Trial Links</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Create Trial Link
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-3">Name</th>
                  <th className="pb-3 text-right">Clicks</th>
                  <th className="pb-3 text-right">Conversions</th>
                  <th className="pb-3 text-right">Revenue</th>
                  <th className="pb-3 text-right">Created</th>
                </tr>
              </thead>
              <tbody>
                {trialLinksData.map((l) => (
                  <tr key={l.id} className="border-b border-gray-100">
                    <td className="py-4 font-medium">{l.name}</td>
                    <td className="py-4 text-right">{l.clicks}</td>
                    <td className="py-4 text-right">{l.conversions}</td>
                    <td className="py-4 text-right text-green-600">{l.revenue}</td>
                    <td className="py-4 text-right">{l.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState message="No trial links created yet" />
      );

    /* --- TRACKING LINKS --- */
    if (activeSubTab === 'tracking-links')
      return trackingLinksData.length ? (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Tracking Links</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Create Tracking Link
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-3">Name</th>
                  <th className="pb-3 text-right">Clicks</th>
                  <th className="pb-3 text-right">Conversions</th>
                  <th className="pb-3 text-right">Source</th>
                  <th className="pb-3 text-right">Created</th>
                </tr>
              </thead>
              <tbody>
                {trackingLinksData.map((l) => (
                  <tr key={l.id} className="border-b border-gray-100">
                    <td className="py-4 font-medium">{l.name}</td>
                    <td className="py-4 text-right">{l.clicks}</td>
                    <td className="py-4 text-right">{l.conversions}</td>
                    <td className="py-4 text-right">{l.source}</td>
                    <td className="py-4 text-right">{l.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState message="No tracking links created yet" />
      );

    return null;
  };

  /* ----------------------------------------------------------------
     SAĞ PANEL
  ----------------------------------------------------------------- */
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

  const summaryContent = () => {
    if (activeSubTab === 'profile-visitors')
      return (
        <div className="space-y-4">
          <SummaryRow label="Profile visitors" value="20" trend="↗ 300%" />
          <SummaryRow label="New subs / Renews" value="1 / 0" />
          <SummaryRow label="Subscriptions earnings" value="$2.40" trend="↗ 100%" />
          <SummaryRow label="Conversion rate" value="7.1%" />
        </div>
      );

    if (activeSubTab === 'promotions')
      return <div className="text-gray-500">Track discount campaigns here.</div>;

    if (activeSubTab === 'trial-links')
      return <div className="text-gray-500">See performance of trial links.</div>;

    if (activeSubTab === 'tracking-links')
      return <div className="text-gray-500">UTM / tracking links analytics.</div>;

    return null;
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="flex space-x-6">
      {/* -------- SOL -------- */}
      <div className="flex-1 space-y-6">
        <SubTabs
          tabs={subTabs}
          activeTab={activeSubTab}
          onTabChange={(id) => setActiveSubTab(id as typeof activeSubTab)}
        />

        <DateSelector value={dateRange} onChange={(_, r) => setDateRange(r)} />

        {/* filter ribbon sadece profile-visitors için */}
        {activeSubTab === 'profile-visitors' && (
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

      {/* -------- SAĞ PANEL -------- */}
      <div className="w-80 flex-shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold mb-4">Summary</h3>
          {summaryContent()}
        </div>
      </div>
    </div>
  );
};

export default ReachSection;
