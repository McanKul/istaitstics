/* ------------------------------------------------------------------
   STATEMENTS SECTION — Updated to match design from images
------------------------------------------------------------------- */
import React, { useMemo, useState } from 'react';
import { subDays } from 'date-fns';
import { ChevronDown, AlertTriangle } from 'lucide-react';

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
type ReferralFilterId = 'referral-earnings' | 'referred-creators' | 'referred-users';

/* ---------- Alt sekme tanımları ---------- */
const filterTabs: { id: FilterId; label: string }[] = [
  { id: 'all',           label: 'All'           },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'tips',          label: 'Tips'          },
  { id: 'posts',         label: 'Posts'         },
  { id: 'messages',      label: 'Messages'      },
  { id: 'streams',       label: 'Streams'       },
];

const referralFilterTabs: { id: ReferralFilterId; label: string }[] = [
  { id: 'referral-earnings', label: 'Referral earnings' },
  { id: 'referred-creators', label: 'Referred creators' },
  { id: 'referred-users',    label: 'Referred users'    },
];

const StatementsSection = () => {
  /* ---------- state ---------- */
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>('earnings');
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [activeReferralFilter, setActiveReferralFilter] = useState<ReferralFilterId>('referral-earnings');
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
    id: string; name: string; gross: string; net: string;
  }>('/src/data/earnings_data.csv');

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

      const totalNet = earningsData.find(e => e.id === 'total')?.net || '0';
      const totalGross = earningsData.find(e => e.id === 'total')?.gross || '0';

      return (
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Banking Alert */}
          <div className="p-6 border-b border-gray-200">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertTriangle size={20} className="text-red-500" />
              <p className="text-red-700">
                Please complete filling out your{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Banking information
                </a>
              </p>
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold">Last 30 days</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <div className="text-sm text-gray-500">
                May 14, 2025 - Jun 13, 2025 (local time UTC +03:00)
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-6 px-6">
              {filterTabs.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`py-3 px-4 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === f.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Earnings Summary */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold">${parseDollar(totalNet).toFixed(2)}</span>
                <span className="text-gray-500">(${parseDollar(totalGross).toFixed(2)} Gross)</span>
                <span className="text-green-600 text-sm flex items-center">
                  ↗ 100%
                </span>
              </div>
              <div className="h-48 mb-6">
                <EarningsChart dateRange={dateRange} />
              </div>
            </div>

            {/* Transaction Table */}
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
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-gray-100">
                      <td className="py-4">
                        <div className="font-medium">
                          {t.date}, {t.time}
                        </div>
                        <div className="text-sm text-gray-500">
                          {t.description} <span className="text-blue-600">{t.user}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">${t.amount.toFixed(2)}</td>
                      <td className="py-4 text-right">${t.fee.toFixed(2)}</td>
                      <td className="py-4 text-right">${(t.amount - t.fee).toFixed(2)}</td>
                      <td className="py-4">
                        <button className="text-gray-400 hover:text-gray-600">⋯</button>
                      </td>
                    </tr>
                  ))}
                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        No transactions
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    /* Payout Requests */
    if (activeSubTab === 'payout-requests') {
      if (prLoading) return <EmptyState message="Loading..." />;

      return (
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Banking Alert */}
          <div className="p-6 border-b border-gray-200">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertTriangle size={20} className="text-red-500" />
              <p className="text-red-700">
                Please complete filling out your{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Banking information
                </a>
              </p>
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold">Last 30 days</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <div className="text-sm text-gray-500">
                May 14, 2025 - Jun 13, 2025
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-sm text-gray-600 mb-8">
              Transactions can take up to 3-5 business days
            </div>
            
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg mb-2">No data during selected period</div>
            </div>
          </div>
        </div>
      );
    }

    /* Chargebacks */
    if (activeSubTab === 'chargebacks') {
      return 
          {/* Date Range Selector */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold">Last 30 days</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <div className="text-sm text-gray-500">
                May 14, 2025 - Jun 13, 2025
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg mb-2">No data during selected period</div>
            </div>
          </div>
        </div>
      );
    }

    /* Referrals */
    if (activeSubTab === 'referrals') {
      return (
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Date Range Selector */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold">Last 30 days</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <div className="text-sm text-gray-500">
                May 14, 2025 - Jun 13, 2025
              </div>
            </div>
          </div>

          {/* Referral Filter Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-6 px-6">
              {referralFilterTabs.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveReferralFilter(f.id)}
                  className={`py-3 px-4 rounded-full text-sm font-medium transition-colors ${
                    activeReferralFilter === f.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <div className="text-2xl font-bold mb-4">$0.00</div>
              <div className="h-48 mb-6">
                <EarningsChart dateRange={dateRange} />
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-8">
              Transactions can take up to 7 business days
            </div>
            
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg mb-2">No data during selected period</div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  /* ---------- JSX ---------- */
  return (
    <div className="flex space-x-6">
      {/* Sol Panel */}
      <div className="flex-1 space-y-6">
        <SubTabs tabs={subTabs} activeTab={activeSubTab} onTabChange={id => setActiveSubTab(id as SubTabId)} />

        <div className="bg-white rounded-lg border border-gray-200">
          {renderContent()}
        </div>
      </div>

      {/* Sağ Panel */}
      <div className="w-80 flex-shrink-0">
        <BalanceCard variant="statements" data={{}} />
      </div>
    </div>
  );
};

export default StatementsSection;