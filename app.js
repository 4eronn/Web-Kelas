// Application Controller for Class of HKI Website (Hukum Keluarga Islam)

// Storage Keys
const STORAGE_KEYS = {
  GALLERY: 'hki_gallery_items_v4',
  NOTES: 'hki_notes_v2',
  LIKES: 'hki_likes_v1',
  USERS: 'hki_users_v5',
  CURRENT_USER: 'hki_current_user_v1'
};

// Global App State
let galleryData = [];
let notesData = [];
let usersData = [];
let currentUser = null; // Always null on boot (NO AUTO LOGIN)
let userLikes = {};
let currentCategory = 'all';
let currentRoleFilter = 'all';
let isAudioPlaying = false;
let loadingInterval = null;

// Music player state
// (controlled via YouTube iframe postMessage — no external API dependency)

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  start15sLoadingScreen();
  initStorage();
  renderUserNav();
  renderLawTicker();
  renderHeroStats();
  renderCategoryTabs();
  renderGallery();
  renderMembers();
  renderTimeline();
  renderNotes();
  initMusicPlayer();
  initSearchListeners();
  initQuiz();
  lucide.createIcons();
});

// 15-SECOND SPLASH SCREEN ANIMATION LOGIC
function start15sLoadingScreen() {
  const overlay = document.getElementById('loadingOverlay');
  const bar = document.getElementById('loadProgressBar');
  const percentText = document.getElementById('loadPercent');
  const quoteText = document.getElementById('loadingQuote');
  
  if (!overlay || !bar || !percentText) return;

  const totalTimeMs = 15000; // 15 Detik
  const updateIntervalMs = 100;
  let elapsedMs = 0;

  const quotes = [
    "Memuat Berkas Kenangan Hukum Keluarga Islam...",
    "Menyiapkan Dokumen & Momen Sejarah HKI 2022...",
    "Menyusun Garis Waktu Praktikum & Wisuda PA...",
    "Menghubungkan Persahabatan & Kebersamaan HKI...",
    "Selamat Datang di Class of HKI!"
  ];

  loadingInterval = setInterval(() => {
    elapsedMs += updateIntervalMs;
    const progress = Math.min(100, Math.floor((elapsedMs / totalTimeMs) * 100));

    bar.style.width = `${progress}%`;
    percentText.textContent = `${progress}%`;

    // Dynamic quote switching based on progress
    if (progress < 25) {
      quoteText.textContent = quotes[0];
    } else if (progress < 50) {
      quoteText.textContent = quotes[1];
    } else if (progress < 75) {
      quoteText.textContent = quotes[2];
    } else if (progress < 95) {
      quoteText.textContent = quotes[3];
    } else {
      quoteText.textContent = quotes[4];
    }

    if (elapsedMs >= totalTimeMs) {
      skipLoading();
    }
  }, updateIntervalMs);
}

function skipLoading() {
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 800);
  }
}

// Storage Initializer
function initStorage() {
  const savedGallery = localStorage.getItem(STORAGE_KEYS.GALLERY);
  galleryData = savedGallery ? JSON.parse(savedGallery) : [...INITIAL_DATA.galleryItems];

  const savedNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
  notesData = savedNotes ? JSON.parse(savedNotes) : [...INITIAL_DATA.notes];

  const savedLikes = localStorage.getItem(STORAGE_KEYS.LIKES);
  userLikes = savedLikes ? JSON.parse(savedLikes) : {};

  // Users Auth Storage (18 Registered Accounts user1..user18 with default pass 112233)
  const savedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
  usersData = savedUsers ? JSON.parse(savedUsers) : [...INITIAL_DATA.users];

  // ALWAYS START LOGGED OUT (NO AUTO LOGIN UPON REFRESH / ENTERING WEB)
  currentUser = null;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

// USER AUTHENTICATION LOGIC
function renderUserNav() {
  const container = document.getElementById('userNavContainer');
  const mobileContainer = document.getElementById('mobileAuthContainer');
  if (!container) return;

  if (currentUser) {
    const isSuperAdmin = currentUser.username === 'user1' || currentUser.role === 'Super Admin';
    const adminBadge = isSuperAdmin ? `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">👑 Super Admin</span>` : '';

    // Logged in State
    container.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full ${isSuperAdmin ? 'bg-amber-600' : 'bg-red-600'} text-white font-bold text-xs flex items-center justify-center border border-red-400 uppercase shadow" title="${currentUser.name}">
          ${currentUser.username.substring(0, 5)}
        </div>
        <div class="hidden xl:block text-left">
          <div class="flex items-center gap-1">
            <p class="text-xs font-bold text-white leading-none">${currentUser.name}</p>
            ${adminBadge}
          </div>
          <p class="text-[10px] text-red-400 leading-tight">@${currentUser.username}</p>
        </div>
        <button onclick="openChangePasswordModal()" class="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-slate-300 hover:text-white border border-zinc-700 transition-colors" title="Ubah Password">
          <i data-lucide="key" class="w-4 h-4 text-red-500"></i>
        </button>
        <button onclick="handleLogout()" class="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 transition-colors" title="Logout">
          <i data-lucide="log-out" class="w-4 h-4"></i>
        </button>
      </div>
    `;

    if (mobileContainer) {
      mobileContainer.innerHTML = `
        <div class="flex items-center justify-between py-2 text-xs">
          <span class="text-slate-300">Logged in: <strong class="text-red-400">${currentUser.name}</strong> ${adminBadge}</span>
          <div class="flex items-center gap-2">
            <button onclick="openChangePasswordModal()" class="px-2.5 py-1 rounded-lg bg-zinc-800 text-slate-300 text-xs">Ubah Pass</button>
            <button onclick="handleLogout()" class="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs">Logout</button>
          </div>
        </div>
      `;
    }
  } else {
    // Guest State (Not Logged In)
    container.innerHTML = `
      <button onclick="openModal('loginModal')" class="btn-red px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-1.5">
        <i data-lucide="log-in" class="w-4 h-4"></i>
        <span>Login Akun</span>
      </button>
    `;

    if (mobileContainer) {
      mobileContainer.innerHTML = `
        <button onclick="openModal('loginModal')" class="w-full btn-red py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2">
          <i data-lucide="log-in" class="w-4 h-4"></i> Login Akun HKI
        </button>
      `;
    }
  }

  lucide.createIcons();
}

function handleLogin(e) {
  e.preventDefault();
  const inputUser = document.getElementById('loginUsername').value.trim().toLowerCase();
  const inputPass = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('loginError');

  const foundUser = usersData.find(u => 
    (u.username.toLowerCase() === inputUser || u.email.toLowerCase() === inputUser) && 
    u.password === inputPass
  );

  if (!foundUser) {
    errorEl.textContent = '❌ Username atau Password salah!';
    errorEl.classList.remove('hidden');
    return;
  }

  errorEl.classList.add('hidden');
  currentUser = foundUser;

  closeModal('loginModal');
  document.getElementById('loginForm').reset();
  
  renderUserNav();
  renderGallery();
  renderNotes();
  triggerConfetti();
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  renderUserNav();
  renderGallery();
  renderNotes();
}

function openChangePasswordModal() {
  if (!currentUser) return;
  document.getElementById('changePassUserLabel').textContent = `Akun: ${currentUser.name} (@${currentUser.username})`;
  document.getElementById('changePasswordForm').reset();
  document.getElementById('changePassMsg').classList.add('hidden');
  openModal('changePasswordModal');
}

function handleChangePassword(e) {
  e.preventDefault();
  if (!currentUser) return;

  const oldPass = document.getElementById('cpOldPassword').value;
  const newPass = document.getElementById('cpNewPassword').value;
  const confirmPass = document.getElementById('cpConfirmPassword').value;
  const msgEl = document.getElementById('changePassMsg');

  msgEl.classList.remove('hidden');

  if (oldPass !== currentUser.password) {
    msgEl.textContent = '❌ Password lama yang Anda masukkan salah!';
    msgEl.className = 'text-xs font-bold text-red-400 block';
    return;
  }

  if (newPass.length < 4) {
    msgEl.textContent = '❌ Password baru minimal 4 karakter!';
    msgEl.className = 'text-xs font-bold text-red-400 block';
    return;
  }

  if (newPass !== confirmPass) {
    msgEl.textContent = '❌ Konfirmasi password baru tidak cocok!';
    msgEl.className = 'text-xs font-bold text-red-400 block';
    return;
  }

  // Update password in usersData state
  const userIdx = usersData.findIndex(u => u.id === currentUser.id);
  if (userIdx !== -1) {
    usersData[userIdx].password = newPass;
    currentUser.password = newPass;

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(usersData));
  }

  msgEl.textContent = '🎉 Password berhasil diubah!';
  msgEl.className = 'text-xs font-bold text-emerald-400 block';

  setTimeout(() => {
    closeModal('changePasswordModal');
  }, 1200);
}

function checkAuthAndOpenUpload() {
  if (!currentUser) {
    alert('Silakan Login Akun HKI terlebih dahulu untuk menambah momen kenangan!');
    openModal('loginModal');
    return;
  }
  openModal('uploadModal');
}

// Check Auth before adding Kesan & Pesan Note
function checkAuthAndOpenNoteModal() {
  if (!currentUser) {
    alert('Silakan Login Akun HKI terlebih dahulu untuk menulis kesan dan pesan!');
    openModal('loginModal');
    return;
  }
  document.getElementById('noteAuthor').value = currentUser.name;
  openModal('noteModal');
}

// Render Ticker
function renderLawTicker() {
  const tickerItems = document.getElementById('tickerItems');
  if (!tickerItems) return;

  const content = INITIAL_DATA.lawQuotes.map(q => `
    <div class="inline-flex items-center space-x-2">
      <span class="px-2 py-0.5 rounded bg-red-600/30 text-rose-300 font-bold">${q.article}</span>
      <span class="text-slate-200">"${q.content}"</span>
    </div>
  `).join(' <span class="text-red-500 font-bold">✦</span> ');

  // Duplicate for smooth seamless loop
  tickerItems.innerHTML = content + ' <span class="text-red-500 font-bold">✦</span> ' + content;
}

// Render Hero Stats
function renderHeroStats() {
  document.getElementById('statStudents').textContent = INITIAL_DATA.classInfo.stats.totalStudents;
  document.getElementById('statMemories').textContent = `${galleryData.length}+`;
  document.getElementById('statSks').textContent = INITIAL_DATA.classInfo.stats.sksCompleted;
  document.getElementById('statYears').textContent = `${INITIAL_DATA.classInfo.stats.togetherYears} Thn`;
}

// Render Category Tabs (Kuliah, Kegiatan, Sidang, Lucu, Wisuda)
function renderCategoryTabs() {
  const container = document.getElementById('categoryTabs');
  if (!container) return;

  container.innerHTML = INITIAL_DATA.galleryCategories.map(cat => {
    const isActive = cat.id === currentCategory;
    const activeClasses = isActive 
      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 font-bold' 
      : 'bg-zinc-900/90 text-slate-300 hover:bg-zinc-800 hover:text-white border border-zinc-800';

    return `
      <button onclick="setCategory('${cat.id}')" class="px-4 py-2 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap transition-all ${activeClasses}">
        <i data-lucide="${cat.icon}" class="w-4 h-4 text-rose-400"></i>
        <span>${cat.label}</span>
      </button>
    `;
  }).join('');

  lucide.createIcons();
}

function setCategory(catId) {
  currentCategory = catId;
  renderCategoryTabs();
  renderGallery();
}

function resetGalleryFilter() {
  currentCategory = 'all';
  document.getElementById('gallerySearch').value = '';
  renderCategoryTabs();
  renderGallery();
}

// Render Gallery Grid (LOCKED FOR GUESTS / UNLOCKED FOR LOGGED-IN USERS)
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const emptyState = document.getElementById('galleryEmpty');
  const lockedBanner = document.getElementById('galleryLockedBanner');
  const searchVal = (document.getElementById('gallerySearch')?.value || '').toLowerCase();

  if (!grid || !lockedBanner) return;

  // IF NOT LOGGED IN -> HIDE GALLERY & SHOW LOCKED BANNER
  if (!currentUser) {
    grid.classList.add('hidden');
    emptyState?.classList.add('hidden');
    lockedBanner.classList.remove('hidden');
    return;
  }

  // IF LOGGED IN -> HIDE LOCKED BANNER & RENDER GALLERY
  lockedBanner.classList.add('hidden');

  const isSuperAdmin = currentUser && (currentUser.username === 'user1' || currentUser.role === 'Super Admin');

  const filtered = galleryData.filter(item => {
    const matchesCat = currentCategory === 'all' || item.category === currentCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchVal) || 
                          item.description.toLowerCase().includes(searchVal) ||
                          (item.location && item.location.toLowerCase().includes(searchVal));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.classList.add('hidden');
    emptyState?.classList.remove('hidden');
    return;
  }

  grid.classList.remove('hidden');
  emptyState?.classList.add('hidden');

  grid.innerHTML = filtered.map(item => {
    const isLiked = userLikes[item.id];
    const likesCount = (item.likes || 0) + (isLiked ? 1 : 0);
    const isVideo = item.mediaType === 'video' || (item.image && (item.image.includes('data:video') || item.image.endsWith('.mp4') || item.image.endsWith('.webm')));

    const mediaHtml = isVideo 
      ? `<video src="${item.image}" muted preload="metadata" class="w-full h-full object-cover"></video>
         <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
           <div class="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
             <i data-lucide="play" class="w-5 h-5 fill-current ml-0.5"></i>
           </div>
         </div>`
      : `<img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy" />`;

    return `
      <div onclick="openLightbox('${item.id}')" class="polaroid-card cursor-pointer group relative">
        ${isSuperAdmin ? `
          <button onclick="event.stopPropagation(); deleteGalleryItem('${item.id}')" title="Hapus Foto/Video (Super Admin)" class="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 border border-white/20">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        ` : ''}
        <div class="polaroid-img-wrapper rounded aspect-[4/3] mb-3">
          ${mediaHtml}
          <span class="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm text-red-400 text-[10px] font-bold uppercase tracking-wider border border-red-600/30">
            ${item.category}
          </span>
          ${isVideo ? `<span class="absolute top-2 ${isSuperAdmin ? 'right-10' : 'right-2'} px-2 py-0.5 rounded-md bg-red-600 text-white text-[9px] font-bold uppercase">Video</span>` : ''}
        </div>
        <div>
          <h4 class="font-serif-title font-bold text-zinc-900 text-sm line-clamp-1 mb-1 group-hover:text-red-600 transition-colors">
            ${item.title}
          </h4>
          <div class="flex items-center justify-between text-[11px] text-zinc-600 mb-2 font-medium">
            <span>📅 ${item.date || 'Kenangan'}</span>
            <span>📍 ${item.location || 'Pengadilan Agama'}</span>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-zinc-200 text-[11px]">
            <span class="text-zinc-700 font-semibold truncate max-w-[130px]">Oleh: ${item.uploader || 'HKI'}</span>
            <div class="flex items-center gap-1 text-red-600 font-bold">
              <i data-lucide="heart" class="w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}"></i>
              <span>${likesCount}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// Lightbox Modal
function openLightbox(id) {
  if (!currentUser) {
    alert('Silakan Login Akun HKI terlebih dahulu untuk melihat detail kenangan!');
    openModal('loginModal');
    return;
  }

  const item = galleryData.find(g => g.id === id);
  if (!item) return;

  const isLiked = userLikes[id];
  const likesCount = (item.likes || 0) + (isLiked ? 1 : 0);
  const isVideo = item.mediaType === 'video' || (item.image && (item.image.includes('data:video') || item.image.endsWith('.mp4') || item.image.endsWith('.webm')));

  const imgEl = document.getElementById('lbImage');
  const videoEl = document.getElementById('lbVideo');

  if (isVideo) {
    imgEl.classList.add('hidden');
    videoEl.classList.remove('hidden');
    videoEl.src = item.image;
    videoEl.play().catch(() => {});
  } else {
    videoEl.pause();
    videoEl.classList.add('hidden');
    imgEl.classList.remove('hidden');
    imgEl.src = item.image;
  }

  document.getElementById('lbTitle').textContent = item.title;
  document.getElementById('lbCategory').textContent = item.category;
  document.getElementById('lbDate').textContent = item.date || '-';
  document.getElementById('lbLocation').textContent = item.location || 'Pengadilan Agama';
  document.getElementById('lbDescription').textContent = item.description || '';
  document.getElementById('lbUploader').textContent = item.uploader || 'Kelas HKI';
  document.getElementById('lbLikesCount').textContent = likesCount;
  
  const tagsContainer = document.getElementById('lbTags');
  if (item.tags && item.tags.length > 0) {
    tagsContainer.innerHTML = item.tags.map(t => `<span class="px-2 py-0.5 rounded-md bg-red-600/10 text-red-400 text-[11px] font-mono border border-red-600/20">${t}</span>`).join('');
  } else {
    tagsContainer.innerHTML = '';
  }

  const downloadBtn = document.getElementById('lbDownloadBtn');
  downloadBtn.href = item.image;

  // Super Admin Delete Button in Lightbox
  const lbDeleteBtn = document.getElementById('lbDeleteBtn');
  if (lbDeleteBtn) {
    const isSuperAdmin = currentUser && (currentUser.username === 'user1' || currentUser.role === 'Super Admin');
    if (isSuperAdmin) {
      lbDeleteBtn.classList.remove('hidden');
      lbDeleteBtn.onclick = () => deleteGalleryItem(id);
    } else {
      lbDeleteBtn.classList.add('hidden');
    }
  }

  const likeBtn = document.getElementById('lbLikeBtn');
  likeBtn.onclick = () => toggleLike(id);
  if (isLiked) {
    likeBtn.classList.add('bg-rose-500/30', 'text-rose-300');
  } else {
    likeBtn.classList.remove('bg-rose-500/30', 'text-rose-300');
  }

  openModal('lightboxModal');
}

// Delete Gallery Item (Super Admin only - user1)
function deleteGalleryItem(id) {
  const isSuperAdmin = currentUser && (currentUser.username === 'user1' || currentUser.role === 'Super Admin');
  if (!isSuperAdmin) {
    alert('Fitur ini hanya dapat digunakan oleh Super Admin (user1)!');
    return;
  }

  const item = galleryData.find(g => g.id === id);
  const itemTitle = item ? `"${item.title}"` : 'momen ini';

  if (confirm(`[SUPER ADMIN]\nApakah Anda yakin ingin menghapus ${itemTitle} dari galeri kenangan kelas?`)) {
    galleryData = galleryData.filter(g => g.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(galleryData));
    } catch (err) {
      console.warn('LocalStorage update warning:', err);
    }
    closeModal('lightboxModal');
    renderHeroStats();
    renderGallery();
  }
}

function toggleLike(id) {
  if (userLikes[id]) {
    delete userLikes[id];
  } else {
    userLikes[id] = true;
    triggerConfettiSmall();
  }
  localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(userLikes));
  openLightbox(id);
  renderGallery();
}

// Format Calendar Date Input (YYYY-MM-DD into Indonesian text)
function formatDateIndonesian(dateString) {
  if (!dateString) return 'Momen HKI';
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;

  const year = parts[0];
  const monthIndex = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return `${day} ${monthNames[monthIndex] || ''} ${year}`;
}

// Upload Memory Form Handler
async function handleUploadMemory(e) {
  e.preventDefault();
  if (!currentUser) {
    alert('Silakan Login Akun HKI terlebih dahulu untuk menambah momen kenangan!');
    openModal('loginModal');
    return;
  }

  const title = document.getElementById('upTitle').value;
  const category = document.getElementById('upCategory').value;
  const dateRaw = document.getElementById('upDate').value;
  const date = formatDateIndonesian(dateRaw);
  const fileInput = document.getElementById('upFile');
  const imageUrlInput = document.getElementById('upImage').value;
  const location = document.getElementById('upLocation').value || 'Fakultas Hukum';
  const uploader = document.getElementById('upUploader').value || currentUser.name;
  const description = document.getElementById('upDescription').value;
  const submitBtn = document.getElementById('upSubmitBtn');

  let mediaUrl = imageUrlInput;
  let mediaType = 'image';

  // Check if user uploaded a file from device
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    if (file.type.startsWith('video/')) {
      mediaType = 'video';
    }

    submitBtn.textContent = 'Memproses File...';
    submitBtn.disabled = true;

    try {
      mediaUrl = await readFileAsDataURL(file);
    } catch (err) {
      alert('Gagal membaca file dari perangkat.');
      submitBtn.textContent = 'Simpan Momen Kenangan';
      submitBtn.disabled = false;
      return;
    }
  }

  if (!mediaUrl) {
    alert('Silakan pilih file foto/video dari HP/Laptop atau masukkan URL gambar.');
    return;
  }

  const newItem = {
    id: `mem-${Date.now()}`,
    title,
    category,
    mediaType,
    date,
    image: mediaUrl,
    location,
    uploader,
    description,
    likes: 1,
    tags: ['#KenanganHKI', `#${category.toUpperCase()}`]
  };

  galleryData.unshift(newItem);
  
  try {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(galleryData));
  } catch (err) {
    console.warn('LocalStorage full for large file, stored in memory');
  }

  submitBtn.textContent = 'Simpan Momen Kenangan';
  submitBtn.disabled = false;

  closeModal('uploadModal');
  document.getElementById('uploadForm').reset();
  renderHeroStats();
  renderGallery();
  triggerConfetti();
}

// Helper: FileReader Promise
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

// Members Filter & Render
function filterMembers(role) {
  currentRoleFilter = role;
  const btns = document.querySelectorAll('.member-role-btn');
  btns.forEach(btn => {
    if (btn.textContent.trim() === role || (role === 'all' && btn.textContent.trim() === 'Semua')) {
      btn.className = 'member-role-btn px-4 py-1.5 rounded-lg text-xs font-semibold transition-all bg-red-600 text-white';
    } else {
      btn.className = 'member-role-btn px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-all';
    }
  });
  renderMembers();
}

function renderMembers() {
  const grid = document.getElementById('membersGrid');
  const searchVal = (document.getElementById('memberSearch')?.value || '').toLowerCase();
  if (!grid) return;

  const filtered = INITIAL_DATA.members.filter(m => {
    const matchesRole = currentRoleFilter === 'all' || 
                        (currentRoleFilter === 'Pengurus' && (m.badge === 'Pengurus' || m.badge === 'Super Admin' || m.badge === 'Komti')) ||
                        (currentRoleFilter === 'Dosen PA' && m.badge === 'Dosen PA') ||
                        (currentRoleFilter === 'Anggota' && m.badge === 'Anggota');
    const matchesSearch = m.name.toLowerCase().includes(searchVal) || (m.role && m.role.toLowerCase().includes(searchVal));
    return matchesRole && matchesSearch;
  });

  grid.innerHTML = filtered.map(m => `
    <div class="glass-card rounded-2xl p-5 flex flex-col justify-between text-center relative group border-t-2 border-red-600">
      <span class="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-600/30">
        ${m.badge}
      </span>
      <div>
        <div class="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-red-600/50 p-1 bg-zinc-950 group-hover:scale-105 transition-transform">
          <img src="${m.avatar}" alt="${m.name}" class="w-full h-full object-cover rounded-full" />
        </div>
        <h4 class="font-serif-title font-bold text-white text-base mb-1 line-clamp-1">${m.name}</h4>
        <p class="text-xs text-red-400 font-semibold mb-3">${m.role}</p>
        <p class="text-xs text-slate-400 italic mb-4">"${m.quote}"</p>
      </div>

      <div class="pt-3 border-t border-zinc-800 flex items-center justify-center text-[11px]">
        <a href="https://instagram.com" target="_blank" class="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5">
          <i data-lucide="instagram" class="w-3.5 h-3.5"></i>
          <span>@hki2022</span>
        </a>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// Timeline Render
function renderTimeline() {
  const container = document.getElementById('timelineList');
  if (!container) return;

  container.innerHTML = INITIAL_DATA.timeline.map((item, index) => {
    const isEven = index % 2 === 0;

    return `
      <div class="relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}">
        <!-- Card Content -->
        <div class="w-full md:w-1/2 p-4">
          <div class="glass-panel p-6 rounded-2xl relative border border-red-600/30 hover:border-red-600/60 transition-all">
            <span class="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold font-serif-title mb-3 inline-block">
              ${item.year}
            </span>
            <span class="block text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">${item.semester}</span>
            <h3 class="text-lg font-serif-title font-bold text-white mb-2">${item.title}</h3>
            <p class="text-xs text-slate-300 leading-relaxed">${item.description}</p>
          </div>
        </div>

        <!-- Timeline Circle Center -->
        <div class="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-red-600 flex items-center justify-center text-red-500 shadow-lg shadow-red-600/40 hidden md:flex">
          <i data-lucide="${item.icon}" class="w-5 h-5"></i>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// Notes Render (Sticky Notes Memory Wall - VISIBLE TO ALL)
function renderNotes() {
  const grid = document.getElementById('notesGrid');
  if (!grid) return;

  const isSuperAdmin = currentUser && (currentUser.username === 'user1' || currentUser.role === 'Super Admin');

  grid.innerHTML = notesData.map(n => {
    let noteClass = 'sticky-note-gold';
    if (n.color === 'navy') noteClass = 'sticky-note-navy';
    if (n.color === 'rose') noteClass = 'sticky-note-rose';

    return `
      <div class="sticky-note ${noteClass} flex flex-col justify-between min-h-[160px] relative group">
        ${isSuperAdmin ? `
          <button onclick="deleteNote('${n.id}')" title="Hapus Kesan/Pesan (Super Admin)" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow transition-transform active:scale-95 border border-white/20">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        ` : ''}
        <p class="text-xs leading-relaxed font-medium mb-4 ${isSuperAdmin ? 'pr-6' : ''}">"${n.content}"</p>
        <div class="flex items-center justify-between text-[11px] border-t border-black/10 pt-2">
          <span class="font-bold">— ${n.author}</span>
          <span class="opacity-75">${n.date || 'Sepanjang Masa'}</span>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// Delete Note (Super Admin only - user1)
function deleteNote(id) {
  const isSuperAdmin = currentUser && (currentUser.username === 'user1' || currentUser.role === 'Super Admin');
  if (!isSuperAdmin) {
    alert('Fitur ini hanya dapat digunakan oleh Super Admin (user1)!');
    return;
  }

  if (confirm('[SUPER ADMIN]\nApakah Anda yakin ingin menghapus kesan & pesan ini dari Wall?')) {
    notesData = notesData.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notesData));
    renderNotes();
  }
}

function handleAddNote(e) {
  e.preventDefault();
  if (!currentUser) {
    alert('Silakan Login Akun HKI terlebih dahulu untuk menulis kesan dan pesan!');
    openModal('loginModal');
    return;
  }

  const author = document.getElementById('noteAuthor').value || currentUser.name;
  const content = document.getElementById('noteContent').value;
  const color = document.querySelector('input[name="noteColor"]:checked')?.value || 'gold';

  const newNote = {
    id: `note-${Date.now()}`,
    author,
    content,
    color,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  notesData.unshift(newNote);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notesData));

  closeModal('noteModal');
  document.getElementById('noteForm').reset();
  renderNotes();
  triggerConfettiSmall();
}

// ── AUTOMATIC BGM AUDIO PLAYER (The 1975 - About You) ──────────────────────
function initMusicPlayer() {
  const bgmAudio = document.getElementById('bgmAudio');
  if (!bgmAudio) return;

  bgmAudio.volume = 1.0;

  function tryPlayBgm() {
    if (isAudioPlaying) return;
    bgmAudio.play().then(() => {
      isAudioPlaying = true;
      removeGestureListeners();
    }).catch(err => {
      console.log('Autoplay deferred until user interaction gesture:', err);
    });
  }

  function removeGestureListeners() {
    document.removeEventListener('click', tryPlayBgm);
    document.removeEventListener('touchstart', tryPlayBgm);
    document.removeEventListener('keydown', tryPlayBgm);
  }

  // Attempt play immediately on boot
  tryPlayBgm();

  // Add fallback gesture triggers to comply with browser autoplay policy
  document.addEventListener('click', tryPlayBgm);
  document.addEventListener('touchstart', tryPlayBgm);
  document.addEventListener('keydown', tryPlayBgm);
}

// Search Listeners
function initSearchListeners() {
  document.getElementById('gallerySearch')?.addEventListener('input', renderGallery);
  document.getElementById('memberSearch')?.addEventListener('input', renderMembers);

  // Mobile menu drawer
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }
}

// Quiz Trivia Logic (Law Student Theme)
function initQuiz() {
  const questionEl = document.getElementById('quizQuestion');
  const optionsEl = document.getElementById('quizOptions');
  const resultEl = document.getElementById('quizResult');
  if (!questionEl || !optionsEl) return;

  const quizData = [
    {
      q: "Semboyan hukum apakah yang bermakna 'Keadilan harus ditegakkan walaupun langit akan runtuh'?",
      options: ["Fiat Justitia Ruat Caelum", "Lex Superior Derogat Legi Inferiori", "Pacta Sunt Servanda", "Presumption of Innocence"],
      answer: 0,
      fact: "Benar sekali! Fiat Justitia Ruat Caelum adalah adagium hukum terkenal yang melambangkan keteguhan penegakan keadilan!"
    }
  ];

  const q = quizData[0];
  questionEl.textContent = q.q;

  optionsEl.innerHTML = q.options.map((opt, i) => `
    <button onclick="checkAnswer(${i}, ${q.answer}, '${q.fact}')" class="w-full text-left px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-red-600 hover:text-white text-xs font-semibold border border-zinc-800 transition-all">
      ${opt}
    </button>
  `).join('');
}

function checkAnswer(chosen, correct, fact) {
  const resultEl = document.getElementById('quizResult');
  if (!resultEl) return;

  resultEl.classList.remove('hidden');
  if (chosen === correct) {
    resultEl.textContent = `🎉 ${fact}`;
    resultEl.className = 'text-xs font-bold text-red-400 block mt-4';
    triggerConfetti();
  } else {
    resultEl.textContent = '❌ Hampir tepat! Coba pelajari lagi adagium hukum mahasiswa!';
    resultEl.className = 'text-xs font-bold text-rose-400 block mt-4';
  }
}

// Modal Helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    if (id === 'lightboxModal') {
      const videoEl = document.getElementById('lbVideo');
      if (videoEl) videoEl.pause();
    }
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Confetti Effect Helper
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#dc2626', '#ffffff', '#ef4444', '#f87171']
    });
  }
}

function triggerConfettiSmall() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 }
    });
  }
}
