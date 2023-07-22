// The data sctructure for a kart

interface Kart {
    id: string;
    name: string;
    description: string;
    date: Date;
    updated: Date;
    status: string;
    version: number;
    item_count: number;
    serial_number: string;
    buildable: boolean;
    cost_estimate: number;
    images: string;
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
    images: string;
}
  
  export type { Kart, Component };