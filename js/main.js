// ============================================
// কায়রা ফাউন্ডেশন - Main JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  animateCounters();
  loadSettings();
  loadProjects();
  loadGallery();
  loadPartners();
  loadEvents();
  initScrollAnimations();
});

// Navbar scroll effect
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile menu
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (!hamburger || !navMenu) return;
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCount(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCount(el, target) {
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('bn-BD');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('bn-BD');
  };
  requestAnimationFrame(step);
}

// Load site settings
async function loadSettings() {
  try {
    const res = await API.get('/settings');
    if (res.success) {
      const s = res.data;
      const phone = document.getElementById('footerPhone');
      const email = document.getElementById('footerEmail');
      if (phone) phone.textContent = s.site_phone || '';
      if (email) email.textContent = s.site_email || '';
    }
  } catch(e) { console.warn('Settings load failed'); }
}

// Load projects
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  try {
    const res = await API.get('/projects');
    if (!res.success) return;
    const projects = res.data.slice(0, 3);
    grid.innerHTML = projects.map(p => `
      <div class="project-card fade-in">
        <div class="project-img">
          ${p.cover_image ? `<img src="${CONFIG.API_URL.replace('/api','')}/${p.cover_image}" alt="${p.title}">` : getCategoryEmoji(p.category)}
          <span class="project-status ${STATUS_LABELS[p.status]?.class}">${STATUS_LABELS[p.status]?.label}</span>
        </div>
        <div class="project-body">
          <div class="project-category">${CATEGORIES[p.category] || p.category}</div>
          <h3>${p.title}</h3>
          <p>${p.short_desc || ''}</p>
          <div class="project-meta">
            <span>📍 ${p.location || 'রংপুর'}</span>
            <span>👥 ${Number(p.beneficiaries).toLocaleString('bn-BD')}+ উপকারভোগী</span>
          </div>
        </div>
      </div>
    `).join('');
    initScrollAnimations();
  } catch(e) {
    grid.innerHTML = getPlaceholderProjects();
  }
}

function getCategoryEmoji(cat) {
  const map = { education: '📚', health: '🏥', poverty: '🌾', environment: '🌿' };
  return map[cat] || '📌';
}

function getPlaceholderProjects() {
  return [
    { title: 'শিক্ষা আলো প্রকল্প', category: 'education', short_desc: 'সুবিধাবঞ্চিত শিশুদের বিনামূল্যে শিক্ষা কার্যক্রম', status: 'ongoing', location: 'রংপুর', beneficiaries: 2000 },
    { title: 'স্বাস্থ্য সেবা শিবির', category: 'health', short_desc: 'প্রত্যন্ত অঞ্চলে বিনামূল্যে চিকিৎসা সেবা', status: 'ongoing', location: 'রংপুর বিভাগ', beneficiaries: 5000 },
    { title: 'শীতবস্ত্র বিতরণ', category: 'poverty', short_desc: 'দরিদ্র পরিবারের মাঝে শীতবস্ত্র বিতরণ', status: 'completed', location: 'রংপুর, নীলফামারী', beneficiaries: 3000 },
  ].map(p => `
    <div class="project-card">
      <div class="project-img">${getCategoryEmoji(p.category)}
        <span class="project-status ${STATUS_LABELS[p.status]?.class}">${STATUS_LABELS[p.status]?.label}</span>
      </div>
      <div class="project-body">
        <div class="project-category">${CATEGORIES[p.category]}</div>
        <h3>${p.title}</h3><p>${p.short_desc}</p>
        <div class="project-meta"><span>📍 ${p.location}</span><span>👥 ${p.beneficiaries.toLocaleString('bn-BD')}+</span></div>
      </div>
    </div>`).join('');
}

// Load gallery
async function loadGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  const emojis = ['🎉','📸','🤝','💚','🌟','📚','🏥','🌾'];
  try {
    const res = await API.get('/gallery');
    if (!res.success) throw new Error();
    const items = res.data.slice(0, 6);
    if (items.length === 0) throw new Error();
    grid.innerHTML = items.map((item, i) => `
      <div class="gallery-item">
        <img src="${CONFIG.API_URL.replace('/api','')}/${item.image_path}" alt="${item.title || ''}">
        <div class="gallery-overlay"></div>
      </div>`).join('');
  } catch(e) {
    grid.innerHTML = emojis.slice(0, 6).map(e => `<div class="gallery-item">${e}<div class="gallery-overlay"></div></div>`).join('');
  }
}

// Load partners
async function loadPartners() {
  const track = document.getElementById('partnersTrack');
  if (!track) return;
  const defaults = [
    { name: 'রংপুর জেলা প্রশাসন', short_info: 'প্রশাসনিক সহযোগী', icon: '🏛️' },
    { name: 'বাংলাদেশ রেড ক্রিসেন্ট', short_info: 'স্বাস্থ্য সেবা সহযোগী', icon: '🏥' },
    { name: 'স্থানীয় ব্যবসায়ী সমিতি', short_info: 'আর্থিক সহায়তাকারী', icon: '🤝' },
  ];
  try {
    const res = await API.get('/partners');
    const partners = (res.success && res.data.length) ? res.data : defaults;
    track.innerHTML = partners.map(p => `
      <div class="partner-card">
        <div class="partner-icon">${p.icon || '🤝'}</div>
        <div class="partner-name">${p.name}</div>
        <div class="partner-info">${p.short_info || ''}</div>
      </div>`).join('');
  } catch(e) {
    track.innerHTML = defaults.map(p => `
      <div class="partner-card">
        <div class="partner-icon">${p.icon}</div>
        <div class="partner-name">${p.name}</div>
        <div class="partner-info">${p.short_info}</div>
      </div>`).join('');
  }
}

// Load events
async function loadEvents() {
  const list = document.getElementById('eventsList');
  if (!list) return;
  const defaults = [
    { title: 'বার্ষিক স্বেচ্ছাসেবক সম্মেলন', event_date: '2024-12-15', location: 'রংপুর টাউন হল', status: 'upcoming' },
    { title: 'শীতকালীন স্বাস্থ্য শিবির', event_date: '2024-12-20', location: 'গাইবান্ধা', status: 'upcoming' },
    { title: 'শিক্ষা বৃত্তি বিতরণ', event_date: '2024-12-25', location: 'নীলফামারী', status: 'upcoming' },
  ];
  try {
    const res = await API.get('/events');
    const events = (res.success && res.data.length) ? res.data.slice(0, 3) : defaults;
    renderEvents(list, events);
  } catch(e) {
    renderEvents(list, defaults);
  }
}

function renderEvents(container, events) {
  container.innerHTML = events.map(e => {
    const date = new Date(e.event_date);
    return `
      <div class="event-card">
        <div class="event-date-box">
          <div class="day">${date.getDate()}</div>
          <div class="month">${MONTHS_BN[date.getMonth()]}</div>
        </div>
        <div class="event-info">
          <span class="event-badge">${STATUS_LABELS[e.status]?.label || 'আসন্ন'}</span>
          <h3>${e.title}</h3>
          <p>📍 ${e.location || 'রংপুর'}</p>
        </div>
      </div>`;
  }).join('');
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
