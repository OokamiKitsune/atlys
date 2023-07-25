import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert } from '@mui/material';
import KartLists from './KartLists';
import { Fullscreen } from '@mui/icons-material';

interface AddComponentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
  kartName: string;
}

const AddComponentDialog: React.FC<AddComponentDialogProps> = ({ isOpen, onClose, onSave, kartName }) => {
  const [newComponentDescription, setNewComponentDescription] = useState<string>('');
  const [newComponentName, setNewComponentName] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [hasTriedToSave, setHasTriedToSave] = useState<boolean>(false);

  const closeDialog = () => {
    if (newComponentName || newComponentDescription) {
        const confirmCancel = window.confirm('Unsaved data was entered. Are you sure you want to cancel?');
        if (!confirmCancel)
            return;
    }
    setNewComponentName('');
    setNewComponentDescription('');
    onClose();
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    setHasTriedToSave(false);
  };

  const saveComponent = () => {
    // Validate the input
    if (!newComponentName || !newComponentDescription) {
        setHasTriedToSave(true);
  
      // Clear the error message after 2 seconds
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000);
  
      return;
    }
  
    // Call the onSave function with the new component
    onSave(newComponentName, newComponentDescription);
  
    // Show the success message
    setShowSuccessMessage(true);
  
    // Close the dialog after 2 seconds
    setTimeout(() => {
      closeDialog();
    }, 2000);
  };
  

  return (
    <Dialog open={isOpen} onClose={closeDialog}>
        <Alert severity="success" onClose={() => setShowSuccessMessage(false)}>
        Component added successfully!
        </Alert>
        {hasTriedToSave && !newComponentName && !newComponentDescription && (
        <Alert severity="error" onClose={() => setShowErrorMessage(false)}>
        Error: Component name and description cannot be empty.
        </Alert>
        )}
      <DialogTitle>Adding Component to <b>{kartName}</b></DialogTitle>
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
