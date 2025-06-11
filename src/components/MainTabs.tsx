import React from 'react';

interface MainTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = ['STATEMENTS', 'OVERVIEW', 'ENGAGEMENT', 'REACH', 'FANS'];

const MainTabs = ({ activeTab, onTabChange }: MainTabsProps) => (
  <div className="bg-white border-b border-gray-200">
    <nav className="flex space-x-8 px-6">
      {tabs.map((t) => {
        const id = t.toLowerCase();
        const active = id === activeTab;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
              active
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t}
          </button>
        );
      })}
    </nav>
  </div>
);

export default MainTabs;
