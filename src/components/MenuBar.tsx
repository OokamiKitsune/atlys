import React, { useState, useEffect } from 'react';
import itemData from '../items.json';
import 'tailwindcss/tailwind.css';
import { Login } from '@mui/icons-material';

const Menubar: React.FC = () => {
    return (
        
        <div className="bg-slate-800 text-white text-center text-1xl bg-gradient-to-t">
            <div className="container mx-auto px-4">
            <div className="flex justify-between py-5">
            <div>
                <a href="#" className="text-2xl">🛒 Smart Kart</a>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full">Login <Login /></a></li>
                    
                    </ul>
            </nav>
            </div>
      </div>
    </div>
    );

};



export default Menubar;