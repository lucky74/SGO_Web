import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Hotel } from '../services/api';
import { motion } from 'framer-motion';
import { Search, MapPin, Star } from 'lucide-react';
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

  // Prepare chart data
  const chartData = hotels.map(h => ({
    name: h.name.substring(0, 15) + '...',
    price: parseInt(h.price.replace(/[^0-9]/g, '')) || 0
  })).slice(0, 10);

  return (
    <div className='space-y-8'>
      {/* Header Section */}
      <div className='glass-card p-8 rounded-2xl relative overflow-hidden'>
        <div className='relative z-10'>
          <h2 className='text-3xl font-bold mb-2'>{t('m1_title')}</h2>
          <p className='text-slate-400 mb-6 max-w-2xl'>{t('m1_desc')}</p>
          
          <div className='flex gap-4 items-end'>
            <div className='flex-1 max-w-md'>
              <label className='block text-sm text-slate-400 mb-2'>{t('m1_input_label')}</label>
              <div className='relative'>
                <MapPin className='absolute left-3 top-3 text-slate-500' size={20} />
                <input
                  type='text'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder='Ex: Jakarta, Bali, Bandung...'
                  className='w-full bg-slate-800 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none'
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
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
              {/* Executive Summary */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='glass-card p-6 rounded-xl border-l-4 border-blue-500'>
                  <h3 className='text-slate-400 text-sm mb-1'>{t('m1_metric_1')}</h3>
                  <p className='text-3xl font-bold'>{hotels.length}</p>
                </div>
                <div className='glass-card p-6 rounded-xl border-l-4 border-green-500'>
                  <h3 className='text-slate-400 text-sm mb-1'>{t('m1_metric_2')}</h3>
                  <p className='text-3xl font-bold'>
                    IDR {(hotels.reduce((acc, h) => acc + (parseInt(h.price.replace(/[^0-9]/g, '')) || 0), 0) / hotels.length).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className='glass-card p-6 rounded-xl border-l-4 border-purple-500'>
                  <h3 className='text-slate-400 text-sm mb-1'>{t('m1_metric_3')}</h3>
                  <p className='text-3xl font-bold'>
                    {hotels.reduce((acc, h) => acc + h.reviews, 0).toLocaleString()}
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
                      <XAxis dataKey='name' stroke='#94a3b8' tick={{fontSize: 12}} />
                      <YAxis stroke='#94a3b8' />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                      />
                      <Bar dataKey='price' fill='#3b82f6' radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Table */}
              <div className='glass-card rounded-xl overflow-hidden'>
                <div className='p-6 border-b border-slate-700/50'>
                  <h3 className='text-xl font-bold'>{t('m1_table_title')}</h3>
                </div>
                <div className='overflow-x-auto'>
                  <table className='w-full text-left'>
                    <thead className='bg-slate-800/50 text-slate-400'>
                      <tr>
                        <th className='p-4'>Property Name</th>
                        <th className='p-4'>Price</th>
                        <th className='p-4'>Rating</th>
                        <th className='p-4'>Reviews</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-700/50'>
                      {hotels.map((hotel, idx) => (
                        <tr key={idx} className='hover:bg-slate-800/30 transition-colors'>
                          <td className='p-4 font-medium flex items-center gap-3'>
                            <img src={hotel.image} alt='' className='w-10 h-10 rounded-lg object-cover bg-slate-700' />
                            <div>
                              <div className='text-white'>{hotel.name}</div>
                              {hotel.deal && <div className='text-xs text-green-400'>{hotel.deal}</div>}
                            </div>
                          </td>
                          <td className='p-4 text-blue-300 font-bold'>{hotel.price}</td>
                          <td className='p-4 flex items-center gap-1'>
                            <Star size={14} className='text-yellow-400 fill-yellow-400' />
                            {hotel.rating}
                          </td>
                          <td className='p-4 text-slate-400'>{hotel.reviews}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className='text-center py-20 text-slate-500'>
              No data found for '{city}'. Try another location.
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MarketIntelligence;