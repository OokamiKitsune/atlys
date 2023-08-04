import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Component } from './sharedTypes';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface AddComponentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (component: Component) => void;
  productName: string;
}

const AddComponentDialog: React.FC<AddComponentDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  productName,
}) => {
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  
  // Sample options data, replace it with your own data
  const componentList = [
    { title: 'Component A' },
    { title: 'Component B' },
    { title: 'Component C' },
    // ... add more options
  ];

  // Close the dialog
  const closeDialog = () => {
    setSelectedComponent('');
    onClose();
  };

  // Add and save the new component
  const addComponent = () => {
    if (!selectedComponent) {
      alert('Error: Please select a component.');
      return;
    }

    // Call the onSave function with the new component
    onSave(selectedComponent);

    // Reset the form fields after adding the component
    setSelectedComponent('');
  };

  return (
    <Dialog open={isOpen} onClose={closeDialog} maxWidth="lg" fullWidth>
      <DialogTitle>Add Component to <b>{productName}</b></DialogTitle>
      <DialogContent>
        <p>Search for a component to add. Components shown are what is available in inventory.</p>
        <br />
        <Autocomplete
          options={componentList}
          getOptionLabel={(option) => option.title}
          value={selectedComponent}
          onChange={(event, newValue) => setSelectedComponent(newValue)}
          renderInput={(params) => <TextField {...params} label="Name" required />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="secondary">
          Cancel
        </Button>
        <Button onClick={addComponent} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddComponentDialog;
