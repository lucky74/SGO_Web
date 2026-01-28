import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Hotel } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Lock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MarketIntelligenceProps {
  city: string;
  setCity: (city: string) => void;
  hotels: Hotel[];
  loading: boolean;
  searched: boolean;
  handleSearch: () => void;
}

const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({ 
  city, setCity, hotels, loading, searched, handleSearch 
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [error, setError] = useState('');

  const validateAndSearch = () => {
    // If user has restricted city, check if the searched city contains the allowed city name
    if (user?.allowedCity) {
      const searchCity = city.trim().toLowerCase();
      const allowed = user.allowedCity.toLowerCase();
      
      // Allow if the search string includes the allowed city (e.g. "Bogor Selatan" contains "Bogor")
      // OR if the allowed city includes the search string (e.g. "Bogor" contains "Bo" - partial typing)
      // Ideally, we want to ensure they are searching for the correct area.
      // Let's enforce that the allowed city name must be present in the search.
      if (!searchCity.includes(allowed)) {
        setError(`Access Restricted: Your ${user.role} plan is limited to ${user.allowedCity} area only.`);
        return;
      }
    }
    setError('');
    handleSearch();
  };

  // Filter Logic based on User Tier
  const maxItems = user?.maxRadius || 5;
  const displayedHotels = hotels.slice(0, maxItems);
  const isLimited = hotels.length > maxItems;

  // Prepare chart data
  const chartData = displayedHotels.map(h => ({
    name: h.name.substring(0, 15) + '...',
    price: parseInt(String(h.price).replace(/[^0-9]/g, '')) || 0
  }));

  return (
    <div className='space-y-8'>
      {/* Header Section */}
      <div className='glass-card p-4 md:p-8 rounded-2xl relative overflow-hidden'>
        <div className='relative z-10'>
          <h2 className='text-2xl md:text-3xl font-bold mb-2'>{t('m1_title')}</h2>
          <p className='text-slate-400 mb-6 max-w-2xl'>{t('m1_desc')}</p>
          
          <div className='flex flex-col md:flex-row gap-4 items-stretch md:items-end'>
            <div className='flex-1 w-full md:max-w-md'>
              <label className='block text-sm text-slate-400 mb-2'>{t('m1_input_label')}</label>
              <div className='relative'>
                <MapPin className='absolute left-3 top-3 text-slate-500' size={20} />
                <input
                  type='text'
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder='Ex: Jakarta, Bali, Bandung...'
                  className={`w-full bg-slate-800 border ${error ? 'border-red-500' : 'border-slate-600'} rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none transition-colors`}
                  onKeyDown={(e) => e.key === 'Enter' && validateAndSearch()}
                />
              </div>
              <AnimatePresence>
                {error && (
                    <motion.div
                    key="error-message"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm mt-2 ml-1"
                  >
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={validateAndSearch}
              disabled={loading}
              className='glass-btn px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50'
            >
              {loading ? (
                <span className='animate-spin'></span>
              ) : (
                <Search size={20} />
              )}
              {t('m1_btn')}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {searched && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-8'
        >
          {hotels.length > 0 ? (
            <>
                {/* Limitation Warning for Lower Tiers */}
                {isLimited && (
                    <div className="bg-yellow-500/10 border border-yellow-500/50 p-4 rounded-xl flex items-center gap-3">
                        <Lock className="text-yellow-500" size={24} />
                        <div>
                            <p className="text-yellow-200 font-bold text-sm">
                                <span>{t('m1_access_limited')}</span> <span>{(user?.role || '').toUpperCase()}</span>
                            </p>
                            <p className="text-yellow-200/70 text-xs">
                                <span>{t('m1_limit_warning')}</span> <span>{maxItems}</span> <span>{t('m1_limit_warning_2')}</span> <span>{hotels.length}</span> <span>{t('m1_limit_warning_3')}</span> 
                                <span className="underline cursor-pointer ml-1 hover:text-white">{t('m1_upgrade_link')}</span> <span>{t('m1_upgrade_text')}</span>
                            </p>
                        </div>
                    </div>
                )}

              {/* Executive Summary */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='glass-card p-6 rounded-xl border-l-4 border-blue-500'>
                  <h3 className='text-slate-400 text-sm mb-1'>{t('m1_metric_1')}</h3>
                  <p className='text-3xl font-bold'>{displayedHotels.length}</p>
                </div>
                <div className='glass-card p-6 rounded-xl border-l-4 border-green-500'>
                  <h3 className='text-slate-400 text-sm mb-1'>{t('m1_metric_2')}</h3>
                  <p className='text-3xl font-bold'>
                    IDR {(displayedHotels.reduce((acc, h) => acc + (parseInt(String(h.price).replace(/[^0-9]/g, '')) || 0), 0) / (displayedHotels.length || 1)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className='glass-card p-6 rounded-xl border-l-4 border-purple-500'>
                  <h3 className='text-slate-400 text-sm mb-1'>{t('m1_metric_3')}</h3>
                  <p className='text-3xl font-bold'>
                    {displayedHotels.reduce((acc, h) => acc + h.reviews, 0).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div className='glass-card p-6 rounded-xl'>
                <h3 className='text-xl font-bold mb-6'>{t('m1_viz_title')}</h3>
                <div className='h-80 w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray='3 3' stroke='#334155' />
                      <XAxis dataKey='name' stroke='#94a3b8' fontSize={12} />
                      <YAxis stroke='#94a3b8' fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey='price' fill='#3b82f6' radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Data Table */}
              <div className='glass-card rounded-xl overflow-hidden'>
                <div className='p-6 border-b border-slate-700'>
                  <h3 className='text-xl font-bold'>{t('m1_table_title')}</h3>
                </div>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead className='bg-slate-800/50'>
                      <tr>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>{t('m1_col_no')}</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>{t('m1_col_hotel')}</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>{t('m1_col_price')}</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>{t('m1_col_rating')}</th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'>{t('m1_col_class')}</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-700'>
                      {displayedHotels.map((hotel, index) => (
                        <tr key={index} className='hover:bg-slate-800/30 transition-colors'>
                          <td className='px-6 py-4 text-slate-400 font-medium'>{index + 1}</td>
                          <td className='px-6 py-4'>
                            <div className='font-medium text-white'>{hotel.name}</div>
                            <div className='text-xs text-slate-500 flex items-center gap-1 mt-1'>
                                <MapPin size={12} /> <span>{hotel.location || city}</span>
                            </div>
                          </td>
                          <td className='px-6 py-4 text-emerald-400 font-bold'>{hotel.price}</td>
                          <td className='px-6 py-4'>
                            <div className='flex items-center gap-1'>
                              <Star size={14} className='text-yellow-400 fill-yellow-400' />
                              <span>{(hotel.rating || 0).toFixed(1)}</span>
                              <span className='text-slate-500 text-xs'><span>&bull;</span> <span>{hotel.reviews}</span> <span>{t('m1_reviews')}</span></span>
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <div className='bg-slate-700/50 px-3 py-1 rounded-lg text-xs font-medium inline-block border border-slate-600'>
                              {hotel.hotelClass}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className='text-center py-20 text-slate-400'>
              <p className='text-lg'>{t('m1_no_data')}</p>
              <p className='text-sm mt-2'>{t('m1_search_hint')}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MarketIntelligence;



