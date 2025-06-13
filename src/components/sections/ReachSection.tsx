/* ------------------------------------------------------------------
   REACH SECTION
   - Profile-visitors / Promotions / Trial-links / Tracking-links sekmeleri
   - All / Guests / Users filter ribbon  (sadece profile-visitors'ta)
   - Tarih aralığı (DateSelector) entegrasyonu
   - Sağ tarafta dinamik Summary paneli
   - VisitorsChart dateRange prop'u alır
------------------------------------------------------------------- */

import React, { useState } from 'react';
import { subDays } from 'date-fns';
import { Range } from '../types';

import SubTabs from '../SubTabs';
import DateSelector from '../DateSelector';
import VisitorsChart from '../charts/VisitorsChart';
import VisitorsTable from '../tables/VisitorsTable';
import EmptyState from '../EmptyState';
import { useCsvData } from '../../hooks/useCsvData';

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

  /* ---------- CSV data hooks ---------- */
  const { data: visitorsData, loading: visitorsLoading } = useCsvData<{
    stat: string;
    guests: number;
    users: number;
    total: number;
  }>('/src/data/visitors_table.csv');

  const { data: promotionsData, loading: promotionsLoading } = useCsvData<{
    id: number;
    name: string;
    discount: string;
    uses: number;
    revenue: string;
    expires: string;
    status: string;
  }>('/src/data/promotions.csv');

  const { data: trialLinksData, loading: trialLoading } = useCsvData<{
    id: number;
    name: string;
    clicks: number;
    conversions: number;
    revenue: string;
    created: string;
  }>('/src/data/trial_links.csv');

  const { data: trackingLinksData, loading: trackingLoading } = useCsvData<{
    id: number;
    name: string;
    clicks: number;
    conversions: number;
    source: string;
    created: string;
  }>('/src/data/tracking_links.csv');

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

  /* ----------------------------------------------------------------
     SOL ANA İÇERİK
  ----------------------------------------------------------------- */
  const renderContent = () => {
    /* --- PROFILE VISITORS --- */
    if (activeSubTab === 'profile-visitors') {
      if (visitorsLoading) return <EmptyState message="Loading visitors data..." />;
      
      const profileVisitors = visitorsData.find(v => v.stat === 'Profile visitors');
      const totalVisitors = profileVisitors?.total || 0;

      return (
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-xl font-semibold">{totalVisitors} Visitors</span>
              <span className="text-green-600 text-sm flex items-center">
                ↗ 625%
              </span>
            </div>
            
            {/* Chart Container */}
            <div className="h-64 mb-8 bg-gray-50 rounded-lg p-4">
              <VisitorsChart dateRange={dateRange} />
            </div>
          </div>

          {/* Visitors table */}
          <VisitorsTable />
        </div>
      );
    }

    /* --- PROMOTIONS --- */
    if (activeSubTab === 'promotions') {
      if (promotionsLoading) return <EmptyState message="Loading promotions..." />;
      
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
                    <td className="py-4 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState message="No promotions created yet" />
      );
    }

    /* --- TRIAL LINKS --- */
    if (activeSubTab === 'trial-links') {
      if (trialLoading) return <EmptyState message="Loading trial links..." />;
      
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
    }

    /* --- TRACKING LINKS --- */
    if (activeSubTab === 'tracking-links') {
      if (trackingLoading) return <EmptyState message="Loading tracking links..." />;
      
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
    }

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
    if (activeSubTab === 'profile-visitors') {
      const profileVisitors = visitorsData.find(v => v.stat === 'Profile visitors');
      const totalVisitors = profileVisitors?.total || 0;
      
      return (
        <div className="space-y-4">
          <SummaryRow label="Profile visitors" value={totalVisitors.toString()} trend="↗ 300%" />
          <SummaryRow label="New subs / Renews" value="1 / 0" />
          <SummaryRow label="Subscriptions earnings" value="$2.40" trend="↗ 100%" />
          <SummaryRow label="Conversion rate" value="7.1%" />
        </div>
      );
    }

    if (activeSubTab === 'promotions') {
      const totalUses = promotionsData.reduce((sum, p) => sum + p.uses, 0);
      return (
        <div className="space-y-4">
          <SummaryRow label="Active promotions" value={promotionsData.length.toString()} />
          <SummaryRow label="Total uses" value={totalUses.toString()} />
          <SummaryRow label="Revenue generated" value="$0.00" />
        </div>
      );
    }

    if (activeSubTab === 'trial-links') {
      const totalClicks = trialLinksData.reduce((sum, l) => sum + l.clicks, 0);
      const totalConversions = trialLinksData.reduce((sum, l) => sum + l.conversions, 0);
      
      return (
        <div className="space-y-4">
          <SummaryRow label="Total clicks" value={totalClicks.toString()} />
          <SummaryRow label="Total conversions" value={totalConversions.toString()} />
          <SummaryRow label="Conversion rate" value={totalClicks > 0 ? `${((totalConversions / totalClicks) * 100).toFixed(1)}%` : '0%'} />
        </div>
      );
    }

    if (activeSubTab === 'tracking-links') {
      const totalClicks = trackingLinksData.reduce((sum, l) => sum + l.clicks, 0);
      const totalConversions = trackingLinksData.reduce((sum, l) => sum + l.conversions, 0);
      
      return (
        <div className="space-y-4">
          <SummaryRow label="Total clicks" value={totalClicks.toString()} />
          <SummaryRow label="Total conversions" value={totalConversions.toString()} />
          <SummaryRow label="Conversion rate" value={totalClicks > 0 ? `${((totalConversions / totalClicks) * 100).toFixed(1)}%` : '0%'} />
        </div>
      );
    }

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