import React from 'react';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Chart as ChartJS,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Range, inRange } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const raw = [
  { date: '2025-05-16', value: 0 },
  { date: '2025-05-23', value: 0 },
  { date: '2025-05-30', value: 12 },
  { date: '2025-06-06', value: 3 },
  { date: '2025-06-13', value: 0 },
];

const EarningsChart = ({ dateRange }: { dateRange: Range }) => {
  const data = raw.filter((p) => inRange(new Date(p.date), dateRange));

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 15,
        ticks: {
          stepSize: 5,
          callback: function(value) {
            return '$' + value;
          },
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#E5E7EB',
          drawBorder: false,
        },
        position: 'right',
      },
      x: {
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
          callback: function(value, index) {
            const labels = ['May 16,\n2025', 'May 23,\n2025', 'May 30,\n2025', 'Jun 06,\n2025', 'Jun 13,\n2025'];
            return labels[index] || '';
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            return '$' + context.parsed.y.toFixed(2);
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
      },
    },
  };

  return (
    <div className="relative h-full">
      <Line
        data={{
          labels: data.map((d) => d.date),
          datasets: [
            {
              data: data.map((d) => d.value),
              borderColor: '#06B6D4',
              backgroundColor: '#06B6D4',
              pointBackgroundColor: '#FFFFFF',
              pointBorderColor: '#06B6D4',
              fill: false,
            },
          ],
        }}
        options={chartOptions}
      />
    </div>
  );
};

export default EarningsChart;