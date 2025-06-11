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
  { date: '2025-05-09', value: 0 },
  { date: '2025-05-30', value: 12 },
  { date: '2025-06-05', value: 3 },
];

const FansChart = ({ dateRange }: { dateRange: Range }) => {
  const data = raw.filter((d) => inRange(new Date(d.date), dateRange));

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

export default FansChart;
