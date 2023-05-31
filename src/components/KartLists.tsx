// This component is the main component for the index page. It will show individual shopping lists.
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { DeleteForever, SmartButton, Edit } from '@mui/icons-material';
import { Hash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';


const KartLists: React.FC = () => {
    // Create state for kart list
    
    const [karts, setKarts] = useState<{ id: string; name: string; description: string; date: Date; item_count: number}[]>([]);
    
    
    // Creating a new kart

    
    const [newKart, setNewKart] = useState('');
    const [newDescription, setNewDescription] = useState('');
    // Add the current date of when the kart was created
    const [date, setDate] = useState(new Date());
    // Add a new kart
    

    
    const handelFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { // e is the event object
        e.preventDefault(); // Prevent the page from reloading
        
        // Stop user from creating a kart with no name
        if (newKart.trim() === '') {
            alert('A kart name is required.');
            // highlight the kart name input
            
            
        return;
    }
        
        // Create a new kart object
        
        const newKartObject = {
            id: uuidv4(),
            name: newKart,
            description: newDescription,
            date: new Date(),
            item_count : 0,
    };
    // add the new kart to the list
    setKarts([...karts, newKartObject]);

    setNewKart(''); // Reset the input
    setNewDescription(''); // Reset the input

    
}; // End of handelFormSubmit
    
    // Delete a kart
    const deleteKart = (id: string, name: string) => {
        const kartName = name;
        const confirmDelete = confirm('Are you sure you want to delete the ' + kartName + ' kart?');
        // Filter out the kart with the matching id
        const filteredKarts = karts.filter((karts) => karts.id !== id);
        // Update the kart list
        if (confirmDelete === true) {
            setKarts(filteredKarts);

        };
    }; // End of deleteKart
    
    
    return (
        
        
        <><div className="container mx-auto px-4 py-4 border text-center">
            <h1 className="text-2xl">Your Karts</h1>
            <p className="text-1xl">You have {karts.length} karts.</p>
            {karts.map((kart) => (
                <div key={kart.id}>
                    <div className="flex justify-between ">
                    <h2 className="text-1xl text-purple-500">{kart.name}</h2>
                    <p>Details: {kart.description}</p>
                    <p>Current items: {kart.item_count}</p>
                    <p>Created: {kart.date.toLocaleDateString()}</p>
                    <p>{kart.id}</p>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => deleteKart(kart.id, kart.name)}><DeleteForever /></button>
                    </div>
                </div>

            ))}
        </div>
        
        <div className="">
                <h1>Create a new Kart</h1>
                <form onSubmit={handelFormSubmit}>
                    <label htmlFor="name">Kart Name</label>
                    <input 
                    className='border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full'
                    type="text"
                    id="name"
                    value={newKart}
                    placeholder='Enter Kart Name'
                    onChange={(e) => setNewKart(e.target.value)}
                    />


                    <label htmlFor="description">Description</label>
                    <input 
                    className='border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full' 
                    type="text"
                    id="description"
                    value={newDescription}
                    placeholder='Describe your kart'
                    onChange={(e) => setNewDescription(e.target.value)}
                    />
                    
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" type="submit">
                        Create Kart
                    </button>
                </form>
            </div> 
        </>
    ); 
}; // End of KartLists

export default KartLists;
