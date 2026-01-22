import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES, Language } from '../data/translations';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const { t, setLanguage, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (login(email, key)) {
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
        className='glass-card p-8 rounded-2xl w-full max-w-md z-10 relative border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl'
      >
        <div className='flex justify-end mb-4'>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as Language)}
            className='bg-slate-800 text-slate-300 border border-slate-600 rounded px-2 py-1 text-sm outline-none focus:border-blue-500'
          >
            {Object.entries(LANGUAGES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        <div className="text-center mb-8">
          <h1 className='text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400'>
            {t('login_title')}
          </h1>
          <p className='text-slate-400 text-sm'>{t('login_subtitle')}</p>
        </div>

        <div className='space-y-4'>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email Address'
              className='w-full bg-slate-800/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
            <input
              type='password'
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder='Password / License Key'
              className='w-full bg-slate-800/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
            />
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-900/50'
            >
              {error}
            </motion.div>
          )}

          <button
            onClick={handleLogin}
            className='w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20'
          >
            {t('login_btn')}
          </button>
        </div>

        <div className='mt-8 text-center'>
            <p className="text-xs text-slate-500 mb-2">Demo Access:</p>
            <div className="flex justify-center gap-4 text-xs text-slate-400">
                <span>admin@sgo.com</span>
                <span>basic@hotel.com</span>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
