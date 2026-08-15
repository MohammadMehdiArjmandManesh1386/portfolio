// اطلاعات اولیه بیوگرافی محمد مهدی ارجمند منش
const defaultBio = {
  fullName: 'محمد مهدی ارجمند منش',
  email: 'JACKLONY2010@GMAIL.COM',
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
    url: 'https://github.com/Hsdhugdw/claudeflare-dizynopanel',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    tags: ['Cloudflare Workers', 'JavaScript', 'WebSocket', 'Telegram Bot API'],
    desc: 'پنل مدیریت کامل سرویس‌های VLESS و Trojan بر پایه کلودفلر ورکر همراه با سوکت اختصاصی، اشتراک چندگانه و ربات مدیریت تعاملی تلگرام.'
  },
  {
    id: 'proj_2',
    title: 'Dizyno VPN (Railway & Sing-box Engine)',
    category: 'vpn',
    url: 'https://github.com/Hsdhugdw/railway-dizynopanel',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['Node.js', 'Sing-box Core', 'Express.js', 'Bootstrap 5'],
    desc: 'پنل سرور اختصاصی ریلوی با هسته قدرت‌مند Sing-box، دشبورد مدرن تیره، مدیریت سقف ترافیک و تاریخ انقضای کاربران.'
  },
  {
    id: 'proj_3',
    title: 'افزونه اختصاصی سئو و مدیریت وردپرس',
    category: 'wordpress',
    url: 'https://github.com/Hsdhugdw',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
    tags: ['WordPress Plugin', 'PHP 8+', 'SEO Optimization', 'MySQL'],
    desc: 'توسعه افزونه اختصاصی برای وردپرس جهت آنالیز خودکار سئو، تولید متاتگ‌های هوشمند و افزایش سرعت لود صفحات.'
  },
  {
    id: 'proj_4',
    title: 'اپلیکیشن کاربردی موبایل (Android App)',
    category: 'android',
    url: 'https://github.com/Hsdhugdw',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    tags: ['Android', 'Java', 'Kotlin', 'Material Design'],
    desc: 'طراحی و کدنویسی اپلیکیشن نیتیو اندروید با رابط کاربری مدرن، مدیریت حافظه آفلاین و همگام‌سازی ابری سرور.'
  },
  {
    id: 'proj_5',
    title: 'نرم‌افزار مدیریت دسکتاپ (Windows Desktop)',
    category: 'windows',
    url: 'https://github.com/Hsdhugdw',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    tags: ['Windows App', 'C#', '.NET', 'SQLite'],
    desc: 'برنامه‌نویسی نرم‌افزار دسکتاپ ویندوز برای مدیریت حسابداری، گزارش‌گیری گرافیکی و خروجی اکسل.'
  }
];

let currentFilter = 'all';

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

  // پر کردن فرم ویرایش بیوگرافی
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

  const modalEl = document.getElementById('editBioModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
}

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
  
  const filtered = currentFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === currentFilter);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fa-solid fa-folder-open display-4 text-slate-400 mb-3 d-block opacity-50"></i>
        <h5 class="text-white">هیچ نمونه‌کاری در این دسته‌بندی یافت نشد.</h5>
        <p class="text-slate-400 small">برای افزودن پروژه جدید روی دکمه "افزودن نمونه‌کار جدید" کلیک کنید.</p>
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
              <button onclick="deleteProject('${p.id}')" class="btn btn-sm btn-outline-danger border-0 rounded-circle" title="حذف">
                <i class="fa-solid fa-trash"></i>
              </button>
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

function saveProject(e) {
  e.preventDefault();
  const title = document.getElementById('projectTitle').value.trim();
  const category = document.getElementById('projectCategory').value;
  const url = document.getElementById('projectUrl').value.trim();
  const imageUrl = document.getElementById('projectImageUrl').value.trim();
  const tagsStr = document.getElementById('projectTags').value.trim();
  const desc = document.getElementById('projectDesc').value.trim();

  const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

  const projects = getProjects();
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
  saveProjectsToStorage(projects);
  renderProjects();

  document.getElementById('projectForm').reset();
  const modalEl = document.getElementById('addProjectModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
}

function deleteProject(id) {
  if (!confirm('آیا از حذف این نمونه‌کار اطمینان دارید؟')) return;
  let projects = getProjects();
  projects = projects.filter(p => p.id !== id);
  saveProjectsToStorage(projects);
  renderProjects();
}

document.addEventListener('DOMContentLoaded', () => {
  loadBioInfo();
  renderProjects();
});
