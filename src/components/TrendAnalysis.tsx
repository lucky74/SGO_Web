import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Hotel } from '../services/api';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Lightbulb, Trophy, Users, Diamond } from 'lucide-react';

interface TrendAnalysisProps {
  hotels: Hotel[];
  searched: boolean;
  loading: boolean;
}

interface StarGroup {
  star: number;
  count: number;
  avgPrice: number;
  leader: Hotel;
}

const TrendAnalysis: React.FC<TrendAnalysisProps> = ({ hotels, searched, loading }) => {
  const { t } = useLanguage();

  const getOccupancyStatus = (hotel: Hotel) => {
    if (hotel.rating >= 4.5 && hotel.reviews > 1000) return 'status_top_tier';
    if (hotel.rating >= 4.0) return 'status_high_demand';
    if (hotel.reviews > 500) return 'status_popular';
    return 'status_standard';
  };

  const getOccupancyColor = (statusKey: string) => {
    switch (statusKey) {
      case 'status_top_tier': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'status_high_demand': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'status_popular': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  if (loading) {
    return (
      <div className='glass-card p-8 rounded-2xl flex justify-center items-center min-h-[400px]'>
        <span className='animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full'></span>
      </div>
    );
  }

  if (!searched || hotels.length === 0) {
    return (
      <div className='glass-card p-4 md:p-8 rounded-2xl text-center min-h-[400px] flex flex-col justify-center items-center'>
        <TrendingUp size={48} className='text-slate-600 mb-4' />
        <h2 className='text-xl font-bold text-slate-400'>
            {t('menu_2')}
        </h2>
        <p className='text-slate-500 mt-2'>
            {t('m2_empty_state')}
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

  const prices = sortedByPrice.map(h => parseInt(h.price.replace(/[^0-9]/g, '')) || 0).filter(p => p > 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const medianPrice = prices[Math.floor(prices.length / 2)];

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
    name: h.name,
    stars: h.stars
  }));

  // --- Logic Kelas Bintang (Star Class) ---

  // 1. Star Distribution
  const starCounts = hotels.reduce((acc, hotel) => {
    const stars = hotel.stars || 0;
    // Group 0 stars as 'Non-Bintang' or keep as 0
    const key = stars === 0 ? 0 : stars;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const pieData = Object.keys(starCounts).map(star => ({
    name: star === '0' ? t('m2_non_star') : `${t('m2_star')} ${star}`,
    value: starCounts[parseInt(star)]
  }));

  const COLORS = ['#94a3b8', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#0088FE'];

  // 2. Competitor Matrix (Group by Stars) - Explicitly 5 to 0
  const starGroups = ([5, 4, 3, 2, 1, 0].map(star => {
    const groupHotels = hotels.filter(h => (h.stars || 0) === star);
    
    // If no hotels in this class, return null
    if (groupHotels.length === 0) return null;

    const avgPrice = groupHotels.reduce((acc, h) => acc + (parseInt(h.price.replace(/[^0-9]/g, '')) || 0), 0) / groupHotels.length;
    const leader = groupHotels.reduce((prev, curr) => (curr.rating > prev.rating ? curr : prev), groupHotels[0]);

    return {
      star,
      count: groupHotels.length,
      avgPrice,
      leader
    };
  }) as (StarGroup | null)[]).filter((group): group is StarGroup => group !== null);


  const bestValueList = [...hotels].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 1;
    const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 1;
    const scoreA = a.rating / priceA;
    const scoreB = b.rating / priceB;
    return scoreB - scoreA;
  }).slice(0, 5);

  const topRated = [...hotels].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const dominantClass = pieData.sort((a,b) => b.value - a.value)[0]?.name || 'Unknown';

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='glass-card p-4 md:p-8 rounded-2xl'>
        <h2 className='text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3'>
          <TrendingUp className='text-blue-400' />
          {t('menu_2')}
        </h2>
        <p className='text-slate-400'>
          {t('m2_desc')}
        </p>
      </div>

      {/* AI Smart Insight */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='glass-card p-6 rounded-xl border-t-4 border-blue-500 bg-gradient-to-br from-slate-800 to-slate-900'
      >
        <h3 className='text-blue-400 font-bold mb-3 flex items-center gap-2'>
            <Lightbulb size={20} /> {t('m2_insight_title')}
        </h3>
        <div className='space-y-3 text-slate-300'>
            <p>
                <strong>{t('m2_insight_summary')}</strong> {t('m2_insight_dominated')} <strong>{dominantClass}</strong>. 
                {t('m2_insight_competition')}
            </p>
            <ul className='list-disc list-inside space-y-1 text-sm text-slate-400 ml-2'>
                <li>
                    <span className='text-slate-200 font-semibold'>{t('m2_insight_price_range')}</span> IDR {minPrice.toLocaleString()} - IDR {maxPrice.toLocaleString()}
                </li>
                <li>
                    <span className='text-slate-200 font-semibold'>{t('m2_insight_suggested')}</span> IDR {medianPrice.toLocaleString()} (Median)
                </li>
            </ul>
        </div>
      </motion.div>

      {/* Competitor Analysis Matrix */}
      <div className='glass-card p-6 rounded-xl'>
        <h3 className='text-xl font-bold mb-6 flex items-center gap-2'>
            <Users className='text-purple-400' size={20} /> {t('m2_leader_title')}
        </h3>
        <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
                <thead>
                    <tr className='text-slate-400 border-b border-slate-700'>
                        <th className='p-3'>{t('m2_col_class')}</th>
                        <th className='p-3'>{t('m2_col_leader')}</th>
                        <th className='p-3'>{t('m2_col_occupancy')}</th>
                        <th className='p-3'>{t('m2_col_avg_price')}</th>
                        <th className='p-3'>{t('m2_col_rating')}</th>
                    </tr>
                </thead>
                <tbody className='text-slate-300'>
                    {starGroups.map((group) => {
                        const statusKey = getOccupancyStatus(group.leader);
                        return (
                            <tr key={group.star} className='border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors'>
                                <td className='p-3 font-bold text-yellow-400'>
                                    {group.star === 0 ? t('m2_non_star') : `${t('m2_star')} ${group.star}`}
                                </td>
                                <td className='p-3 font-semibold text-white'>
                                    {group.leader.name}
                                </td>
                                <td className='p-3'>
                                    <span className={`px-2 py-1 rounded text-xs font-bold border ${getOccupancyColor(statusKey)}`}>
                                        {t(statusKey)}
                                    </span>
                                </td>
                                <td className='p-3'>
                                    IDR {group.avgPrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                                </td>
                                <td className='p-3 text-yellow-400 font-bold flex items-center gap-1'>
                                    {group.leader.rating} <StarIcon />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Star Distribution Pie Chart */}
          <div className='glass-card p-6 rounded-xl lg:col-span-1'>
            <h3 className='text-lg font-bold mb-4 text-slate-200'>{t('m2_chart_pie')}</h3>
            <div className='h-64 w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </div>

          {/* Nilai Terbaik Table */}
          <div className='glass-card p-6 rounded-xl lg:col-span-2'>
            <h3 className='text-lg font-bold mb-4 flex items-center gap-2'>
                <Diamond className='text-blue-400' size={20} /> {t('m2_best_value_title')}
            </h3>
            <div className='overflow-x-auto'>
                <table className='w-full text-left'>
                    <thead>
                        <tr className='text-slate-400 border-b border-slate-700'>
                            <th className='p-3'>{t('m2_col_property')}</th>
                            <th className='p-3'>{t('m1_col_price')}</th>
                            <th className='p-3'>{t('m2_col_rating')}</th>
                        </tr>
                    </thead>
                    <tbody className='text-slate-300'>
                        {bestValueList.map((hotel, idx) => (
                            <tr key={idx} className='border-b border-slate-700/50 hover:bg-slate-800/50'>
                                <td className='p-3 font-medium text-white'>{hotel.name}</td>
                                <td className='p-3 text-emerald-400 font-bold'>{hotel.price}</td>
                                <td className='p-3 flex items-center gap-1 text-yellow-400'>
                                    {hotel.rating} <StarIcon />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
      </div>

      {/* Top 3 List */}
      <div className='glass-card p-6 rounded-xl'>
         <h3 className='text-lg font-bold mb-4 flex items-center gap-2'>
            <Trophy className='text-yellow-500' size={20} /> {t('m2_top3_title')}
        </h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {topRated.map((hotel, index) => (
                <div key={index} className='bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col justify-between h-full relative overflow-hidden'>
                    <div className='absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-bl-lg'>
                        #{index + 1}
                    </div>
                    <div>
                        <div className='flex items-center gap-1 text-yellow-400 text-xs mb-2 bg-slate-900/50 self-start px-2 py-1 rounded-full w-fit'>
                            <span className='text-slate-400 font-medium'>{hotel.hotelClass}</span>
                        </div>
                        <div className='font-bold text-white mb-1 line-clamp-2 text-lg'>{hotel.name}</div>
                    </div>
                    <div className='mt-3 pt-3 border-t border-slate-700/50 flex justify-between items-center'>
                        <div className='text-sm text-yellow-400 font-bold flex items-center gap-1'>
                            {hotel.rating} <StarIcon />
                        </div>
                        <div className='text-xs text-slate-400'>
                            {hotel.reviews} {t('m1_reviews')}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Price Trend Line Chart */}
        <div className='glass-card p-6 rounded-xl'>
          <h3 className='text-xl font-bold mb-6 text-slate-200'>{t('m2_chart_price')}</h3>
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
          <h3 className='text-xl font-bold mb-6 text-slate-200'>{t('m2_chart_scatter')}</h3>
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

const StarIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
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
