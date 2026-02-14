import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES, Language } from '../data/translations';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

const Login: React.FC = () => {
  const { login, lastError } = useAuth();
  const { t, setLanguage, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [notif, setNotif] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState<'unknown'|'inactive'|'active'>('unknown');
  const [trackedEmail, setTrackedEmail] = useState<string>('');

  const handleLogin = async () => {
    const ok = await login(email, key);
    if (ok) {
      setError('');
      setLoginStatus('active');
    } else {
      setError(lastError === 'inactive' ? t('account_inactive') : t('access_denied'));
      if (lastError === 'inactive') setLoginStatus('inactive');
    }
  };

  useEffect(() => {
    const last = localStorage.getItem('lastEmail') || '';
    setTrackedEmail(last);
  }, []);

  useEffect(() => {
    localStorage.setItem('lastEmail', email);
    setTrackedEmail(email || localStorage.getItem('lastEmail') || '');
  }, [email]);

  useEffect(() => {
    const channel = supabase
      .channel('user-status-global')
      .on('broadcast', { event: 'status' }, (payload: any) => {
        const p = payload?.payload;
        if (!p?.email) return;
        const match = trackedEmail && p.email.toLowerCase() === trackedEmail.toLowerCase();
        if (!match) return;
        const active = p.is_active;
        if (active === true) {
          setError('');
          setLoginStatus('active');
          setNotif(t('account_activated'));
          setTimeout(() => setNotif(''), 3000);
        } else if (active === false) {
          setLoginStatus('inactive');
          setError(t('account_inactive'));
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [trackedEmail]);

  useEffect(() => {
    if (!trackedEmail) return;
    let alive = true;
    const check = async () => {
      try {
        const { data } = await supabase
          .from('users')
          .select('is_active')
          .eq('email', trackedEmail)
          .maybeSingle();
        const isActive = data ? data.is_active !== false : true;
        if (!alive) return;
        if (isActive) {
          if (error) setError('');
          setLoginStatus('active');
          setNotif(t('account_activated'));
          setTimeout(() => setNotif(''), 3000);
        } else {
          setError(t('account_inactive'));
          setLoginStatus('inactive');
        }
      } catch {}
    };
    const id = setInterval(check, 3000);
    check();
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [trackedEmail, t]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden'>
      {notif && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='fixed top-4 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-100 px-4 py-2 rounded-lg border border-slate-700 shadow-lg z-50'
        >
          {notif}
        </motion.div>
      )}
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
            {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.flag} {lang.label}</option>
              ))}
          </select>
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.jpg" alt="SGO Logo" className="w-24 h-24 rounded-full shadow-lg object-cover border-2 border-slate-600" />
          </div>
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
          {!error && loginStatus === 'active' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-green-400 text-sm text-center bg-green-900/20 p-2 rounded border border-green-900/50'
            >
              {t('account_activated')}
            </motion.div>
          )}
          {!error && notif && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-green-400 text-sm text-center bg-green-900/20 p-2 rounded border border-green-900/50'
            >
              {notif}
            </motion.div>
          )}

          <button
            onClick={handleLogin}
            className='w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20'
          >
            {t('login_btn')}
          </button>
        </div>

        <div className='mt-8 text-center text-xs text-slate-500'>
            <p className="mb-1">Powered by Sentra Guest Os (SGO) @2026</p>
            <p className="text-blue-400">sentraguest.os@gmail.com</p>
            <p className="text-green-400">WhatsApp: 089502436075</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
