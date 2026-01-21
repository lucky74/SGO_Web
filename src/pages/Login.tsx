import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES, Language } from '../data/translations';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const { login } = useAuth();
  const { t, setLanguage, language } = useLanguage();
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (login(key)) {
      setError('');
    } else {
      setError(t('access_denied'));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden'>
      {/* Background Animation */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='glass-card p-8 rounded-2xl w-full max-w-md z-10 relative'
      >
        <div className='flex justify-end mb-4'>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as Language)}
            className='bg-slate-800 text-white border border-slate-600 rounded px-2 py-1 text-sm outline-none focus:border-blue-500'
          >
            {Object.entries(LANGUAGES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        <h1 className='text-3xl font-bold text-white mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>
          {t('login_title')}
        </h1>
        <p className='text-slate-400 text-center mb-8'>{t('login_subtitle')}</p>

        <div className='space-y-4'>
          <input
            type='password'
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder='License Key'
            className='w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
          />
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-400 text-sm text-center bg-red-900/20 p-2 rounded'
            >
              {error}
            </motion.div>
          )}

          <button
            onClick={handleLogin}
            className='w-full glass-btn text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]'
          >
            {t('login_btn')}
          </button>
        </div>

        <div className='mt-8 text-center text-xs text-slate-600'>
          Powered by Sentra Guest OS  2026
        </div>
      </motion.div>
    </div>
  );
};

export default Login;