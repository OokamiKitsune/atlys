import React from 'react';
import 'tailwindcss/tailwind.css';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

 

// Import any other components or modules you need
const VendorPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <Layout>
          {/* Your page content goes here */}
          <div className="container mx-auto px-4 py-4 border">
            Vendor
            <p>
            Vendor ID: {id} 
            </p>
          </div>
        </Layout>
      );
    };
  
  export default VendorPage;
  