import React from 'react';
import '../global.css';
import 'tailwindcss/tailwind.css';
import ItemList from '@/components/ItemList';


// Import any other components or modules you need
const IndexPage: React.FC = () => {
    return (
      <><div className="text-2xl">
        <h1>Welcome to Kart 🛒</h1>
      
      </div><div className="text-7xl">
          <ItemList />
        </div></>

    );
  };
  
  export default IndexPage;
  