import React from 'react';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Chart as ChartJS,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Range, inRange } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const raw = [
  { date: '2025-05-09', value: 2 },
  { date: '2025-05-16', value: 3 },
  { date: '2025-05-30', value: 12 },
  { date: '2025-06-05', value: 3 },
];

const EarningsChart = ({ dateRange }: { dateRange: Range }) => {
  const data = raw.filter((p) => inRange(new Date(p.date), dateRange));

  return (
    <Line
      data={{
        labels: data.map((d) => d.date),
        datasets: [
          {
            data: data.map((d) => d.value),
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59,130,246,0.2)',
            tension: 0.3,
          },
        ],
      }}
      options={{ scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }}
      height={120}
    />
  );
};

export default EarningsChart;
