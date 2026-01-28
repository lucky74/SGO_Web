import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, MOCK_USERS, VALID_PASSWORDS } from '../data/users';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  users: User[]; // List of all users (for Admin)
  login: (email: string, key: string) => boolean;
  logout: () => void;
  addUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  const login = (email: string, key: string): boolean => {
    // 1. Check if user exists in the dynamic users list
    const foundUser = users.find(u => u.email === email);
    
    // 2. Check password
    // First check hardcoded passwords, then check user object password (for new users)
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

  const addUser = (newUser: User) => {
    setUsers([...users, newUser]);
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
