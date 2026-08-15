// اطلاعات اولیه بیوگرافی محمد مهدی ارجمند منش
const defaultBio = {
  fullName: 'محمد مهدی ارجمند منش',
  email: 'jacklony2010@gmail.com',
  phone: '09052237518',
  subtitle: 'توسعه‌دهنده فول‌استک | برنامه‌نویس اندروید و ویندوز | متخصص وردپرس و سئو',
  bioText: 'طراح و توسعه‌دهنده سیستم‌های اختصاصی تحت وب، اپلیکیشن‌های کاربردی اندروید و ویندوز، افزونه‌ها و قالب‌های اختصاصی وردپرس، بهینه‌سازی کامل سئو (SEO)، پنل‌های مدیریت ابری شبکه و ربات‌های هوشمند تلگرام.'
};

// نمونه‌کارهای پیش‌فرض شاخص
const defaultProjects = [
  {
    id: 'proj_1',
    title: 'Dizyno VPN (Cloudflare Workers Edition)',
    category: 'vpn',
    url: 'https://github.com/MohammadMehdiArjmandManesh1386/claudeflare-dizynopanel',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    tags: ['Cloudflare Workers', 'JavaScript', 'WebSocket', 'Telegram Bot API'],
    desc: 'پنل مدیریت کامل سرویس‌های VLESS و Trojan بر پایه کلودفلر ورکر همراه با سوکت اختصاصی، اشتراک چندگانه و ربات مدیریت تعاملی تلگرام.'
  },
  {
    id: 'proj_2',
    title: 'Dizyno VPN (Railway & Sing-box Engine)',
    category: 'vpn',
    url: 'https://github.com/MohammadMehdiArjmandManesh1386/railway-dizynopanel',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['Node.js', 'Sing-box Core', 'Express.js', 'Bootstrap 5'],
    desc: 'پنل سرور اختصاصی ریلوی با هسته قدرت‌مند Sing-box، دشبورد مدرن تیره، مدیریت سقف ترافیک و تاریخ انقضای کاربران.'
  },
  {
    id: 'proj_3',
    title: 'افزونه اختصاصی سئو و مدیریت وردپرس',
    category: 'wordpress',
    url: 'https://github.com/MohammadMehdiArjmandManesh1386',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
    tags: ['WordPress Plugin', 'PHP 8+', 'SEO Optimization', 'MySQL'],
    desc: 'توسعه افزونه اختصاصی برای وردپرس جهت آنالیز خودکار سئو، تولید متاتگ‌های هوشمند و افزایش سرعت لود صفحات.'
  },
  {
    id: 'proj_4',
    title: 'اپلیکیشن کاربردی موبایل (Android App)',
    category: 'android',
    url: 'https://github.com/MohammadMehdiArjmandManesh1386',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    tags: ['Android', 'Java', 'Kotlin', 'Material Design'],
    desc: 'طراحی و کدنویسی اپلیکیشن نیتیو اندروید با رابط کاربری مدرن، مدیریت حافظه آفلاین و همگام‌سازی ابری سرور.'
  },
  {
    id: 'proj_5',
    title: 'نرم‌افزار مدیریت دسکتاپ (Windows Desktop)',
    category: 'windows',
    url: 'https://github.com/MohammadMehdiArjmandManesh1386',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    tags: ['Windows App', 'C#', '.NET', 'SQLite'],
    desc: 'برنامه‌نویسی نرم‌افزار دسکتاپ ویندوز برای مدیریت حسابداری، گزارش‌گیری گرافیکی و خروجی اکسل.'
  }
];

let currentFilter = 'all';

// ---- سیستم احراز هویت ادمین ----
function getAdminPassword() {
  return localStorage.getItem('dizyno_portfolio_pass') || 'admin';
}

function isAdminLoggedIn() {
  return localStorage.getItem('dizyno_admin_session') === 'true';
}

function handleAdminLogin(e) {
  e.preventDefault();
  const pass = document.getElementById('adminPasswordInput').value;
  if (pass === getAdminPassword()) {
    localStorage.setItem('dizyno_admin_session', 'true');
    const modalEl = document.getElementById('loginModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    updateAdminUI();
    renderProjects();
    alert('✅ ورود با موفقیت انجام شد. حالت مدیریت فعال گردید.');
  } else {
    alert('❌ کلمه عبور اشتباه است.');
  }
}

function logoutAdmin() {
  localStorage.removeItem('dizyno_admin_session');
  updateAdminUI();
  renderProjects();
  alert('از حالت مدیریت خارج شدید.');
}

function handleChangePassword(e) {
  e.preventDefault();
  const curr = document.getElementById('currPassInput').value;
  const newP = document.getElementById('newPassInput').value;

  if (curr !== getAdminPassword()) {
    alert('❌ رمز عبور فعلی نادرست است.');
    return;
  }

  localStorage.setItem('dizyno_portfolio_pass', newP);
  alert('✅ کلمه عبور مدیریت با موفقیت تغییر یافت.');
  document.getElementById('currPassInput').value = '';
  document.getElementById('newPassInput').value = '';
}

function updateAdminUI() {
  const isAd = isAdminLoggedIn();
  if (isAd) {
    document.body.classList.add('admin-mode');
    document.getElementById('adminTopBar').classList.remove('d-none');
    document.getElementById('adminAddProjBtn').classList.remove('d-none');
    renderAdminProjectsTable();
  } else {
    document.body.classList.remove('admin-mode');
    document.getElementById('adminTopBar').classList.add('d-none');
    document.getElementById('adminAddProjBtn').classList.add('d-none');
  }
}

// چک کردن روت مخفی ورود مدیریت (#admin یا #wp-admin یا ?admin=true)
function checkSecretAdminRoute() {
  const hash = window.location.hash;
  const search = window.location.search;

  if (hash === '#admin' || hash === '#wp-admin' || search.includes('admin=true')) {
    if (!isAdminLoggedIn()) {
      const modalEl = document.getElementById('loginModal');
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    } else {
      const modalEl = document.getElementById('adminDashboardModal');
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
}

// میانبر کیبورد مخفی Ctrl + Shift + A
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
    e.preventDefault();
    if (!isAdminLoggedIn()) {
      const modalEl = document.getElementById('loginModal');
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    } else {
      const modalEl = document.getElementById('adminDashboardModal');
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
});

window.addEventListener('hashchange', checkSecretAdminRoute);

// ---- مدیریت اطلاعات و بیوگرافی ----
function getBioInfo() {
  const saved = localStorage.getItem('dizyno_portfolio_bio');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return defaultBio;
}

function saveBioInfoToStorage(bio) {
  localStorage.setItem('dizyno_portfolio_bio', JSON.stringify(bio));
}

function loadBioInfo() {
  const bio = getBioInfo();
  document.getElementById('navBrandName').innerText = bio.fullName;
  document.getElementById('heroFullName').innerText = bio.fullName;
  document.getElementById('heroSubtitle').innerText = bio.subtitle;
  document.getElementById('heroBioDesc').innerText = bio.bioText;
  document.getElementById('heroEmailText').innerText = bio.email;
  document.getElementById('heroEmailBtn').href = 'mailto:' + bio.email;
  document.getElementById('heroPhoneText').innerText = bio.phone;
  document.getElementById('heroPhoneBtn').href = 'tel:' + bio.phone;

  document.getElementById('editFullName').value = bio.fullName;
  document.getElementById('editEmail').value = bio.email;
  document.getElementById('editPhone').value = bio.phone;
  document.getElementById('editSubtitle').value = bio.subtitle;
  document.getElementById('editBioText').value = bio.bioText;
}

function saveBioInfo(e) {
  e.preventDefault();
  const bio = {
    fullName: document.getElementById('editFullName').value.trim(),
    email: document.getElementById('editEmail').value.trim(),
    phone: document.getElementById('editPhone').value.trim(),
    subtitle: document.getElementById('editSubtitle').value.trim(),
    bioText: document.getElementById('editBioText').value.trim()
  };

  saveBioInfoToStorage(bio);
  loadBioInfo();

  alert('✅ مشخصات بیوگرافی با موفقیت بروزرسانی شد.');
}

// ---- مدیریت نمونه کارها (CRUD) ----
function getProjects() {
  const saved = localStorage.getItem('dizyno_portfolio_projects');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return defaultProjects;
}

function saveProjectsToStorage(projects) {
  localStorage.setItem('dizyno_portfolio_projects', JSON.stringify(projects));
}

function renderProjects() {
  const grid = document.getElementById('portfolioGrid');
  const projects = getProjects();
  const isAd = isAdminLoggedIn();
  
  const filtered = currentFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === currentFilter);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fa-solid fa-folder-open display-4 text-slate-400 mb-3 d-block opacity-50"></i>
        <h5 class="text-white">هیچ نمونه‌کاری در این دسته‌بندی یافت نشد.</h5>
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    const categoryLabels = { 
      vpn: 'پنل شبکه و کلود', 
      web: 'سیستم وب', 
      android: 'اپلیکیشن اندروید',
      windows: 'نرم‌افزار ویندوز',
      wordpress: 'وردپرس و افزونه',
      bot: 'ربات تلگرام' 
    };
    const catLabel = categoryLabels[p.category] || 'پروژه';

    const tagsHtml = (p.tags || []).map(t => `<span class="tech-tag">${t}</span>`).join(' ');

    const adminButtons = isAd ? `
      <div class="d-flex align-items-center gap-1">
        <button onclick="openEditProjectModal('${p.id}')" class="btn btn-sm btn-outline-warning rounded-circle" title="ویرایش">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button onclick="deleteProject('${p.id}')" class="btn btn-sm btn-outline-danger" title="حذف">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    ` : '';

    const cardHtml = `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="portfolio-card">
          <div class="portfolio-img-wrapper">
            <img src="${p.imageUrl}" alt="${p.title}" class="portfolio-img" onerror="this.src='https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80'">
            <span class="portfolio-badge">${catLabel}</span>
          </div>
          <div class="portfolio-body">
            <h5 class="fw-bold text-white mb-2">${p.title}</h5>
            <p class="text-slate-400 small mb-3 flex-grow-1">${p.desc}</p>
            <div class="d-flex flex-wrap gap-1 mb-3">
              ${tagsHtml}
            </div>
            <div class="d-flex align-items-center justify-content-between pt-2 border-top border-secondary opacity-75">
              <a href="${p.url}" target="_blank" class="btn btn-sm btn-info text-white rounded-pill px-3 fw-bold">
                <i class="fa-solid fa-arrow-up-right-from-square me-1"></i> مشاهده / دانلود
              </a>
              ${adminButtons}
            </div>
          </div>
        </div>
      </div>
    `;
    grid.innerHTML += cardHtml;
  });
}

function filterProjects(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn-group .btn-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProjects();
}

function openAddProjectModal() {
  document.getElementById('editingProjectId').value = '';
  document.getElementById('editorModalTitle').innerHTML = '<i class="fa-solid fa-folder-plus text-info me-2"></i> افزودن نمونه‌کار جدید';
  document.getElementById('projectForm').reset();
  
  const modalEl = document.getElementById('projectEditorModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function openEditProjectModal(id) {
  const projects = getProjects();
  const proj = projects.find(p => p.id === id);
  if (!proj) return;

  document.getElementById('editingProjectId').value = proj.id;
  document.getElementById('editorModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square text-warning me-2"></i> ویرایش نمونه‌کار';
  
  document.getElementById('projectTitle').value = proj.title;
  document.getElementById('projectCategory').value = proj.category;
  document.getElementById('projectUrl').value = proj.url;
  document.getElementById('projectImageUrl').value = proj.imageUrl;
  document.getElementById('projectTags').value = (proj.tags || []).join(', ');
  document.getElementById('projectDesc').value = proj.desc;

  const modalEl = document.getElementById('projectEditorModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function saveProject(e) {
  e.preventDefault();
  const id = document.getElementById('editingProjectId').value;
  const title = document.getElementById('projectTitle').value.trim();
  const category = document.getElementById('projectCategory').value;
  const url = document.getElementById('projectUrl').value.trim();
  const imageUrl = document.getElementById('projectImageUrl').value.trim();
  const tagsStr = document.getElementById('projectTags').value.trim();
  const desc = document.getElementById('projectDesc').value.trim();

  const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

  let projects = getProjects();

  if (id) {
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { id, title, category, url, imageUrl, tags, desc };
    }
  } else {
    const newProj = {
      id: 'proj_' + Date.now(),
      title,
      category,
      url,
      imageUrl,
      tags,
      desc
    };
    projects.unshift(newProj);
  }

  saveProjectsToStorage(projects);
  renderProjects();
  renderAdminProjectsTable();

  const modalEl = document.getElementById('projectEditorModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
}

function deleteProject(id) {
  if (!confirm('آیا از حذف این نمونه‌کار اطمینان دارید؟')) return;
  let projects = getProjects();
  projects = projects.filter(p => p.id !== id);
  saveProjectsToStorage(projects);
  renderProjects();
  renderAdminProjectsTable();
}

function renderAdminProjectsTable() {
  const tbody = document.getElementById('adminProjectsTableBody');
  if (!tbody) return;

  const projects = getProjects();
  document.getElementById('adminProjCount').innerText = projects.length;

  tbody.innerHTML = '';
  projects.forEach(p => {
    const categoryLabels = { 
      vpn: 'پنل شبکه و کلود', 
      web: 'سیستم وب', 
      android: 'اپلیکیشن اندروید',
      windows: 'نرم‌افزار ویندوز',
      wordpress: 'وردپرس و افزونه',
      bot: 'ربات تلگرام' 
    };

    tbody.innerHTML += `
      <tr>
        <td>
          <img src="${p.imageUrl}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 10px;">
        </td>
        <td class="fw-bold text-white">${p.title}</td>
        <td><span class="badge bg-secondary">${categoryLabels[p.category] || p.category}</span></td>
        <td><small class="text-slate-400">${(p.tags || []).join(', ')}</small></td>
        <td>
          <button onclick="openEditProjectModal('${p.id}')" class="btn btn-sm btn-outline-warning me-1">
            <i class="fa-solid fa-pen"></i> ویرایش
          </button>
          <button onclick="deleteProject('${p.id}')" class="btn btn-sm btn-outline-danger">
            <i class="fa-solid fa-trash"></i> حذف
          </button>
        </td>
      </tr>
    `;
  });
}

function generateExportedJsCode() {
  const bio = getBioInfo();
  const projects = getProjects();

  const bioStr = JSON.stringify(bio, null, 2);
  const projStr = JSON.stringify(projects, null, 2);

  const exportedText = `// اطلاعات اولیه بیوگرافی محمد مهدی ارجمند منش
const defaultBio = ${bioStr};

// نمونه‌کارهای پیش‌فرض شاخص
const defaultProjects = ${projStr};`;

  const textarea = document.getElementById('exportedJsTextarea');
  const container = document.getElementById('exportCodeContainer');

  textarea.value = exportedText;
  container.classList.remove('d-none');
}

function copyExportedJsCode() {
  const textarea = document.getElementById('exportedJsTextarea');
  textarea.select();
  document.execCommand('copy');
  alert('✅ کد متغیرها کپی شد! حالا ۵۰ سطر اول app.js در گیت‌هاب را با این کد جایگزین کنید.');
}

document.addEventListener('DOMContentLoaded', () => {
  loadBioInfo();
  updateAdminUI();
  renderProjects();
  checkSecretAdminRoute();
});
