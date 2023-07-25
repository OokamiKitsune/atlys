import React, { useState, useEffect } from 'react';
import itemData from '../items.json';
import 'tailwindcss/tailwind.css';
import { Login } from '@mui/icons-material';
import ResponsiveAppBar from './MenuButtons';
const Menubar: React.FC = () => {
    return (
        
        <div className="bg-slate-800 text-white text-center text-1xl bg-gradient-to-t">
            <ResponsiveAppBar />  
            
      </div>
    );

};



export default Menubar;