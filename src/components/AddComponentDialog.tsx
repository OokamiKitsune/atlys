import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import KartLists from './KartLists';
import kart from './KartLists'

interface AddComponentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}

const AddComponentDialog: React.FC<AddComponentDialogProps> = ({ isOpen, onClose, onSave }) => {
  const [newComponentDescription, setNewComponentDescription] = useState<string>('');
  const [newComponentName, setNewComponentName] = useState<string>('');

  const closeDialog = () => {
    setNewComponentName('');
    setNewComponentDescription('');
    onClose();
  };

  const saveComponent = () => {
    // Validate the input
    if (!newComponentName || !newComponentDescription) {
      alert('Error: Component name and description cannot be empty.');
      return;
    }

    // Call the onSave function with the new component
    onSave(newComponentName, newComponentDescription);

    // Close the dialog
    closeDialog();
  };

  return (
    <Dialog open={isOpen} onClose={closeDialog}>
      <DialogTitle>Add Component to {kart.name}</DialogTitle>
      <div className="text-xs flex justify-center">
      <p>Components are items or "pieces" that make up the sum of a product.</p>
      </div>
      <DialogContent>
        <br />
        <TextField
          label="Name"
          value={newComponentName}
          onChange={(e) => setNewComponentName(e.target.value)}
        />
        <br />
        <br />
        <TextField
          label="Description"
          value={newComponentDescription}
          onChange={(e) => setNewComponentDescription(e.target.value)}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="secondary">
          Cancel
        </Button>
        <Button onClick={saveComponent} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddComponentDialog;
