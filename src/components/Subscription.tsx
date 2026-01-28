
import { Check, Star, Zap, Crown, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Subscription = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('m3_plan_basic'),
      price: t('m3_price_basic'),
      desc: t('m3_desc_basic'),
      icon: <Building2 className="text-slate-400" size={32} />,
      features: [
        t('feat_radius_5'),
        t('feat_basic_analysis'),
        t('feat_daily'),
        t('feat_support')
      ],
      highlight: false,
      button: t('m3_btn_choose'),
      color: 'border-slate-600'
    },
    {
      name: t('m3_plan_pro'),
      price: t('m3_price_pro'),
      desc: t('m3_desc_pro'),
      icon: <Zap className="text-blue-400" size={32} />,
      features: [
        t('feat_radius_10'),
        t('feat_realtime'),
        t('feat_adv_analysis'),
        t('feat_priority')
      ],
      highlight: true,
      button: t('m3_btn_choose'),
      color: 'border-blue-500'
    },
    {
      name: t('m3_plan_adv'),
      price: t('m3_price_adv'),
      desc: t('m3_desc_adv'),
      icon: <Star className="text-purple-400" size={32} />,
      features: [
        t('feat_radius_20'),
        t('feat_realtime'),
        t('feat_adv_analysis'),
        t('feat_priority')
      ],
      highlight: false,
      button: t('m3_btn_choose'),
      color: 'border-purple-500'
    },
    {
      name: t('m3_plan_enterprise'),
      price: t('m3_price_custom'),
      desc: t('m3_desc_ent'),
      icon: <Crown className="text-yellow-400" size={32} />,
      features: [
        t('feat_radius_all'),
        t('feat_realtime'),
        t('feat_api'),
        'Custom Integrations',
        'Dedicated Manager'
      ],
      highlight: false,
      button: t('m3_btn_contact'),
      color: 'border-yellow-500'
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
          {t('m3_title')}
        </h2>
        <p className="text-slate-400 text-lg">
          {t('m3_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`relative bg-slate-800 rounded-2xl p-6 border-2 ${plan.highlight ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-slate-700 hover:border-slate-600'} transition-all duration-300 flex flex-col`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                {t('m3_popular')}
              </div>
            )}

            <div className="mb-6 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-slate-100">{plan.name}</h3>
                <p className="text-slate-400 text-sm mt-1">{plan.desc}</p>
              </div>
              <div className="p-2 bg-slate-700/50 rounded-lg">
                {plan.icon}
              </div>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-white">{plan.price}</span>
              {plan.price !== t('m3_price_custom') && <span className="text-slate-400">{t('m3_period_month')}</span>}
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400">
                    <Check size={14} />
                  </div>
                  <span className="text-slate-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                plan.highlight 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 max-w-3xl mx-auto">
        <h4 className="text-lg font-bold text-slate-200 mb-2">Butuh Paket Custom?</h4>
        <p className="text-slate-400 text-sm">
          Kami menyediakan solusi khusus untuk grup hotel besar dengan kebutuhan integrasi sistem internal.
          Hubungi tim sales kami untuk penawaran Enterprise.
        </p>
      </div>
    </div>
  );
};

export default Subscription;
