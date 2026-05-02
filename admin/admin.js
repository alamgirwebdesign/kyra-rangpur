// Admin Auth & Helpers
function requireAdminAuth() {
  if (!API.getToken()) window.location.href = 'login.html';
}

function loadAdminUser() {
  const user = JSON.parse(localStorage.getItem('kayra_admin') || '{}');
  const nameEl = document.getElementById('adminName');
  const roleEl = document.getElementById('adminRole');
  if (nameEl) nameEl.textContent = user.name || 'অ্যাডমিন';
  if (roleEl) roleEl.textContent = user.role || 'admin';
  const avatar = document.querySelector('.admin-avatar');
  if (avatar && user.name) avatar.textContent = user.name[0];
}

function logout() {
  API.removeToken();
  localStorage.removeItem('kayra_admin');
  window.location.href = 'login.html';
}

// Toast notification
function showToast(message, type = 'success') {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Modal open/close
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

// Sidebar toggle for mobile
document.getElementById('sidebarToggle')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.toggle('open');
});

// Admin API helper
async function adminFetch(endpoint, options = {}) {
  const token = API.getToken();
  const res = await fetch(`${CONFIG.API_URL}${endpoint}`, {
    ...options,
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', ...options.headers }
  });
  return res.json();
}

function confirmDelete(message, onConfirm) {
  if (confirm(message || 'মুছে ফেলতে চান?')) onConfirm();
}
