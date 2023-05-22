import React from 'react';
import '../global.css';
import 'tailwindcss/tailwind.css';
import ItemList from '@/components/ItemList';
import Menubar from '@/components/MenuBar';

// Import any other components or modules you need
const IndexPage: React.FC = () => {
    return (
      <>
      <div className="text-center text-2xl">
        <Menubar />
      </div>


      <div className="text-3xl text-center">
          <ItemList />
        </div>
      
      </>

    );
  };
  
  export default IndexPage;
  