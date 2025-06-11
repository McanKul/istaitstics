import React from 'react';
import { Image } from 'lucide-react';

const EmptyState = ({ message }: { message: string }) => (
  <div className="text-center py-12">
    <Image size={48} className="mx-auto text-gray-300 mb-4" />
    <p className="text-gray-500">{message}</p>
  </div>
);

export default EmptyState;
