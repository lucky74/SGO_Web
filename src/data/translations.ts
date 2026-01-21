export type Language = 'ID' | 'EN' | 'FR' | 'DE' | 'ES' | 'AR' | 'KO' | 'JA' | 'ZH' | 'RU';

export const LANGUAGES: Record<Language, string> = {
    'ID': ' Indonesia',
    'EN': ' English',
    'FR': ' Français',
    'DE': ' Deutsch',
    'ES': ' Español',
    'AR': ' العربية',
    'KO': ' 한국어',
    'JA': ' 日本語',
    'ZH': ' 中文',
    'RU': ' Русский'
};

export const TRANS: Record<string, Record<string, string>> = {
    'login_title': {
        'ID': 'Akses Intelijen Aman', 'EN': 'Secure Intelligence Access', 'FR': 'Accès Intelligence Sécurisé', 
        'DE': 'Sicherer Intelligenzzugang', 'ES': 'Acceso Seguro a Inteligencia', 'AR': 'وصول استخبارati آمن', 
        'KO': '보안 인텔리전스 액세스', 'JA': 'セキュアインテリジェンスアクセス', 'ZH': '安全情报访问', 'RU': 'Безопасный доступ к данным'
    },
    'login_subtitle': {
        'ID': 'Silakan masukkan kunci lisensi perusahaan Anda.', 'EN': 'Please enter your company license key.', 
        'FR': 'Veuillez entrer votre clé de licence.', 'DE': 'Bitte geben Sie Ihren Lizenzschlüssel ein.', 
        'ES': 'Ingrese su clave de licencia.', 'AR': 'الرجاء إدخال مفتاح الترخيص.', 
        'KO': '라이선스 키를 입력하십시오.', 'JA': 'ライセンスキーを入力してください.', 'ZH': '请输入许可证密钥.', 'RU': 'Введите лицензионный ключ.'
    },
    'login_btn': {
        'ID': 'AUTHENTICATE SYSTEM', 'EN': 'AUTHENTICATE SYSTEM', 'FR': 'AUTHENTIFIER', 
        'DE': 'AUTHENTIFIZIEREN', 'ES': 'AUTENTICAR', 'AR': 'توثيق النظام', 
        'KO': '시스템 인증', 'JA': '認証 시스템', 'ZH': '验证系统', 'RU': 'АВТОРИЗАЦИЯ'
    },
    'access_denied': {
        'ID': ' Akses Ditolak. Kunci lisensi tidak valid.', 'EN': ' Access Denied. Invalid license key.', 
        'FR': ' Accès refusé. Clé invalide.', 'DE': ' Zugriff verweigert. Ungültiger Schlüssel.', 
        'ES': ' Acceso denegado. Clave inválida.', 'AR': ' تم رفض الوصول. مفتاح غير صالح.', 
        'KO': ' 액세스가 거부되었습니다. 잘못된 키입니다.', 'JA': ' アクセス拒否。無効なキー。', 'ZH': ' 访问被拒绝。无效密钥。', 'RU': ' Доступ запрещен. Неверный ключ.'
    },
    'nav_header': {
        'ID': 'Navigasi SGO', 'EN': 'SGO Navigation', 'FR': 'Navigation SGO', 
        'DE': 'SGO Navigation', 'ES': 'Navegación SGO', 'AR': 'تصفح SGO', 
        'KO': 'SGO 탐색', 'JA': 'SGO ナビゲーション', 'ZH': 'SGO 导航', 'RU': 'Навигация SGO'
    },
    'menu_1': {
        'ID': ' Intelijen Hunian', 'EN': ' Market Intelligence', 'FR': ' Intelligence Marché', 
        'DE': ' Marktintelligenz', 'ES': ' Inteligencia de Mercado', 'AR': ' ذكاء السوق', 
        'KO': ' 시장 인텔리전스', 'JA': ' 市場インテリジェンス', 'ZH': ' 市场情报', 'RU': ' Разведка рынка'
    },
    'menu_2': {
        'ID': ' Analisa Tren Pasar', 'EN': ' Market Trend Analysis', 'FR': ' Analyse Tendances', 
        'DE': ' Markttrendanalyse', 'ES': ' Análisis de Tendencias', 'AR': ' تحليل الاتجاهات', 
        'KO': ' 시장 트렌드 분석', 'JA': ' トレンド分析', 'ZH': ' 趋势分析', 'RU': ' Анализ трендов'
    },
    'menu_3': {
        'ID': ' Paket Langganan', 'EN': ' Subscription Plans', 'FR': ' Abonnements', 
        'DE': ' Abonnements', 'ES': ' Suscripciones', 'AR': ' الاشتراكات', 
        'KO': ' 구독 플랜', 'JA': ' サブスクリプション', 'ZH': ' 订阅计划', 'RU': ' Подписка'
    },
    'menu_4': {
        'ID': ' Kontrol Akun', 'EN': ' Account Control', 'FR': ' Compte', 
        'DE': ' Konto', 'ES': ' Cuenta', 'AR': ' الحساب', 
        'KO': ' 계정 관리', 'JA': ' アカウント', 'ZH': ' 账户', 'RU': ' Аккаунт'
    },
    'status_online': {
        'ID': ' Sistem Online', 'EN': ' System Online', 'FR': ' Système En Ligne', 
        'DE': ' System Online', 'ES': ' Sistema En Línea', 'AR': ' النظام متصل', 
        'KO': ' 시스템 온라인', 'JA': ' システムオンライン', 'ZH': ' 系统在线', 'RU': ' Система онлайн'
    },
    'm1_title': {
        'ID': ' Dashboard Intelijen Pasar', 'EN': ' Market Intelligence Dashboard', 'FR': ' Tableau de Bord Intelligence', 
        'DE': ' Marktintelligenz-Dashboard', 'ES': ' Panel de Inteligencia', 'AR': ' لوحة معلومات ذكاء السوق', 
        'KO': ' 시장 인텔리전스 대시보드', 'JA': ' 市場インテリジェンスダッシュボード', 'ZH': ' 市场情报仪表板', 'RU': ' Панель разведки рынка'
    },
    'm1_desc': {
        'ID': 'Analisa real-time tingkat hunian, harga kompetitor, dan sentimen pasar.', 
        'EN': 'Real-time analysis of occupancy, competitor prices, and market sentiment.',
        'FR': "Analyse en temps réel de l'occupation, des prix et du sentiment.",
        'DE': 'Echtzeitanalyse von Belegung, Wettbewerbspreisen und Marktstimmung.',
        'ES': 'Análisis en tiempo real de ocupación, precios y sentimiento.',
        'AR': 'تحليل في الوقت الحقيقي للإشغال وأسعار المنافسين ومشاعر السوق.',
        'KO': '점유율, 경쟁사 가격 및 시장 정서에 대한 실시간 분석.',
        'JA': '占有率、競合他社の価格、市場心理のリアルタイム分析。',
        'ZH': '实时分析入住率、竞争对手价格和市场情绪。',
        'RU': 'Анализ заполняемости, цен конкурентов и настроений рынка в реальном времени.'
    },
    'm1_input_label': {
        'ID': 'Target Analisa Wilayah:', 'EN': 'Target Analysis Area:', 'FR': "Zone d'Analyse Cible:", 
        'DE': 'Zielanalysegebiet:', 'ES': 'Área de Análisis Objetivo:', 'AR': 'منطقة التحليل المستهدفة:', 
        'KO': '타겟 분석 지역:', 'JA': '分析対象エリア:', 'ZH': '目标分析区域:', 'RU': 'Целевая область:'
    },
    'm1_btn': {
        'ID': ' EKSEKUSI SCAN', 'EN': ' EXECUTE SCAN', 'FR': ' EXÉCUTER LE SCAN', 
        'DE': ' SCAN AUSFÜHREN', 'ES': ' EJECUTAR ESCANEO', 'AR': ' تنفيذ المسح', 
        'KO': ' 스캔 실행', 'JA': ' スキャン実行', 'ZH': ' 执行扫描', 'RU': ' ЗАПУСТИТЬ СКАН'
    },
    'm1_summary_title': {
        'ID': ' Executive Summary', 'EN': ' Executive Summary', 'FR': ' Résumé Exécutif', 
        'DE': ' Zusammenfassung', 'ES': ' Resumen Ejecutivo', 'AR': ' ملخص تنفيذي', 
        'KO': ' 경영 요약', 'JA': ' エグゼクティブサマリー', 'ZH': ' 执行摘要', 'RU': ' Резюме'
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
    'm4_title': {'ID': ' Manajemen Lisensi', 'EN': ' License Management', 'FR': ' Gestion de Licence', 'DE': ' Lizenzmanagement', 'ES': ' Gestión de Licencias', 'AR': ' إدارة الترخيص', 'KO': ' 라이선스 관리', 'JA': ' ライセンス管理', 'ZH': ' 许可证管理', 'RU': ' Управление лицензией'},
    'm4_status_active': {'ID': ' STATUS: AKTIF', 'EN': ' STATUS: ACTIVE', 'FR': ' STATUT: ACTIF', 'DE': ' STATUS: AKTIV', 'ES': ' ESTADO: ACTIVO', 'AR': ' الحالة: نشط', 'KO': ' 상태: 활성', 'JA': ' ステータス: アクティブ', 'ZH': ' 状态：活动', 'RU': ' СТАТУС: АКТИВЕН'},
    'm4_logout': {'ID': 'Keluar Sistem', 'EN': 'Log Out System', 'FR': 'Déconnexion', 'DE': 'Abmelden', 'ES': 'Cerrar Sesión', 'AR': 'تسجيل الخروج', 'KO': '로그아웃', 'JA': 'ログアウト', 'ZH': '退出系统', 'RU': 'Выйти'}
};