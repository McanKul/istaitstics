import React from 'react';
import {
  HelpCircle,
  ChevronDown,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { useCsvData } from '../hooks/useCsvData';

type Variant =
  | 'statements'
  | 'chargebacks'
  | 'referrals'
  | 'overview'
  | 'engagement'
  | 'reach'
  | 'fans';

export interface BalanceCardProps<T = any> {
  variant: Variant;
  /** İlgili sekmenin göstereceği ham metrikler */
  data: T;
}

/* ------------------------------------------------------------------ */
/*  Küçük yardımcı – yeşil / kırmızı ok + değer                       */
/* ------------------------------------------------------------------ */
const Metric = ({
  label,
  value,
  delta,
  precision = 0,
}: {
  label: string;
  value: number | string;
  delta?: number; // %+/- değer
  precision?: number;
}) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="flex items-center space-x-1">
      <span className="font-medium">
        {typeof value === 'number' ? value.toFixed(precision) : value}
      </span>
      {delta !== undefined && (
        <span
          className={`inline-flex items-center text-xs ${
            delta >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {delta >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(delta)}%
        </span>
      )}
    </span>
  </div>
);

/* ------------------------------------------------------------------ */
/*  BalanceCard ana bileşeni                                          */
/* ------------------------------------------------------------------ */
const BalanceCard = <T,>({ variant, data }: BalanceCardProps<T>) => {
  // Load earnings data from CSV for statements variant
  const { data: earningsData } = useCsvData<{
    id: string;
    name: string;
    gross: string;
    net: string;
  }>('/data/earnings_data.csv');

  /* -------------------------------------------------------------- */
  /*  Ortak "Üst bakiye" kutusu                                     */
  /* -------------------------------------------------------------- */
  const BalanceHeader = ({
    current,
    pending,
    badge,
  }: {
    current: string;
    pending?: string;
    badge?: string;
  }) => (
    <>
      {badge && (
        <p className="text-blue-500 text-[13px] font-medium mb-5">{badge}</p>
      )}

      <div className="flex justify-between mb-6">
        <div>
          <p className="text-2xl font-bold">{current}</p>
          <p className="text-gray-600">Current balance</p>
        </div>

        {pending && (
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-400">{pending}</p>
            <p className="flex items-center justify-end text-gray-600 space-x-1">
              <span>Pending balance</span>
              <HelpCircle size={14} className="text-gray-400" />
            </p>
          </div>
        )}
      </div>
    </>
  );

  /* -------------------------------------------------------------- */
  /*  Variant-spesifik render'lar                                   */
  /* -------------------------------------------------------------- */
  const renderBody = () => {
    switch (variant) {
      /* ---------------- STATEMENTS / EARNINGS ------------------ */
      case 'statements': {
        // Use CSV data for statements
        const totalEarning = earningsData.find(e => e.id === 'total');
        const subsEarning = earningsData.find(e => e.id === 'subscriptions');
        const messagesEarning = earningsData.find(e => e.id === 'messages');

        const totalGross = totalEarning ? parseFloat(totalEarning.gross.replace('$', '')) : 0;
        const totalNet = totalEarning ? parseFloat(totalEarning.net.replace('$', '')) : 0;
        const subsNet = subsEarning ? parseFloat(subsEarning.net.replace('$', '')) : 0;
        const messagesNet = messagesEarning ? parseFloat(messagesEarning.net.replace('$', '')) : 0;

        return (
          <>
            <BalanceHeader
              current="$0.00"
              pending={`$${totalNet.toFixed(2)}`}
              badge="★ YOU ARE IN THE TOP 93% OF ALL CREATORS!"
            />

            {/* "Manual payouts" bölümü */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Manual payouts</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Minimum withdrawal amount is $20
              </p>
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 font-semibold py-2 rounded-full cursor-not-allowed"
              >
                REQUEST WITHDRAWAL
              </button>
            </div>

            {/* Mini earnings spark-chart + sayılar */}
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Earnings</h3>
              <Metric
                label="Total"
                value={`$${totalNet.toFixed(2)}`}
                delta={100}
              />
              <Metric
                label="Subscriptions"
                value={`$${subsNet.toFixed(2)}`}
                delta={100}
              />
              <Metric
                label="Messages"
                value={`$${messagesNet.toFixed(2)}`}
                delta={100}
              />
            </div>
          </>
        );
      }

      /* ---------------- CHARGEBACKS ---------------------------- */
      case 'chargebacks': {
        const d = data as { ratio: number };
        return (
          <>
            <BalanceHeader current="$0.00" />
            <Metric label="Chargeback ratio" value={`${d.ratio}%`} />
          </>
        );
      }

      /* ---------------- REFERRALS ------------------------------ */
      case 'referrals': {
        const d = data as { current: string; url: string };
        return (
          <>
            <p className="text-xl font-bold mb-1">{d.current}</p>
            <p className="text-gray-600 mb-4">Current referral earnings</p>
            <p className="text-sm text-gray-500 mb-6">
              Please note, if you do not reach the minimum payout ($20), your
              earnings will roll over to the next monthly payout.
            </p>

            <div className="bg-gray-50 rounded p-3 text-xs break-all mb-4">
              {d.url}
            </div>
            <button className="text-blue-600 text-sm font-medium">
              COPY LINK
            </button>
          </>
        );
      }

      /* ---------------- OVERVIEW ------------------------------- */
      case 'overview': {
        const d = data as {
          visitors: number;
          subsEarnings: number;
          messages: number;
        };
        return (
          <>
            <BalanceHeader current="$0.00" pending="$4.80" />
            <h3 className="font-semibold mb-4">Earnings</h3>
            <Metric label="Profile visitors" value={d.visitors} delta={300} />
            <Metric
              label="Subscriptions earnings"
              value={`$${d.subsEarnings.toFixed(2)}`}
              delta={100}
            />
            <Metric label="Messages" value={d.messages} delta={100} />
          </>
        );
      }

      /* ---------------- ENGAGEMENT ----------------------------- */
      case 'engagement': {
        const d = data as {
          messages: number;
          messageEarnings: number;
        };
        return (
          <>
            <h3 className="font-semibold mb-4">Summary</h3>
            <Metric label="Messages" value={d.messages} delta={100} />
            <Metric
              label="Message earnings"
              value={`$${d.messageEarnings.toFixed(2)}`}
              delta={100}
            />
          </>
        );
      }

      /* ---------------- REACH ---------------------------------- */
      case 'reach': {
        const d = data as {
          visitors: number;
          newSubs: string;
          subsEarnings: number;
        };
        return (
          <>
            <h3 className="font-semibold mb-4">Summary</h3>
            <Metric label="Profile visitors" value={d.visitors} delta={300} />
            <Metric label="New subs/Renews" value={d.newSubs} />
            <Metric
              label="Subscriptions earnings"
              value={`$${d.subsEarnings.toFixed(2)}`}
              delta={100}
            />
          </>
        );
      }

      /* ---------------- FANS ----------------------------------- */
      case 'fans': {
        const d = data as {
          subs: number;
          subsEarnings: number;
        };
        return (
          <>
            <h3 className="font-semibold mb-4">Summary</h3>
            <Metric label="Subscribers" value={d.subs} delta={100} />
            <Metric
              label="Subscriptions earnings"
              value={`$${d.subsEarnings.toFixed(2)}`}
              delta={100}
            />
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <aside className="bg-white rounded-lg border border-gray-200 p-6 w-80">
      {renderBody()}
    </aside>
  );
};

export default BalanceCard;