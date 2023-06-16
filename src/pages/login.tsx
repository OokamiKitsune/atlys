import React, { FC } from 'react';
import Layout from '@/components/Layout';
import { Login } from '@mui/icons-material';
import {SessionProvider, signIn, signOut, useSession} from 'next-auth/react';


// Example usage
const LoginPage = () => {


  const { data } = useSession(); 
  const handleSignIn = () => {
    signIn('Google'); // Replace 'provider-name' with your chosen authentication provider
  };

  const handleSignOut = () => {
    signOut();
  };

const LoginPage: React.FC = () => {
  return (
    

    <Layout>
    <SessionProvider>
      {/* Your page content goes here */}
      <div className="container mx-auto px-4 py-4 border">
        <h1>Login</h1>
        {JSON.stringify(data, null, 2)} // 
      </div>
      </SessionProvider>

    </Layout>

  );
};
};

export default LoginPage;
