import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import StatisticsHeader from './components/StatisticsHeader';
import MainTabs from './components/MainTabs';
import BankingAlert from './components/BankingAlert';
import OverviewSection from './components/sections/OverviewSection';
import EngagementSection from './components/sections/EngagementSection';
import ReachSection from './components/sections/ReachSection';
import FansSection from './components/sections/FansSection';
import StatementsSection from './components/sections/StatementsSection';
import StatementsPage from './components/StatementsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('statistics');
  const [activeMainTab, setActiveMainTab] = useState('statements');

  const renderPage = () => {
    if (currentPage === 'statements') {
      return <StatementsPage onNavigateToStatistics={() => setCurrentPage('statistics')} />;
    }

    // Statistics page content
    const renderActiveSection = () => {
      switch (activeMainTab) {
        case 'statements':
          return <StatementsSection />;
        case 'overview':
          return <OverviewSection />;
        case 'engagement':
          return <EngagementSection />;
        case 'reach':
          return <ReachSection />;
        case 'fans':
          return <FansSection />;
        default:
          return <StatementsSection />;
      }
    };

    return (
      <>
        <StatisticsHeader />
        <MainTabs activeTab={activeMainTab} onTabChange={setActiveMainTab} />
        <BankingAlert />
        <div className="flex-1 flex">
          <div className="flex-1 p-6 min-w-0">
            {renderActiveSection()}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentPage={currentPage}
        onNavigateToStatements={() => setCurrentPage('statements')}
        onNavigateToStatistics={() => setCurrentPage('statistics')}
      />
      <div className="flex-1 flex flex-col min-w-0">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;