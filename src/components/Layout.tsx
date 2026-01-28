import React, { ReactNode, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LogOut, LayoutDashboard, TrendingUp, CreditCard, User, Globe, Menu, X } from 'lucide-react';
import { LANGUAGES, Language } from '../data/translations';

interface LayoutProps {
  children: ReactNode;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeMenu, setActiveMenu }) => {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menus: { id: string; icon: React.ElementType; label: string }[] = [
    { id: 'menu_1', icon: LayoutDashboard, label: t('menu_1') },
    { id: 'menu_2', icon: TrendingUp, label: t('menu_2') },
    { id: 'menu_3', icon: CreditCard, label: t('menu_3') },
    { id: 'menu_4', icon: User, label: t('menu_4') },
  ];

  // Add Admin Menu if user is enterprise
  if (user?.role === 'enterprise') {
    menus.push({ id: 'menu_admin', icon: Lock, label: 'Admin Panel' });
  }

  return (
    <div className='flex min-h-screen bg-slate-900 text-white'>
      {/* Mobile Header */}
      <div className='lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50 p-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
            <img src='/logo.jpg' alt='SGO Logo' className='w-10 h-10 rounded-full object-cover' />
            <h1 className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>
            SGO Web
            </h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='p-2 text-slate-400 hover:text-white'>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
            className='fixed inset-0 bg-black/50 z-40 lg:hidden'
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static top-0 left-0 z-50 h-full w-64 glass-card m-0 lg:m-4 rounded-none lg:rounded-2xl flex flex-col p-4 transition-transform duration-300 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className='mb-8 p-2 flex items-center gap-3'>
          <img src='/logo.jpg' alt='SGO Logo' className='w-10 h-10 rounded-full' />
          <div>
            <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>
                SGO
            </h1>
            <div className='text-xs text-green-400 mt-1 flex items-center gap-1'>
                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                {t('status_online')}
            </div>
          </div>
        </div>

        <nav className='flex-1 space-y-2'>
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => {
                setActiveMenu(menu.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMenu === menu.id 
                  ? 'bg-blue-600/30 text-blue-400 border border-blue-500/30' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <menu.icon size={20} />
              <span className='font-medium text-sm'>{menu.label}</span>
            </button>
          ))}
        </nav>

        <div className='mt-auto pt-4 border-t border-slate-700/50 space-y-4'>
          <div className='px-2'>
            <label className='text-xs text-slate-500 mb-1 block flex items-center gap-1'>
              <Globe size={12} /> Language
            </label>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as Language)}
              className='w-full bg-slate-800 text-slate-300 border border-slate-600 rounded px-2 py-1 text-xs outline-none focus:border-blue-500'
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.flag} {lang.label}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={logout}
            className='w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors text-sm'
          >
            <LogOut size={16} />
            {t('m4_logout')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-4 lg:p-8 pt-20 lg:pt-8 w-full overflow-hidden'>
        {children}
      </div>
    </div>
  );
};

export default Layout;