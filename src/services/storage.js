// Penyimpanan data lokal (LocalStorage) untuk Catatan Pribadi & Preferensi Belajar Jerman

const KEYS = {
  BOOKMARKS: 'deutsch_bookmarks_v1',
  COMPLETED: 'deutsch_completed_v1',
  USER_NOTES: 'deutsch_user_notes_v1',
  SETTINGS: 'deutsch_settings_v1'
};

export const storageService = {
  getSettings() {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          theme: 'navy',
          displayMode: 'full',
          showGenderColors: true,
          ...parsed,
          audioSpeed: parsed.audioSpeed !== undefined ? parsed.audioSpeed : 0.69
        };
      }
      return {
        theme: 'navy',
        displayMode: 'full',
        showGenderColors: true,
        audioSpeed: 0.69
      };
    } catch (e) {
      return {
        theme: 'navy',
        displayMode: 'full',
        showGenderColors: true,
        audioSpeed: 0.69
      };
    }
  },

  saveSettings(settings) {
    try {
      const current = this.getSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Gagal menyimpan settings:', e);
    }
  },

  getBookmarks() {
    try {
      const data = localStorage.getItem(KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleBookmark(item) {
    try {
      const list = this.getBookmarks();
      const index = list.findIndex(b => b.de === item.de);
      let updated;
      if (index >= 0) {
        updated = list.filter(b => b.de !== item.de);
      } else {
        updated = [
          {
            ...item,
            savedAt: new Date().toISOString()
          },
          ...list
        ];
      }
      localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Gagal update bookmark:', e);
      return [];
    }
  },

  isBookmarked(de) {
    const list = this.getBookmarks();
    return list.some(b => b.de === de);
  },

  getCompleted() {
    try {
      const data = localStorage.getItem(KEYS.COMPLETED);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleCompleted(conversationId) {
    try {
      const list = this.getCompleted();
      const index = list.indexOf(conversationId);
      let updated;
      if (index >= 0) {
        updated = list.filter(id => id !== conversationId);
      } else {
        updated = [...list, conversationId];
      }
      localStorage.setItem(KEYS.COMPLETED, JSON.stringify(updated));
      return updated;
    } catch (e) {
      return [];
    }
  },

  getUserNotes(conversationId) {
    try {
      const notes = JSON.parse(localStorage.getItem(KEYS.USER_NOTES) || '{}');
      return notes[conversationId] || '';
    } catch (e) {
      return '';
    }
  },

  saveUserNote(conversationId, noteText) {
    try {
      const notes = JSON.parse(localStorage.getItem(KEYS.USER_NOTES) || '{}');
      notes[conversationId] = noteText;
      localStorage.setItem(KEYS.USER_NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error('Gagal menyimpan catatan pengguna:', e);
    }
  }
};
