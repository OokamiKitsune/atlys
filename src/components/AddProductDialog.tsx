import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  ImageList,
  Switch,
  FormControl,
  InputLabel,
  Select,
  Menu,
  MenuItem,
} from "@mui/material";
import { Component, Product } from "./sharedTypes";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Tab } from "@mui/base";
import { ArrowDropDown, Label, Upload } from "@mui/icons-material";
import AddComponentDialog from "./AddComponentDialog";
import FormLayout from "./ProductLayout/FormLayout";


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
  const [createdProduct, setCreatedProduct] = useState<Product | null>({
    id: "",
    name: "",
    description: "",
    created: new Date(),
    updated: new Date(),
    status: "Active",
    version: "",
    item_count: 0,
    sku: "",
    bin_location: "",
    quantity: 0,
    retail_price: 0,
    serial_number: "",
    components: [],
    images: [],
    buildable: false,
    cost_estimate: 0,

  });

  // Sample options data, replace it with your own data
  const productList: initProduct[] = [
    {
      id: "1",
      name: "test product",
      description: "This is the first product",
      created: new Date(),
      updated: new Date(),
      status: "Active",
      version: "1.0",
      item_count: 10,
      sku: "123456",
      bin_location: "A1",
      quantity: 10,
      retail_price: 10,
      serial_number: "123456",
      components: [],
      images: [],
      buildable: false,
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
    if (!createdProduct?.name) {
      alert("Error: Please enter a product to create.");
      return;
    }
    // Call the onSave function with the new product
    onSave(createdProduct);

    // Reset the form fields after adding the product
    setCreatedProduct(null);
  };

  const handleChangeStatus = (event: React.ChangeEvent<{ value: string }>) => {
    const newStatus = event.target.value;
  
    setCreatedProduct(prevProduct => ({
      ...prevProduct,
      status: newStatus,
      id: prevProduct?.id || "",
    }));
  };

  // Return JSX
  return (
    <Dialog open={isOpen} onClose={closeDialog} maxWidth="lg" fullWidth>
      <DialogTitle>Create a new Product</DialogTitle>
      <DialogContent>
        <p></p>
        <br />
        <div>
          <div className="mb-4">
            <h1><b>Product Details</b></h1>
          </div>
          <FormLayout product={productList[0]} status="Inactive" handleChange={handleChangeStatus} />
        </div>

        <div></div>

        <ImageList className="mt-4 ">
          <label className="cursor-pointer">
            <Button
              variant="contained"
              component="span"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            >
              <Upload /> Upload Product Image
            </Button>
            <input type="file" className="hidden" />
          </label>
        </ImageList>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeDialog} color="secondary">
          Cancel
        </Button>
        <Button onClick={addProduct} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default AddProductDialog;
