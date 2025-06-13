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

const visitorsData = [
  { date: '2025-05-16', visitors: 2, duration: 0 },
  { date: '2025-05-23', visitors: 3, duration: 0 },
  { date: '2025-05-30', visitors: 4, duration: 0 },
  { date: '2025-06-06', visitors: 12, duration: 0 },
  { date: '2025-06-13', visitors: 8, duration: 0 },
];

const VisitorsChart = ({ dateRange }: { dateRange: Range }) => {
  const data = visitorsData.filter((p) => inRange(new Date(p.date), dateRange));

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 15,
        ticks: {
          stepSize: 5,
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
      'y1': {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        max: 0.5,
        ticks: {
          stepSize: 0.1,
          callback: function(value) {
            if (value === 0) return '0m 00s';
            if (value === 0.1) return '0m 10s';
            if (value === 0.2) return '0m 20s';
            return '';
          },
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
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
              label: 'Visitors',
              data: data.map((d) => d.visitors),
              borderColor: '#06B6D4',
              backgroundColor: '#06B6D4',
              pointBackgroundColor: '#FFFFFF',
              pointBorderColor: '#06B6D4',
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'Duration',
              data: data.map((d) => d.duration),
              borderColor: '#9CA3AF',
              backgroundColor: '#9CA3AF',
              pointBackgroundColor: '#FFFFFF',
              pointBorderColor: '#9CA3AF',
              fill: false,
              yAxisID: 'y1',
            },
          ],
        }}
        options={chartOptions}
      />
    </div>
  );
};

export default VisitorsChart;