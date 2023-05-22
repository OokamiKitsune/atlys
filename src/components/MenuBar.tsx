import React, { useState, useEffect } from 'react';
import itemData from '../items.json';
import 'tailwindcss/tailwind.css';

const Menubar: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
            <div className="flex justify-between py-4">
            <div>
                <a href="#" className="text-2xl font-bold">Kart</a>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className="px-2 py-1 text-gray-400 hover:text-white">Login</a></li>
                    <li><a href="#" className="px-2 py-1 text-gray-400 hover:text-white">Register</a></li>
                    </ul>
            </nav>
            </div>
      </div>
    </div>
    );

};



export default Menubar;