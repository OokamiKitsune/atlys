import React from 'react';
import 'tailwindcss/tailwind.css';
import ItemList from '@/components/ItemList';
import KartLists from '@/components/KartLists';
import Layout from '@/components/Layout';

// Import any other components or modules you need
const IndexPage: React.FC = () => {
    return (
        <Layout>
          {/* Your page content goes here */}
          <div className="container mx-auto px-4 py-4 border">
            Purchase Orders
          </div>
        </Layout>
      );
    };
  
  export default IndexPage;
  