import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Hotel } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Lock, AlertCircle, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generatePDF } from '../utils/pdfGenerator';

// --- PRINT REPORT COMPONENT ---
const MarketReportTemplate = ({ city, hotels, chartData }: { city: string, hotels: Hotel[], chartData: any[] }) => {
  const metrics = [
    { label: 'Total Properties', value: hotels.length },
    { label: 'Average Price', value: `IDR ${(hotels.reduce((acc, h) => acc + (parseInt(String(h.price).replace(/[^0-9]/g, '')) || 0), 0) / (hotels.length || 1)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}` },
    { label: 'Total Reviews', value: hotels.reduce((acc, h) => acc + h.reviews, 0).toLocaleString() }
  ];

  return (
    <div id="market-report-template" className="fixed top-0 left-0 -z-50 bg-white text-slate-900 font-serif" style={{ width: '1123px', minHeight: '794px', padding: '40px', left: '-9999px' }}>
      {/* HEADER */}
      <div className="flex justify-between items-end border-b-4 border-slate-900 pb-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-wider text-slate-900">SGO INTELIJEN</h1>
          <p className="text-sm font-sans text-slate-500 mt-1 tracking-widest uppercase">Market Intelligence & Strategy Unit</p>
        </div>
        <div className="text-right font-sans text-sm text-slate-500">
          <p>Generated on: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>Report ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      </div>

      {/* TITLE */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold uppercase decoration-double underline decoration-slate-400 underline-offset-4 mb-2">Laporan Analisis Pasar: {city}</h2>
        <p className="italic text-slate-600">Confidential Market Data Assessment</p>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <div className="mb-10">
        <h3 className="text-lg font-bold uppercase border-l-4 border-slate-900 pl-3 mb-4 font-sans">1. Executive Summary</h3>
        <div className="grid grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="border border-slate-300 p-4 bg-slate-50">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-sans mb-1">{m.label}</p>
              <p className="text-2xl font-bold text-slate-900 font-mono">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-justify text-sm leading-relaxed font-sans text-slate-700">
          Berdasarkan data pasar terkini di area <strong>{city}</strong>, terdapat <strong>{hotels.length}</strong> properti yang terpantau aktif. 
          Rata-rata harga pasar saat ini berada di angka <strong>{metrics[1].value}</strong>, dengan total interaksi ulasan pelanggan mencapai <strong>{metrics[2].value}</strong>. 
          Laporan ini menyajikan analisis kompetitif mendalam untuk mendukung pengambilan keputusan strategis.
        </p>
      </div>

      {/* CHART SECTION */}
      <div className="mb-10 break-inside-avoid">
        <h3 className="text-lg font-bold uppercase border-l-4 border-slate-900 pl-3 mb-4 font-sans">2. Price Distribution Analysis</h3>
        <div className="border border-slate-200 p-4 h-[350px] bg-white">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-45} textAnchor="end" height={60} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Bar dataKey="price" fill="#334155" name="Price (IDR)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="mb-8">
        <h3 className="text-lg font-bold uppercase border-l-4 border-slate-900 pl-3 mb-4 font-sans">3. Detailed Property Data</h3>
        <table className="w-full text-sm font-sans border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-2 text-left">Property Name</th>
              <th className="border border-slate-300 p-2 text-right">Price (IDR)</th>
              <th className="border border-slate-300 p-2 text-center">Rating</th>
              <th className="border border-slate-300 p-2 text-right">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((h, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="border border-slate-300 p-2 font-medium">{h.name}</td>
                <td className="border border-slate-300 p-2 text-right font-mono">{h.price}</td>
                <td className="border border-slate-300 p-2 text-center">{h.rating}</td>
                <td className="border border-slate-300 p-2 text-right">{h.reviews.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="border-t border-slate-300 pt-4 flex justify-between items-center text-xs text-slate-400 font-sans mt-auto">
        <span>&copy; 2026 SGO Intelijen. All rights reserved.</span>
        <span>Developer SGO Intelijen copyright 2026</span>
      </div>
    </div>
  );
};

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      // Target the NEW hidden report template instead of the main view
      await generatePDF('market-report-template', `Laporan_Analisis_Pasar_${city}`);
    } catch (error) {
      console.error('PDF Generation failed', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

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
    <div id='market-intelligence-report' className='space-y-8'>
      {/* Header Section */}
      <div className='glass-card p-4 md:p-8 rounded-2xl relative overflow-hidden'>
        <div className='relative z-10'>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h2 className='text-2xl md:text-3xl font-bold mb-2'><span>{t('m1_title')}</span></h2>
              <p className='text-slate-400 max-w-2xl'><span>{t('m1_desc')}</span></p>
            </div>
            {(user?.role === 'advanced' || user?.role === 'enterprise') && (
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPdf}
                  className={`hide-on-pdf glass-btn px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold border border-blue-500/30 transition-all ${
                    isGeneratingPdf 
                      ? 'bg-blue-600/50 cursor-wait opacity-80' 
                      : 'hover:bg-blue-600/20 hover:scale-105 active:scale-95'
                  }`}
                >
                  {isGeneratingPdf ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      <span>Export PDF</span>
                    </>
                  )}
                </button>
             )}
          </div>
          
          <div className='flex flex-col md:flex-row gap-4 items-stretch md:items-end hide-on-pdf'>
            <div className='flex-1 w-full md:max-w-md'>
              <label className='block text-sm text-slate-400 mb-2'><span>{t('m1_input_label')}</span></label>
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
              <span>{t('m1_btn')}</span>
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
              <div id="report-summary-metrics" className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='glass-card p-6 rounded-xl border-l-4 border-blue-500'>
                  <h3 className='text-slate-400 text-sm mb-1'><span>{t('m1_metric_1')}</span></h3>
                  <p className='text-3xl font-bold'><span>{displayedHotels.length}</span></p>
                </div>
                <div className='glass-card p-6 rounded-xl border-l-4 border-green-500'>
                  <h3 className='text-slate-400 text-sm mb-1'><span>{t('m1_metric_2')}</span></h3>
                  <p className='text-3xl font-bold'>
                    <span>IDR</span> <span>{(displayedHotels.reduce((acc, h) => acc + (parseInt(String(h.price).replace(/[^0-9]/g, '')) || 0), 0) / (displayedHotels.length || 1)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}</span>
                  </p>
                </div>
                <div className='glass-card p-6 rounded-xl border-l-4 border-purple-500'>
                  <h3 className='text-slate-400 text-sm mb-1'><span>{t('m1_metric_3')}</span></h3>
                  <p className='text-3xl font-bold'>
                    <span>{displayedHotels.reduce((acc, h) => acc + h.reviews, 0).toLocaleString()}</span>
                  </p>
                </div>
              </div>

              {/* Chart */}
              <div id="report-main-chart" className='glass-card p-6 rounded-xl'>
                <h3 className='text-xl font-bold mb-6'><span>{t('m1_viz_title')}</span></h3>
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
              <div id="report-data-table" className='glass-card rounded-xl overflow-hidden'>
                <div className='p-6 border-b border-slate-700'>
                  <h3 className='text-xl font-bold'><span>{t('m1_table_title')}</span></h3>
                </div>
                <div className='overflow-x-auto'>
                  <table className='w-full'>
                    <thead className='bg-slate-800/50'>
                      <tr>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'><span>{t('m1_col_no')}</span></th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'><span>{t('m1_col_hotel')}</span></th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'><span>{t('m1_col_price')}</span></th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'><span>{t('m1_col_rating')}</span></th>
                        <th className='px-6 py-4 text-left text-sm font-semibold text-slate-300'><span>{t('m1_col_class')}</span></th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-700'>
                      {displayedHotels.map((hotel, index) => (
                        <tr key={index} className='hover:bg-slate-800/30 transition-colors'>
                          <td className='px-6 py-4 text-slate-400 font-medium'><span>{index + 1}</span></td>
                          <td className='px-6 py-4'>
                            <div className='font-medium text-white'><span>{hotel.name}</span></div>
                            <div className='text-xs text-slate-500 flex items-center gap-1 mt-1'>
                                <MapPin size={12} /> <span>{hotel.location || city}</span>
                            </div>
                          </td>
                          <td className='px-6 py-4 text-emerald-400 font-bold'><span>{hotel.price}</span></td>
                          <td className='px-6 py-4'>
                            <div className='flex items-center gap-1'>
                              <Star size={14} className='text-yellow-400 fill-yellow-400' />
                              <span>{(hotel.rating || 0).toFixed(1)}</span>
                              <span className='text-slate-500 text-xs'><span>&bull;</span> <span>{hotel.reviews.toLocaleString()}</span> <span>{t('m1_reviews')}</span></span>
                            </div>
                          </td>
                          <td className='px-6 py-4'>
                            <div className='bg-slate-700/50 px-3 py-1 rounded-lg text-xs font-medium inline-block border border-slate-600'>
                              <span>{hotel.hotelClass}</span>
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
              <p className='text-lg'><span>{t('m1_no_data')}</span></p>
              <p className='text-sm mt-2'><span>{t('m1_search_hint')}</span></p>
            </div>
          )}
        </motion.div>
      )}
      {/* HIDDEN REPORT TEMPLATE */}
      {searched && !loading && (
        <MarketReportTemplate city={city} hotels={hotels} chartData={chartData} />
      )}
    </div>
  );
};

export default MarketIntelligence;



