/* ------------------------------------------------------------------
   ENGAGEMENT  SECTION
   - Posts / Messages / Streaming / Stories sekmeleri
   - Purchases / Tips / Views / Likes / Comments filter ribbon
   - Tarih aralığı seçimi (DateSelector)
   - Sağ tarafta dinamik Summary + Top Content paneli
   - EngagementChart, tablolara dateRange prop'u iletilir
------------------------------------------------------------------- */

import React, { useState } from 'react';
import { subDays } from 'date-fns';
import { Range } from '../types';

import SubTabs from '../SubTabs';
import DateSelector from '../DateSelector';
import EngagementChart from '../charts/EngagementChart';
import EmptyState from '../EmptyState';
import BalanceCard from '../BalanceCard';
import { useCsvData } from '../../hooks/useCsvData';

/* ------------------------------------------------------------------
   BİLEŞEN
------------------------------------------------------------------- */
const EngagementSection = () => {
  /* ---------- state ---------- */
  const [activeSubTab, setActiveSubTab] = useState<'posts' | 'messages' | 'streaming' | 'stories'>('posts');
  const [activeFilter, setActiveFilter] = useState<'purchases' | 'tips' | 'views' | 'likes' | 'comments'>('purchases');
  const [dateRange, setDateRange] = useState<Range>({
    from: subDays(new Date(), 29),
    to: new Date(),
  });

  /* ---------- CSV data hooks ---------- */
  const { data: messageData, loading: messageLoading } = useCsvData<{
    id: number;
    content: string;
    views: number;
    responses: number;
    revenue: string;
    date: string;
  }>('/data/message_data.csv');

  const { data: streamingData, loading: streamingLoading } = useCsvData<{
    id: number;
    title: string;
    duration: string;
    viewers: number;
    revenue: string;
    date: string;
  }>('/data/streaming_data.csv');

  type Tab = { id: string; label: string };
  type FilterId = 'purchases' | 'tips' | 'views' | 'likes' | 'comments';
  
  /* ---------- sabit sekme verileri ---------- */
  const subTabs : Tab[]=  [
    { id: 'posts', label: 'Posts' },
    { id: 'messages', label: 'Messages' },
    { id: 'streaming', label: 'Streaming' },
    { id: 'stories', label: 'Stories' },
  ];

  const filterTabs :{ id: FilterId; label: string }[]= [
    { id: 'purchases', label: 'Purchases' },
    { id: 'tips', label: 'Tips' },
    { id: 'views', label: 'Views' },
    { id: 'likes', label: 'Likes' },
    { id: 'comments', label: 'Comments' },
  ];

  /* ----------------------------------------------------------------
     RENDER CONTENT – sol taraftaki ana kutu
  ----------------------------------------------------------------- */
  const renderContent = () => {
    switch (activeSubTab) {
      /* ---------------------- POSTS ----------------------------- */
      case 'posts':
        return (
          <div className="p-8">
            <EmptyState message="No Post activity during selected period" />
            <div className="mt-6 text-center">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                Create Your First Post
              </button>
            </div>
          </div>
        );

      /* -------------------- MESSAGES --------------------------- */
      case 'messages':
        if (messageLoading) return <EmptyState message="Loading messages..." />;
        
        const totalRevenue = messageData.reduce((sum, msg) => {
          const revenue = parseFloat(msg.revenue.replace('$', ''));
          return sum + revenue;
        }, 0);

        return (
          <div className="p-6 space-y-6">
            {/* üst toplam */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold">
                {messageData.length} Messages, ${totalRevenue.toFixed(2)}
              </span>
              <span className="text-green-600 text-sm">↗ 100%</span>
            </div>

            {/* chart */}
            <EngagementChart dateRange={dateRange} />

            {/* tablo */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                    <th className="pb-3">Message</th>
                    <th className="pb-3 text-right">Views</th>
                    <th className="pb-3 text-right">Responses</th>
                    <th className="pb-3 text-right">Revenue</th>
                    <th className="pb-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {messageData.map((m) => (
                    <tr key={m.id} className="border-b border-gray-100">
                      <td className="py-4 font-medium">{m.content}</td>
                      <td className="py-4 text-right">{m.views}</td>
                      <td className="py-4 text-right">{m.responses}</td>
                      <td className="py-4 text-right text-green-600 font-medium">{m.revenue}</td>
                      <td className="py-4 text-right">{m.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      /* ------------------- STREAMING --------------------------- */
      case 'streaming':
        if (streamingLoading) return <EmptyState message="Loading streams..." />;
        
        const totalStreamRevenue = streamingData.reduce((sum, stream) => {
          const revenue = parseFloat(stream.revenue.replace('$', ''));
          return sum + revenue;
        }, 0);

        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-semibold">
                  {streamingData.length} Stream, ${totalStreamRevenue.toFixed(2)}
                </span>
                <span className="text-green-600 text-sm">New!</span>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Go Live
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                    <th className="pb-3">Stream</th>
                    <th className="pb-3 text-right">Duration</th>
                    <th className="pb-3 text-right">Viewers</th>
                    <th className="pb-3 text-right">Revenue</th>
                    <th className="pb-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {streamingData.map((s) => (
                    <tr key={s.id} className="border-b border-gray-100">
                      <td className="py-4 font-medium">{s.title}</td>
                      <td className="py-4 text-right">{s.duration}</td>
                      <td className="py-4 text-right">{s.viewers}</td>
                      <td className="py-4 text-right text-green-600 font-medium">{s.revenue}</td>
                      <td className="py-4 text-right">{s.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      /* ------------------- STORIES ----------------------------- */
      case 'stories':
        return (
          <div className="p-8">
            <EmptyState message="No Stories activity during selected period" />
            <div className="mt-6 text-center">
              <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors">
                Create Your First Story
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  /* ----------------------------------------------------------------
     SAĞ PANEL – Summary + Top içerik
  ----------------------------------------------------------------- */
  const getSummaryContent = () => {
    switch (activeSubTab) {
      case 'posts':
        return (
          <div className="text-gray-500">
            <div className="mb-4">No Post activity during selected period</div>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Create engaging content to attract subscribers</li>
              <li>Use high-quality images and videos</li>
              <li>Post regularly to maintain engagement</li>
            </ul>
          </div>
        );

      case 'messages':
        const totalRevenue = messageData.reduce((sum, msg) => {
          const revenue = parseFloat(msg.revenue.replace('$', ''));
          return sum + revenue;
        }, 0);
        
        return (
          <div className="space-y-4">
            <SummaryRow label="Messages sent" value={messageData.length.toString()} trend="↗ 100%" />
            <SummaryRow label="Revenue generated" value={`$${totalRevenue.toFixed(2)}`} trend="↗ 100%" />
            <SummaryRow label="Response rate" value="100%" />
            <SummaryRow label="Avg. revenue per message" value={`$${(totalRevenue / Math.max(messageData.length, 1)).toFixed(2)}`} />
          </div>
        );

      case 'streaming':
        const totalStreamRevenue = streamingData.reduce((sum, stream) => {
          const revenue = parseFloat(stream.revenue.replace('$', ''));
          return sum + revenue;
        }, 0);
        
        return (
          <div className="space-y-4">
            <SummaryRow label="Streams completed" value={streamingData.length.toString()} trend="New!" />
            <SummaryRow label="Total watch time" value={streamingData[0]?.duration || "0h 0m"} />
            <SummaryRow label="Average viewers" value={streamingData[0]?.viewers.toString() || "0"} />
            <SummaryRow label="Revenue generated" value={`$${totalStreamRevenue.toFixed(2)}`} />
          </div>
        );

      case 'stories':
        return (
          <div className="text-gray-500">
            <div className="mb-4">No Stories activity during selected period</div>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li>Share behind-the-scenes content</li>
              <li>Stories disappear after 24 h</li>
              <li>Great for casual, frequent updates</li>
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  const getTopContent = () => {
    switch (activeSubTab) {
      case 'messages':
        const topMessage = messageData[0];
        if (!topMessage) return <div className="text-gray-500">No messages yet</div>;
        
        return (
          <div className="text-sm">
            <div className="font-medium">{topMessage.content}</div>
            <div className="text-gray-500">{topMessage.revenue} revenue • 100% response rate</div>
          </div>
        );
      case 'streaming':
        const topStream = streamingData[0];
        if (!topStream) return <div className="text-gray-500">No streams yet</div>;
        
        return (
          <div className="text-sm">
            <div className="font-medium">{topStream.title}</div>
            <div className="text-gray-500">{topStream.revenue} revenue • {topStream.viewers} viewers</div>
          </div>
        );
      default:
        return (
          <div className="text-gray-500">
            No {activeSubTab} activity during selected period
          </div>
        );
    }
  };

  /* yardımcı summary satırı */
  const SummaryRow = ({ label, value, trend }: { label: string; value: string; trend?: string }) => (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <div className="text-right">
        <div className="font-semibold">{value}</div>
        {trend && <div className="text-green-600 text-sm">{trend}</div>}
      </div>
    </div>
  );

  // Calculate balance card data from CSV
  const messageRevenue = messageData.reduce((sum, msg) => {
    const revenue = parseFloat(msg.revenue.replace('$', ''));
    return sum + revenue;
  }, 0);

  /* ===== JSX ===== */
  return (
    <div className="flex space-x-6">
      {/* ---- SOL TARAF ---- */}
      <div className="flex-1 space-y-6">
        <SubTabs
          tabs={subTabs}
          activeTab={activeSubTab}
          onTabChange={(id) => setActiveSubTab(id as typeof activeSubTab)}
        />

        <DateSelector value={dateRange} onChange={(_, r) => setDateRange(r)} />

        {/* filter ribbon */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-6 px-6">
            {filterTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveFilter(t.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
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

        {/* ana içerik */}
        <div className="bg-white rounded-lg border border-gray-200">{renderContent()}</div>
      </div>

      {/* ---- SAĞ PANEL ---- */}
      <BalanceCard
        variant="engagement"
        data={{ 
          messages: messageData.length, 
          messageEarnings: messageRevenue 
        }}
      />

    </div>
  );
};

export default EngagementSection;