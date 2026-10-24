import './style.css';
import { CONVERSATIONS, CATEGORIES, LEVELS } from './data/conversations.js';
import { METHOD_GUIDE } from './data/methodGuide.js';
import { speechService } from './services/speech.js';
import { storageService } from './services/storage.js';

// Application State
const state = {
  activeTab: 'dialogues', // 'dialogues' | 'patterns' | 'notebook' | 'method'
  selectedCategory: 'all',
  selectedLevel: 'Semua Level',
  searchQuery: '',
  currentConversationId: 'intro-01',
  currentStudyTab: 'chunks', // 'chunks' | 'drill' | 'culture' | 'notes'
  selectedSlotIndex: 0,
  activePlayingLineIndex: null,
  isSequentialPlaying: false,
  shadowingMode: false,
  revealedLines: new Set(),
  inspectedToken: null,
  settings: storageService.getSettings(),
  bookmarks: storageService.getBookmarks(),
  completedIds: storageService.getCompleted(),
  customDrillValues: {}, // Map: convId -> { [placeholder]: string }
  isMobileCatalogOpen: false,
  isSearchOpen: false
};

// Initialize Speech Rate
speechService.setRate(state.settings.audioSpeed || 1.0);

// Apply Theme to Document
function applyTheme(theme) {
  document.body.className = theme === 'warm-light' ? 'theme-warm-light' : 'theme-navy';
}
applyTheme(state.settings.theme);

// Get current conversation object
function getCurrentConversation() {
  return CONVERSATIONS.find(c => c.id === state.currentConversationId) || CONVERSATIONS[0];
}

// Filter conversations based on category, level, and search query
function getFilteredConversations() {
  return CONVERSATIONS.filter(item => {
    // Kategori
    if (state.selectedCategory !== 'all' && item.category !== state.selectedCategory) {
      return false;
    }
    // Level
    if (state.selectedLevel !== 'Semua Level' && item.level !== state.selectedLevel) {
      return false;
    }
    // Search query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q) ||
                         item.titleDe.toLowerCase().includes(q);
      const matchDialog = item.dialogue.some(d => 
        d.de.toLowerCase().includes(q) ||
        d.phonetic.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q)
      );
      const matchChunk = item.chunks.some(c => 
        c.phrase.toLowerCase().includes(q) ||
        c.meaning.toLowerCase().includes(q)
      );
      return matchTitle || matchDialog || matchChunk;
    }
    return true;
  });
}

// Helper deskripsi kecepatan baca
function getSpeedDesc(speed) {
  if (speed === 0.69) return 'Santai (0.69x)';
  if (speed === 0.85) return 'Sedang (0.85x)';
  if (speed === 1.0) return 'Normal (1.0x)';
  return `${speed}x`;
}

// ---------------- INTERACTIVE DRILL HELPERS ----------------
// Clean slot word from parenthetical notes, e.g. "umsteigen (transit)" -> "umsteigen"
function cleanSlotWord(rawWord) {
  if (!rawWord) return '';
  return rawWord.replace(/\s*\([^)]*\)/g, '').trim();
}

// Split multi-slot words separated by " / "
function parseSlotParts(slotWord) {
  if (!slotWord) return [];
  return slotWord.split(/\s*\/\s*/).map(p => cleanSlotWord(p));
}

// Extract bracketed placeholders from template, e.g. [Kota], [Profesi]
function extractPlaceholders(template) {
  if (!template) return [];
  const matches = [...template.matchAll(/\[(.*?)\]/g)];
  return matches.map(m => m[1]);
}

// Get or initialize values for a drill
function getDrillValues(convId, drill) {
  if (!state.customDrillValues[convId]) {
    state.customDrillValues[convId] = {};
    const placeholders = extractPlaceholders(drill.template);
    if (drill.slots && drill.slots.length > 0) {
      const parts = parseSlotParts(drill.slots[0].word);
      placeholders.forEach((ph, idx) => {
        state.customDrillValues[convId][ph] = parts[idx] || '';
      });
    }
  }
  return state.customDrillValues[convId];
}

// Build rendered HTML German sentence with highlighted user words
function buildSentencePreviewHtml(template, values) {
  if (!template) return '';
  return template.replace(/\[(.*?)\]/g, (match, ph) => {
    const val = values[ph];
    if (val && val.trim()) {
      return `<span class="highlighted-custom-word">${escapeHtml(val.trim())}</span>`;
    }
    return `<span class="highlighted-custom-word empty-placeholder">[${escapeHtml(ph)}]</span>`;
  });
}

// Build plain text German sentence for speech synthesis
function buildSpeechSentence(template, values) {
  if (!template) return '';
  return template.replace(/\[(.*?)\]/g, (match, ph) => {
    const val = values[ph];
    return val && val.trim() ? val.trim() : ph;
  });
}

// Build phonetic preview substituting user's words
function buildPhoneticPreview(phoneticTemplate, values) {
  if (!phoneticTemplate) return '';
  return phoneticTemplate.replace(/\[(.*?)\]/g, (match, ph) => {
    const val = values[ph];
    return val && val.trim() ? val.trim() : `[${ph}]`;
  });
}

// Build Indonesian meaning preview substituting user's words
function buildMeaningPreview(meaningTemplate, values) {
  if (!meaningTemplate) return '';
  return meaningTemplate.replace(/\[(.*?)\]/g, (match, ph) => {
    const val = values[ph];
    return val && val.trim() ? val.trim() : `[${ph}]`;
  });
}

// Update DOM for a drill card in real-time without losing input focus
function updateDrillCardPreviewInDOM(convId, drill) {
  const values = getDrillValues(convId, drill);
  const previewHtml = buildSentencePreviewHtml(drill.template, values);
  const phoneticText = buildPhoneticPreview(drill.phoneticTemplate, values);
  const meaningText = buildMeaningPreview(drill.meaningTemplate, values);

  // Update in Patterns tab
  const deEl = document.getElementById(`drill-preview-de-${convId}`);
  if (deEl) deEl.innerHTML = previewHtml;
  const phoEl = document.getElementById(`drill-preview-phonetic-${convId}`);
  if (phoEl) phoEl.textContent = phoneticText;
  const idEl = document.getElementById(`drill-preview-id-${convId}`);
  if (idEl) idEl.textContent = meaningText;

  // Update in Study Panel (Dialogue tab) if currently open
  const studyDeEl = document.getElementById(`study-drill-preview-de-${convId}`);
  if (studyDeEl) studyDeEl.innerHTML = previewHtml;
  const studyPhoEl = document.getElementById(`study-drill-preview-phonetic-${convId}`);
  if (studyPhoEl) studyPhoEl.textContent = phoneticText;
  const studyIdEl = document.getElementById(`study-drill-preview-id-${convId}`);
  if (studyIdEl) studyIdEl.textContent = meaningText;
}

// Reusable Interactive Drill Card Component
function renderInteractiveDrillCard(conv, isInsideStudyPanel = false) {
  const drill = conv.patternDrill;
  if (!drill) {
    return '<div style="color: var(--text-muted); padding: 1rem;">Tidak ada latihan pola untuk percakapan ini.</div>';
  }
  const values = getDrillValues(conv.id, drill);
  const placeholders = extractPlaceholders(drill.template);
  const previewDe = buildSentencePreviewHtml(drill.template, values);
  const previewPhonetic = buildPhoneticPreview(drill.phoneticTemplate, values);
  const previewId = buildMeaningPreview(drill.meaningTemplate, values);
  const idPrefix = isInsideStudyPanel ? 'study-' : '';

  return `
    <div class="custom-drill-card">
      ${!isInsideStudyPanel ? `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="card-category-badge">${conv.icon} ${conv.category}</span>
            <span style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);">${conv.title}</span>
          </div>
          <button class="tool-btn" style="padding: 0.25rem 0.65rem; font-size: 0.72rem;" data-jump-conv="${conv.id}">
            Buka Percakapan →
          </button>
        </div>
      ` : ''}

      <!-- LIVE PREVIEW CONTAINER -->
      <div class="drill-live-preview">
        <div class="formula-label" style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-amber); font-weight: 700;">
          ⚡ Hasil Kalimat Langsung (Live Sentence):
        </div>
        <div class="drill-preview-de" id="${idPrefix}drill-preview-de-${conv.id}">${previewDe}</div>
        <div class="drill-preview-phonetic" id="${idPrefix}drill-preview-phonetic-${conv.id}">${previewPhonetic}</div>
        <div class="drill-preview-id" id="${idPrefix}drill-preview-id-${conv.id}">${previewId}</div>

        <div class="custom-drill-actions" style="margin-top: 0.5rem;">
          <button class="speak-custom-drill-btn" data-conv-id="${conv.id}" title="Dengarkan pelafalan kalimat lengkap ini dengan kata yang Anda isi">
            🔊 Ucapkan Kalimat Lengkap Ini
          </button>
          <button class="reset-custom-drill-btn" data-reset-conv-id="${conv.id}" title="Kembalikan isian ke contoh awal">
            🔄 Reset ke Contoh Awal
          </button>
        </div>
      </div>

      <!-- INTERACTIVE USER INPUTS -->
      <div class="custom-inputs-section">
        <div class="custom-inputs-header">
          <span class="custom-inputs-label">✏️ Isi Kata & Pengejaan Sendiri (Ketik Langsung di Sini):</span>
          <span class="custom-inputs-hint">Teks terpasang otomatis & bisa langsung dibacakan</span>
        </div>
        <div class="custom-inputs-grid">
          ${placeholders.map(ph => {
            const currentVal = values[ph] || '';
            const exampleHint = ph === 'Kota' ? 'Jakarta, Berlin...' :
                                ph === 'Profesi' ? 'Softwareentwickler, Dokter...' :
                                ph === 'Aktivitas' ? 'einen Kaffee, ein Essen...' :
                                ph === 'Minuman' ? 'einen Cappuccino...' :
                                ph === 'Pelengkap' ? 'Hafermilch, Zucker...' :
                                ph === 'Makanan' ? 'die Currywurst, Pizza...' :
                                ph === 'Barang' ? 'Croissants, Brot...' :
                                ph === 'Jumlah' ? 'zwei, vier, ein...' :
                                ph === 'Produk Lain' ? 'Brezeln, Kuchen...' :
                                ph === 'Barang Supermarket' ? 'die frische Milch, Reis...' :
                                ph === 'Aksi' ? 'umsteigen, stempeln...' :
                                ph === 'Tujuan' ? 'München, Hamburg...' :
                                ph === 'Petunjuk Arah' ? 'geradeaus, bis zur Kreuzung...' :
                                ph === 'Aksi Belok' ? 'biegen Sie links ab...' :
                                ph === 'Waktu' ? 'am Samstag, morgen...' :
                                ph === 'Jam' ? '18, 14, 20...' :
                                ph === 'Gejala Sakit' ? 'Kopfschmerzen...' :
                                ph === 'Jenis Obat' ? 'Schmerztabletten...' :
                                ph === 'Tingkat Mood' ? 'echt keinen Bock, total Lust...' :
                                ph === 'Kegiatan' ? 'Sport, Lernen, Pizza...' :
                                ph === 'Alasan' ? 'müde, hungrig, beschäftigt...' : 'kata Anda...';
            return `
              <div class="custom-input-group">
                <label for="${idPrefix}slot-input-${conv.id}-${ph}">Slot [${ph}]:</label>
                <input 
                  type="text" 
                  class="custom-slot-input" 
                  id="${idPrefix}slot-input-${conv.id}-${ph}"
                  data-conv-id="${conv.id}" 
                  data-placeholder="${ph}" 
                  value="${escapeHtml(currentVal)}" 
                  placeholder="Misal: ${exampleHint}"
                  autocomplete="off"
                />
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- PRESET SLOTS QUICK SELECTOR -->
      <div class="preset-slots-container">
        <div class="preset-slots-label">💡 Variasi Pengisian Baku (Klik untuk Mengisi Otomatis & Mendengarkan):</div>
        <div class="preset-chips-flex">
          ${drill.slots.map((slot, sIdx) => {
            const cleanParts = parseSlotParts(slot.word);
            const isMatch = placeholders.every((ph, idx) => cleanParts[idx] && values[ph] === cleanParts[idx]);
            return `
              <button class="preset-chip-btn ${isMatch ? 'active' : ''}" data-conv-id="${conv.id}" data-slot-word="${escapeHtml(slot.word)}" data-slot-idx="${sIdx}" title="Klik untuk pasang & dengarkan">
                <span class="preset-chip-play-icon">▶</span>
                <span style="font-weight: 600;">${slot.word}</span>
                <span style="color: var(--text-dim); font-size: 0.72rem;">— ${slot.translation}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

// Main Render Function
function renderApp() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const currentConv = getCurrentConversation();
  const filteredList = getFilteredConversations();

  appEl.innerHTML = `
    <div class="app-container">
      <!-- TOP NAVIGATION BAR -->
      <header class="top-header">
        <div class="header-row">
          <div class="brand-wrapper">
            <div class="brand-seal">DE</div>
            <div class="brand-title-group">
              <h1>Deutsch Lernen<span class="brand-badge">Alltag</span></h1>
              <div class="brand-sub">Penguasaan Percakapan Bahasa Jerman Sehari-hari</div>
            </div>
          </div>

          <div class="header-actions">
            <!-- TOMBOL UBAH KECEPATAN SUPER KONTRAS DI ATAS PAGE -->
            <button class="top-speed-btn" id="topSpeedToggleBtn" title="Klik untuk ubah kecepatan membaca audio">
              <span class="speed-bolt">⚡</span>
              <strong class="speed-value">${state.settings.audioSpeed}x</strong>
            </button>

            <button class="theme-toggle-btn" id="themeToggleBtn" title="Ganti Tema">
              ${state.settings.theme === 'warm-light' ? '🌙' : '☀️'}
            </button>

            <button class="search-toggle-btn" id="searchToggleBtn" title="Cari Percakapan">
              🔍
            </button>
          </div>
        </div>

        <!-- SEARCH BAR (COLLAPSIBLE) -->
        <div class="header-search ${state.isSearchOpen || Boolean(state.searchQuery) ? 'open' : ''}" id="headerSearchBar">
          <svg class="search-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="globalSearchInput" 
            placeholder="Cari kata, lafal, atau arti..." 
            value="${escapeHtml(state.searchQuery)}"
          />
        </div>
      </header>

      <!-- SECONDARY TABS BAR -->
      <nav class="nav-tabs-bar">
        <div class="nav-tabs-inner">
          <button class="nav-tab-btn ${state.activeTab === 'dialogues' ? 'active' : ''}" data-tab="dialogues">
            <span>💬 Perpustakaan Percakapan</span>
            <span class="tab-badge">${CONVERSATIONS.length}</span>
          </button>
          <button class="nav-tab-btn ${state.activeTab === 'patterns' ? 'active' : ''}" data-tab="patterns">
            <span>🧩 Latihan Pola Kalimat</span>
            <span class="tab-badge">Satzbau Gym</span>
          </button>
          <button class="nav-tab-btn ${state.activeTab === 'notebook' ? 'active' : ''}" data-tab="notebook">
            <span>📓 Buku Catatan Pribadi</span>
            <span class="tab-badge">${state.bookmarks.length}</span>
          </button>
          <button class="nav-tab-btn ${state.activeTab === 'method' ? 'active' : ''}" data-tab="method">
            <span>📖 Panduan Metode Efisien</span>
            <span class="tab-badge">Wajib Baca</span>
          </button>
        </div>
      </nav>

      <!-- MAIN BODY CONTAINER -->
      <main class="main-wrapper">
        ${renderCurrentTabContent(currentConv, filteredList)}
      </main>

      <!-- MOBILE BOTTOM NAVIGATION (THUMB-FRIENDLY BAR) -->
      <nav class="mobile-bottom-nav" aria-label="Navigasi Menu HP">
        <button class="bottom-nav-item ${state.activeTab === 'dialogues' ? 'active' : ''}" data-tab="dialogues">
          <span class="bottom-nav-icon">💬</span>
          <span class="bottom-nav-text">Dialog</span>
        </button>
        <button class="bottom-nav-item ${state.activeTab === 'patterns' ? 'active' : ''}" data-tab="patterns">
          <span class="bottom-nav-icon">⚡</span>
          <span class="bottom-nav-text">Satzbau</span>
        </button>
        <button class="bottom-nav-item ${state.activeTab === 'notebook' ? 'active' : ''}" data-tab="notebook">
          <span class="bottom-nav-icon">📓</span>
          <span class="bottom-nav-text">Catatan</span>
          ${state.bookmarks.length > 0 ? `<span class="bottom-nav-badge">${state.bookmarks.length}</span>` : ''}
        </button>
        <button class="bottom-nav-item ${state.activeTab === 'method' ? 'active' : ''}" data-tab="method">
          <span class="bottom-nav-icon">📖</span>
          <span class="bottom-nav-text">Metode</span>
        </button>
      </nav>

      <!-- MOBILE CATALOG DRAWER MODAL -->
      <div class="mobile-catalog-drawer ${state.isMobileCatalogOpen ? 'open' : ''}" id="mobileCatalogDrawer">
        <div class="drawer-backdrop" id="closeMobileCatalogBackdrop"></div>
        <div class="drawer-panel">
          <div class="drawer-handle-bar">
            <div class="drawer-handle"></div>
          </div>
          <div class="drawer-header">
            <div class="drawer-title">
              <span>📚 Daftar Percakapan</span>
              <span class="drawer-count">${filteredList.length} Unit</span>
            </div>
            <button class="drawer-close-btn" id="closeMobileCatalogBtn">✕</button>
          </div>

          <!-- CATEGORY PILLS IN DRAWER -->
          <div class="category-scroll-bar drawer-cats">
            <button class="cat-pill-btn ${state.selectedCategory === 'all' ? 'active' : ''}" data-cat="all">🌟 Semua</button>
            ${CATEGORIES.map(cat => `
              <button class="cat-pill-btn ${state.selectedCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
                ${cat.icon} ${cat.label}
              </button>
            `).join('')}
          </div>

          <div class="catalog-list drawer-list">
            ${filteredList.map(item => {
              const active = item.id === currentConv.id;
              const completed = state.completedIds.includes(item.id);
              const levelClass = item.level === 'Dasar' ? 'badge-dasar' : (item.level === 'Menengah' ? 'badge-menengah' : 'badge-praktis');
              return `
                <button class="catalog-card ${active ? 'active' : ''}" data-conv-id="${item.id}">
                  <div class="card-top-row">
                    <span class="card-category-badge">${item.icon} ${item.category}</span>
                    <span class="card-level-badge ${levelClass}">${item.level}</span>
                  </div>
                  <div class="card-title-de">${item.titleDe}</div>
                  <div class="card-title-id">${item.title}</div>
                  <div class="card-footer-meta">
                    <span>${item.dialogue.length} Kalimat</span>
                    ${completed ? '<span class="completed-check">✓ Dipelajari</span>' : '<span>Belum</span>'}
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <footer class="app-footer">
        <div class="footer-content">
          <div>
            <span class="footer-seal">Übung macht den Meister</span>
            — "Latihan yang konsisten menciptakan kemahiran sejati."
          </div>
          <div>Ruang Belajar Bahasa Jerman Pribadi • Fokus Penguasaan Nada, Lafal & Artikel Gender</div>
        </div>
      </footer>
    </div>
  `;

  attachEventListeners(currentConv);
}

// Render active tab
function renderCurrentTabContent(currentConv, filteredList) {
  if (state.activeTab === 'dialogues') {
    return renderDialoguesTab(currentConv, filteredList);
  } else if (state.activeTab === 'patterns') {
    return renderPatternsTab();
  } else if (state.activeTab === 'notebook') {
    return renderNotebookTab();
  } else if (state.activeTab === 'method') {
    return renderMethodGuideTab();
  }
  return '';
}

// ---------------- TAB 1: DIALOGUES ----------------
function renderDialoguesTab(currentConv, filteredList) {
  const isCompleted = state.completedIds.includes(currentConv.id);
  const displayClass = `mode-${state.settings.displayMode} ${state.settings.showGenderColors ? 'gender-colors-active' : ''}`;
  const convIndex = CONVERSATIONS.findIndex(c => c.id === currentConv.id);
  const prevConv = convIndex > 0 ? CONVERSATIONS[convIndex - 1] : null;
  const nextConv = convIndex < CONVERSATIONS.length - 1 ? CONVERSATIONS[convIndex + 1] : null;

  return `
    <div class="dialogue-workbench">
      <!-- SIDEBAR CATALOG (DESKTOP) -->
      <aside class="catalog-sidebar">
        <div class="catalog-header">
          <div class="catalog-title">Daftar Percakapan</div>
          <div style="font-size: 0.75rem; color: var(--text-dim);">${filteredList.length} Unit</div>
        </div>

        <!-- CATEGORY PILL BAR -->
        <div class="category-scroll-bar">
          <button class="cat-pill-btn ${state.selectedCategory === 'all' ? 'active' : ''}" data-cat="all">🌟 Semua</button>
          ${CATEGORIES.map(cat => `
            <button 
              class="cat-pill-btn ${state.selectedCategory === cat.id ? 'active' : ''}" 
              data-cat="${cat.id}"
            >
              ${cat.icon} ${cat.label}
            </button>
          `).join('')}
        </div>

        <!-- CONVERSATIONS LIST -->
        <div class="catalog-list">
          ${filteredList.length === 0 ? `
            <div style="padding: 1.5rem 0.5rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">
              Tidak ada percakapan yang cocok dengan pencarian.
            </div>
          ` : filteredList.map(item => {
            const active = item.id === currentConv.id;
            const completed = state.completedIds.includes(item.id);
            const levelClass = item.level === 'Dasar' ? 'badge-dasar' : (item.level === 'Menengah' ? 'badge-menengah' : 'badge-praktis');
            return `
              <button class="catalog-card ${active ? 'active' : ''}" data-conv-id="${item.id}">
                <div class="card-top-row">
                  <span class="card-category-badge">${item.icon} ${item.category}</span>
                  <span class="card-level-badge ${levelClass}">${item.level}</span>
                </div>
                <div class="card-title-de">${item.titleDe}</div>
                <div class="card-title-id">${item.title}</div>
                <div class="card-footer-meta">
                  <span>${item.dialogue.length} Kalimat</span>
                  ${completed ? '<span class="completed-check">✓ Dipelajari</span>' : '<span>Belum</span>'}
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </aside>

      <!-- CENTRAL STUDY CANVAS -->
      <section class="study-canvas ${displayClass}">
        <!-- MOBILE TOPIC QUICK SWITCHER (PREV / NEXT / DRAWER) -->
        <div class="mobile-topic-nav-container">
          <!-- TOPIC STEPPER CARD (SATU KETUKAN JEMPOL) -->
          <div class="topic-stepper-card">
            <button class="stepper-step-btn prev-btn" id="prevTopicBtn" ${prevConv ? '' : 'disabled'} title="Topik Sebelumnya">
              <span class="stepper-arrow">◀</span>
              <span class="stepper-label">Prev</span>
            </button>
            <button class="stepper-center-btn" id="openMobileCatalogBtn" title="Ketuk untuk melihat daftar semua unit percakapan">
              <div class="stepper-tag-row">
                <span class="stepper-badge">Unit ${convIndex + 1} / ${CONVERSATIONS.length}</span>
                <span class="stepper-cat">${currentConv.icon} ${currentConv.category}</span>
              </div>
              <div class="stepper-topic-title">${currentConv.titleDe}</div>
              <div class="stepper-action-text">Daftar Unit & Kategori ▾</div>
            </button>
            <button class="stepper-step-btn next-btn" id="nextTopicBtn" ${nextConv ? '' : 'disabled'} title="Topik Berikutnya">
              <span class="stepper-label">Next</span>
              <span class="stepper-arrow">▶</span>
            </button>
          </div>
        </div>

        <!-- HERO CARD -->
        <div class="dialogue-hero-card">
          <div class="hero-meta-row">
            <div class="hero-badge-group">
              <span class="card-category-badge">${currentConv.icon} ${currentConv.category}</span>
              <span class="card-level-badge ${currentConv.level === 'Dasar' ? 'badge-dasar' : (currentConv.level === 'Menengah' ? 'badge-menengah' : 'badge-praktis')}">${currentConv.level}</span>
            </div>
            <button class="tool-btn-sm ${isCompleted ? 'active' : ''}" id="toggleCompletedBtn">
              ${isCompleted ? '✓ Selesai' : 'Tandai ✓'}
            </button>
          </div>
          <div class="hero-de-title">${currentConv.titleDe}</div>
          <div class="hero-id-title">${currentConv.title}</div>
        </div>

        <!-- CONTROL TOOLBAR -->
        <div class="study-toolbar">
          <div class="toolbar-group">
            <button class="tool-btn ${state.isSequentialPlaying ? 'primary' : ''}" id="playAllBtn">
              ${state.isSequentialPlaying ? '⏹ Stop' : '▶ Putar'}
            </button>
            <button class="tool-btn ${state.shadowingMode ? 'active' : ''}" id="toggleShadowingBtn" title="Jeda tiap kalimat untuk menirukan pengucapan">
              🔁 ${state.shadowingMode ? 'Shadow ON' : 'Shadow'}
            </button>
          </div>
          <div class="toolbar-group">
            <div class="segmented-control">
              <button class="seg-btn ${state.settings.displayMode === 'full' ? 'active' : ''}" data-mode="full">Semua</button>
              <button class="seg-btn ${state.settings.displayMode === 'de-only' ? 'active' : ''}" data-mode="de-only">DE</button>
              <button class="seg-btn ${state.settings.displayMode === 'phonetic-only' ? 'active' : ''}" data-mode="phonetic-only">Lafal</button>
              <button class="seg-btn ${state.settings.displayMode === 'blind' ? 'active' : ''}" data-mode="blind">Blind</button>
            </div>
            <button class="tool-btn-icon ${state.settings.showGenderColors ? 'active' : ''}" id="toggleGenderColorBtn" title="Warna Artikel Gender">
              🎨
            </button>
          </div>
        </div>

        <!-- INSPECTED TOKEN DRAWER (IF CLICKED) -->
        ${state.inspectedToken ? `
          <div class="token-details-drawer">
            <div class="token-drawer-left">
              <span class="token-drawer-de">${state.inspectedToken.de}</span>
              <span class="token-drawer-meaning">Arti: ${state.inspectedToken.id}</span>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <button class="tool-btn" id="speakTokenBtn" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">
                🔊 Dengarkan
              </button>
              <button class="line-btn" id="closeTokenDrawerBtn" style="width: 24px; height: 24px;">✕</button>
            </div>
          </div>
        ` : ''}

        <!-- TRANSCRIPT SPEECH FLOW -->
        <div class="transcript-card">
          <div class="transcript-header">
            <span class="transcript-label">Transkrip Percakapan</span>
            ${state.settings.showGenderColors ? `
              <div class="gender-legend">
                <span class="gender-indicator"><span class="dot-der"></span> Maskulin (der)</span>
                <span class="gender-indicator"><span class="dot-die"></span> Feminin (die)</span>
                <span class="gender-indicator"><span class="dot-das"></span> Netral (das)</span>
              </div>
            ` : ''}
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${currentConv.dialogue.map((line, idx) => {
              const isPlaying = state.activePlayingLineIndex === idx;
              const isSaved = storageService.isBookmarked(line.de);
              const isRevealed = state.revealedLines.has(idx);

              return `
                <div class="speech-line ${isPlaying ? 'playing' : ''} ${isRevealed ? 'revealed' : ''}" id="line-${idx}">
                  <div class="speech-line-header">
                    <div class="speaker-tag">
                      <span class="role-avatar">${line.role}</span>
                      <span>${line.speaker}</span>
                    </div>
                    <div class="line-action-group">
                      <button class="line-btn play-line-btn" data-line-idx="${idx}" title="Putar Pengucapan Kalimat Ini">
                        🔊
                      </button>
                      <button class="line-btn bookmark-line-btn ${isSaved ? 'bookmarked' : ''}" data-line-idx="${idx}" title="${isSaved ? 'Hapus dari Catatan Pribadi' : 'Simpan ke Buku Catatan Pribadi'}">
                        ${isSaved ? '★' : '☆'}
                      </button>
                      ${state.settings.displayMode === 'blind' ? `
                        <button class="tool-btn reveal-line-btn" data-line-idx="${idx}" style="padding: 0.2rem 0.5rem; font-size: 0.7rem;">
                          ${isRevealed ? 'Sembunyikan' : 'Buka Jerman'}
                        </button>
                      ` : ''}
                    </div>
                  </div>

                  <!-- GERMAN TEXT ROW WITH CLICKABLE TOKENS -->
                  <div class="german-text-row">
                    ${line.tokens ? line.tokens.map(tok => {
                      const genderClass = tok.gender ? `gender-${tok.gender}` : '';
                      return `
                        <span 
                          class="de-word-token ${genderClass}" 
                          data-de="${tok.de}" 
                          data-id="${tok.id}"
                          title="${tok.id} ${tok.gender ? `(${tok.gender})` : ''}"
                        >${tok.de}</span>
                      `;
                    }).join('') : line.de}
                  </div>

                  <!-- PHONETIC ROW -->
                  <div class="phonetic-row">Lafal: [ ${line.phonetic} ]</div>

                  <!-- INDONESIAN TRANSLATION ROW -->
                  <div class="indo-row">${line.id}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- STUDY TABS (CHUNKS, SUBSTITUTION DRILL, CULTURE, USER NOTES) -->
        <div class="study-tabs-container">
          <div class="panel-tab-nav">
            <button class="panel-tab-btn ${state.currentStudyTab === 'chunks' ? 'active' : ''}" data-study-tab="chunks">
              🧩 Frasa
            </button>
            <button class="panel-tab-btn ${state.currentStudyTab === 'drill' ? 'active' : ''}" data-study-tab="drill">
              ⚡ Satzbau
            </button>
            <button class="panel-tab-btn ${state.currentStudyTab === 'culture' ? 'active' : ''}" data-study-tab="culture">
              🏮 Budaya
            </button>
            <button class="panel-tab-btn ${state.currentStudyTab === 'notes' ? 'active' : ''}" data-study-tab="notes">
              ✍️ Catatan
            </button>
          </div>

          <div class="panel-tab-content">
            ${renderStudyPanelContent(currentConv)}
          </div>
        </div>
      </section>
    </div>
  `;
}

// Render study panel inside Dialogue view
function renderStudyPanelContent(currentConv) {
  if (state.currentStudyTab === 'chunks') {
    return `
      <div class="chunks-grid">
        ${currentConv.chunks.map(chunk => `
          <div class="chunk-card">
            <div class="chunk-card-top">
              <span class="chunk-de">${chunk.phrase}</span>
              <button class="line-btn speak-chunk-btn" data-de="${chunk.phrase}" title="Dengarkan Pengucapan">🔊</button>
            </div>
            <div class="chunk-meaning">${chunk.meaning}</div>
            <div class="chunk-usage">${chunk.usage}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (state.currentStudyTab === 'drill') {
    return renderInteractiveDrillCard(currentConv, true);
  } else if (state.currentStudyTab === 'culture') {
    return `
      <div class="culture-box">
        <div style="font-weight: 700; color: var(--accent-terracotta); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <span>💡 Kulturtipp & Nuansa Bahasa:</span>
        </div>
        ${currentConv.culturalNote}
      </div>
    `;
  } else if (state.currentStudyTab === 'notes') {
    const savedNote = storageService.getUserNotes(currentConv.id);
    return `
      <div class="user-notes-box">
        <div style="font-size: 0.85rem; color: var(--text-muted);">
          Tuliskan catatan pribadi, kata baru yang ingin diingat, atau rumus artikel der/die/das Anda di sini (tersimpan otomatis):
        </div>
        <textarea class="user-notes-textarea" id="userNotesInput" placeholder="Contoh: Ingat kalau kata benda berakhiran -ung selalu feminin 'die Wohnung'...">
${escapeHtml(savedNote)}</textarea>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="notes-status-text" id="notesStatusText">Tersimpan otomatis</span>
          <button class="tool-btn" id="saveNoteManualBtn">Simpan Catatan</button>
        </div>
      </div>
    `;
  }
  return '';
}

// ---------------- TAB 2: PATTERNS (SATZBAU GYM) ----------------
function renderPatternsTab() {
  return `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div class="guide-hero">
        <h2>Gym Latihan Pola Kalimat (Satzbau Drills)</h2>
        <p>
          Menurut metode <strong>Lexical Chunking</strong>, kunci kelancaran bahasa Jerman bukanlah menghafalkan tabel tata bahasa yang rumit,
          melainkan menguasai pola kerangka kalimat siap pakai dan melatih substitusi variasi kosa kata di memori kerja.
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${CONVERSATIONS.map(conv => {
          if (!conv.patternDrill) return '';
          return renderInteractiveDrillCard(conv, false);
        }).join('')}
      </div>
    </div>
  `;
}

// ---------------- TAB 3: NOTEBOOK / BOOKMARKS ----------------
function renderNotebookTab() {
  const bookmarks = state.bookmarks;

  return `
    <div class="notebook-container">
      <div class="notebook-header">
        <div class="notebook-title">
          <h2>Buku Catatan Frasa Jerman Pribadi</h2>
          <div style="font-size: 0.82rem; color: var(--text-muted);">
            Kumpulan kalimat dan frasa penting yang Anda tandai bintang (★) untuk diulang berkala.
          </div>
        </div>
        <div style="font-size: 0.85rem; color: var(--accent-amber); font-weight: 600;">
          Total: ${bookmarks.length} Frasa Tersimpan
        </div>
      </div>

      ${bookmarks.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">⭐</div>
          <div style="font-size: 1.1rem; font-weight: 600; color: var(--text-main);">Belum ada frasa yang Anda simpan</div>
          <div style="max-width: 450px; font-size: 0.85rem; line-height: 1.5;">
            Saat mempelajari percakapan di tab "Perpustakaan Percakapan", klik tombol bintang (☆) pada kalimat yang ingin Anda kuasai untuk menyimpannya di sini.
          </div>
        </div>
      ` : `
        <div class="bookmarks-grid">
          ${bookmarks.map((b, idx) => `
            <div class="chunk-card" style="padding: 1rem;">
              <div class="chunk-card-top">
                <span class="speaker-tag">
                  <span class="role-avatar">${b.speaker || 'DE'}</span>
                  <span>${b.speaker || 'Frasa'}</span>
                </span>
                <div style="display: flex; gap: 0.35rem;">
                  <button class="line-btn speak-custom-text-btn" data-text="${b.de}" title="Putar Audio">🔊</button>
                  <button class="line-btn remove-bookmark-btn" data-idx="${idx}" title="Hapus dari Catatan">✕</button>
                </div>
              </div>
              <div style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-top: 0.25rem;">
                ${b.de}
              </div>
              <div style="font-size: 0.85rem; color: var(--accent-amber); font-family: var(--font-mono);">
                [ ${b.phonetic || ''} ]
              </div>
              <div style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">
                "${b.id}"
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// ---------------- TAB 4: METHOD GUIDE ----------------
function renderMethodGuideTab() {
  const guide = METHOD_GUIDE;

  return `
    <div class="guide-container">
      <div class="guide-hero">
        <h2>${guide.title}</h2>
        <p>${guide.subtitle}</p>
      </div>

      <!-- PRINCIPLES GRID -->
      <div class="principles-grid">
        ${guide.principles.map(p => `
          <div class="principle-card">
            <div class="principle-top">
              <div class="principle-icon">${p.icon}</div>
              <div>
                <div class="principle-tag">${p.tag}</div>
                <div class="principle-title">${p.title}</div>
              </div>
            </div>
            <div class="principle-summary">${p.summary}</div>
            <div class="principle-points">
              ${p.points.map(pt => `
                <div class="point-item">
                  <strong>• ${pt.title}</strong>
                  ${pt.desc}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- DAILY ROUTINE CARD -->
      <div class="routine-card">
        <div class="routine-title">Rekomendasi Rutinitas Belajar Bahasa Jerman Efisien (40 Menit / Hari)</div>
        <div class="routine-steps-grid">
          ${guide.dailyRoutine.map((r, i) => `
            <div class="routine-step">
              <span class="routine-time-badge">Langkah ${i + 1} (${r.time})</span>
              <div class="routine-activity">${r.activity}</div>
              <div class="routine-detail">${r.detail}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ---------------- ATTACH EVENT LISTENERS ----------------
function attachEventListeners(currentConv) {
  // Navigation Tabs Switch (Desktop & Mobile)
  document.querySelectorAll('.nav-tab-btn, .bottom-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      speechService.stop();
      state.isSequentialPlaying = false;
      state.activePlayingLineIndex = null;
      state.activeTab = btn.getAttribute('data-tab');
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Global Search Input
  const searchInput = document.getElementById('globalSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderApp();
      const newInput = document.getElementById('globalSearchInput');
      if (newInput) {
        newInput.focus();
        newInput.setSelectionRange(newInput.value.length, newInput.value.length);
      }
    });
  }

  // Theme Toggle Button
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = state.settings.theme === 'warm-light' ? 'navy' : 'warm-light';
      state.settings = storageService.saveSettings({ theme: nextTheme });
      applyTheme(nextTheme);
      renderApp();
    });
  }

  // Universal Audio Speed Cycle Function (0.69x -> 0.85x -> 1.0x -> 0.69x)
  const cycleAudioSpeed = () => {
    let nextSpeed = 0.69;
    if (state.settings.audioSpeed === 0.69) {
      nextSpeed = 0.85;
    } else if (state.settings.audioSpeed === 0.85) {
      nextSpeed = 1.0;
    } else {
      nextSpeed = 0.69;
    }
    state.settings = storageService.saveSettings({ audioSpeed: nextSpeed });
    speechService.setRate(nextSpeed);
    renderApp();
  };

  // Top Prominent High-Contrast Speed Toggle
  const topSpeedBtn = document.getElementById('topSpeedToggleBtn');
  if (topSpeedBtn) {
    topSpeedBtn.addEventListener('click', cycleAudioSpeed);
  }

  // Search Toggle (collapsible bar)
  const searchToggle = document.getElementById('searchToggleBtn');
  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      state.isSearchOpen = !state.isSearchOpen;
      renderApp();
      if (state.isSearchOpen) {
        setTimeout(() => {
          const input = document.getElementById('globalSearchInput');
          if (input) input.focus();
        }, 50);
      }
    });
  }

  // If in Dialogues tab
  if (state.activeTab === 'dialogues') {
    // Category pills filter
    document.querySelectorAll('.cat-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedCategory = btn.getAttribute('data-cat');
        renderApp();
      });
    });

    // Conversation catalog cards click
    document.querySelectorAll('.catalog-card').forEach(card => {
      card.addEventListener('click', () => {
        speechService.stop();
        state.isSequentialPlaying = false;
        state.activePlayingLineIndex = null;
        state.currentConversationId = card.getAttribute('data-conv-id');
        state.selectedSlotIndex = 0;
        state.inspectedToken = null;
        state.revealedLines.clear();
        state.isMobileCatalogOpen = false;
        renderApp();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Mobile Category Chips
    document.querySelectorAll('.mobile-cat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        state.selectedCategory = chip.getAttribute('data-cat');
        renderApp();
      });
    });

    // Mobile Stepper: Prev & Next Topic
    const prevBtn = document.getElementById('prevTopicBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const convIndex = CONVERSATIONS.findIndex(c => c.id === state.currentConversationId);
        if (convIndex > 0) {
          speechService.stop();
          state.isSequentialPlaying = false;
          state.activePlayingLineIndex = null;
          state.currentConversationId = CONVERSATIONS[convIndex - 1].id;
          state.selectedSlotIndex = 0;
          state.inspectedToken = null;
          state.revealedLines.clear();
          renderApp();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    const nextBtn = document.getElementById('nextTopicBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const convIndex = CONVERSATIONS.findIndex(c => c.id === state.currentConversationId);
        if (convIndex < CONVERSATIONS.length - 1) {
          speechService.stop();
          state.isSequentialPlaying = false;
          state.activePlayingLineIndex = null;
          state.currentConversationId = CONVERSATIONS[convIndex + 1].id;
          state.selectedSlotIndex = 0;
          state.inspectedToken = null;
          state.revealedLines.clear();
          renderApp();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    // Mobile Catalog Drawer Open / Close
    const openDrawerBtn = document.getElementById('openMobileCatalogBtn');
    if (openDrawerBtn) {
      openDrawerBtn.addEventListener('click', () => {
        state.isMobileCatalogOpen = true;
        renderApp();
      });
    }

    const closeDrawerBtn = document.getElementById('closeMobileCatalogBtn');
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => {
        state.isMobileCatalogOpen = false;
        renderApp();
      });
    }

    const closeDrawerBackdrop = document.getElementById('closeMobileCatalogBackdrop');
    if (closeDrawerBackdrop) {
      closeDrawerBackdrop.addEventListener('click', () => {
        state.isMobileCatalogOpen = false;
        renderApp();
      });
    }


    // Mark as Completed Toggle
    const toggleCompletedBtn = document.getElementById('toggleCompletedBtn');
    if (toggleCompletedBtn) {
      toggleCompletedBtn.addEventListener('click', () => {
        state.completedIds = storageService.toggleCompleted(currentConv.id);
        renderApp();
      });
    }

    // Play All Sequential Audio
    const playAllBtn = document.getElementById('playAllBtn');
    if (playAllBtn) {
      playAllBtn.addEventListener('click', () => {
        if (state.isSequentialPlaying) {
          speechService.stop();
          state.isSequentialPlaying = false;
          state.activePlayingLineIndex = null;
          renderApp();
        } else {
          state.isSequentialPlaying = true;
          renderApp();
          speechService.playSequential(currentConv.dialogue, {
            shadowing: state.shadowingMode,
            onLineStart: (idx) => {
              state.activePlayingLineIndex = idx;
              document.querySelectorAll('.speech-line').forEach(el => el.classList.remove('playing'));
              const lineEl = document.getElementById(`line-${idx}`);
              if (lineEl) {
                lineEl.classList.add('playing');
                lineEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
            },
            onComplete: () => {
              state.isSequentialPlaying = false;
              state.activePlayingLineIndex = null;
              renderApp();
            }
          });
        }
      });
    }

    // Toggle Shadowing
    const toggleShadowingBtn = document.getElementById('toggleShadowingBtn');
    if (toggleShadowingBtn) {
      toggleShadowingBtn.addEventListener('click', () => {
        state.shadowingMode = !state.shadowingMode;
        renderApp();
      });
    }

    // Toggle Audio Speed (Synced with top button)
    const speedToggleBtn = document.getElementById('speedToggleBtn');
    if (speedToggleBtn) {
      speedToggleBtn.addEventListener('click', cycleAudioSpeed);
    }

    // Mobile Topic Select Dropdown
    const mobileTopicSelect = document.getElementById('mobileTopicSelect');
    if (mobileTopicSelect) {
      mobileTopicSelect.addEventListener('change', (e) => {
        speechService.stop();
        state.isSequentialPlaying = false;
        state.activePlayingLineIndex = null;
        state.currentConversationId = e.target.value;
        state.selectedSlotIndex = 0;
        state.inspectedToken = null;
        state.revealedLines.clear();
        renderApp();
      });
    }

    // Display Scaffolding Segments (full | de-only | phonetic-only | blind)
    document.querySelectorAll('.seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        state.settings = storageService.saveSettings({ displayMode: mode });
        renderApp();
      });
    });

    // Toggle Gender Coloring
    const genderColorBtn = document.getElementById('toggleGenderColorBtn');
    if (genderColorBtn) {
      genderColorBtn.addEventListener('click', () => {
        const nextGender = !state.settings.showGenderColors;
        state.settings = storageService.saveSettings({ showGenderColors: nextGender });
        renderApp();
      });
    }

    // Play Individual Line Audio
    document.querySelectorAll('.play-line-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const lineIdx = parseInt(btn.getAttribute('data-line-idx'), 10);
        const line = currentConv.dialogue[lineIdx];
        if (line) {
          state.activePlayingLineIndex = lineIdx;
          document.querySelectorAll('.speech-line').forEach(el => el.classList.remove('playing'));
          const lineEl = document.getElementById(`line-${lineIdx}`);
          if (lineEl) lineEl.classList.add('playing');

          speechService.speakText(line.de, {
            onEnd: () => {
              state.activePlayingLineIndex = null;
              if (lineEl) lineEl.classList.remove('playing');
            }
          });
        }
      });
    });

    // Bookmark Line Toggle
    document.querySelectorAll('.bookmark-line-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const lineIdx = parseInt(btn.getAttribute('data-line-idx'), 10);
        const line = currentConv.dialogue[lineIdx];
        if (line) {
          state.bookmarks = storageService.toggleBookmark({
            de: line.de,
            phonetic: line.phonetic,
            id: line.id,
            speaker: line.speaker
          });
          renderApp();
        }
      });
    });

    // Reveal Blind Line Button
    document.querySelectorAll('.reveal-line-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const lineIdx = parseInt(btn.getAttribute('data-line-idx'), 10);
        if (state.revealedLines.has(lineIdx)) {
          state.revealedLines.delete(lineIdx);
        } else {
          state.revealedLines.add(lineIdx);
        }
        renderApp();
      });
    });

    // Click on Word/Token to Inspect Breakdown
    document.querySelectorAll('.de-word-token').forEach(el => {
      el.addEventListener('click', () => {
        const de = el.getAttribute('data-de');
        const id = el.getAttribute('data-id');
        state.inspectedToken = { de, id };
        renderApp();
        // Speak the clicked token
        speechService.speakText(de);
      });
    });

    // Close Token Drawer
    const closeTokenBtn = document.getElementById('closeTokenDrawerBtn');
    if (closeTokenBtn) {
      closeTokenBtn.addEventListener('click', () => {
        state.inspectedToken = null;
        renderApp();
      });
    }

    // Speak Inspected Token
    const speakTokenBtn = document.getElementById('speakTokenBtn');
    if (speakTokenBtn && state.inspectedToken) {
      speakTokenBtn.addEventListener('click', () => {
        speechService.speakText(state.inspectedToken.de);
      });
    }

    // Study Tabs (chunks | drill | culture | notes)
    document.querySelectorAll('.panel-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentStudyTab = btn.getAttribute('data-study-tab');
        renderApp();
      });
    });

    // Speak Chunk Button
    document.querySelectorAll('.speak-chunk-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const de = btn.getAttribute('data-de');
        if (de) speechService.speakText(de);
      });
    });

    // User Notes Auto-Save
    const notesInput = document.getElementById('userNotesInput');
    if (notesInput) {
      notesInput.addEventListener('input', () => {
        storageService.saveUserNote(currentConv.id, notesInput.value);
        const statusEl = document.getElementById('notesStatusText');
        if (statusEl) statusEl.textContent = 'Menyimpan...';
        setTimeout(() => {
          if (statusEl) statusEl.textContent = 'Tersimpan otomatis';
        }, 500);
      });
    }
  }

  // If in Patterns tab
  if (state.activeTab === 'patterns') {
    document.querySelectorAll('[data-jump-conv]').forEach(btn => {
      btn.addEventListener('click', () => {
        const convId = btn.getAttribute('data-jump-conv');
        state.currentConversationId = convId;
        state.activeTab = 'dialogues';
        state.currentStudyTab = 'drill';
        renderApp();
      });
    });
  }

  // If in Notebook tab
  if (state.activeTab === 'notebook') {
    document.querySelectorAll('.remove-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const item = state.bookmarks[idx];
        if (item) {
          state.bookmarks = storageService.toggleBookmark(item);
          renderApp();
        }
      });
    });
  }

  // ---------------- INTERACTIVE CUSTOM DRILLS ----------------
  // Real-time input typing in placeholder slots
  document.querySelectorAll('.custom-slot-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const convId = e.target.getAttribute('data-conv-id');
      const ph = e.target.getAttribute('data-placeholder');
      const val = e.target.value;

      const conv = CONVERSATIONS.find(c => c.id === convId);
      if (!conv || !conv.patternDrill) return;

      const values = getDrillValues(convId, conv.patternDrill);
      values[ph] = val;

      updateDrillCardPreviewInDOM(convId, conv.patternDrill);

      // Synchronize counterpart input if open in both study panel & patterns tab
      const isStudy = e.target.id.startsWith('study-');
      const counterpartId = isStudy
        ? `slot-input-${convId}-${ph}`
        : `study-slot-input-${convId}-${ph}`;
      const counterpart = document.getElementById(counterpartId);
      if (counterpart && counterpart.value !== val) {
        counterpart.value = val;
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const convId = e.target.getAttribute('data-conv-id');
        const conv = CONVERSATIONS.find(c => c.id === convId);
        if (conv && conv.patternDrill) {
          const values = getDrillValues(convId, conv.patternDrill);
          const speechText = buildSpeechSentence(conv.patternDrill.template, values);
          speechService.speakText(speechText);
        }
      }
    });
  });

  // Speak custom drill sentence button
  document.querySelectorAll('.speak-custom-drill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const convId = btn.getAttribute('data-conv-id');
      const conv = CONVERSATIONS.find(c => c.id === convId);
      if (conv && conv.patternDrill) {
        const values = getDrillValues(convId, conv.patternDrill);
        const speechText = buildSpeechSentence(conv.patternDrill.template, values);
        speechService.speakText(speechText);
      }
    });
  });

  // Reset custom drill slots button
  document.querySelectorAll('.reset-custom-drill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const convId = btn.getAttribute('data-reset-conv-id');
      const conv = CONVERSATIONS.find(c => c.id === convId);
      if (!conv || !conv.patternDrill) return;

      const drill = conv.patternDrill;
      const placeholders = extractPlaceholders(drill.template);
      const firstParts = drill.slots && drill.slots.length > 0 ? parseSlotParts(drill.slots[0].word) : [];

      state.customDrillValues[convId] = {};
      placeholders.forEach((ph, idx) => {
        const defaultVal = firstParts[idx] || '';
        state.customDrillValues[convId][ph] = defaultVal;
        const inp1 = document.getElementById(`slot-input-${convId}-${ph}`);
        if (inp1) inp1.value = defaultVal;
        const inp2 = document.getElementById(`study-slot-input-${convId}-${ph}`);
        if (inp2) inp2.value = defaultVal;
      });

      updateDrillCardPreviewInDOM(convId, drill);

      // Reset preset chips active state
      document.querySelectorAll(`.preset-chip-btn[data-conv-id="${convId}"]`).forEach((chip, sIdx) => {
        chip.classList.toggle('active', sIdx === 0);
      });

      const speechText = buildSpeechSentence(drill.template, state.customDrillValues[convId]);
      speechService.speakText(speechText);
    });
  });

  // Preset quick variation chips
  document.querySelectorAll('.preset-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const convId = btn.getAttribute('data-conv-id');
      const rawWord = btn.getAttribute('data-slot-word');
      const conv = CONVERSATIONS.find(c => c.id === convId);
      if (!conv || !conv.patternDrill) return;

      const drill = conv.patternDrill;
      const parts = parseSlotParts(rawWord);
      const placeholders = extractPlaceholders(drill.template);

      if (!state.customDrillValues[convId]) {
        state.customDrillValues[convId] = {};
      }

      placeholders.forEach((ph, idx) => {
        const val = parts[idx] || '';
        state.customDrillValues[convId][ph] = val;
        const inp1 = document.getElementById(`slot-input-${convId}-${ph}`);
        if (inp1) inp1.value = val;
        const inp2 = document.getElementById(`study-slot-input-${convId}-${ph}`);
        if (inp2) inp2.value = val;
      });

      updateDrillCardPreviewInDOM(convId, drill);

      // Highlight active chip
      document.querySelectorAll(`.preset-chip-btn[data-conv-id="${convId}"]`).forEach(chip => {
        chip.classList.toggle('active', chip === btn);
      });

      // Automatically speak the resulting sentence
      const speechText = buildSpeechSentence(drill.template, state.customDrillValues[convId]);
      speechService.speakText(speechText);
    });
  });

  // Universal speak custom text buttons
  document.querySelectorAll('.speak-custom-text-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-text');
      if (text) speechService.speakText(text);
    });
  });
}

// Utility: HTML Escaper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Start Application
renderApp();
