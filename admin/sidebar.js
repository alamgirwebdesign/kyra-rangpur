// Shared admin sidebar HTML generator
function renderAdminSidebar(activePage) {
  const links = [
    { href: 'dashboard.html', icon: '🏠', label: 'ড্যাশবোর্ড', key: 'dashboard' },
    { href: 'projects.html', icon: '📋', label: 'প্রকল্পসমূহ', key: 'projects' },
    { href: 'events.html', icon: '📅', label: 'ইভেন্ট', key: 'events' },
    { href: 'team.html', icon: '👥', label: 'টিম মেম্বার', key: 'team' },
    { href: 'gallery.html', icon: '🖼️', label: 'গ্যালারি', key: 'gallery' },
    { href: 'partners.html', icon: '🤝', label: 'অংশীদার', key: 'partners' },
    { href: 'volunteers.html', icon: '🙋', label: 'স্বেচ্ছাসেবক', key: 'volunteers' },
    { href: 'messages.html', icon: '✉️', label: 'বার্তা', key: 'messages' },
    { href: 'donations.html', icon: '💚', label: 'ডোনেশন', key: 'donations' },
    { href: 'settings.html', icon: '⚙️', label: 'সেটিংস', key: 'settings' },
  ];
  return `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div style="background:linear-gradient(135deg,var(--green-light),var(--green-bright));border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Noto Serif Bengali',serif;font-size:20px;font-weight:900;color:white;width:38px;height:38px;flex-shrink:0;">ক</div>
      <div><div style="font-weight:700;font-size:14px;color:white">কায়রা ফাউন্ডেশন</div><div style="font-size:11px;opacity:0.6;color:white">অ্যাডমিন প্যানেল</div></div>
    </div>
    <nav class="sidebar-nav">
      ${links.map(l => `<a href="${l.href}" class="sidebar-link${activePage===l.key?' active':''}">${l.icon} ${l.label}</a>`).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="admin-info">
        <div class="admin-avatar" id="adminAvatarChar">A</div>
        <div><div id="adminName" style="font-size:14px;font-weight:600;color:white">লোড হচ্ছে...</div><div id="adminRole" style="font-size:11px;opacity:0.6;color:white">admin</div></div>
      </div>
      <button onclick="logout()" class="logout-btn">লগআউট</button>
    </div>
  </aside>`;
}

function initAdminPage(activePage) {
  // Insert sidebar
  const sidebar = document.getElementById('sidebar-placeholder');
  if (sidebar) sidebar.outerHTML = renderAdminSidebar(activePage);

  requireAdminAuth();
  loadAdminUser();

  // sidebar toggle
  document.getElementById('sidebarToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('open');
  });
}
