// ============================================
// কায়রা ফাউন্ডেশন - Shared Components
// ============================================

function renderNavbar(activePage = '') {
  const links = [
    { href: '../index.html', label: 'হোম', key: 'home' },
    { href: 'about.html', label: 'আমাদের সম্পর্কে', key: 'about' },
    { href: 'projects.html', label: 'প্রকল্প', key: 'projects' },
    { href: 'team.html', label: 'টিম', key: 'team' },
    { href: 'gallery.html', label: 'গ্যালারি', key: 'gallery' },
    { href: 'events.html', label: 'ইভেন্ট', key: 'events' },
    { href: 'contact.html', label: 'যোগাযোগ', key: 'contact' },
  ];

  return `
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="../index.html" class="nav-logo">
        <div class="logo-icon">ক</div>
        <div class="logo-text">
          <span class="logo-main">কায়রা ফাউন্ডেশন</span>
          <span class="logo-sub">রংপুর বিভাগ</span>
        </div>
      </a>
      <div class="nav-menu" id="navMenu">
        ${links.map(l => `<a href="${l.href}" class="nav-link${activePage === l.key ? ' active' : ''}">${l.label}</a>`).join('')}
        <a href="volunteer.html" class="nav-btn-join">স্বেচ্ছাসেবক হন</a>
        <a href="donate.html" class="nav-btn-donate">ডোনেট করুন</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="logo-icon">ক</div>
            <div><div class="logo-main">কায়রা ফাউন্ডেশন</div><div class="logo-sub">রংপুর বিভাগ</div></div>
          </div>
          <p>মানবতার সেবায় আমরা একসাথে। রংপুর বিভাগের মানুষের জীবনমান উন্নয়নে প্রতিশ্রুতিবদ্ধ।</p>
          <div class="social-links">
            <a href="#" class="social-link">📘 Facebook</a>
            <a href="#" class="social-link">📷 Instagram</a>
            <a href="#" class="social-link">▶️ YouTube</a>
          </div>
        </div>
        <div class="footer-links">
          <h4>দ্রুত লিংক</h4>
          <ul>
            <li><a href="about.html">আমাদের সম্পর্কে</a></li>
            <li><a href="projects.html">প্রকল্পসমূহ</a></li>
            <li><a href="team.html">আমাদের টিম</a></li>
            <li><a href="gallery.html">গ্যালারি</a></li>
            <li><a href="events.html">ইভেন্ট</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>সহযোগিতা</h4>
          <ul>
            <li><a href="volunteer.html">স্বেচ্ছাসেবক হন</a></li>
            <li><a href="donate.html">ডোনেট করুন</a></li>
            <li><a href="contact.html">যোগাযোগ করুন</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>যোগাযোগ</h4>
          <div class="contact-item">📍 রংপুর, বাংলাদেশ</div>
          <div class="contact-item">📞 <span id="footerPhone">+880 1700-000000</span></div>
          <div class="contact-item">✉️ <span id="footerEmail">info@kayrafoundation.org</span></div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ২০২৪ কায়রা ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।</p>
        <p><a href="../admin/login.html">অ্যাডমিন পোর্টাল</a></p>
      </div>
    </div>
  </footer>`;
}

function initSharedComponents(activePage) {
  // Insert navbar
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) navPlaceholder.innerHTML = renderNavbar(activePage);

  // Insert footer
  const footPlaceholder = document.getElementById('footer-placeholder');
  if (footPlaceholder) footPlaceholder.innerHTML = renderFooter();

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));
    // Pages (not home) always show scrolled style
    navbar.classList.add('scrolled');
  }

  // Hamburger
  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('navMenu')?.classList.toggle('open');
  });

  // Load settings for footer
  API.get('/settings').then(res => {
    if (res.success) {
      const el1 = document.getElementById('footerPhone');
      const el2 = document.getElementById('footerEmail');
      if (el1 && res.data.site_phone) el1.textContent = res.data.site_phone;
      if (el2 && res.data.site_email) el2.textContent = res.data.site_email;
    }
  }).catch(() => {});

  // Scroll animations
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
