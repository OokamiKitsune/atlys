import React from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

const SingleInventoryPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // Add code to fetch and display the product with the given id here
  return (

    <Layout>
          {/* Your page content goes here */}
          <div className="container mx-auto px-4 py-4 border">
          <h1>Inventory Details</h1>
      <p>SKU: {id}</p>
      {/* Display product details */}
          </div>
        </Layout>
  );
};

export default SingleInventoryPage;
