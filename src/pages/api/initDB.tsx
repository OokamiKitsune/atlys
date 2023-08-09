// Initialize Database using the build in interfaces found in sharedTypes.tsx
import { Vendor } from '@/components/sharedTypes';

const createTableQuery = `
  CREATE TABLE Vendors (
    ${Object.entries<Vendor>({} as Vendor)
      .map(([key, value]) => `${key} ${getTypeFromValue(value)}`)
      .join(',\n')}
  )
`;

// 