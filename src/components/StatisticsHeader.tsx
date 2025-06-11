import React from 'react';
import { ArrowLeft, HelpCircle } from 'lucide-react';

interface Props {
  onBack?: () => void;
}

const StatisticsHeader = ({ onBack }: Props) => (
  <header className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold">STATISTICS</h1>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <HelpCircle size={20} className="text-gray-600" />
      </button>
    </div>
  </header>
);

export default StatisticsHeader;
