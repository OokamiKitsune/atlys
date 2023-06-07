import React from 'react';
import Layout from '@/components/Layout';
import { Login } from '@mui/icons-material';
import {signIn, signOut, useSession} from 'next-auth/client'; 


// Example usage
const LoginPage = () => {
  const [session, loading] = useSession();

  const handleSignIn = () => {
    signIn('Google'); // Replace 'provider-name' with your chosen authentication provider
  };

  const handleSignOut = () => {
    signOut();
  };

const LoginPage: React.FC = () => {
  return (
    <Layout>
      {/* Your page content goes here */}
      <div className="container mx-auto px-4 py-4 border">
        <h1>Login</h1>
      </div>
    </Layout>
  );
};
};
export default LoginPage;
