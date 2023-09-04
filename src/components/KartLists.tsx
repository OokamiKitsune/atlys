// This component is the main component for the index page. It will show individual shopping lists.
import React, { useState, useEffect } from "react";
import { Product, Component } from "./sharedTypes";
import EditKartDialog from "./EditKartDialog";
import AddComponentDialog from "./AddComponentDialog";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import {
  DeleteForever,
  SmartButton,
  Edit,
  ShoppingBag,
  UsbOffRounded,
  Inventory,
  Build,
  ShoppingBasketRounded,
  Add,
  Delete,
  Email,
  LocationOn,
  Phone,
} from "@mui/icons-material";
import { Hash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Box,
  Card,
  IconButton,
  Stack,
  Typography,
  ButtonBaseActions,
} from "@mui/material";
import ItemList from "./ItemList";
import { grey } from "@mui/material/colors";
import AddProductDialog from "./AddProductDialog";

// !!!Kart is being renamed to Product!!!
const KartLists: React.FC = () => {
  // FC = Functional Component. This is a React component that is a function.
  const [products, setProducts] = useState<Product[]>([]); // Initialize the state with an empty array. Within this array will be a list of Product objects.
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");

  // Load the kart list from local storage
  useEffect(() => {
    const storedProducts = localStorage.getItem("karts");
    console.log(storedProducts);
    if (storedProducts) {
      const parsedProducts: Product[] = JSON.parse(storedProducts);
      const productsWithDateFixes = parsedProducts.map((product) => ({
        ...product,
        date: new Date(product.created), // Convert the date string to a date object
        updated: new Date(product.updated), // Convert the date string to a date object
      }));
      setProducts(productsWithDateFixes);
    }
  }, []);

  const [newProduct, setNewProduct] = useState<Product>({
    //
    id: "",
    name: "",
    description: "",
    created: new Date(),
    updated: new Date(),
    status: "Active",
    version: "",
    item_count: 0,
    serial_number: "",
    buildable: false,
    cost_estimate: 0,
    images: [],
    components: [],
    bin_location: "",
    sku: "",
    retail_price: 0,
    quantity: 0,
  });

  // Store kart properties in local storage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));

    return () => {
      localStorage.removeItem("products");
    };
  }, [products]);

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //

    if (name.trim() === "") {
      alert("Error: Product name cannot be empty.");
      return;
    }
    if (description.trim() === "") {
      alert("Error: Product description cannot be empty.");
      return;
    }

    const newProduct: Product = {
      id: uuidv4(),
      name: name,
      description: description,
      created: new Date(),
      updated: new Date(),
      status: "Active",
      item_count: 0,
      serial_number: "",
      cost_estimate: 0,
      retail_price: 0,
      quantity: 0,
      images: [],
      buildable: false,
      version: "",
      components: [],
      sku: "",
      bin_location: "",
    };

    setName(""); // Reset the name state to an empty string
    setDescription(""); // Reset the description state to an empty string
    setProducts([...products, newProduct]);
  };

  // Delete a product
  const deleteProduct = (id: string, name: string) => {
    const productName = name;
    const confirmDelete = confirm(
      "Are you sure you want to delete " +
        productName +
        " and all of its items?"
    );
    // Filter out the kart with the matching id
    const filteredProducts = products.filter((products) => products.id !== id);
    // Update the kart list
    if (confirmDelete === true) {
      setProducts(filteredProducts); // Update the product list
    }
  }; // End of deleteProduct

  // EditKartDialog component

  const EditKartDialog: React.FC<{
    product: Product;
    onSave: (name: string, description: string) => void;
    onClose: () => void;
  }> = ({ product: product, onSave, onClose }) => {
    const [editedName, setEditedName] = useState(product.name);
    const [editedDescription, setEditedDescription] = useState(
      product.description
    );

    const saveChanges = () => {
      // Perform the necessary actions to save changes
      onSave(editedName, editedDescription);
    };

    return (
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
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
  const editProduct = (id: string, name: string, description: string) => {
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      alert("Error: Product was not found.");
      return;
    }

    const originalProduct = products[productIndex];

    const handleSave = (editedName: string, editedDescription: string) => {
      // Update the kart object with the edited values
      originalProduct.name = editedName;
      originalProduct.description = editedDescription;

      // Create a new array with updated kart
      const updatedProducts = [...products];
      updatedProducts[productIndex] = originalProduct;

      // Update the karts state with the updated array
      setProducts(updatedProducts);

      // Close the modal or form overlay
      handleClose(); // Make sure to define handleClose outside of editKart
    };

    const handleClose = () => {
      // Add the necessary logic here to close the overlay
      // ...
    };

    return (
      // Return the EditKartDialog component
      <EditKartDialog
        product={originalProduct}
        onSave={handleSave}
        onClose={handleClose}
      />
    );
  }; // End of editKart

  // Add component to a product.
  // Function will be passed to the ProductItems component and create a new item in the kart.
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newComponent, setNewComponent] = useState<Component>({
    id: "",
    name: "",
    description: "",
    quantity: 0,
    cost: 0,
    images: [],
    part_number: "",
    serial_number: "",
    status: "",
    required: false,
    bin_location: "",
    sku: "",
    upc: 0,
    vendor: [],
    tracking_number: "",
  });
  const [newComponentDescription, setNewComponentDescription] =
    useState<string>("");

  // Function to open the dialog
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // Function to close the dialog and reset values
  const closeDialog = () => {
    setIsDialogOpen(false);
    setNewComponent({
      id: "",
      name: "",
      description: "",
      quantity: 0,
      cost: 0,
      images: [],
      part_number: "",
      status: "",
      required: false,
      serial_number: "",
      bin_location: "",
      sku: "",
      upc: 0,
      vendor: [],
      tracking_number: "",
    });
    setNewComponentDescription("");
  };

  const addItems = (
    id: string,
    name: string,
    description: string,
    item_count: number
  ) => {
    // Find the kart with the matching id
    const productIndex = products.findIndex((karts) => karts.id === id);

    if (productIndex === -1) {
      alert("Error: Product was not found.");
      return;
    }

    // Open the dialog
    openDialog();
  };

  // Save component
  const saveComponent = () => {
    // Validate the input
    if (!newComponent.name || !newComponentDescription) {
      alert("Error: Component name and description cannot be empty.");
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

    // Find the product with the matching id
    const id = newComponentObject.id;
    const productIndex = products.findIndex((products) => products.id === id);

    if (productIndex === -1) {
      alert("Error: Product was not found.");
      return;
    }

    // Create a copy of the karts array
    const updatedProducts = [...products];
    updatedProducts[productIndex].components.push(newComponentObject);

    // Update the last updated date
    const updatedProduct = updatedProducts[productIndex];
    updatedProduct.updated = new Date();
    updatedProducts[productIndex] = updatedProduct;
    setProducts(updatedProducts); // Update the karts state with the updated array
  };

  return (
    <>
      <div className="container mx-auto px-4 py-4 border text-center">
        <h1 className="text-2xl font-bold mb-1">Products</h1>
        <p className="text-lg">You have {products.length} products.</p>
      </div>
      {products.map((product) => (
        <div key={product.id}>
          <div className="container mx-auto px-4 py-4 border flex items-center justify-between my-4">
            <div className="flex flex-col">
              <h2 className="text-3xl text-purple-500 max-w-xs font-medium">
                {product.name}
              </h2>
              <div className="flex flex-col items-start">
                <p className="text-lg text-gray-600 mb-5 max-w-xs overflow-hidden overflow-ellipsis">
                  Description: {product.description}
                </p>
                <p className="text-lg text-gray-600 mb-5 max-w-xs">
                  <Inventory />
                  Stock:{" "}
                  {product.item_count === 0 ? (
                    <span className="text-red-500 font-bold animate-pulse">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="text-green-500">{product.item_count}</span>
                  )}
                  <br></br>
                  <ShoppingBasketRounded />
                  Components: {product.components.length}
                  <br></br>
                  <Build />
                  Buildable:{" "}
                  {product.buildable === true ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </p>

                <p className="text-xs text-gray-600 mb-0 max-w-xs">
                  <b>Created:</b> {product.created.toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-600 mb-0 max-w-xs">
                  <b>Last Updated:</b> {product.updated.toISOString().slice()}{" "}
                  UTC
                </p>
                <p className="text-xs text-gray-500 mb-0 max-w-xs font-mono">
                  <b>ID:</b> {product.id}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <Button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded max-w-xs mb-1"
                onClick={() =>
                  addItems(
                    product.id,
                    product.name,
                    product.description,
                    product.item_count
                  )
                }
              >
                <ShoppingBag /> Add Component
              </Button>
              <AddComponentDialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                onSave={saveComponent}
                productName={product.name}
              />
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded max-w-xs mb-1"
                onClick={() =>
                  editProduct(product.id, product.name, product.description)
                }
              >
                <Edit /> Edit Product
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded max-w-xs"
                onClick={() => deleteProduct(product.id, product.name)}
              >
                <DeleteForever /> Delete
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="">
        <h1>Create a new Product</h1>
        <form onSubmit={handelSubmit}>
          <label htmlFor="name">Product Name</label>
          <input
            className="border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full"
            type="text"
            id="name"
            value={name}
            placeholder="Enter product name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <input
            className="border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full"
            type="text"
            id="description"
            value={description}
            placeholder="Describe your product"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded max-w-xs mb-1"
            onClick={openDialog}
          >
            <Add /> New Product
          </Button>
          <AddProductDialog
            isOpen={isDialogOpen}
            onClose={closeDialog}
            onSave={saveComponent}
          />
        </form>
      </div>
      <Card>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton>
            <Add sx={{ fontSize: 100 }} /> Add Product
          </IconButton>
        </Box>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack spacing={0.5}>
            <Typography fontWeight={700} fontSize={25}>
              Amazon Inc.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <LocationOn sx={{ color: grey[500] }} />
              Scranton, PA
              <br></br>
              <Phone sx={{ color: grey[500] }} />
              800-555-0123
              <br></br>
              <Email sx={{ color: grey[500] }} />
              jeff.bezos@amazon.com
            </Typography>
          </Stack>
          <Box alignContent={"flex-end"} sx={{ p: 2, display: "flex" }}>
            <IconButton>
              <Edit sx={{ fontSize: 25 }} />
            </IconButton>
            <IconButton>
              <Delete sx={{ fontSize: 25 }} />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </>
  );
}; // End of KartLists

export default KartLists;
