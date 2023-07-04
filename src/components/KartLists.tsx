// This component is the main component for the index page. It will show individual shopping lists.
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import { DeleteForever, SmartButton, Edit, ShoppingBag } from '@mui/icons-material';
import { Hash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import ItemList from './ItemList';


// The data sctructure for a kart
interface Kart {
  id: string;
  name: string;
  description: string;
  date: Date;
  updated: Date;
  status: string;
  version: number;
  item_count: number;
  serial_number: string;
  buildable: boolean;
  cost_estimate: number;
  images: string;
  components: Component[];

}

interface Component {
  id: string;
  name: string;
  description: string;
  required: boolean;
  status: string;
  cost: number;
  item_count: number;
  part_number: string;
  images: string;
}


const KartLists: React.FC = () => { // FC = Functional Component. This is a React component that is a function.    
    const [karts, setKarts] = useState<Kart[]>([]); // Initialize the state with an empty array. Within this array will be a list of Kart objects.


    // Load the kart list from local storage
    useEffect(() => {
      const storedKarts = localStorage.getItem('karts');
      console.log(storedKarts);
      if (storedKarts) {
        const parsedKarts: Kart[] = JSON.parse(storedKarts);
        const kartsWithDateFixes = parsedKarts.map((kart) => ({
          ...kart,
          date: new Date(kart.date), // Convert the date string to a date object
          updated: new Date(kart.updated), // Convert the date string to a date object
        }));
        setKarts(kartsWithDateFixes);
      }
    },[]);


    // Initialize the state with an empty string for the kart name. This will be used to create a new kart.
    const [newKart, setNewKart] = useState<Kart>({ 
      // You need to add all the properties of the Kart object here. This is the same as the Kart interface.
        id: '',
        name: '',
        description: '',
        date: new Date(),
        updated: new Date(),
        status: '',
        version: 0,
        item_count: 0,
        serial_number: '',
        buildable: false,
        cost_estimate: 0,
        images: '',
        components: [],
      
    }); 


       // Create a new kart object
        
       const newKartObject: Kart = {
        id: uuidv4(),
        name: newKart.name,
        description: newKart.description,
        date: new Date(),
        updated: new Date(),
        status: 'active',
        item_count : 0,
        serial_number: '',
        cost_estimate: 0,
        images: '',
        buildable: false,
        version: 0,
        components: [], // Initialize the item list to an empty array
      };    
    
    

    // Add a new kart
    // Add the current date of when the kart was created
    const [date, setDate] = useState(new Date());
    const handelFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { // e is the event object
        e.preventDefault(); // Prevent the page from reloading
        
        // Stop user from creating a kart with no name
        if (newKart.name === '') {
            alert('Error: Kart name cannot be empty.');
            return; // Stop the function if the kart name is empty
        };



    // add the new kart to the kart list
    setKarts([...karts, newKartObject]);

    setNewKart({
        id: uuidv4(),
        name: '',
        description: '',
        date: new Date(),
        updated: new Date(),
        status: 'active',
        item_count : 0,
        serial_number: '',
        cost_estimate: 0,
        images: '',
        buildable: false,
        version: 0,
        components: [], // Initialize the item list to an empty array

    }); 

    setNewDescription({
      description: '',      
    });

    
}; // End of handelFormSubmit
    
    // Delete a kart
    const deleteKart = (id: string, name: string) => {
        const kartName = name;
        const confirmDelete = confirm('Are you sure you want to delete the ' + kartName + ' kart and all of its items?');
        // Filter out the kart with the matching id
        const filteredKarts = karts.filter((karts) => karts.id !== id); 
        // Update the kart list
        if (confirmDelete === true) {
            setKarts(filteredKarts); // Update the kart list

        };
    }; // End of deleteKart

    // Edit a kart
    const editKart = (id: string, name: string, description: string) => {
        const kartIndex = karts.findIndex((karts) => karts.id === id);

        if (kartIndex === -1) {
            alert('Error: Kart not found.');
            return;
        }

        const originalKart = karts[kartIndex];
        const updatedKart = { ...originalKart };

        // Setup a state variable to hold updated values
        const [editedName, setEditName] = useState(updatedKart.name); 
        const [editedDescription, setEditDescription] = useState(updatedKart.description);

        // Function to handel saving changes
        const saveChanges = () => {
            // Update the kart object with the edited values
            updatedKart.name = editedName;
            updatedKart.description = editedDescription;

            // Create a new array with updated kart
            const updatedKarts = [...karts];
            updatedKarts[kartIndex] = updatedKart;

            // Update the karts state with updated array
            setKarts(updatedKarts);

            // Close the modal or form overaly
            const handleClose = () => {
                // Add the nessary logic here to close the overaly
                return;

            };
        };  // End of saveChanges
        
        return (
            /* Edit Cart Dialog */

        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Edit Kart</DialogTitle>
            <DialogContent>
                <TextField
                label="Kart Name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                />
                <TextField
                label="Description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                multiline
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={saveChanges} color="primary">
                Save Changes
                </Button>
            </DialogActions>
            </Dialog>
        )

    }; // End of editKart


    // Store kart properties in local storage
    useEffect(() => {
      localStorage.setItem('karts', JSON.stringify(karts))

      return () => {
        localStorage.removeItem('karts')
      }
    }, [karts]);

    

    // Add items to a kart. 


    // Function will be passed to the KartItems component and create a new item in the kart.
    const addItems = (id: string, name: string, description: string, item_count: number) => {
        // Find the kart with the matching id
        const kartIndex = karts.findIndex((karts) => karts.id === id); 

        if (kartIndex === -1){
            alert('Error: Kart not found.');
            return;
        }

        const newItemName = prompt('Enter the name of the item you want to add to the ' + name + ' kart.');
        const newItemDescription = prompt('Enter a description for the ' + newItemName + ' item.');


        // Create new item object
        const newComponent = {
            id: uuidv4(),
            name: newItemName,
            description: newItemDescription,
            item_count: 0,


        };

        const updatedKarts = [...karts]; // Create a copy of the karts array
        updatedKarts[kartIndex].components.push(newComponent); 

        setKarts(updatedKarts); // Update the karts state with the updated array
    }


    
    
    return (
    <>

<div className="container mx-auto px-4 py-4 border text-center">
  <h1 className="text-2xl font-bold mb-1">Your Karts</h1>
  <p className="text-lg">You have {karts.length} karts.</p>
  </div>
  {karts.map((kart) => (
    <div key={kart.id}>
      <div className="container mx-auto px-4 py-4 border flex items-center justify-between my-4">
        <div className="flex flex-col">
          <h2 className="text-3xl text-purple-500 max-w-xs font-medium">
            {kart.name}
          </h2>
          <div className="flex flex-col items-start">
            <p className="text-lg text-gray-600 mb-5 max-w-xs overflow-hidden overflow-ellipsis">
              Description: {kart.description}
            </p>
            <p className="text-lg text-gray-600 mb-5 max-w-xs">
              Stock: {kart.item_count === 0 ? (<span className="text-red-500 font-bold animate-pulse">Out of Stock</span>) : (<span className="text-green-500">{kart.item_count}</span>)}
            </p>
            <p className="text-xs text-gray-600 mb-0 max-w-xs">
              <b>Created:</b> {kart.date.toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-600 mb-0 max-w-xs">
              <b>Last Updated:</b> {kart.updated.toISOString().slice()} UTC</p>
            <p className="text-xs text-gray-500 mb-0 max-w-xs font-mono">
              <b>ID:</b> {kart.id}</p>
          </div>
        </div>
        <div className="flex flex-col">
            <Button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded max-w-xs mb-1"
            onClick={() => addItems(kart.id, kart.name, kart.description, kart.item_count)}>
            <ShoppingBag /> Add Component
            </Button>
            
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded max-w-xs mb-1"
            onClick={() => editKart(kart.id, kart.name, kart.description)}
          >
            <Edit /> Edit Kart
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded max-w-xs"
            onClick={() => deleteKart(kart.id, kart.name)}
          >
            <DeleteForever /> Delete
          </Button>
        </div>
      </div>
    </div>
  ))}


        
        <div className="">
                <h1>Create a new Kart</h1>
                <form onSubmit={handelFormSubmit}>
                    <label htmlFor="name">Kart Name</label>
                    <input 
                    className='border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full'
                    type="text"
                    id="name"
                    value={newKart.name}
                    placeholder='Enter Kart Name'
                    onChange={(e) => setNewKart(e.target.value)}
                    />


                    <label htmlFor="description">Description</label>
                    <input 
                    className='border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full' 
                    type="text"
                    id="description"
                    value={newKart.description}
                    placeholder='Describe your kart'
                    onChange={(e) => setNewDescription(e.target.value)}
                    />
                    
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" type="submit">
                        Create Kart
                    </Button>
                </form>
            </div> 
        </>
    ); 
}; // End of KartLists

export default KartLists;
