// EditKartDialog.tsx
import React, { useState } from 'react';
import {Product} from './sharedTypes';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface EditKartDialogProps {
  product: Product;
  onSave: (editedName: string, editedDescription: string) => void;
  onClose: () => void;
}

const EditKartDialog: React.FC<EditKartDialogProps> = ({ product, onSave, onClose }) => {
  const [editedName, setEditedName] = useState(product.name);
  const [editedDescription, setEditedDescription] = useState(product.description);

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

export default EditKartDialog;
