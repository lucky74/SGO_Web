import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Shield } from 'lucide-react';

const Subscription: React.FC = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      icon: <Zap className='text-blue-400' size={32} />,
      features: ['Basic Market Analysis', 'Top 5 Hotel Search', 'Daily Updates', 'Community Support'],
      active: false,
      color: 'blue'
    },
    {
      name: 'Pro',
      price: 'IDR 499k',
      period: '/month',
      icon: <Crown className='text-yellow-400' size={32} />,
      features: ['Advanced Trend Analysis', 'Unlimited Hotel Search', 'Real-time Data', 'Priority Support', 'Export to PDF/Excel'],
      active: true,
      popular: true,
      color: 'yellow'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      icon: <Shield className='text-purple-400' size={32} />,
      features: ['API Access', 'Custom Integrations', 'Dedicated Account Manager', 'SLA Guarantee', 'White Labeling'],
      active: false,
      color: 'purple'
    }
  ];

  return (
    <div className='space-y-8'>
      <div className='glass-card p-8 rounded-2xl text-center'>
        <h2 className='text-3xl font-bold mb-4'>{t('m3_title')}</h2>
        <p className='text-slate-400 max-w-2xl mx-auto'>
          Choose the perfect plan to empower your business with data-driven insights.
          Upgrade anytime as your needs grow.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-8 rounded-2xl relative border-t-4 ${
              plan.color === 'blue' ? 'border-blue-500' : 
              plan.color === 'yellow' ? 'border-yellow-500' : 'border-purple-500'
            }`}
          >
            {plan.popular && (
              <div className='absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg'>
                MOST POPULAR
              </div>
            )}
            <div className='mb-6'>
              <div className='bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-4'>
                {plan.icon}
              </div>
              <h3 className='text-2xl font-bold'>{plan.name}</h3>
              <div className='flex items-baseline gap-1 mt-2'>
                <span className='text-3xl font-bold text-white'>{plan.price}</span>
                {plan.period && <span className='text-slate-500 text-sm'>{plan.period}</span>}
              </div>
            </div>

            <ul className='space-y-4 mb-8'>
              {plan.features.map((feature, idx) => (
                <li key={idx} className='flex items-center gap-3 text-slate-300'>
                  <Check size={16} className='text-green-400 flex-shrink-0' />
                  <span className='text-sm'>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              className={`w-full py-3 rounded-xl font-bold transition-transform hover:scale-105 ${
                plan.active 
                  ? 'bg-slate-700 text-slate-300 cursor-default' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {plan.active ? 'Current Plan' : 'Upgrade Now'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
