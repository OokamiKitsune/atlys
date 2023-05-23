import React, { useState, useEffect } from 'react';
import itemData from '../items.json';
import 'tailwindcss/tailwind.css';
import { Login } from '@mui/icons-material';

const Menubar: React.FC = () => {
    return (
        
        <div className="bg-blue-700 text-white text-center text-2xl">
            <div className="container mx-auto px-4">
            <div className="flex justify-between py-4">
            <div>
                <a href="#" className="text-4xl font-bold">🛒</a>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className="px-2 py-1 text-gray-400 hover:text-white">Login <Login /></a></li>
                    </ul>
            </nav>
            </div>
      </div>
    </div>
    );

};



export default Menubar;