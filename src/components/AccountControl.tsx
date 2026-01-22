import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Bell, Lock, LogOut } from 'lucide-react';

const AccountControl: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      {/* Profile Header */}
      <div className='glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8'>
        <div className='relative'>
          <div className='w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg'>
            LU
          </div>
          <div className='absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-[#0f172a] rounded-full'></div>
        </div>
        <div className='text-center md:text-left flex-1'>
          <h2 className='text-3xl font-bold'>Lucky User</h2>
          <p className='text-slate-400'>lucky@example.com</p>
          <div className='flex flex-wrap gap-3 mt-4 justify-center md:justify-start'>
            <span className='bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20'>
              PRO MEMBER
            </span>
            <span className='bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20'>
              ACTIVE
            </span>
          </div>
        </div>
        <button className='bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors'>
            <LogOut size={18} /> Sign Out
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
                <User size={20} className='text-blue-400' /> Profile Settings
            </h3>
            <form className='space-y-4'>
                <div>
                    <label className='block text-sm text-slate-400 mb-1'>Display Name</label>
                    <input type='text' defaultValue='Lucky User' className='w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none' />
                </div>
                <div>
                    <label className='block text-sm text-slate-400 mb-1'>Email Address</label>
                    <div className='relative'>
                        <Mail className='absolute left-3 top-3 text-slate-500' size={18} />
                        <input type='email' defaultValue='lucky@example.com' className='w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 pr-3 text-white focus:border-blue-500 outline-none' />
                    </div>
                </div>
                <button type='button' className='w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold mt-2'>
                    Save Changes
                </button>
            </form>
        </motion.div>

        {/* Security & Notifications */}
        <div className='space-y-6'>
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className='glass-card p-6 rounded-xl'
            >
                <h3 className='text-xl font-bold mb-4 flex items-center gap-2'>
                    <Shield size={20} className='text-green-400' /> Security
                </h3>
                <div className='space-y-3'>
                    <button className='w-full flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors text-left'>
                        <div className='flex items-center gap-3'>
                            <Lock size={18} className='text-slate-400' />
                            <span>Change Password</span>
                        </div>
                        <span className='text-slate-500 text-sm'>Last changed 30d ago</span>
                    </button>
                    <div className='flex items-center justify-between p-3 bg-slate-800/50 rounded-lg'>
                        <div className='flex items-center gap-3'>
                            <Shield size={18} className='text-slate-400' />
                            <span>Two-Factor Authentication</span>
                        </div>
                        <div className='w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer'>
                            <div className='absolute right-1 top-1 w-4 h-4 bg-white rounded-full'></div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className='glass-card p-6 rounded-xl'
            >
                <h3 className='text-xl font-bold mb-4 flex items-center gap-2'>
                    <Bell size={20} className='text-yellow-400' /> Notifications
                </h3>
                <div className='space-y-3'>
                    <label className='flex items-center justify-between cursor-pointer'>
                        <span className='text-slate-300'>Email Alerts</span>
                        <input type='checkbox' defaultChecked className='w-5 h-5 accent-blue-500' />
                    </label>
                    <label className='flex items-center justify-between cursor-pointer'>
                        <span className='text-slate-300'>Market Updates</span>
                        <input type='checkbox' defaultChecked className='w-5 h-5 accent-blue-500' />
                    </label>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AccountControl;
