import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Table } from '@mui/material';
import { Component, Product } from './sharedTypes';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Tab } from '@mui/base';


type initProduct = { 
    [K in keyof Product]: Product[K];
};


interface AddProductDialogProps {
    isOpen: boolean;
    onClose: () => void; 
    onSave: (product: Product) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
    isOpen,
    onClose,
    onSave,
}) => {
    const [createdProduct, setCreatedProduct] = useState<Product | null>(null);

    // Sample options data, replace it with your own data
    const productList: initProduct[] = [
        {
            id: '1',
            name: 'Product 1',
            description: 'This is the first product',
            created: new Date(),
            updated: new Date(),
            status: 'Available',
            version: '1.0',
            item_count: 10,
            sku: '123456',
            bin_location: 'A1',
            quantity: 10,
            retail_price: 10,
            serial_number: '123456',
            components: [],
            images: [],
            buildable: true,
            cost_estimate: 10,
        },

    ];

    // Close the dialog
    const closeDialog = () => {
        setCreatedProduct(null);
        onClose();
    };

    // Add and save the new product
    const addProduct = () => {
        if (!createdProduct) {
            alert('Error: Please enter a product to create.');
            return;
        }
        // Call the onSave function with the new product
        onSave(createdProduct);

        // Reset the form fields after adding the product
        setCreatedProduct(null);
    }
}

export default AddProductDialog;