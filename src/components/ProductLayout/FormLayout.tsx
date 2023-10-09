import React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Product } from "../sharedTypes";

// This is the form layout for the product. It is used in the AddProductDialog.tsx file.
// It is also used in the EditProductDialog.tsx file.
interface ProductFormProps {
    product: Product;
    status: string;
    handleChange: (event: SelectChangeEvent<string>) => void;
}
// This function checks if the user is an admin.
function ifAdmin() {
    if (localStorage.getItem('role') === 'admin') {
        return true;
    } else {
        return false;
    }
}

const ProductForm: React.FC<ProductFormProps> = ({ product, status, handleChange }) => {

    return (
        <div>
            
            <TextField
                id="outlined-basic"
                helperText="ID of the product"
                label="Product Name"
                variant="outlined"
                defaultValue={product.name}
            />
            <TextField
                id="outlined-basic"
                label="Product Description"
                variant="outlined"
                defaultValue={product.description}
            />
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    onChange={(event: SelectChangeEvent<string>) => handleChange(event)}
                    label="Status"
                >
                    <MenuItem value={'Active'}>Active</MenuItem>
                    <MenuItem value={'Inactive'}>Inactive</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="outlined-basic"
                label="Product Version"
                variant="outlined"
                defaultValue={product.version}
            />
            <TextField
                id="outlined-basic"
                label="Product Item Count"
                variant="outlined"
                defaultValue={product.item_count}
            />
            <TextField
                id="outlined-basic"
                label="Product SKU"
                variant="outlined"
                defaultValue={product.sku}
            />
            <TextField
                id="outlined-basic"
                label="Product Bin Location"
                variant="outlined"
                defaultValue={product.bin_location}
            />
            <TextField
                id="outlined-basic"
                label="Product Quantity"
                variant="outlined"
                defaultValue={product.quantity}
            />
            <TextField
                id="outlined-basic"
                label="Product Retail Price"
                variant="outlined"
                defaultValue={product.retail_price}
            />
            <TextField
                id="outlined-basic"
                label="Product Serial Number"
                variant="outlined"
                defaultValue={product.serial_number}
            />
            <TextField
                id="outlined-basic"
                label="Product Cost Estimate"
                variant="outlined"
                defaultValue={product.cost_estimate}
            />
        </div>
    );
}
export default ProductForm;