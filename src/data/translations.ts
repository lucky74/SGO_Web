export type Language = 'ID' | 'EN' | 'FR' | 'DE' | 'ES' | 'AR' | 'KO' | 'JA' | 'ZH' | 'RU';

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
    { code: 'ID', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'FR', label: 'Français', flag: '🇫🇷' },
    { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ES', label: 'Español', flag: '🇪🇸' },
    { code: 'AR', label: 'العربية', flag: '🇸🇦' },
    { code: 'KO', label: '한국어', flag: '🇰🇷' },
    { code: 'JA', label: '日本語', flag: '🇯🇵' },
    { code: 'ZH', label: '中文', flag: '🇨🇳' },
    { code: 'RU', label: 'Русский', flag: '🇷🇺' }
];

export const TRANS: { [key: string]: { [key: string]: string } } = {
    'nav_dashboard': {'ID': 'Dasbor Utama', 'EN': 'Main Dashboard', 'FR': 'Tableau de Bord', 'DE': 'Haupt-Dashboard', 'ES': 'Panel Principal', 'AR': 'لوحة القيادة', 'KO': '대시보드', 'JA': 'ダッシュボード', 'ZH': '仪表板', 'RU': 'Приборная панель'},
    'nav_market': {'ID': 'Intelijen Pasar', 'EN': 'Market Intelligence', 'FR': 'Intelligence Marché', 'DE': 'Marktintelligenz', 'ES': 'Inteligencia de Mercado', 'AR': 'ذكاء السوق', 'KO': '시장 인텔리전스', 'JA': '市場インテリジェンス', 'ZH': '市场情报', 'RU': 'Анализ рынка'},
    'nav_trend': {'ID': 'Analisa Tren', 'EN': 'Trend Analysis', 'FR': 'Analyse des Tendances', 'DE': 'Trendanalyse', 'ES': 'Análisis de Tendencias', 'AR': 'تحليل الاتجاهات', 'KO': '트렌드 분석', 'JA': 'トレンド分析', 'ZH': '趋势分析', 'RU': 'Анализ трендов'},
    'nav_subscription': {'ID': 'Paket Langganan', 'EN': 'Subscription Plan', 'FR': 'Abonnement', 'DE': 'Abonnement', 'ES': 'Suscripción', 'AR': 'اشتراك', 'KO': '구독', 'JA': 'サブスクリプション', 'ZH': '订阅', 'RU': 'Подписка'},
    'nav_account': {'ID': 'Kontrol Akun', 'EN': 'Account Control', 'FR': 'Contrôle de Compte', 'DE': 'Kontokontrolle', 'ES': 'Control de Cuenta', 'AR': 'التحكم في الحساب', 'KO': '계정 제어', 'JA': 'アカウント制御', 'ZH': '账户控制', 'RU': 'Управление счетом'},
    'header_title': {'ID': 'SGO - Optimasi Grup Sahid', 'EN': 'SGO - Sahid Group Optimization', 'FR': 'Optimisation du Groupe Sahid', 'DE': 'Sahid Gruppenoptimierung', 'ES': 'Optimización del Grupo Sahid', 'AR': 'تحسين مجموعة ساهيد', 'KO': 'Sahid 그룹 최적화', 'JA': 'Sahidグループの最適化', 'ZH': 'Sahid集团优化', 'RU': 'Оптимизация Sahid Group'},
    'm1_title': {
        'ID': ' Intelijen Pasar Real-time', 'EN': ' Real-time Market Intelligence', 'FR': ' Intelligence Marché Temps Réel', 
        'DE': ' Echtzeit-Marktintelligenz', 'ES': ' Inteligencia de Mercado en Tiempo Real', 'AR': ' ذكاء السوق في الوقت الحقيقي', 
        'KO': ' 실시간 시장 인텔리전스', 'JA': ' リアルタイム市場インテリジェンス', 'ZH': ' 实时市场情报', 'RU': ' Анализ рынка в реальном времени'
    },
    'm1_metric_1': {'ID': 'Properti', 'EN': 'Properties', 'FR': 'Propriétés', 'DE': 'Eigenschaften', 'ES': 'Propiedades', 'AR': 'الخصائص', 'KO': '부동산', 'JA': '物件', 'ZH': '属性', 'RU': 'Объекты'},
    'm1_metric_2': {'ID': 'Rata-rata Harga', 'EN': 'Avg. Price', 'FR': 'Prix Moyen', 'DE': 'Durchschn. Preis', 'ES': 'Precio Promedio', 'AR': 'متوسط السعر', 'KO': '평균 가격', 'JA': '平均価格', 'ZH': '平均价格', 'RU': 'Средняя цена'},
    'm1_metric_3': {'ID': 'Total Ulasan', 'EN': 'Total Reviews', 'FR': 'Avis Total', 'DE': 'Gesamtbewertungen', 'ES': 'Reseñas Totales', 'AR': 'إجمالي المراجعات', 'KO': '총 리뷰', 'JA': '総レビュー', 'ZH': '总评论', 'RU': 'Всего отзывов'},
    'm1_viz_title': {
        'ID': ' Visualisasi Ekosistem Pasar', 'EN': ' Market Ecosystem Visualization', 'FR': " Visualisation de l'Écosystème", 
        'DE': ' Marktökosystem-Visualisierung', 'ES': ' Visualización del Ecosistema', 'AR': ' تصور نظام السوق', 
        'KO': ' 시장 생태계 시각화', 'JA': ' 市場エコシステムの可視化', 'ZH': ' 市场生态系统可视化', 'RU': ' Визуализация рынка'
    },
    'm1_table_title': {
        'ID': ' Laporan Detail Properti', 'EN': ' Property Detail Report', 'FR': ' Rapport Détaillé', 
        'DE': ' Detaillierter Bericht', 'ES': ' Reporte Detallado', 'AR': ' تقرير تفصيلي', 
        'KO': ' 상세 보고서', 'JA': ' 詳細レポート', 'ZH': ' 详细报告', 'RU': ' Подробный отчет'
    },
    'm2_title': {
        'ID': ' Analisa Tren & Rekomendasi AI', 'EN': ' Trend Analysis & AI Recommendations', 'FR': ' Analyse Tendances & IA', 
        'DE': ' Trendanalyse & KI', 'ES': ' Análisis de Tendencias e IA', 'AR': ' تحليل الاتجاهات وتوصيات الذكاء الاصطناعي', 
        'KO': ' 트렌드 분석 및 AI 추천', 'JA': ' トレンド分析とAI推奨', 'ZH': ' 趋势分析与AI建议', 'RU': ' Анализ трендов и AI'
    },
    'm2_col1': {'ID': ' Pemimpin Pasar', 'EN': ' Market Leaders', 'FR': ' Leaders du Marché', 'DE': ' Marktführer', 'ES': ' Líderes del Mercado', 'AR': ' قادة السوق', 'KO': ' 시장 리더', 'JA': ' マーケットリーダー', 'ZH': ' 市场领导者', 'RU': ' Лидеры рынка'},
    'm2_col2': {'ID': ' Nilai Terbaik', 'EN': ' Best Value', 'FR': ' Meilleure Valeur', 'DE': ' Bester Wert', 'ES': ' Mejor Valor', 'AR': ' أفضل قيمة', 'KO': ' 최고의 가치', 'JA': ' 베ストバリュー', 'ZH': ' 最佳价值', 'RU': ' Лучшая цена'},
    'm3_title': {'ID': ' Akses Premium SGO', 'EN': ' SGO Premium Access', 'FR': ' Accès Premium SGO', 'DE': ' SGO Premium Zugang', 'ES': ' Acceso Premium SGO', 'AR': ' وصول SGO المميز', 'KO': ' SGO 프리미엄 액세스', 'JA': ' SGO プレミアムアクセス', 'ZH': ' SGO 高级访问', 'RU': ' SGO Премиум'},
    'm4_title': {'ID': ' Manajemen Lisensi', 'EN': ' License Management', 'FR': ' Gestion de Licence', 'DE': ' Lizenzmanagement', 'ES': ' Gestión de Licencias', 'AR': ' إدارة الترخيص', 'KO': ' 라이선스 관리', 'JA': ' ライセンス 관리', 'ZH': ' 许可证管理', 'RU': ' Управление лицензией'},
    'm4_status_active': {'ID': ' STATUS: AKTIF', 'EN': ' STATUS: ACTIVE', 'FR': ' STATUT: ACTIF', 'DE': ' STATUS: AKTIV', 'ES': ' ESTADO: ACTIVO', 'AR': ' الحالة: نشط', 'KO': ' 상태: 활성', 'JA': ' ステータス: アクティブ', 'ZH': ' 状态：活动', 'RU': ' СТАТУС: АКТИВЕН'},
    'm4_logout': {'ID': 'Keluar Sistem', 'EN': 'Log Out System', 'FR': 'Déconnexion', 'DE': 'Abmelden', 'ES': 'Cerrar Sesión', 'AR': 'تسجيل الخروج', 'KO': '로그아웃', 'JA': 'ログアウト', 'ZH': '退出系统', 'RU': 'Выйти'},
    
    // Updated Subscription Translations (Paid Model)
    'm3_subtitle': {'ID': 'Pilih paket sesuai jangkauan kompetitor yang ingin Anda pantau.', 'EN': 'Choose a plan based on the competitor coverage you need.'},
    
    // Tier 1
    'm3_plan_basic': {'ID': 'Basic', 'EN': 'Basic'},
    'm3_price_basic': {'ID': 'Rp 500rb', 'EN': 'IDR 500K'},
    'm3_desc_basic': {'ID': 'Pantau 5 Hotel Terdekat', 'EN': 'Monitor 5 Nearest Hotels'},
    
    // Tier 2
    'm3_plan_pro': {'ID': 'Pro', 'EN': 'Pro'},
    'm3_price_pro': {'ID': 'Rp 1 Juta', 'EN': 'IDR 1 Million'},
    'm3_desc_pro': {'ID': 'Pantau 10 Hotel Terdekat', 'EN': 'Monitor 10 Nearest Hotels'},

    // Tier 3
    'm3_plan_adv': {'ID': 'Advanced', 'EN': 'Advanced'},
    'm3_price_adv': {'ID': 'Rp 2 Juta', 'EN': 'IDR 2 Million'},
    'm3_desc_adv': {'ID': 'Pantau 20 Hotel Terdekat', 'EN': 'Monitor 20 Nearest Hotels'},

    // Tier 4 (Enterprise)
    'm3_plan_enterprise': {'ID': 'Enterprise', 'EN': 'Enterprise'},
    'm3_price_custom': {'ID': 'Khusus', 'EN': 'Custom'},
    'm3_desc_ent': {'ID': 'Akses Seluruh Indonesia', 'EN': 'All Indonesia Access'},

    'm3_period_month': {'ID': '/bulan', 'EN': '/month'},
    'm3_popular': {'ID': 'PALING LARIS', 'EN': 'BEST SELLER'},
    'm3_btn_choose': {'ID': 'Pilih Paket', 'EN': 'Choose Plan'},
    'm3_btn_contact': {'ID': 'Hubungi Kami', 'EN': 'Contact Us'},
    
    // Features
    'feat_radius_5': {'ID': 'Radius: 5 Kompetitor', 'EN': 'Radius: 5 Competitors'},
    'feat_radius_10': {'ID': 'Radius: 10 Kompetitor', 'EN': 'Radius: 10 Competitors'},
    'feat_radius_20': {'ID': 'Radius: 20 Kompetitor', 'EN': 'Radius: 20 Competitors'},
    'feat_radius_all': {'ID': 'Radius: Tanpa Batas', 'EN': 'Radius: Unlimited'},
    
    'feat_basic_analysis': {'ID': 'Analisa Harga Dasar', 'EN': 'Basic Price Analysis'},
    'feat_adv_analysis': {'ID': 'Analisa Tren Lanjutan', 'EN': 'Advanced Trend Analysis'},
    'feat_daily': {'ID': 'Update Harian', 'EN': 'Daily Updates'},
    'feat_realtime': {'ID': 'Data Real-time', 'EN': 'Real-time Data'},
    'feat_export': {'ID': 'Ekspor Laporan', 'EN': 'Report Export'},
    'feat_api': {'ID': 'Akses API Penuh', 'EN': 'Full API Access'},
    'feat_support': {'ID': 'Dukungan Email', 'EN': 'Email Support'},
    'feat_priority': {'ID': 'Dukungan Prioritas WA', 'EN': 'Priority WA Support'},
    
    // Account Control
    'm4_profile': {'ID': 'Profil Pengguna', 'EN': 'User Profile'},
    'm4_name': {'ID': 'Nama Lengkap', 'EN': 'Full Name'},
    'm4_email': {'ID': 'Alamat Email', 'EN': 'Email Address'},
    'm4_role': {'ID': 'Peran', 'EN': 'Role'},
    'm4_settings_security': {'ID': 'Pengaturan Keamanan', 'EN': 'Security Settings'},
    'm4_label_password': {'ID': 'Kata Sandi', 'EN': 'Password'},
    'm4_btn_change': {'ID': 'Ubah', 'EN': 'Change'},
    'm4_active_sessions': {'ID': 'Sesi Aktif', 'EN': 'Active Sessions'},
    'm4_device_current': {'ID': 'Perangkat Ini (Web)', 'EN': 'This Device (Web)'},
    'access_denied': {"ID":"Email atau Password Salah","EN":"Invalid Email or Password"},
    'login_title': {"ID":"Masuk Sistem SGO","EN":"SGO System Login"},
    'login_subtitle': {"ID":"Masukkan kredensial Anda untuk melanjutkan","EN":"Enter your credentials to continue"},
    'login_btn': {"ID":"Masuk Sekarang","EN":"Login Now"},
    'm4_notif_desc': {"ID":"Aktifkan notifikasi email harian untuk menerima laporan ringkasan pergerakan harga kompetitor dan tren pasar terbaru langsung ke inbox Anda.","EN":"Enable daily email notifications to receive summary reports of competitor price movements and latest market trends directly to your inbox."},
    'm4_label_notif': {"ID":"Notifikasi Email Harian","EN":"Daily Email Notifications"},

    'menu_1': {"ID":"Dasbor Utama","EN":"Main Dashboard"},
    'menu_2': {"ID":"Intelijen Pasar","EN":"Market Intelligence"},
    'menu_3': {"ID":"Paket Langganan","EN":"Subscription Plan"},
    'menu_4': {"ID":"Kontrol Akun","EN":"Account Control"},
    'status_online': {"ID":"ONLINE","EN":"ONLINE"},
    'm1_desc': {"ID":"Pantau pergerakan harga dan okupansi kompetitor di sekitar properti Anda secara real-time.","EN":"Monitor competitor price and occupancy movements around your property in real-time."},
    'm1_input_label': {"ID":"Lokasi / Kota","EN":"Location / City"},
    'm1_btn': {"ID":"Cari Data","EN":"Search Data"},
    'm4_settings_profile': {"ID":"Pengaturan Profil","EN":"Profile Settings"},
    'm4_label_name': {"ID":"Nama Lengkap","EN":"Full Name"},
    'm4_label_email': {"ID":"Email","EN":"Email"},

    'm1_access_limited': {"ID":"Akses Terbatas: Paket","EN":"Access Limited: Plan"},
    'm1_limit_warning': {"ID":"Anda hanya melihat","EN":"You are viewing only"},
    'm1_limit_warning_2': {"ID":"hotel teratas dari","EN":"top hotels from"},
    'm1_limit_warning_3': {"ID":"hasil yang ditemukan.","EN":"results found."},
    'm1_upgrade_link': {"ID":"Upgrade ke Pro/Enterprise","EN":"Upgrade to Pro/Enterprise"},
    'm1_upgrade_text': {"ID":"untuk melihat semua data.","EN":"to see all data."},
    'm1_col_hotel': {"ID":"Nama Hotel","EN":"Hotel Name"},
    'm1_col_price': {"ID":"Harga","EN":"Price"},
    'm1_col_rating': {"ID":"Rating","EN":"Rating"},
    'm1_col_class': {"ID":"Kelas","EN":"Class"},
    'm1_reviews': {"ID":"Ulasan","EN":"Reviews"},
    'm1_no_data': {"ID":"Tidak ada data ditemukan untuk kota ini.","EN":"No data found for this city."},
    'm1_search_hint': {"ID":"Coba cari kota lain seperti \"Jakarta\" atau \"Bali\"","EN":"Try searching for other cities like \"Jakarta\" or \"Bali\""},
    'm4_plan': {"ID":"Paket","EN":"Plan"},
    'm4_contact_admin': {"ID":"*Hubungi administrator untuk mengubah data profil utama.","EN":"*Contact administrator to change main profile data."},
    'm4_password_hint': {"ID":"Update berkala untuk keamanan","EN":"Update periodically for security"},
};