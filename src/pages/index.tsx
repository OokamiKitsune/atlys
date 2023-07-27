import React, { useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import Layout from '@/components/Layout';
import Chart from 'chart.js/auto';
import ContactCard from '@/components/ContactCard';

const IndexPage: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const built = [1, 52, 35, 85, 41, 50];

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6'],
            datasets: [
              {
                label: 'Products Built',
                data: [1, 52, 35, 85, 41, 50],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
              },
            ],
          },
        });
      }
    }
  }, []);

  return (
    <Layout>
      {/* Your page content goes here */}
      <div className="container mx-auto px-4 py-4 border text-4xl">
        <h1>Dashboard</h1>
        
        <canvas ref={chartRef} />
      </div>
    </Layout>
    
  );
};

export default IndexPage;
