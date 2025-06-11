import React from 'react';
import {
  Home,
  Bell,
  MessageCircle,
  Bookmark,
  Shield,
  Clock,
  FileText,
  BarChart3,
  User,
  MoreHorizontal,
  Plus,
} from 'lucide-react';

interface SidebarProps {
  currentPage: 'statements' | 'statistics' | string;
  onNavigateToStatements: () => void;
  onNavigateToStatistics: () => void;
}

const Sidebar = ({
  currentPage,
  onNavigateToStatements,
  onNavigateToStatistics,
}: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Home', onClick: () => {} },
    { icon: Bell, label: 'Notifications', onClick: () => {} },
    { icon: MessageCircle, label: 'Messages', onClick: () => {} },
    { icon: Bookmark, label: 'Collections', onClick: () => {} },
    { icon: Shield, label: 'Vault', onClick: () => {} },
    { icon: Clock, label: 'Queue', onClick: () => {} },
    { icon: FileText, label: 'Statements', onClick: onNavigateToStatements },
    { icon: BarChart3, label: 'Statistics', onClick: onNavigateToStatistics },
    { icon: User, label: 'My profile', onClick: () => {} },
    { icon: MoreHorizontal, label: 'More', onClick: () => {} },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">:)</span>
          </div>
        </div>
      </div>

      {/* nav */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map(({ icon: Icon, label, onClick }) => {
            const active = label.toLowerCase() === currentPage;
            return (
              <li key={label}>
                <button
                  onClick={onClick}
                  className={`group w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition duration-200 relative ${
                    active
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    size={20}
                    className={`relative z-10 transition-transform ${
                      active
                        ? 'text-blue-600'
                        : 'text-gray-500 group-hover:text-gray-700 group-hover:scale-110'
                    }`}
                  />
                  <span
                    className={`relative z-10 ${
                      active ? 'font-semibold' : 'group-hover:font-medium'
                    }`}
                  >
                    {label}
                  </span>
                  {active && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* new post */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:to-blue-700 text-white font-semibold py-3 transition duration-200 hover:shadow-lg">
          <Plus size={20} className="transition-transform group-hover:rotate-90" />
          <span>NEW POST</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
