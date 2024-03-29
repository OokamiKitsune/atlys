import React from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';


const ProductItemPage: React.FC = () => {
  const router = useRouter();
  const { productId } = router.query;

  // Add code to fetch and display the product with the given id here
  return (

    <Layout>
          {/* Your page content goes here */}
          <div className="container mx-auto px-4 py-4 border">
          <h1>Product Details</h1>
      <p>Product ID: {productId}</p>
      <p>Product Name: {}</p>
      {/* Display product details */}
          </div>
        </Layout>
  );
};

export default ProductItemPage;
