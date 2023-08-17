// Initialize Database using the build in interfaces found in sharedTypes.tsx
import { Vendor } from '@/components/sharedTypes';

type initVendorTable = {
    [K in keyof Vendor]: Vendor[K];
};

const createTableQuery = `
  CREATE TABLE Vendors (
    ${Object.entries<initVendorTable>({} as initVendorTable)
      .map(([key, value]) => `${key} ${getTypeFromValue(value)}`)
      .join(',\n')}
  )
`;

function getTypeFromValue(value: any): string {
  if (typeof value === 'string') {
    return 'TEXT';
  } else if (typeof value === 'number') {
    return 'INTEGER';
  } else if (typeof value === 'boolean') {
    return 'BOOLEAN';
  }
  // Add more type mappings as needed
  return 'TEXT'; // Default to TEXT if type is not recognized
}
