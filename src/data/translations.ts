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
    'm3_price_basic': {'ID': 'Rp 750rb', 'EN': 'IDR 750K'},
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
    'm3_price_ent_fixed': {'ID': 'Rp 3 Juta', 'EN': 'IDR 3 Million'},
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
    
    'feat_basic_analysis': {'ID': 'Data Real-time', 'EN': 'Real-time Data'},
    'feat_adv_analysis': {'ID': 'Analisa Tren Pasar', 'EN': 'Market Trend Analysis'},
    'feat_daily': {'ID': 'Dukungan Email', 'EN': 'Email Support'},
    'feat_realtime': {'ID': 'Data Real-time', 'EN': 'Real-time Data'},
    'feat_api': {'ID': 'Analisa Tren Pasar', 'EN': 'Market Trend Analysis'},
    'feat_support': {'ID': 'Dukungan Email', 'EN': 'Email Support'},
    'feat_priority': {'ID': 'Dukungan Email', 'EN': 'Email Support'},
    
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
    'account_inactive': {"ID":"Akun dinonaktifkan. Silakan hubungi admin.","EN":"Account is deactivated. Please contact admin."},
    'account_activated': {"ID":"Akun diaktifkan. Silakan login.","EN":"Account has been activated. Please login."},
    'm4_notif_desc': {"ID":"Aktifkan notifikasi email harian untuk menerima laporan ringkasan pergerakan harga kompetitor dan tren pasar terbaru langsung ke inbox Anda.","EN":"Enable daily email notifications to receive summary reports of competitor price movements and latest market trends directly to your inbox."},
    'm4_label_notif': {"ID":"Notifikasi Email Harian","EN":"Daily Email Notifications"},

    // Management Discussion Room & Chat
    'discussion_title': {'ID': 'Ruang Diskusi Manajemen', 'EN': 'Management Discussion Room'},
    'discussion_desc': {
        'ID': 'Gunakan ruang diskusi untuk berbagi link ke Owner, GM, dan Manager tanpa perlu akun login tambahan. Setiap ruang memiliki Room ID dan Token unik.',
        'EN': 'Use this discussion room to share links with Owner, GM, and Marketing Manager without additional login accounts. Each room has a unique Room ID and Token.'
    },
    'discussion_schedule_hint': {
        'ID': 'Anda juga dapat menjadwalkan jam mulai diskusi. Link hanya bisa dipakai setelah waktu yang ditentukan.',
        'EN': 'You can also schedule the discussion start time. The link can only be used after the scheduled time.'
    },
    'discussion_schedule_label': {'ID': 'Jadwal Mulai', 'EN': 'Start Time'},
    'discussion_create_button': {'ID': 'Buat Ruang Diskusi Baru', 'EN': 'Create New Discussion Room'},
    'discussion_copy_button': {'ID': 'Salin Link Ruang Diskusi', 'EN': 'Copy Discussion Link'},
    'discussion_room_id_label': {'ID': 'Room ID', 'EN': 'Room ID'},
    'discussion_token_label': {'ID': 'Token', 'EN': 'Token'},
    'discussion_link_label': {'ID': 'Link Diskusi', 'EN': 'Discussion Link'},
    'discussion_copy_success': {
        'ID': 'Link ruang diskusi tersalin. Kirim via WhatsApp/Email ke manajemen.',
        'EN': 'Discussion link copied. Share it via WhatsApp/Email to management.'
    },
    'discussion_copy_fail': {
        'ID': 'Gagal menyalin otomatis. Silakan salin manual teks di bawah.',
        'EN': 'Automatic copy failed. Please copy the text below manually.'
    },

    'chat_title': {'ID': 'Ruang Diskusi Market Hotel', 'EN': 'Market Hotel Discussion Room'},
    'chat_not_found_title': {'ID': 'Ruang diskusi tidak ditemukan', 'EN': 'Discussion room not found'},
    'chat_not_found_desc': {
        'ID': 'Periksa kembali link yang Anda terima dari manajemen hotel.',
        'EN': 'Please check the link you received from the hotel management.'
    },
    'chat_join_intro': {
        'ID': 'Masukkan nama dan peran Anda untuk bergabung ke diskusi ini.',
        'EN': 'Enter your name and role to join this discussion.'
    },
    'chat_name_placeholder': {'ID': 'Nama Anda', 'EN': 'Your Name'},
    'chat_error_name_required': {'ID': 'Nama wajib diisi.', 'EN': 'Name is required.'},
    'chat_error_invalid_link': {
        'ID': 'Link ruang diskusi tidak valid.',
        'EN': 'Discussion room link is not valid.'
    },
    'chat_error_not_started': {
        'ID': 'Ruang diskusi belum dimulai. Jadwal:',
        'EN': 'Discussion room has not started yet. Schedule:'
    },
    'chat_join_button': {
        'ID': 'Gabung ke Ruang Diskusi',
        'EN': 'Join Discussion Room'
    },
    'chat_no_messages': {
        'ID': 'Belum ada pesan. Mulai diskusi dengan mengirim pesan pertama.',
        'EN': 'No messages yet. Start the discussion by sending the first message.'
    },
    'chat_input_placeholder': {'ID': 'Ketik pesan...', 'EN': 'Type a message...'},
    'chat_input_placeholder_locked': {
        'ID': 'Isi nama dulu untuk mengirim pesan',
        'EN': 'Enter your name first to send a message'
    },
    'chat_ephemeral_info': {
        'ID': 'Ruang diskusi ini hanya aktif saat halaman terbuka. Riwayat pesan tidak disimpan permanen di server.',
        'EN': 'This discussion room is only active while this page is open. Message history is not permanently stored on any server.'
    },
    'chat_role_owner': {'ID': 'Owner', 'EN': 'Owner'},
    'chat_role_gm': {'ID': 'GM', 'EN': 'GM'},
    'chat_role_manager': {'ID': 'Manager', 'EN': 'Manager'},
    'chat_role_other': {'ID': 'Lainnya', 'EN': 'Other'},
    'chat_not_started_notice_prefix': {
        'ID': 'Sesi ini akan dibuka pada',
        'EN': 'This session will open at'
    },
    'chat_not_started_notice_suffix': {
        'ID': 'Sebelum waktu tersebut, chat belum bisa digunakan.',
        'EN': 'Before that time, chat cannot be used.'
    },
    'chat_export_pdf_button': {
        'ID': 'Export Notulen (PDF)',
        'EN': 'Export Minutes (PDF)'
    },
    'minutes_title': {
        'ID': 'Notulen Rapat Market Hotel',
        'EN': 'Market Hotel Meeting Minutes'
    },
    'minutes_room_label': {'ID': 'Room ID', 'EN': 'Room ID'},
    'minutes_date_label': {'ID': 'Tanggal', 'EN': 'Date'},
    'minutes_note': {
        'ID': 'Notulen ini dihasilkan langsung dari ruang diskusi SGO tanpa disimpan di server.',
        'EN': 'These minutes are generated directly from the SGO discussion room and are not stored on any server.'
    },

    'menu_1': {'ID': 'Dasbor Utama', 'EN': 'Main Dashboard'},
    'menu_2': {'ID': 'Analisa Tren', 'EN': 'Trend Analysis'},
    'menu_5': {'ID': 'Pemimpin Pasar', 'EN': 'Market Leader'},
    'menu_3': {'ID': 'Paket Langganan', 'EN': 'Subscription Plan'},
    'menu_4': {'ID': 'Kontrol Akun', 'EN': 'Account Control'},
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
    'm1_upgrade_link': {"ID":"Upgrade ke Advanced/Enterprise","EN":"Upgrade to Advanced/Enterprise"},
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
    'chat_show_insight': {'ID': 'Tampilkan SGO Smart Insight', 'EN': 'Show SGO Smart Insight'},
    'chat_hide_insight': {'ID': 'Sembunyikan SGO Smart Insight', 'EN': 'Hide SGO Smart Insight'},
    'chat_show_leaders': {'ID': 'Tampilkan Pemimpin Pasar', 'EN': 'Show Market Leaders'},
    'chat_hide_leaders': {'ID': 'Sembunyikan Pemimpin Pasar', 'EN': 'Hide Market Leaders'},
    // Dynamic Status
    'status_top_tier': {'ID': 'Top Tier', 'EN': 'Top Tier'},
    'status_high_demand': {'ID': 'High Demand', 'EN': 'High Demand'},
    'status_popular': {'ID': 'Popular', 'EN': 'Popular'},
    'status_standard': {'ID': 'Standard', 'EN': 'Standard'}
};

