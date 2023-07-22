// EditKartDialog.tsx
import React, { useState } from 'react';
import {Kart} from './sharedTypes';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

interface EditKartDialogProps {
  kart: Kart;
  onSave: (editedName: string, editedDescription: string) => void;
  onClose: () => void;
}

const EditKartDialog: React.FC<EditKartDialogProps> = ({ kart, onSave, onClose }) => {
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

export default EditKartDialog;
