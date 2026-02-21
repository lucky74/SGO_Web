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
  const [leaderQuery, setLeaderQuery] = useState(user?.hotelName || '');

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
    if (!city) {
      setLeaderError('Masukkan kota di Intelijen Pasar lalu lakukan pencarian terlebih dahulu.');
      return;
    }
    if (!leaderQuery.trim()) {
      setLeaderError('Masukkan nama hotel terlebih dahulu.');
      return;
    }
    setLeaderLoading(true);
    setLeaderError(null);
    try {
      const params = new URLSearchParams({
        city,
        hotel: leaderQuery.trim()
      });
      const res = await fetch(`/api/market-leader?${params.toString()}`);
      const json = (await res.json()) as MarketLeaderData & { error?: string };
      if (json.error) {
        console.error('Market leader API error:', json.error);
      }
      setLeaderData({
        rating: json.rating,
        latest_reviews: json.latest_reviews || [],
        ota_prices: json.ota_prices || [],
        competitors: json.competitors || []
      });
    } catch (err) {
      setLeaderError('Gagal memuat data market leader. Coba lagi beberapa saat.');
      console.error(err);
    }
    setLeaderLoading(false);
  };

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
          <div className='space-y-4'>
            <div className='bg-slate-900/60 rounded-2xl border border-slate-700/60 p-4 flex flex-col md:flex-row md:items-end gap-3'>
              <div className='flex-1'>
                <p className='text-xs text-slate-400 mb-1'>
                  Masukkan nama hotel atau query kelas. Contoh: &quot;Hotel Nexa Bandung&quot; atau
                  &quot;Hotel bintang 5 Bandung&quot;.
                </p>
                <input
                  value={leaderQuery}
                  onChange={(e) => setLeaderQuery(e.target.value)}
                  className='w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='contoh: Hotel Nexa Bandung'
                />
              </div>
              <button
                onClick={fetchMarketLeader}
                className='px-4 py-2 rounded-md bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-50'
                disabled={leaderLoading}
              >
                {leaderLoading ? 'Memuat...' : 'Cari Market Leader'}
              </button>
            </div>
            {leaderError && (
              <p className='text-xs text-red-400'>{leaderError}</p>
            )}
            {!leaderLoading && leaderData && (
              <MarketLeaderDashboard data={leaderData} />
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
