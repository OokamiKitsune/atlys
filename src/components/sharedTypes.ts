// The data structures used in the application

interface Product { 
    id: string;
    name: string;
    description: string;
    created: Date;
    updated: Date;
    status: string;
    version: number;
    item_count: number;
    serial_number: string;
    sku: string;
    bin_location: string;
    buildable: boolean;
    cost_estimate: number;
    images: string[];
    components: Component[];  
}

// Component information
    interface Component { 
    id: string;
    name: string;
    description: string;
    required: boolean;
    status: string;
    cost: number;
    item_count: number;
    part_number: string;
    serial_number: string;
    sku: string;
    bin_location: string;
    tracking_number: string;
    images: string[];
    vendor: Vendor[];
}

// Vendor information
  interface Vendor {
    id: string;
    name: string;
    description: string;
    components: Component[];
    industry: string;
    shipping_bay: string;
    carrier: [];
    relationship: number;
    dependency_rating: number;
    address: string;
    phone: string;
    email: string;
    contact: Contact[];
    website: string[];
  }

//Contact information for vendors
interface Contact {
    id: string;
    first_name: string;
    last_name: string;
    email: string[];
    phone: string[];
    extension: number;
    images: string;
    pronouns: string;
    vendor: Vendor;
}

// Users of the application
interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    timezone: string;
    images: [];
    pronouns: string;
    role: Role;
}

interface Role {
    id: string;
    name: "Administrator" | "Manager" | "User"; 
    description: string;
    users: User[];
    permissions: Permission[];
}

interface Permission {
    id: string;
    name: string;
    description: string;
}
  export type { Product, Component, Vendor, Contact };