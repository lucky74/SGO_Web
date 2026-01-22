import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Hotel } from '../services/api';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { TrendingUp, Award, DollarSign } from 'lucide-react';

interface TrendAnalysisProps {
  hotels: Hotel[];
  searched: boolean;
  loading: boolean;
}

const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ hotels, searched, loading }) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className='glass-card p-8 rounded-2xl flex justify-center items-center min-h-[400px]'>
        <span className='animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full'></span>
      </div>
    );
  }

  if (!searched || hotels.length === 0) {
    return (
      <div className='glass-card p-8 rounded-2xl text-center min-h-[400px] flex flex-col justify-center items-center'>
        <TrendingUp size={48} className='text-slate-600 mb-4' />
        <h2 className='text-xl font-bold text-slate-400'>
            {t('menu_2')}
        </h2>
        <p className='text-slate-500 mt-2'>
            Please perform a search in the Market Intelligence tab first to analyze trends.
        </p>
      </div>
    );
  }

  // Process data for charts
  const sortedByPrice = [...hotels].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
    const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
    return priceA - priceB;
  });

  const priceTrendData = sortedByPrice.map(h => ({
    name: h.name.substring(0, 10) + '...',
    full_name: h.name,
    price: parseInt(h.price.replace(/[^0-9]/g, '')) || 0,
    rating: h.rating
  }));

  const scatterData = hotels.map(h => ({
    x: parseInt(h.price.replace(/[^0-9]/g, '')) || 0,
    y: h.rating,
    z: h.reviews,
    name: h.name
  }));

  // Calculate stats
  const avgPrice = priceTrendData.reduce((acc, curr) => acc + curr.price, 0) / priceTrendData.length;
  const bestValue = hotels.reduce((prev, curr) => {
    const prevPrice = parseInt(prev.price.replace(/[^0-9]/g, '')) || 0;
    const currPrice = parseInt(curr.price.replace(/[^0-9]/g, '')) || 0;
    // Simple logic: High rating, low price
    const prevScore = prev.rating / (prevPrice || 1);
    const currScore = curr.rating / (currPrice || 1);
    return currScore > prevScore ? curr : prev;
  });

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='glass-card p-8 rounded-2xl'>
        <h2 className='text-3xl font-bold mb-2 flex items-center gap-3'>
          <TrendingUp className='text-blue-400' />
          {t('menu_2')}
        </h2>
        <p className='text-slate-400'>
          Advanced AI analysis of market trends, pricing strategies, and value opportunities.
        </p>
      </div>

      {/* AI Recommendations */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='glass-card p-6 rounded-xl border-l-4 border-yellow-500'
        >
          <div className='flex items-start justify-between'>
            <div>
              <h3 className='text-yellow-400 font-bold mb-1 flex items-center gap-2'>
                <Award size={18} /> Best Value Pick
              </h3>
              <p className='text-2xl font-bold text-white'>{bestValue.name}</p>
              <p className='text-slate-400 text-sm mt-1'>
                Highest rating-to-price ratio in the current market.
              </p>
            </div>
            <div className='text-right'>
              <div className='text-xl font-bold text-blue-300'>{bestValue.price}</div>
              <div className='flex items-center justify-end gap-1 text-yellow-400'>
                <span className='font-bold'>{bestValue.rating}</span> <StarIcon />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='glass-card p-6 rounded-xl border-l-4 border-green-500'
        >
          <div className='flex items-start justify-between'>
            <div>
              <h3 className='text-green-400 font-bold mb-1 flex items-center gap-2'>
                <DollarSign size={18} /> Market Average
              </h3>
              <p className='text-3xl font-bold text-white'>
                IDR {avgPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
              </p>
              <p className='text-slate-400 text-sm mt-1'>
                Average nightly rate across top {hotels.length} hotels.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Price Trend Line Chart */}
        <div className='glass-card p-6 rounded-xl'>
          <h3 className='text-xl font-bold mb-6 text-slate-200'>Competitive Price Landscape</h3>
          <div className='h-80 w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#334155' />
                <XAxis dataKey='name' stroke='#94a3b8' tick={{fontSize: 10}} angle={-45} textAnchor="end" height={60} />
                <YAxis stroke='#94a3b8' />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Line type='monotone' dataKey='price' stroke='#3b82f6' strokeWidth={3} dot={{r: 4, fill: '#3b82f6'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rating vs Price Scatter */}
        <div className='glass-card p-6 rounded-xl'>
          <h3 className='text-xl font-bold mb-6 text-slate-200'>Price vs. Quality Correlation</h3>
          <div className='h-80 w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray='3 3' stroke='#334155' />
                <XAxis type="number" dataKey="x" name="Price" unit=" IDR" stroke='#94a3b8' tickFormatter={(val) => (val/1000).toFixed(0) + 'k'} />
                <YAxis type="number" dataKey="y" name="Rating" unit="" stroke='#94a3b8' domain={[3, 5]} />
                <ZAxis type="number" dataKey="z" range={[50, 400]} name="Reviews" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                <Scatter name="Hotels" data={scatterData} fill="#10b981" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default TrendAnalysis;