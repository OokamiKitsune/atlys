import React from 'react';
import 'tailwindcss/tailwind.css';
import ItemList from '@/components/ItemList';
import KartLists from '@/components/KartLists';
import Layout from '@/components/Layout';

// Import any other components or modules you need
const ProductPage: React.FC = () => {
    return (
        <Layout>
          {/* Your page content goes here */}
          <div className="container mx-auto px-4 py-4 border">
            <KartLists />
          </div>
        </Layout>
      );
    };
  
  export default ProductPage;
  