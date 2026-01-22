import React, { useState } from 'react';
import Layout from '../components/Layout';
import MarketIntelligence from '../components/MarketIntelligence';
import TrendAnalysis from '../components/TrendAnalysis';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchHotels, Hotel } from '../services/api';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('menu_1');
  const { t } = useLanguage();
  
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
          <MarketIntelligence 
            city={city}
            setCity={setCity}
            hotels={hotels}
            loading={loading}
            searched={searched}
            handleSearch={handleSearch}
          />
        );
      case 'menu_2':
        return (
          <TrendAnalysis 
            hotels={hotels}
            searched={searched}
            loading={loading}
          />
        );
      case 'menu_3':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='glass-card p-8 rounded-2xl'>
            <h2 className='text-2xl font-bold mb-4'>{t('m3_title')}</h2>
            <p className='text-slate-400'>Manage your subscription plans and payment methods here.</p>
          </motion.div>
        );
      case 'menu_4':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='glass-card p-8 rounded-2xl'>
            <h2 className='text-2xl font-bold mb-4'>{t('m4_title')}</h2>
            <div className='bg-green-900/20 text-green-400 p-4 rounded-xl border border-green-500/20 inline-block mb-4'>
              {t('m4_status_active')}
            </div>
            <p className='text-slate-400'>Manage your account settings and profile.</p>
          </motion.div>
        );
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