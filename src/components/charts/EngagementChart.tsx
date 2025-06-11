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
  { date: '2025-05-09', value: 1 },
  { date: '2025-05-16', value: 1.5 },
  { date: '2025-05-30', value: 3 },
  { date: '2025-06-05', value: 2.4 },
];

const EngagementChart = ({ dateRange }: { dateRange: Range }) => {
  const data = raw.filter((d) => inRange(new Date(d.date), dateRange));

  return (
    <Line
      data={{
        labels: data.map((d) => d.date),
        datasets: [
          {
            data: data.map((d) => d.value),
            borderColor: '#06B6D4',
            backgroundColor: 'rgba(6,182,212,0.2)',
            tension: 0.3,
          },
        ],
      }}
      options={{ scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }}
      height={120}
    />
  );
};

export default EngagementChart;
