import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MarketIntelligence from '../components/MarketIntelligence';
import TrendAnalysis from '../components/TrendAnalysis';
import Subscription from '../components/Subscription';
import AccountControl from '../components/AccountControl';
import AdminPanel from '../components/AdminPanel';
import ErrorBoundary from '../components/ErrorBoundary';
import { fetchHotels, Hotel } from '../services/api';
import { motion } from 'framer-motion';
import MarketLeaderDashboard, { MarketLeaderData } from '../components/MarketLeaderDashboard';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState('menu_1');
  
  const [city, setCity] = useState('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [leaderData, setLeaderData] = useState<MarketLeaderData | null>(null);
  const [leaderLoading, setLeaderLoading] = useState(false);
  const [leaderError, setLeaderError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await fetchHotels(city);
      setHotels(data);
      setLeaderData(null);
      setLeaderError(null);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchMarketLeader = async () => {
    if (!city || !user?.hotelName) return;
    setLeaderLoading(true);
    setLeaderError(null);
    try {
      const params = new URLSearchParams({
        city,
        hotel: user.hotelName
      });
      const res = await fetch(`/api/market-leader?${params.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to fetch market leader data');
      }
      const json = (await res.json()) as MarketLeaderData;
      setLeaderData(json);
    } catch (err) {
      setLeaderError('Gagal memuat data market leader. Coba lagi beberapa saat.');
      console.error(err);
    }
    setLeaderLoading(false);
  };

  useEffect(() => {
    if (activeMenu === 'menu_5' && city && user?.hotelName && !leaderLoading && !leaderData && !leaderError) {
      fetchMarketLeader();
    }
  }, [activeMenu, city, user?.hotelName, leaderLoading, leaderData, leaderError]);

  const renderContent = () => {
    const renderReports = () => (
        <>
            <div id="mi-wrapper" style={activeMenu === 'menu_1' ? { display: 'block' } : { display: 'none' }}>
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
            </div>
            <div id="ta-wrapper" style={activeMenu === 'menu_2' ? { display: 'block' } : { display: 'none' }}>
                 <ErrorBoundary>
                    <TrendAnalysis 
                      hotels={hotels}
                      searched={searched}
                      loading={loading}
                      city={city}
                    />
                  </ErrorBoundary>
            </div>
        </>
    );

    switch (activeMenu) {
      case 'menu_1':
      case 'menu_2':
        return renderReports();
      case 'menu_5':
        return (
          <div className='space-y-3'>
            {(!city || !searched) && (
              <p className='text-xs text-slate-400 mb-2'>
                Masukkan kota di menu Intelijen Pasar lalu lakukan pencarian terlebih dahulu untuk
                mengaktifkan analisa market leader.
              </p>
            )}
            {city && searched && (
              <>
                {leaderLoading && (
                  <p className='text-xs text-slate-400'>Memuat data market leader...</p>
                )}
                {leaderError && (
                  <p className='text-xs text-red-400'>{leaderError}</p>
                )}
                {!leaderLoading && !leaderError && leaderData && (
                  <MarketLeaderDashboard data={leaderData} />
                )}
              </>
            )}
          </div>
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
