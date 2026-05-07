// Floating screen navigator widget — injects into every screen
(function() {
  const screens = [
    { file: 'index.html',               name: 'Login',              group: '🔐 Auth' },
    { file: 'welcome.html',             name: 'Welcome',            group: '🔐 Auth' },
    { file: 'privacy.html',             name: 'Privacy',            group: '🔐 Auth' },
    { file: 'checkin-feelings.html',    name: '1. Feelings',        group: '💭 Check-in' },
    { file: 'checkin-thoughts.html',    name: '2. Thoughts',        group: '💭 Check-in' },
    { file: 'checkin-triggers.html',    name: '3. Triggers',        group: '💭 Check-in' },
    { file: 'checkin-coping.html',      name: '4. Coping',          group: '💭 Check-in' },
    { file: 'checkin-support.html',     name: '5. Support',         group: '💭 Check-in' },
    { file: 'checkin-goal.html',        name: '6. Goal',            group: '💭 Check-in' },
    { file: 'checkin-review.html',      name: '7. Review',          group: '💭 Check-in' },
    { file: 'ai-chat.html',             name: 'AI Chat',            group: '💬 Other' },
    { file: 'urgent-support.html',      name: 'Urgent Support',     group: '💬 Other' },
    { file: 'dashboard-student.html',   name: 'Student Dashboard',  group: '📊 Dashboards' },
    { file: 'dashboard-counselor.html', name: 'Counselor View',     group: '📊 Dashboards' },
  ];

  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const currentIdx = screens.findIndex(s => s.file === currentFile);
  const prevScreen = currentIdx > 0 ? screens[currentIdx - 1] : null;
  const nextScreen = currentIdx >= 0 && currentIdx < screens.length - 1 ? screens[currentIdx + 1] : null;

  // Group screens
  const groups = {};
  screens.forEach(s => {
    if (!groups[s.group]) groups[s.group] = [];
    groups[s.group].push(s);
  });

  // Build dropdown HTML
  let dropdownHTML = '';
  Object.keys(groups).forEach(group => {
    dropdownHTML += `<div style="padding:8px 12px 4px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.05em;text-transform:uppercase;">${group}</div>`;
    groups[group].forEach(s => {
      const isActive = s.file === currentFile;
      dropdownHTML += `<a href="${s.file}" style="display:block;padding:8px 16px;font-size:13px;color:${isActive ? '#445e97' : '#2d3433'};background:${isActive ? '#eef2ff' : 'transparent'};font-weight:${isActive ? '700' : '500'};text-decoration:none;border-radius:8px;margin:2px 6px;">${s.name}</a>`;
    });
  });

  const navHTML = `
  <div id="sanctuary-nav" style="position:fixed;bottom:24px;left:24px;z-index:9999;font-family:'Be Vietnam Pro',system-ui,sans-serif;">
    <div id="sanctuary-nav-menu" style="display:none;position:absolute;bottom:60px;left:0;width:240px;max-height:400px;overflow-y:auto;background:white;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,0.15);border:1px solid rgba(0,0,0,0.05);padding:8px 0;">
      <div style="padding:12px 16px 8px;border-bottom:1px solid #f1f5f9;margin-bottom:4px;">
        <div style="font-size:13px;font-weight:700;color:#1e293b;">Screen Navigator</div>
        <div style="font-size:11px;color:#94a3b8;">Jump to any screen</div>
      </div>
      ${dropdownHTML}
    </div>
    <div style="display:flex;align-items:center;gap:8px;background:white;padding:8px;border-radius:9999px;box-shadow:0 10px 30px rgba(0,0,0,0.12);border:1px solid rgba(0,0,0,0.05);">
      ${prevScreen ? `<a href="${prevScreen.file}" title="Prev: ${prevScreen.name}" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:#f1f5f9;color:#445e97;text-decoration:none;font-weight:700;">←</a>` : `<div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:#f8fafc;color:#cbd5e1;">←</div>`}
      <button onclick="document.getElementById('sanctuary-nav-menu').style.display = document.getElementById('sanctuary-nav-menu').style.display === 'block' ? 'none' : 'block'" style="background:linear-gradient(135deg,#445e97 0%,#a7c0ff 100%);color:white;border:none;padding:8px 16px;border-radius:9999px;font-weight:700;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:6px;">
        <span>📱</span><span>${currentIdx >= 0 ? screens[currentIdx].name : 'Menu'}</span>
      </button>
      ${nextScreen ? `<a href="${nextScreen.file}" title="Next: ${nextScreen.name}" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:#445e97;color:white;text-decoration:none;font-weight:700;">→</a>` : `<div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:#f8fafc;color:#cbd5e1;">→</div>`}
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', navHTML);

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const nav = document.getElementById('sanctuary-nav');
    const menu = document.getElementById('sanctuary-nav-menu');
    if (nav && menu && !nav.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
})();
