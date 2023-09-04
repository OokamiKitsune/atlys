import React, { useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import Layout from '@/components/Layout';
import Chart from 'chart.js/auto';
import ContactCard from '@/components/ContactCard';
import DashboardCharts from '@/components/charts/DashboardCharts';

const IndexPage: React.FC = () => {
  return (
    <Layout>
    <div className="container mx-auto px-4 py-4 border text-4xl">
      <h1>Welcome, user</h1>
      <DashboardCharts />
    </div>
    </Layout>

  );
};

export default IndexPage;
