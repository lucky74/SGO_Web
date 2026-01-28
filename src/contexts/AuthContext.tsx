import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, MOCK_USERS, VALID_PASSWORDS } from '../data/users';
import { supabase } from '../services/supabaseClient';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  users: User[]; // List of all users (for Admin)
  login: (email: string, key: string) => Promise<boolean>;
  logout: () => void;
  addUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  // Load users from Supabase on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');
      
      if (data && !error) {
        // Map database fields to User interface
        const mappedUsers: User[] = data.map((u: any) => ({
          id: u.id.toString(),
          email: u.email,
          name: u.name,
          role: u.role,
          hotelName: u.hotel_name,
          maxRadius: u.max_radius,
          allowedCity: u.allowed_city,
          address: u.address,
          coordinates: u.lat && u.lng ? { lat: u.lat, lng: u.lng } : undefined,
          password: u.password
        }));
        
        // Combine MOCK_USERS and Supabase users
        // Avoid duplicates by filtering out MOCK_USERS that might be in Supabase (by email)
        const supabaseEmails = new Set(mappedUsers.map(u => u.email));
        const uniqueMockUsers = MOCK_USERS.filter(u => !supabaseEmails.has(u.email));
        
        setUsers([...uniqueMockUsers, ...mappedUsers]);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const login = async (email: string, key: string): Promise<boolean> => {
    // 1. Check if user exists in the dynamic users list (includes Supabase users)
    const foundUser = users.find(u => u.email === email);
    
    // 2. Check password
    // First check hardcoded passwords, then check user object password
    const validPassword = VALID_PASSWORDS[email] || foundUser?.password;
    
    if (foundUser && validPassword === key) {
      setIsAuthenticated(true);
      setUser(foundUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const addUser = async (newUser: User) => {
    // Update local state immediately for UI responsiveness
    setUsers(prev => [...prev, newUser]);

    // Save to Supabase
    try {
       await supabase.from('users').insert([{
         email: newUser.email,
         name: newUser.name,
         role: newUser.role,
         hotel_name: newUser.hotelName,
         max_radius: newUser.maxRadius,
         allowed_city: newUser.allowedCity,
         address: newUser.address,
         lat: newUser.coordinates?.lat,
         lng: newUser.coordinates?.lng,
         password: newUser.password
       }]);
       
       // Refetch to get the real ID from DB (optional, but good practice)
       fetchUsers();
    } catch (err) {
      console.error('Error adding user to Supabase:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, users, login, logout, addUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
