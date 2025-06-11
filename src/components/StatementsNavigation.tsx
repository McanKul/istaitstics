import React from 'react';
import { DollarSign, CreditCard, BarChart3, RotateCcw, Users } from 'lucide-react';

interface StatementsNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const StatementsNavigation = ({ activeSection, onSectionChange }: StatementsNavigationProps) => {
  const sections = [
    {
      id: 'earnings',
      label: 'EARNINGS',
      icon: DollarSign,
      active: activeSection === 'earnings'
    },
    {
      id: 'payout-requests',
      label: 'PAYOUT REQUESTS',
      icon: CreditCard,
      active: activeSection === 'payout-requests'
    },
    {
      id: 'earning-statistics',
      label: 'EARNING STATISTICS',
      icon: BarChart3,
      active: activeSection === 'earning-statistics'
    },
    {
      id: 'chargebacks',
      label: 'CHARGEBACKS',
      icon: RotateCcw,
      active: activeSection === 'chargebacks'
    },
    {
      id: 'referrals',
      label: 'REFERRALS',
      icon: Users,
      active: activeSection === 'referrals'
    }
  ];

  return (
    <nav className="space-y-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            section.active
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <section.icon size={18} />
          <span>{section.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default StatementsNavigation;