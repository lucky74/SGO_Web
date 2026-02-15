import React, { useMemo } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GuestChat from './pages/GuestChat';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const route = useMemo(() => {
    if (typeof window === 'undefined') return 'app';
    const path = window.location.pathname || '/';
    if (path.startsWith('/chat')) return 'chat';
    return 'app';
  }, []);

  if (route === 'chat') {
    return <GuestChat />;
  }

  return isAuthenticated ? <Dashboard /> : <Login />;
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
