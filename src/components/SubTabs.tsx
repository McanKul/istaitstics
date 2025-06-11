import React from 'react';

interface SubTabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SubTabs = ({ tabs, activeTab, onTabChange }: SubTabsProps) => {
  return (
    <div className="mb-4">
      <nav className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-4 rounded-full font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SubTabs;