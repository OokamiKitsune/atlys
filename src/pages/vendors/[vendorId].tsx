import React from 'react';
import 'tailwindcss/tailwind.css';
import Layout from '@/components/Layout';
import { Vendor } from '@/components/sharedTypes';
import { useRouter } from 'next/router';

interface VendorPageProps {
  vendor: Vendor;
}

// Import any other components or modules you need
const VendorPage: React.FC<VendorPageProps> = ({ vendor }) => {
    const router = useRouter();
    const { vendorId } = router.query;
    return (
        <Layout>
          {/* Your page content goes here */}
          <div className="container mx-auto px-4 py-4 border">
          Vendor ID: {vendorId} 
            Vendor: {vendor.name}
            Phone: {vendor.phone}
            Email: {vendor.email}
            Address: {vendor.address}
            <p>

            </p>
          </div>
        </Layout>
      );
    };
  
  export default VendorPage;
  