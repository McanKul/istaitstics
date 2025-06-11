import React from 'react';
import { AlertTriangle } from 'lucide-react';

const BankingAlert = () => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-6 mt-6 flex items-center space-x-3">
    <AlertTriangle size={20} className="text-red-500" />
    <p className="text-red-700">
      Please complete filling out your{' '}
      <a href="#" className="text-blue-600 hover:underline">
        Banking information
      </a>
    </p>
  </div>
);

export default BankingAlert;
