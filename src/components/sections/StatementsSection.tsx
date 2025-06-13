/* ------------------------------------------------------------------
   STATEMENTS SECTION — alt tab filtreleri + type fix
------------------------------------------------------------------- */
import React, { useMemo, useState } from 'react';
import { subDays } from 'date-fns';

import SubTabs          from '../SubTabs';
import DateSelector     from '../DateSelector';
import BalanceCard      from '../BalanceCard';
import EarningsChart    from '../charts/EarningsChart';
import TransactionTable, { Transaction } from '../tables/TransactionTable';
import EmptyState       from '../EmptyState';
import { useCsvData }   from '../../hooks/useCsvData';
import { Range }        from '../types';

/* ---------- Tipler ---------- */
type SubTabId = 'earnings' | 'payout-requests' | 'chargebacks' | 'referrals';
type FilterId = 'all' | 'subscriptions' | 'tips' | 'posts' | 'messages' | 'streams';

/* ---------- Alt sekme tanımları ---------- */
const filterTabs: { id: FilterId; label: string }[] = [
  { id: 'all',           label: 'All'           },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'tips',          label: 'Tips'          },
  { id: 'posts',         label: 'Posts'         },
  { id: 'messages',      label: 'Messages'      },
  { id: 'streams',       label: 'Streams'       },
];

const StatementsSection = () => {
  /* ---------- state ---------- */
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>('earnings');
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [dateRange, setDateRange] = useState<Range>({
    from: subDays(new Date(), 29),
    to  : new Date(),
  });

  /* ---------- CSV verileri ---------- */
  const { data: transactionsRaw, loading: txLoading } = useCsvData<{
    id: number; date: string; time: string; description: string;
    user: string; amount: string; fee: string; net: string;
  }>('/src/data/transactions.csv');

  const { data: payoutRequests, loading: prLoading } = useCsvData<{
    id: number; date: string; amount: string; method: string; status: string;
  }>('/src/data/payout_requests.csv');

  const { data: earningsData, loading: edLoading } = useCsvData<{
    id: string; name: string; gross: number; net: number;
  }>('/src/data/earnings_data.csv');

  /* ---------- Sağ panel ---------- */
  const rightPanelData = {
    current : '$0.00',
    pending : '$4.80',
    total   : earningsData.find(e => e.id === 'total')?.gross         ?? 0,
    subs    : earningsData.find(e => e.id === 'subscriptions')?.gross ?? 0,
    messages: earningsData.find(e => e.id === 'messages')?.gross      ?? 0,
    deltas  : { total: 100, subs: 100, messages: 100 },
  };

  /* ---------- Yardımcılar ---------- */
  const parseDollar = (val: string | undefined): number =>
    val ? parseFloat(val.replace(/[^0-9.-]+/g, '')) || 0 : 0;

  const matchCategory = (desc: string, cat: FilterId) => {
    const s = desc.toLowerCase();
    switch (cat) {
      case 'subscriptions': return /subscription/.test(s);
      case 'tips'         : return /\btip\b/.test(s);
      case 'posts'        : return /\bpost\b/.test(s);
      case 'messages'     : return /\bmessage\b/.test(s);
      case 'streams'      : return /\bstream\b/.test(s);
      default             : return true;               // 'all'
    }
  };

  /* ---------- Filtre + string→number dönüşümü ---------- */
  const transactions: Transaction[] = useMemo(() => {
    const base = activeFilter === 'all'
      ? transactionsRaw
      : transactionsRaw.filter(t => matchCategory(t.description, activeFilter));

    return base.map(t => ({
      id         : t.id,
      date       : t.date,
      time       : t.time,
      description: t.description,
      user       : t.user,
      amount     : parseDollar(t.amount),
      fee        : parseDollar(t.fee),
      net        : parseDollar(t.net),
    }));
  }, [transactionsRaw, activeFilter]);

  /* ---------- Üst sekmeler ---------- */
  const subTabs = [
    { id: 'earnings',        label: 'Earnings' },
    { id: 'payout-requests', label: 'Payout Requests' },
    { id: 'chargebacks',     label: 'Chargebacks' },
    { id: 'referrals',       label: 'Referrals' },
  ];

  /* ---------- Content ---------- */
  const renderContent = () => {
    /* Earnings */
    if (activeSubTab === 'earnings') {
      if (txLoading || edLoading) return <EmptyState message="Loading..." />;

      return (
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-semibold">$4.80</span>
              <span className="text-gray-500">($6.00 Gross)</span>
              <span className="text-green-600 text-sm">↗ 100%</span>
            </div>
            <EarningsChart dateRange={dateRange} />
          </div>

          <TransactionTable dateRange={dateRange} data={transactions} />
        </div>
      );
    }

    /* Payout Requests */
    if (activeSubTab === 'payout-requests') {
      if (prLoading) return <EmptyState message="Loading..." />;

      return (
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Payout Requests</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Request Payout
            </button>
          </div>

          {payoutRequests.length ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Method</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutRequests.map(r => (
                    <tr key={r.id} className="border-b border-gray-100">
                      <td className="py-4">{r.date}</td>
                      <td className="py-4">
                        {r.amount
                          ? `$${parseFloat(r.amount.replace(/[^0-9.-]+/g, '')).toFixed(2)}`
                          : 'N/A'}
                      </td>
                      <td className="py-4">{r.method}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="No payout requests found" />
          )}
        </div>
      );
    }

    /* Chargebacks & Referrals */
    if (activeSubTab === 'chargebacks')
      return <div className="p-6"><EmptyState message="No chargebacks found" /></div>;

    return <div className="p-6"><EmptyState message="No referrals yet" /></div>;
  };

  /* ---------- JSX ---------- */
  return (
    <div className="flex space-x-6">
      {/* Sol Panel */}
      <div className="flex-1 space-y-6">
        <SubTabs tabs={subTabs} activeTab={activeSubTab} onTabChange={id => setActiveSubTab(id as SubTabId)} />

        <DateSelector value={dateRange} onChange={(_, r) => setDateRange(r)} />

        {activeSubTab === 'earnings' && (
          <div className="border-b border-gray-200">
            <nav className="flex space-x-6 px-6">
              {filterTabs.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`py-3 px-1 border-b-2 text-sm font-medium transition-colors ${
                    activeFilter === f.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200">
          {renderContent()}
        </div>
      </div>

      {/* Sağ Panel */}
      <div className="w-80 flex-shrink-0">
        <BalanceCard variant="statements" data={rightPanelData} />
      </div>
    </div>
  );
};

export default StatementsSection;
