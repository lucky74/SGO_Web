import React, { useState } from 'react';
import Layout from '../components/Layout';
import MarketIntelligence from '../components/MarketIntelligence';
import TrendAnalysis from '../components/TrendAnalysis';
import Subscription from '../components/Subscription';
import AccountControl from '../components/AccountControl';
import AdminPanel from '../components/AdminPanel';
import ErrorBoundary from '../components/ErrorBoundary';
import { fetchHotels, Hotel } from '../services/api';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('menu_1');
  
  // Lifted state
  const [city, setCity] = useState('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await fetchHotels(city);
      setHotels(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'menu_1':
        return (
          <ErrorBoundary>
            <MarketIntelligence 
              city={city}
              setCity={setCity}
              hotels={hotels}
              loading={loading}
              searched={searched}
              handleSearch={handleSearch}
            />
          </ErrorBoundary>
        );
      case 'menu_2':
        return (
          <ErrorBoundary>
            <TrendAnalysis 
              hotels={hotels}
              searched={searched}
              loading={loading}
            />
          </ErrorBoundary>
        );
      case 'menu_3':
        return <Subscription />;
      case 'menu_4':
        return <AccountControl />;
      case 'menu_admin':
        return <AdminPanel />;
      default:
        return null;
    }
  };

  return (
    <Layout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      <motion.div
        key={activeMenu}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </Layout>
  );
};

export default Dashboard;