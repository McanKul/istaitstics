import React from 'react';
import { Star, MessageCircle, Percent, Lock, MoreHorizontal } from 'lucide-react';

const FanCard = () => {
  return (
    <div className="space-y-4">
      {/* Sub tabs for fan details */}
      <div className="flex space-x-4">
        <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
          Total
        </button>
        <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full text-sm">
          Subscriptions
        </button>
        <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full text-sm">
          Tips
        </button>
        <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full text-sm">
          Messages
        </button>
      </div>

      {/* Fan profile */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div>
            <h4 className="font-semibold">Adam</h4>
            <p className="text-sm text-gray-500">@urdadlikesme</p>
          </div>
        </div>
        <button>
          <MoreHorizontal size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-2 text-sm">
        <button className="flex items-center space-x-1 text-blue-600">
          <Star size={14} />
          <span>Add to favorites and other lists</span>
        </button>
      </div>

      <div className="flex space-x-2">
        <button className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          <MessageCircle size={14} />
          <span>Message</span>
        </button>
        <button className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          <Percent size={14} />
          <span>Discount</span>
        </button>
        <button className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          <Lock size={14} />
          <span>Restrict</span>
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          A
        </button>
      </div>

      {/* Subscription details */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex border-b border-gray-100">
          <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-medium text-sm">
            SUBSCRIPTION
          </button>
          <button className="px-4 py-2 text-gray-500 text-sm">
            EARNINGS
          </button>
          <button className="px-4 py-2 text-gray-500 text-sm">
            OFFERS
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Current subscription</span>
            <span className="font-medium">$3.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">New price</span>
            <span className="font-medium">$20.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Started</span>
            <span className="font-medium">Jun 5, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total duration</span>
            <span className="font-medium">2 days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Renews</span>
            <span className="font-medium">Jul 5, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rebill</span>
            <span className="font-medium">On</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanCard;