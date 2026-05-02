// ============================================
// কায়রা ফাউন্ডেশন - Configuration
// আপনার cPanel URL দিয়ে পরিবর্তন করুন
// ============================================

const CONFIG = {
  API_URL: 'https://kyra.shohozvibe.com/api',  // cPanel এ যে URL দেবেন
  SITE_NAME: 'কায়রা ফাউন্ডেশন',
};

// API helper
const API = {
  async get(endpoint) {
    const res = await fetch(`${CONFIG.API_URL}${endpoint}`);
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },
  async post(endpoint, data, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${CONFIG.API_URL}${endpoint}`, {
      method: 'POST', headers, body: JSON.stringify(data)
    });
    return res.json();
  },
  async put(endpoint, data, token) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    const res = await fetch(`${CONFIG.API_URL}${endpoint}`, {
      method: 'PUT', headers, body: JSON.stringify(data)
    });
    return res.json();
  },
  async delete(endpoint, token) {
    const res = await fetch(`${CONFIG.API_URL}${endpoint}`, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  getToken() { return localStorage.getItem('kayra_token'); },
  setToken(t) { localStorage.setItem('kayra_token', t); },
  removeToken() { localStorage.removeItem('kayra_token'); },
};

// Category labels
const CATEGORIES = {
  education: '📚 শিক্ষা',
  health: '🏥 স্বাস্থ্য',
  poverty: '🌾 দারিদ্র্য বিমোচন',
  environment: '🌿 পরিবেশ',
  other: '📌 অন্যান্য',
};

const STATUS_LABELS = {
  ongoing: { label: 'চলমান', class: 'status-ongoing' },
  completed: { label: 'সম্পন্ন', class: 'status-completed' },
  upcoming: { label: 'আসন্ন', class: 'status-upcoming' },
};

const MONTHS_BN = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
