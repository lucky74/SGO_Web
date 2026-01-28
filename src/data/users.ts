
export type UserRole = 'basic' | 'pro' | 'advanced' | 'enterprise';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  hotelName: string;
  maxRadius: number; // 5, 10, 20, or 999 (unlimited)
  allowedCity?: string; // If undefined, can access all cities (Enterprise)
  address?: string;
  coordinates?: { lat: number; lng: number };
  password?: string; // Stored for mock authentication
}

export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'sentraguest.os@gmail.com',
    name: 'SGO Owner (Super Admin)',
    role: 'enterprise',
    hotelName: 'Sahid Group Headquarters',
    maxRadius: 999
  },
  {
    id: '2',
    email: 'basic@hotel.com',
    name: 'Hotel Manager Basic',
    role: 'basic',
    hotelName: 'Grand Hotel Bogor',
    maxRadius: 5,
    allowedCity: 'Bogor'
  },
  {
    id: '3',
    email: 'pro@hotel.com',
    name: 'Hotel Manager Pro',
    role: 'pro',
    hotelName: 'Luxury Resort Bogor',
    maxRadius: 10,
    allowedCity: 'Bogor'
  },
  {
    id: '4',
    email: 'advanced@hotel.com',
    name: 'Hotel Manager Advanced',
    role: 'advanced',
    hotelName: 'Executive Hotel Bogor',
    maxRadius: 20,
    allowedCity: 'Bogor'
  }
];

export const VALID_PASSWORDS: { [email: string]: string } = {
  'sentraguest.os@gmail.com': 'SGO-ADMIN-2026',
  'basic@hotel.com': 'BASIC-123',
  'pro@hotel.com': 'PRO-123',
  'advanced@hotel.com': 'ADV-123'
};
