import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, MOCK_USERS, VALID_PASSWORDS } from '../data/users';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, key: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, key: string): boolean => {
    // 1. Check if user exists
    const foundUser = MOCK_USERS.find(u => u.email === email);
    
    // 2. Check password
    if (foundUser && VALID_PASSWORDS[email] === key) {
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
