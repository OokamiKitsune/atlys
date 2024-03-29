import React from 'react';
import 'tailwindcss/tailwind.css';
import Layout from '@/components/Layout';

// Import any other components or modules you need
const InventoryPage: React.FC = () => {
    return (
        <Layout>
          {/* Your page content goes here */}
          <div className="container mx-auto px-4 py-4 border">
            Inventory
          </div>
        </Layout>
      );
    };
  
  export default InventoryPage;
  