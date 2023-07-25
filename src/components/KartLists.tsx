// This component is the main component for the index page. It will show individual shopping lists.
import React, { useState, useEffect } from 'react';
import {Kart, Component} from './sharedTypes';
import EditKartDialog from './EditKartDialog';
import AddComponentDialog from './AddComponentDialog';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import { DeleteForever, SmartButton, Edit, ShoppingBag, UsbOffRounded, Inventory, Build, ShoppingBasketRounded } from '@mui/icons-material';
import { Hash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import ItemList from './ItemList';


const KartLists: React.FC = () => { // FC = Functional Component. This is a React component that is a function.    
    const [karts, setKarts] = useState<Kart[]>([]); // Initialize the state with an empty array. Within this array will be a list of Kart objects.
    const [description, setDescription] = useState<string>('');
    const [name, setName] = useState<string>('');

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

    
    const [newKart, setNewKart] = useState<Kart>({ // 
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
    

        // Store kart properties in local storage
        useEffect(() => {
          localStorage.setItem('karts', JSON.stringify(karts))
    
          return () => {
            localStorage.removeItem('karts')
          }
        }, [karts]);

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // 
    
      if (name.trim() === '') {
        alert('Error: Kart name cannot be empty.');
        return;
      }
      if (description.trim() === '') {
        alert('Error: Kart description cannot be empty.');
        return;
      }
    
      const newKart: Kart = {
        id: uuidv4(),
        name: name,
        description: description,
        date: new Date(),
        updated: new Date(),
        status: 'NYI',
        item_count: 0,
        serial_number: '',
        cost_estimate: 0,
        images: '',
        buildable: false,
        version: 0,
        components: [],
      };
    
      setName(''); // Reset the name state to an empty string
      setDescription(''); // Reset the description state to an empty string
      setKarts([...karts, newKart]);
      
    };
    
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






    // EditKartDialog component
    
    const EditKartDialog: React.FC<{
      kart: Kart;
      onSave: (name: string, description: string) => void;
      onClose: () => void;
    }> = ({ kart, onSave, onClose }) => {
      const [editedName, setEditedName] = useState(kart.name);
      const [editedDescription, setEditedDescription] = useState(kart.description);
    
      const saveChanges = () => {
        // Perform the necessary actions to save changes
        onSave(editedName, editedDescription);
      };
    
      return (
        <Dialog open={true} onClose={onClose}>
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
      );
    };




// Edit a kart
const editKart = (id: string, name: string, description: string) => {
  const kartIndex = karts.findIndex((kart) => kart.id === id);

  if (kartIndex === -1) {
    alert('Error: Kart not found.');
    return;
  }

  const originalKart = karts[kartIndex];

  const handleSave = (editedName: string, editedDescription: string) => {
    // Update the kart object with the edited values
    originalKart.name = editedName;
    originalKart.description = editedDescription;

    // Create a new array with updated kart
    const updatedKarts = [...karts];
    updatedKarts[kartIndex] = originalKart;

    // Update the karts state with the updated array
    setKarts(updatedKarts);

    // Close the modal or form overlay
    handleClose(); // Make sure to define handleClose outside of editKart
  };

  const handleClose = () => {
    // Add the necessary logic here to close the overlay
    // ...
  };
  
  return ( // Return the EditKartDialog component
    <EditKartDialog
      kart={originalKart}
      onSave={handleSave}
      onClose={handleClose}
    />
  );
}; // End of editKart

    

 // Add component to a kart.
// Function will be passed to the KartItems component and create a new item in the kart.
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [newComponent, setNewComponent] = useState<Component>({
  id: '',
  name: '',
  description: '',
  item_count: 0,
  cost: 0,
  images: '',
  part_number: '',
  status: '',
  required: false,
});
const [newComponentDescription, setNewComponentDescription] = useState<string>('');

// Function to open the dialog
const openDialog = () => {
  setIsDialogOpen(true);
};

// Function to close the dialog and reset values
const closeDialog = () => {
  setIsDialogOpen(false);
  setNewComponent({
    id: '',
    name: '',
    description: '',
    item_count: 0,
    cost: 0,
    images: '',
    part_number: '',
    status: '',
    required: false,
  });
  setNewComponentDescription('');
};

const addItems = (id: string, name: string, description: string, item_count: number) => {
  // Find the kart with the matching id
  const kartIndex = karts.findIndex((karts) => karts.id === id);

  if (kartIndex === -1) {
    alert('Error: Kart not found.');
    return;
  }

  // Open the dialog
  openDialog();
};

// Save component
const saveComponent = () => {
  // Validate the input
  if (!newComponent.name || !newComponentDescription) {
    alert('Error: Component name and description cannot be empty.');
    return;
  }

  // Create a new component object
  const newComponentObject: Component = {
    ...newComponent,
    id: uuidv4(),
    description: newComponentDescription,
  };

  // Close the dialog
  closeDialog();

  // Find the kart with the matching id
  const kartIndex = karts.findIndex((karts) => karts.id === id);

  if (kartIndex === -1) {
    alert('Error: Kart not found.');
    return;
  }

  // Create a copy of the karts array
  const updatedKarts = [...karts];
  updatedKarts[kartIndex].components.push(newComponentObject);

  // Update the last updated date
  const updatedKart = updatedKarts[kartIndex];
  updatedKart.updated = new Date();
  updatedKarts[kartIndex] = updatedKart;
  setKarts(updatedKarts); // Update the karts state with the updated array
};


    
    
    return (
    <>

<div className="container mx-auto px-4 py-4 border text-center">
  <h1 className="text-2xl font-bold mb-1">Products</h1>
  <p className="text-lg">You have {karts.length} products.</p>
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
              <Inventory/> 
              Stock: {kart.item_count === 0 ? (<span className="text-red-500 font-bold animate-pulse">Out of Stock</span>) : (<span className="text-green-500">{kart.item_count}</span>)}
              <br></br>
              <ShoppingBasketRounded/>
              Components: {kart.components.length}
              <br></br>
              <Build/>
              Buildable: {kart.buildable === true ? (<span className="text-green-500">Yes</span>) : (<span className="text-red-500">No</span>)}
              
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
            <AddComponentDialog
              isOpen={isDialogOpen}
              onClose={closeDialog}
              onSave={saveComponent}
              kartName={kart.name}
            />
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
  <form onSubmit={handelSubmit}>
    <label htmlFor="name">Kart Name</label>
    <input 
      className='border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full'
      type="text"
      id="name"
      value={name}
      placeholder='Enter Kart Name'
      onChange={(e) => setName(e.target.value) }
    />

    <label htmlFor="description">Description</label>
    <input 
      className='border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full' 
      type="text"
      id="description"
      value={description}
      placeholder='Describe your kart'
      onChange={(e) => setDescription(e.target.value) }
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
