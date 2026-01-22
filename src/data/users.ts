
export type UserRole = 'basic' | 'pro' | 'advanced' | 'enterprise';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  hotelName: string;
  maxRadius: number; // 5, 10, 20, or 999 (unlimited)
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
    hotelName: 'Grand Hotel Demo',
    maxRadius: 5
  },
  {
    id: '3',
    email: 'pro@hotel.com',
    name: 'Hotel Manager Pro',
    role: 'pro',
    hotelName: 'Luxury Resort Demo',
    maxRadius: 10
  }
];

export const VALID_PASSWORDS: { [email: string]: string } = {
  'sentraguest.os@gmail.com': 'SGO-ADMIN-2026',
  'basic@hotel.com': 'BASIC-123',
  'pro@hotel.com': 'PRO-123'
};
