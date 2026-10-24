// Web Speech API Service untuk Pengucapan Bahasa Jerman Alami (de-DE)

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.germanVoice = null;
    this.rate = 0.69;
    this.isPlaying = false;
    this.currentUtterance = null;
    this.onEndCallback = null;

    if (this.synth) {
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  initVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    // Prioritaskan suara Jerman (de-DE, de-AT, de-CH)
    this.germanVoice =
      this.voices.find(v => v.lang === 'de-DE') ||
      this.voices.find(v => v.lang.startsWith('de-')) ||
      this.voices.find(v => v.lang.includes('de'));
  }

  setRate(rate) {
    this.rate = parseFloat(rate) || 0.69;
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.currentUtterance = null;
    if (this.onEndCallback) {
      this.onEndCallback();
      this.onEndCallback = null;
    }
  }

  speakText(text, options = {}) {
    if (!this.synth) {
      console.warn('SpeechSynthesis tidak didukung di browser ini.');
      if (options.onEnd) options.onEnd();
      return;
    }

    this.synth.cancel();
    this.isPlaying = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    if (this.germanVoice) {
      utterance.voice = this.germanVoice;
    }
    utterance.rate = options.rate !== undefined ? options.rate : this.rate;
    utterance.pitch = options.pitch || 1.0;

    utterance.onend = () => {
      this.isPlaying = false;
      this.currentUtterance = null;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      this.isPlaying = false;
      this.currentUtterance = null;
      if (options.onError) options.onError(e);
      if (options.onEnd) options.onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  // Memutar seluruh percakapan baris per baris secara berurutan
  async playSequential(lines, options = {}) {
    this.stop();
    this.isPlaying = true;

    for (let i = 0; i < lines.length; i++) {
      if (!this.isPlaying) break;
      const line = lines[i];

      if (options.onLineStart) {
        options.onLineStart(i, line);
      }

      await new Promise(resolve => {
        this.speakText(line.de, {
          rate: this.rate,
          onEnd: () => {
            // Jeda sedang yang nyaman: 2000ms untuk baca normal, 3400ms untuk shadowing/menirukan
            const pauseTime = options.shadowing ? 3400 : 2000;
            setTimeout(resolve, pauseTime);
          },
          onError: () => resolve()
        });
      });

      if (options.onLineEnd) {
        options.onLineEnd(i, line);
      }
    }

    this.isPlaying = false;
    if (options.onComplete) {
      options.onComplete();
    }
  }
}

export const speechService = new SpeechService();
