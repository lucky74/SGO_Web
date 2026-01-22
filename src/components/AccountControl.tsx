import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { User as UserIcon, Mail, Shield, Bell, Lock, LogOut, Smartphone } from 'lucide-react';

const AccountControl: React.FC = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [notifEnabled, setNotifEnabled] = useState(true);

  if (!user) return null;

  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      {/* Profile Header */}
      <div className='glass-card p-4 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8'>
        <div className='relative'>
          <div className='w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg'>
            {user.name.charAt(0)}
          </div>
          <div className='absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-[#0f172a] rounded-full'></div>
        </div>
        <div className='text-center md:text-left flex-1'>
          <h2 className='text-3xl font-bold'>{user.name}</h2>
          <p className='text-slate-400'>{user.hotelName}</p>
          <div className='flex flex-wrap gap-3 mt-4 justify-center md:justify-start'>
            <span className='bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20 uppercase'>
              {user.role} Plan
            </span>
            <span className='bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20'>
              {t('m4_status_active')}
            </span>
          </div>
        </div>
        <button onClick={logout} className='bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors'>
            <LogOut size={18} /> {t('m4_logout')}
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Account Settings */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='glass-card p-6 rounded-xl'
        >
            <h3 className='text-xl font-bold mb-6 flex items-center gap-2'>
                <UserIcon size={20} className='text-blue-400' /> {t('m4_settings_profile')}
            </h3>
            <form className='space-y-4'>
                <div>
                    <label className='block text-sm text-slate-400 mb-1'>{t('m4_label_name')}</label>
                    <input type='text' defaultValue={user.name} className='w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none' readOnly />
                </div>
                <div>
                    <label className='block text-sm text-slate-400 mb-1'>{t('m4_label_email')}</label>
                    <div className='relative'>
                        <Mail className='absolute left-3 top-3.5 text-slate-500' size={18} />
                        <input type='email' defaultValue={user.email} className='w-full bg-slate-800 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:border-blue-500 outline-none' readOnly />
                    </div>
                </div>
                <div className='mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg'>
                    <p className='text-xs text-blue-300'>
                        *Hubungi administrator untuk mengubah data profil utama.
                    </p>
                </div>
            </form>
        </motion.div>

        {/* Security & Notification Settings */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className='glass-card p-6 rounded-xl'
        >
            <h3 className='text-xl font-bold mb-6 flex items-center gap-2'>
                <Shield size={20} className='text-green-400' /> {t('m4_settings_security')}
            </h3>
            <div className='space-y-4'>
                {/* Password Change */}
                <div className='p-4 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <Lock className='text-slate-400' size={20} />
                        <div>
                            <div className='font-bold text-sm'>{t('m4_label_password')}</div>
                            <div className='text-xs text-slate-500'>Update berkala untuk keamanan</div>
                        </div>
                    </div>
                    <button className='text-blue-400 text-sm font-bold hover:underline'>{t('m4_btn_change')}</button>
                </div>

                {/* Notification Setting */}
                <div className='p-4 bg-slate-800/50 rounded-lg border border-slate-700'>
                    <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center gap-3'>
                            <Bell className={notifEnabled ? 'text-yellow-400' : 'text-slate-400'} size={20} />
                            <div>
                                <div className='font-bold text-sm'>{t('m4_label_notif')}</div>
                            </div>
                        </div>
                        <div 
                            className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${notifEnabled ? 'bg-green-500' : 'bg-slate-600'}`}
                            onClick={() => setNotifEnabled(!notifEnabled)}
                        >
                            <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${notifEnabled ? 'left-6' : 'left-1'}`}></div>
                        </div>
                    </div>
                    <p className='text-xs text-slate-400 mt-2 leading-relaxed'>
                        {t('m4_notif_desc')}
                    </p>
                </div>

                {/* Active Session */}
                <div className='mt-6 pt-6 border-t border-slate-700'>
                    <h4 className='font-bold text-sm mb-4 text-slate-300'>{t('m4_active_sessions')}</h4>
                    <div className='flex justify-between items-center text-sm'>
                        <div className='flex items-center gap-2'>
                            <Smartphone size={16} className='text-slate-400' />
                            <span className='text-slate-300'>{t('m4_device_current')}</span>
                        </div>
                        <span className='text-green-400 text-xs font-bold'>{t('m4_status_active')}</span>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountControl;
