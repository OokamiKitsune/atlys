// The data sctructures used in the application

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
    images: string[];
    vendor: Vendor[];
}
  interface Vendor {
    id: string;
    name: string;
    description: string;
    components: Component[];
    industry: string;
    relationship: number;
    dependency_rating: number;
    address: string;
    phone: string;
    email: string;
    contact: Contact[];
    website: string[];
  }

interface Contact {
    id: string;
    first_name: string;
    last_name: string;
    email: string[];
    phone: string[];
    images: string;
    pronouns: string;
    vendor: Vendor;
}
  export type { Product, Component };