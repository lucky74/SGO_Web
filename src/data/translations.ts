export type Language = 'ID' | 'EN';

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
    { code: 'ID', label: 'Indonesia', flag: '\uD83C\uDDEE\uD83C\uDDE9' },
    { code: 'EN', label: 'English', flag: '\uD83C\uDDEC\uD83C\uDDE7' }
];

export const TRANS: { [key: string]: { [key: string]: string } } = {
    'nav_dashboard': {'ID': 'Dasbor Utama', 'EN': 'Main Dashboard'},
    'nav_market': {'ID': 'Intelijen Pasar', 'EN': 'Market Intelligence'},
    'nav_trend': {'ID': 'Analisa Tren', 'EN': 'Trend Analysis'},
    'nav_subscription': {'ID': 'Paket Langganan', 'EN': 'Subscription Plan'},
    'nav_account': {'ID': 'Kontrol Akun', 'EN': 'Account Control'},
    'header_title': {'ID': 'SGO - Optimasi Grup Sahid', 'EN': 'SGO - Sahid Group Optimization'},
    'm1_title': {
        'ID': ' Intelijen Pasar Real-time', 'EN': ' Real-time Market Intelligence'},
    'm1_metric_1': {'ID': 'Properti', 'EN': 'Properties'},
    'm1_metric_2': {'ID': 'Rata-rata Harga', 'EN': 'Avg. Price'},
    'm1_metric_3': {'ID': 'Total Ulasan', 'EN': 'Total Reviews'},
    'm1_viz_title': {
        'ID': ' Visualisasi Ekosistem Pasar', 'EN': ' Market Ecosystem Visualization'},
    'm1_table_title': {
        'ID': ' Laporan Detail Properti', 'EN': ' Property Detail Report'},
    'm2_title': {
        'ID': ' Analisa Tren & Rekomendasi AI', 'EN': ' Trend Analysis & AI Recommendations'},
    'm2_col1': {'ID': ' Pemimpin Pasar', 'EN': ' Market Leaders'},
    'm2_col2': {'ID': ' Nilai Terbaik', 'EN': ' Best Value'},
    'm3_title': {'ID': ' Akses Premium SGO', 'EN': ' SGO Premium Access'},
    'm4_title': {'ID': ' Manajemen Lisensi', 'EN': ' License Management'},
    'm4_status_active': {'ID': ' STATUS: AKTIF', 'EN': ' STATUS: ACTIVE'},
    'm4_logout': {'ID': 'Keluar Sistem', 'EN': 'Log Out System'},
    
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
    'menu_2': {"ID":"Analisa Tren","EN":"Trend Analysis"},
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
    'm1_col_no': {"ID":"No","EN":"No"},
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

    // Market Intelligence (TrendAnalysis.tsx)
    'm2_desc': {'ID': 'Analisa mendalam mengenai tren pasar, strategi harga, dan peta persaingan per kelas bintang.', 'EN': 'In-depth analysis of market trends, pricing strategies, and competition maps per star class.'},
    'm2_insight_title': {'ID': 'SGO Smart Insight', 'EN': 'SGO Smart Insight'},
    'm2_insight_summary': {'ID': 'Ringkasan Pasar:', 'EN': 'Market Summary:'},
    'm2_insight_dominated': {'ID': 'Didominasi oleh', 'EN': 'Dominated by'},
    'm2_insight_competition': {'ID': 'Persaingan paling ketat berada di segmen ini.', 'EN': 'The tightest competition is in this segment.'},
    'm2_insight_price_range': {'ID': 'Rentang Harga:', 'EN': 'Price Range:'},
    'm2_insight_suggested': {'ID': 'Saran Harga:', 'EN': 'Suggested Pricing:'},
    'm2_leader_title': {'ID': 'Pemimpin Pasar (Market Leader)', 'EN': 'Market Leader'},
    'm2_col_class': {'ID': 'Kelas Hotel', 'EN': 'Hotel Class'},
    'm2_col_leader': {'ID': 'Pemimpin Pasar', 'EN': 'Market Leader'},
    'm2_col_occupancy': {'ID': 'Status Hunian', 'EN': 'Occupancy Status'},
    'm2_col_avg_price': {'ID': 'Harga Rata-rata', 'EN': 'Avg. Price'},
    'm2_col_rating': {'ID': 'Rating', 'EN': 'Rating'},
    'm2_chart_pie': {'ID': 'Komposisi Pasar', 'EN': 'Market Composition'},
    'm2_best_value_title': {'ID': 'Nilai Terbaik (Best Value)', 'EN': 'Best Value'},
    'm2_col_property': {'ID': 'Properti', 'EN': 'Property'},
    'm2_top3_title': {'ID': 'Top 3 Hotel Terbaik (Overall)', 'EN': 'Top 3 Best Hotels (Overall)'},
    'm2_chart_price': {'ID': 'Lanskap Harga Kompetitif', 'EN': 'Competitive Price Landscape'},
    'm2_chart_scatter': {'ID': 'Korelasi Harga vs Kualitas', 'EN': 'Price vs Quality Correlation'},
    'm2_empty_state': {'ID': 'Silakan lakukan pencarian di menu Intelijen Hunian terlebih dahulu.', 'EN': 'Please perform a search in the Market Intelligence menu first.'},
    'm2_star': {'ID': 'Bintang', 'EN': 'Star'},
    'm2_non_star': {'ID': 'Non-Bintang', 'EN': 'Non-Star'},
    
    // Dynamic Status
    'status_top_tier': {'ID': 'Top Tier', 'EN': 'Top Tier'},
    'status_high_demand': {'ID': 'High Demand', 'EN': 'High Demand'},
    'status_popular': {'ID': 'Popular', 'EN': 'Popular'},
    'status_standard': {'ID': 'Standard', 'EN': 'Standard'}
};

