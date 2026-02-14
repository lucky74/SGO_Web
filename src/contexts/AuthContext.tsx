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
  updateUser: (userId: string, updates: Partial<User>) => Promise<void>;
  lastError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('isAuthenticated');
    return saved === 'true';
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [lastError, setLastError] = useState<string | null>(null);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, user]);

  // Load users from Supabase on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Sync current user with latest data from users list
  useEffect(() => {
    if (user && users.length > 0) {
      const updatedUser = users.find(u => u.email === user.email);
      // Only update if there are changes to avoid infinite loops, but here we just check if it exists
      // and we want to ensure latest permissions/roles are applied
      if (updatedUser) {
        if (updatedUser.isActive === false) {
          setLastError('inactive');
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
        } else if (updatedUser.role !== user.role || updatedUser.maxRadius !== user.maxRadius) {
          setUser(updatedUser);
        }
      }
    }
  }, [users]); // Depend on users list updates

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
          password: u.password,
          joinedDate: u.joined_date,
          isActive: u.is_active !== false // Default to true if null/undefined
        }));
        
        // Combine MOCK_USERS and Supabase users
        // Avoid duplicates by filtering out MOCK_USERS that might be in Supabase (by email)
        const supabaseEmails = new Set(mappedUsers.map(u => u.email));
        const uniqueMockUsers = MOCK_USERS.filter(u => !supabaseEmails.has(u.email));
        
        // Ensure mock users have isActive property
        const processedMockUsers = uniqueMockUsers.map(u => ({
          ...u,
          isActive: u.isActive !== false
        }));
        
        setUsers([...processedMockUsers, ...mappedUsers]);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // Lockout polling: regularly check user status and logout immediately if deactivated
  useEffect(() => {
    if (!user) return;
    let alive = true;
    const checkStatus = async () => {
      try {
        const { data } = await supabase
          .from('users')
          .select('is_active')
          .eq('id', user.id)
          .single();
        const isActive = data ? data.is_active !== false : true;
        if (!isActive && alive) {
          setLastError('inactive');
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
        }
      } catch {}
    };
    const interval = setInterval(checkStatus, 5000);
    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [user]);

  const login = async (email: string, key: string): Promise<boolean> => {
    // 1. Check if user exists in the dynamic users list (includes Supabase users)
    const foundUser = users.find(u => u.email === email);
    
    const validPassword = (foundUser?.password !== undefined ? foundUser.password : VALID_PASSWORDS[email]);
    
    if (foundUser && validPassword === key) {
      // Check if account is active
      if (foundUser.isActive === false) {
        setLastError('inactive');
        return false;
      }

      setIsAuthenticated(true);
      setUser(foundUser);
      setLastError(null);
      return true;
    }
    
    setLastError('invalid');
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  const addUser = async (newUser: User) => {
    // Update local state immediately for UI responsiveness
    setUsers(prev => [...prev, { ...newUser, isActive: true }]);

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
         password: newUser.password,
         joined_date: newUser.joinedDate,
         is_active: true
       }]);
       
       // Refetch to get the real ID from DB (optional, but good practice)
       fetchUsers();
    } catch (err) {
      console.error('Error adding user to Supabase:', err);
    }
  };

  const updateUser = async (userId: string, updates: Partial<User>) => {
    // Update local state
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));

    // Update Supabase
    try {
      const supabaseUpdates: any = {};
      if (updates.isActive !== undefined) supabaseUpdates.is_active = updates.isActive;
      if (updates.password !== undefined) supabaseUpdates.password = updates.password;
      // Add other fields here as needed
      
      // Only attempt update if there are fields to update
      if (Object.keys(supabaseUpdates).length > 0) {
        // Note: We need to handle the case where ID might be string in app but int in DB
        // Assuming Supabase handles stringified numbers correctly for numeric ID columns
        await supabase.from('users').update(supabaseUpdates).eq('id', userId);
      }
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, users, login, logout, addUser, updateUser, lastError }}>
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
