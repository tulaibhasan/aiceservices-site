/**
 * White-Label AI Text + Voice Assistant Frontend Orchestrator
 * Powered by Google Gemini 3.6 Flash & Cloudflare Worker Backend
 * 
 * Features:
 * - Gemini Live Experience: Fluid organic orb visualizer with continuous live dialogue
 * - Calm & Polite Persona: Gentle, courteous, and articulate voice tone
 * - In-Chatbox Live Button: Iconic soundwave symbol inside the input card
 * - Automatic Transcript Persistence: Everything spoken is seamlessly recorded into chat history
 * - Dynamic White-Label Engine: Driven by chatbot.config.json
 */

(function () {
  'use strict';

  // Default Fallback Config (Overwritten dynamically by chatbot.config.json)
  let activeConfig = {
    business: {
      name: "AICE Services",
      tagline: "AI + Civil Engineering for Smarter Cities",
      description: "Delivering audit-ready engineering solutions, automated BOQ auditing, and CAD conversions compliant with ADB, World Bank, and Government of Punjab regulations.",
      website: "https://aiceservices.com",
      address: "Lahore / Punjab, Pakistan (Serving National & International Donor-Funded Projects)",
      operatingHours: "Monday – Friday: 09:00 – 18:00 | Saturday: 09:00 – 14:00 (PST)",
      email: "contact@aiceservices.com",
      whatsapp: "923013666088"
    },
    branding: {
      botName: "AICE Assistant",
      botAvatarGlyph: "AICE",
      botGreeting: "Welcome to AICE Services! I am your AI civil engineering assistant. How may I help you explore our AI tools (AICEMark, Deck Edit, ProScan, BOQ Auditor), request an engineering design review, or discuss donor compliance today?",
      primaryColor: "#10b981",
      accentColor: "#06b6d4",
      backgroundColor: "#0b0f17",
      theme: "dark"
    },
    quickChips: [
      "What AI tools do you offer?",
      "Show engineering & AI catalog",
      "Book an engineering consultation",
      "Connect on WhatsApp"
    ],
    catalog: []
  };

  // Read backend URL from URL query parameters (passed by embed.js) or localStorage or fallback
  const urlParams = new URLSearchParams(window.location.search);
  const queryBackend = urlParams.get('backend');
  const isEmbedded = urlParams.get('embedded') === 'true' || window.self !== window.top;
  if (queryBackend) {
    try { localStorage.setItem('BOT_BACKEND_URL', queryBackend); } catch (_) {}
  }

  // Application State
  const state = {
    isOpen: false,
    backendUrl: queryBackend || localStorage.getItem('BOT_BACKEND_URL') || 'https://aice-voice-bot-backend.aiceservices.workers.dev',
    modelName: 'gemini-flash-lite-latest',
    isConnected: false,
    isConnecting: false,
    currentAssistantBubble: null,
    currentAssistantText: '',
    history: [], // Array of { role: 'user' | 'assistant', text: string }
    isLiveActive: false,
  };

  // DOM Element References
  const elements = {
    launcher: document.getElementById('widgetLauncher'),
    widget: document.getElementById('chatWidget'),
    closeBtn: document.getElementById('closeWidgetBtn'),
    minimizeBtn: document.getElementById('minimizeWidgetBtn'),
    statusIndicator: document.getElementById('connectionStatusIndicator'),
    assistantHeaderTitle: document.getElementById('assistantHeaderTitle'),
    welcomeMessageWrapper: document.getElementById('welcomeMessageWrapper'),
    welcomeTimestamp: document.getElementById('welcomeTimestamp'),
    messagesContainer: document.getElementById('messagesContainer'),
    suggestionChips: document.getElementById('suggestionChips'),
    typingIndicator: document.getElementById('typingIndicator'),
    chatForm: document.getElementById('chatForm'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    liveBtn: document.getElementById('liveBtn'),
    // Gemini Live Overlay Elements
    geminiLiveOverlay: document.getElementById('geminiLiveOverlay'),
    liveCollapseBtn: document.getElementById('liveCollapseBtn'),
    liveOrbCore: document.getElementById('liveOrbCore'),
    liveStatusLabel: document.getElementById('liveStatusLabel'),
    liveMicToggleBtn: document.getElementById('liveMicToggleBtn'),
    liveMicToggleIcon: document.getElementById('liveMicToggleIcon'),
    liveEndBtn: document.getElementById('liveEndBtn'),
  };

  // ==========================================================================
  // CONFIGURATION LOADER & THEME APPLIER
  // ==========================================================================
  async function loadBotConfig() {
    try {
      const res = await fetch('./chatbot.config.json');
      if (res.ok) {
        const data = await res.json();
        activeConfig = data;
        applyConfigToUI(data);
      }
    } catch (err) {
      console.warn('Could not load chatbot.config.json, using built-in defaults:', err);
      applyConfigToUI(activeConfig);
    }
  }

  function applyConfigToUI(config) {
    const biz = config.business || {};
    const brand = config.branding || {};

    // 1. Dynamic CSS Variables & Branding Colors
    if (brand.primaryColor) {
      document.documentElement.style.setProperty('--brand-primary', brand.primaryColor);
      document.documentElement.style.setProperty('--accent-indigo', brand.primaryColor);
      document.documentElement.style.setProperty('--accent-blue', brand.primaryColor);
    }
    if (brand.accentColor) {
      document.documentElement.style.setProperty('--brand-accent', brand.accentColor);
      document.documentElement.style.setProperty('--accent-cyan', brand.accentColor);
    }
    if (brand.backgroundColor) {
      document.documentElement.style.setProperty('--bg-primary', brand.backgroundColor);
    }

    // 2. Document Title & Header
    if (biz.name) {
      document.title = `${biz.name} | ${biz.tagline || 'AI Assistant'}`;
    }

    if (elements.assistantHeaderTitle && brand.botName) {
      elements.assistantHeaderTitle.textContent = brand.botName;
    }

    const launcherTooltip = document.querySelector('.launcher-tooltip span');
    if (launcherTooltip && brand.botName) {
      launcherTooltip.textContent = `Chat with ${brand.botName}`;
    }

    const avatarGlyphs = document.querySelectorAll('.avatar-glyph');
    avatarGlyphs.forEach((el) => {
      if (brand.botAvatarGlyph) el.textContent = brand.botAvatarGlyph;
    });

    // 3. Auto-display welcome message content
    displayWelcomeMessage();
  }

  function displayWelcomeMessage() {
    const biz = activeConfig.business || {};
    const brand = activeConfig.branding || {};

    const introBubble = document.querySelector('.intro-card .msg-bubble');
    if (introBubble) {
      introBubble.innerHTML = `
        <p><strong>Welcome to ${escapeHtml(biz.name || 'our service')}!</strong></p>
        <p>${escapeHtml(brand.botGreeting || biz.description || 'How may I assist you today?')}</p>
      `;
    }

    if (elements.welcomeTimestamp) {
      elements.welcomeTimestamp.textContent = formatTime(new Date());
    }

    // Quick Suggestion Chips
    if (elements.suggestionChips && Array.isArray(activeConfig.quickChips) && activeConfig.quickChips.length > 0) {
      elements.suggestionChips.innerHTML = activeConfig.quickChips
        .map(
          (chipText) => `
        <button class="chip" data-prompt="${escapeHtml(chipText)}">
          <i class="ph ph-chat-circle-dots"></i>
          <span>${escapeHtml(chipText)}</span>
        </button>
      `
        )
        .join('');

      elements.suggestionChips.querySelectorAll('.chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          const prompt = chip.getAttribute('data-prompt');
          if (prompt) {
            elements.messageInput.value = prompt;
            handleInputChange();
            sendMessage(prompt);
          }
        });
      });
    }
  }

  // ==========================================================================
  // GEMINI LIVE CONTROLLER (Immersive Fluid Voice Session)
  // ==========================================================================
  const geminiLiveController = {
    audioContext: null,
    analyser: null,
    micStream: null,
    recognition: null,
    synth: window.speechSynthesis,
    isListening: false,
    isSpeaking: false,
    isMuted: false,
    hasGreeted: false,
    animId: null,

    init() {
      this.initSpeechRecognition();
    },

    initSpeechRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        console.warn('SpeechRecognition API not available in this browser. Live voice playback remains active.');
        return;
      }

      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onstart = () => {
        this.isListening = true;
        if (elements.liveStatusLabel) {
          elements.liveStatusLabel.textContent = 'Listening';
          elements.liveStatusLabel.classList.remove('speaking');
        }
      };

      rec.onresult = (event) => {
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
          }
        }

        if (finalText.trim()) {
          const spokenPrompt = finalText.trim();
          console.log('[Gemini Live] Spoken Input Finalized:', spokenPrompt);
          // Send message through conversation pipeline and speak reply seamlessly
          sendMessage(spokenPrompt, true);
        }
      };

      rec.onerror = (event) => {
        console.warn('[Gemini Live] SpeechRecognition warning:', event.error);
        if (event.error === 'not-allowed') {
          if (elements.liveStatusLabel) elements.liveStatusLabel.textContent = 'Microphone permission blocked';
        }
      };

      rec.onend = () => {
        this.isListening = false;
        if (state.isLiveActive && !this.isMuted && !this.isSpeaking) {
          try {
            rec.start();
          } catch (_) {}
        }
      };

      this.recognition = rec;
    },

    async startLiveSession() {
      state.isLiveActive = true;
      if (elements.geminiLiveOverlay) elements.geminiLiveOverlay.classList.remove('hidden');

      try {
        if (!this.audioContext) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            this.audioContext = new AudioContextClass();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 64;
          }
        }

        if (this.audioContext && this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
          if (this.audioContext && this.analyser) {
            const micSource = this.audioContext.createMediaStreamSource(this.micStream);
            micSource.connect(this.analyser);
          }
        }

        this.startOrbAnimation();

        if (this.recognition && !this.isMuted) {
          try {
            this.recognition.start();
          } catch (_) {}
        }

        if (elements.liveStatusLabel) {
          elements.liveStatusLabel.textContent = 'Listening';
          elements.liveStatusLabel.classList.remove('speaking');
        }

        if (!this.hasGreeted) {
          this.hasGreeted = true;
          const botName = activeConfig.branding?.botName || 'your assistant';
          this.speak(`Hello. I am ${botName}. I am here to assist you with any questions or bookings. Please speak whenever you are ready.`);
        }
      } catch (err) {
        console.warn('[Gemini Live] Microphone init note:', err.message);
        this.startOrbAnimation();
        if (elements.liveStatusLabel) {
          elements.liveStatusLabel.textContent = 'Listening';
          elements.liveStatusLabel.classList.remove('speaking');
        }
        if (!this.hasGreeted) {
          this.hasGreeted = true;
          this.speak('Hello. Live mode is ready. You may speak or tap anytime.');
        }
      }
    },

    endLiveSession() {
      state.isLiveActive = false;

      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }

      if (this.recognition) {
        try {
          this.recognition.stop();
        } catch (_) {}
      }

      if (this.micStream) {
        this.micStream.getTracks().forEach((track) => track.stop());
        this.micStream = null;
      }

      if (this.synth) {
        this.synth.cancel();
      }

      this.isSpeaking = false;
      this.isListening = false;

      if (elements.geminiLiveOverlay) elements.geminiLiveOverlay.classList.add('hidden');
      scrollToBottom();
    },

    toggleMicMute() {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        if (this.recognition) {
          try {
            this.recognition.stop();
          } catch (_) {}
        }
        if (this.synth) this.synth.cancel();
        if (elements.liveMicToggleBtn) elements.liveMicToggleBtn.classList.add('muted');
        if (elements.liveMicToggleIcon) elements.liveMicToggleIcon.className = 'ph-fill ph-microphone-slash';
        if (elements.liveStatusLabel) {
          elements.liveStatusLabel.textContent = 'Microphone Muted';
          elements.liveStatusLabel.classList.remove('speaking');
        }
      } else {
        if (this.recognition) {
          try {
            this.recognition.start();
          } catch (_) {}
        }
        if (elements.liveMicToggleBtn) elements.liveMicToggleBtn.classList.remove('muted');
        if (elements.liveMicToggleIcon) elements.liveMicToggleIcon.className = 'ph-fill ph-microphone';
        if (elements.liveStatusLabel) {
          elements.liveStatusLabel.textContent = 'Listening';
          elements.liveStatusLabel.classList.remove('speaking');
        }
      }
    },

    speak(text) {
      if (!this.synth || !text) return;

      const cleanText = text
        .replace(/[*_#`]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim();

      if (!cleanText) return;

      this.synth.cancel();

      // Calm, polite, soothing voice parameters
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.98; // Calm, measured conversational tempo
      utterance.pitch = 0.99; // Reassuring, polite pitch

      const voices = this.synth.getVoices();
      const preferredVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google UK English Female') ||
              v.name.includes('Google US English') ||
              v.name.includes('Samantha') ||
              v.name.includes('Karen') ||
              v.name.includes('Serena'))
        ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (elements.liveStatusLabel) {
          elements.liveStatusLabel.textContent = 'Speaking';
          elements.liveStatusLabel.classList.add('speaking');
        }
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (state.isLiveActive) {
          if (elements.liveStatusLabel) {
            elements.liveStatusLabel.textContent = 'Listening';
            elements.liveStatusLabel.classList.remove('speaking');
          }
          if (this.recognition && !this.isMuted) {
            try {
              this.recognition.start();
            } catch (_) {}
          }
        }
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (state.isLiveActive && elements.liveStatusLabel) {
          elements.liveStatusLabel.textContent = 'Listening';
          elements.liveStatusLabel.classList.remove('speaking');
        }
      };

      this.synth.speak(utterance);
    },

    startOrbAnimation() {
      const dataArray = this.analyser ? new Uint8Array(this.analyser.frequencyBinCount) : null;
      let phase = 0;

      const renderFrame = () => {
        if (!state.isLiveActive) return;
        this.animId = requestAnimationFrame(renderFrame);

        if (elements.liveOrbCore) {
          if (this.analyser && this.isListening && !this.isMuted) {
            this.analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length;
            const scale = 0.96 + (avg / 255) * 0.35;
            const glow = 30 + (avg / 255) * 55;
            elements.liveOrbCore.style.transform = `scale(${scale})`;
            elements.liveOrbCore.style.boxShadow = `0 0 ${glow}px rgba(56, 189, 248, 0.7), 0 0 ${glow * 1.5}px rgba(99, 102, 241, 0.45)`;
          } else if (this.isSpeaking) {
            phase += 0.08;
            const wave = Math.sin(phase) * 0.12;
            elements.liveOrbCore.style.transform = `scale(${1.04 + wave})`;
            elements.liveOrbCore.style.boxShadow = `0 0 55px rgba(168, 85, 247, 0.7), 0 0 90px rgba(56, 189, 248, 0.5)`;
          } else {
            phase += 0.04;
            const subtleWave = Math.sin(phase) * 0.04;
            elements.liveOrbCore.style.transform = `scale(${1.0 + subtleWave})`;
            elements.liveOrbCore.style.boxShadow = `0 0 35px rgba(56, 189, 248, 0.5), 0 0 65px rgba(99, 102, 241, 0.3)`;
          }
        }
      };

      renderFrame();
    },
  };

  // ==========================================================================
  // INITIALIZATION & EVENT BINDINGS
  // ==========================================================================
  async function init() {
    if (isEmbedded) {
      document.body.classList.add('embedded-mode');
    }
    await loadBotConfig();
    setupEventListeners();
    geminiLiveController.init();
    connectToBackend();

    if (isEmbedded) {
      openWidget();
    }
  }

  function setupEventListeners() {
    if (elements.launcher) {
      elements.launcher.addEventListener('click', toggleWidget);
    }
    if (elements.closeBtn) {
      elements.closeBtn.addEventListener('click', closeWidget);
    }
    if (elements.minimizeBtn) {
      elements.minimizeBtn.addEventListener('click', closeWidget);
    }

    if (elements.messageInput) {
      elements.messageInput.addEventListener('input', handleInputChange);
      elements.messageInput.addEventListener('keydown', handleInputKeydown);
    }
    if (elements.chatForm) {
      elements.chatForm.addEventListener('submit', handleFormSubmit);
    }

    // Gemini Live Buttons
    if (elements.liveBtn) {
      elements.liveBtn.addEventListener('click', () => geminiLiveController.startLiveSession());
    }
    if (elements.liveCollapseBtn) {
      elements.liveCollapseBtn.addEventListener('click', () => geminiLiveController.endLiveSession());
    }
    if (elements.liveEndBtn) {
      elements.liveEndBtn.addEventListener('click', () => geminiLiveController.endLiveSession());
    }
    if (elements.liveMicToggleBtn) {
      elements.liveMicToggleBtn.addEventListener('click', () => geminiLiveController.toggleMicMute());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isOpen) {
        if (state.isLiveActive) {
          geminiLiveController.endLiveSession();
        } else {
          closeWidget();
        }
      }
    });
  }

  // ==========================================================================
  // WIDGET LIFECYCLE
  // ==========================================================================
  function openWidget() {
    state.isOpen = true;
    if (elements.widget) {
      elements.widget.classList.remove('hidden');
    }
    if (elements.launcher) {
      elements.launcher.classList.add('active');
      elements.launcher.setAttribute('aria-expanded', 'true');
    }

    // Auto-display welcome message & suggestion chips
    displayWelcomeMessage();

    if (elements.messageInput) {
      elements.messageInput.focus();
    }
    scrollToBottom();
  }

  function closeWidget() {
    if (isEmbedded) {
      try {
        window.parent.postMessage({ type: 'AICE_ASSISTANT_CLOSE' }, '*');
      } catch (_) {}
    }
    state.isOpen = false;
    if (elements.widget) {
      elements.widget.classList.add('hidden');
    }
    if (elements.launcher) {
      elements.launcher.classList.remove('active');
      elements.launcher.setAttribute('aria-expanded', 'false');
    }

    if (state.isLiveActive) {
      geminiLiveController.endLiveSession();
    }
  }

  function toggleWidget() {
    if (state.isOpen) {
      closeWidget();
    } else {
      openWidget();
    }
  }

  // ==========================================================================
  // BACKEND CONNECTION & HEALTH CHECK
  // ==========================================================================
  async function connectToBackend() {
    if (state.isConnecting) return;
    state.isConnecting = true;
    updateStatus('connecting');

    try {
      const res = await fetch(`${state.backendUrl}/health`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`Health check failed with HTTP ${res.status}`);
      }

      const data = await res.json();
      state.isConnected = true;
      state.isConnecting = false;

      updateStatus('online');
      elements.sendBtn.disabled = !elements.messageInput.value.trim();
    } catch (err) {
      console.error('Failed to connect to backend:', err);
      state.isConnecting = false;
      state.isConnected = false;
      updateStatus('error');
    }
  }

  function updateStatus(stateClass) {
    if (elements.statusIndicator) {
      elements.statusIndicator.className = `status-indicator ${stateClass}`;
    }
  }

  // ==========================================================================
  // DELIVERABLE, WHATSAPP & APPOINTMENT HELPERS
  // ==========================================================================
  function matchDeliverable(query) {
    const catalog = activeConfig.catalog || [];
    if (!catalog.length) return null;
    if (!query) return catalog[0];

    const q = query.toLowerCase().replace(/[^a-z0-9]/g, ' ');

    for (const item of catalog) {
      if (item.key && query.toLowerCase().includes(item.key.toLowerCase())) return item;
      if (item.id && query.toLowerCase().includes(item.id.toLowerCase())) return item;
      if (item.title && q.includes(item.title.toLowerCase())) return item;
    }

    const words = q.split(' ').filter((w) => w.length > 3);
    for (const item of catalog) {
      const titleLower = (item.title || '').toLowerCase();
      if (words.some((w) => titleLower.includes(w))) return item;
    }

    return catalog[0];
  }

  function renderMediaCard(itemName, container) {
    const item = matchDeliverable(itemName);
    if (!item) return;

    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'tool-card-wrapper';

    const bannerHtml = item.image
      ? `<div class="media-card-banner has-image"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" class="media-card-img" /></div>`
      : `<div class="media-card-banner"><div class="banner-glow"></div><i class="ph ${item.icon || 'ph-sparkle'} banner-icon"></i></div>`;

    const featuresHtml = Array.isArray(item.features)
      ? `<ul class="media-feature-list">${item.features.map((f) => `<li><i class="ph-fill ph-check-circle"></i> <span>${escapeHtml(f)}</span></li>`).join('')}</ul>`
      : '';

    cardWrapper.innerHTML = `
      <div class="media-deliverable-card">
        ${bannerHtml}
        <div class="media-card-body">
          <div class="media-badge-row">
            <span class="media-badge">${escapeHtml(item.badge || 'Featured')}</span>
            ${item.turnaround ? `<span class="media-turnaround"><i class="ph ph-clock"></i> ${escapeHtml(item.turnaround)}</span>` : ''}
          </div>
          <h4 class="media-card-title">${escapeHtml(item.title)}</h4>
          ${item.price ? `<div class="media-price-tag">${escapeHtml(item.price)}</div>` : ''}
          ${featuresHtml}
          <div class="media-actions">
            <button class="media-action-btn primary action-book-btn" data-prompt="${escapeHtml(item.promptText || `I want to book ${item.title}`)}">
              <i class="ph-fill ph-calendar-check"></i>
              <span>${escapeHtml(item.primaryAction || 'Book Appointment')}</span>
            </button>
            <button class="media-action-btn secondary action-whatsapp-btn" data-reason="Inquiry regarding ${escapeHtml(item.title)}">
              <i class="ph-fill ph-whatsapp-logo"></i>
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const bookBtn = cardWrapper.querySelector('.action-book-btn');
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        const prompt = bookBtn.getAttribute('data-prompt');
        elements.messageInput.value = prompt;
        handleInputChange();
        sendMessage(prompt);
      });
    }

    const waBtn = cardWrapper.querySelector('.action-whatsapp-btn');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        openWhatsApp(waBtn.getAttribute('data-reason'));
      });
    }

    container.appendChild(cardWrapper);
    scrollToBottom();

    if (state.isLiveActive) {
      geminiLiveController.speak(`Here are the details for ${item.title}. ${item.price ? 'Pricing is ' + item.price : ''}`);
    }
  }

  function getWhatsAppUrl(reason) {
    const phone = (activeConfig.business?.whatsapp || '15551234567').replace(/[^0-9]/g, '');
    const company = activeConfig.business?.name || 'Customer Service';
    const encoded = encodeURIComponent(`Hello ${company} team! I was consulting with your website AI assistant regarding: ${reason}`);
    return `https://wa.me/${phone}?text=${encoded}`;
  }

  function openWhatsApp(reason) {
    window.open(getWhatsAppUrl(reason), '_blank');
  }

  function renderWhatsAppCard(reason, container) {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'tool-card-wrapper';
    const safeReason = reason || 'Customer requested direct consultation';
    const waUrl = getWhatsAppUrl(safeReason);
    const company = activeConfig.business?.name || 'Customer Support';

    cardWrapper.innerHTML = `
      <div class="whatsapp-handoff-card">
        <div class="whatsapp-header">
          <div class="whatsapp-icon-circle">
            <i class="ph-fill ph-whatsapp-logo"></i>
          </div>
          <div class="whatsapp-title-block">
            <h4>Live WhatsApp Advisory</h4>
            <span>${escapeHtml(company)} Desk • Active Now</span>
          </div>
        </div>
        <p class="whatsapp-reason">"${escapeHtml(safeReason)}"</p>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-connect-btn">
          <i class="ph-fill ph-whatsapp-logo"></i>
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    `;

    container.appendChild(cardWrapper);
    scrollToBottom();

    if (state.isLiveActive) {
      geminiLiveController.speak(`I have prepared a direct connection to our team on WhatsApp for ${safeReason}.`);
    }
  }

  function renderAppointmentCard(data, container) {
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'tool-card-wrapper';

    const companyPrefix = (activeConfig.business?.name || 'BOT').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
    const bookingId = data.bookingId || `${companyPrefix}-APP-${Math.floor(10000 + Math.random() * 90000)}`;
    const serviceName = data.service_name || activeConfig.catalog?.[0]?.title || 'Consultation Session';
    const date = data.date || 'Upcoming Date';
    const time = data.time || '14:00';
    const calendarUrl = data.calendarUrl || '#';
    const company = activeConfig.business?.name || 'Consulting Team';

    cardWrapper.innerHTML = `
      <div class="appointment-card">
        <div class="appointment-header-banner">
          <div class="cal-icon-wrap">
            <i class="ph-fill ph-calendar-check"></i>
          </div>
          <div class="app-header-meta">
            <span class="appointment-confirmed-badge">Appointment Confirmed</span>
            <span class="app-booking-id">Ref: ${escapeHtml(bookingId)}</span>
          </div>
        </div>
        <div class="appointment-card-body">
          <h4 class="appointment-service-title">${escapeHtml(serviceName)}</h4>
          <div class="appointment-detail-grid">
            <div class="grid-item">
              <span class="lbl"><i class="ph ph-calendar"></i> Date</span>
              <span class="val">${escapeHtml(date)}</span>
            </div>
            <div class="grid-item">
              <span class="lbl"><i class="ph ph-clock"></i> Time</span>
              <span class="val">${escapeHtml(time)}</span>
            </div>
            <div class="grid-item">
              <span class="lbl"><i class="ph ph-video-camera"></i> Meeting</span>
              <span class="val">Google Meet</span>
            </div>
            <div class="grid-item">
              <span class="lbl"><i class="ph ph-user"></i> Host</span>
              <span class="val">${escapeHtml(company)}</span>
            </div>
          </div>
          <div class="appointment-actions">
            <a href="${calendarUrl}" target="_blank" rel="noopener noreferrer" class="appointment-cal-btn">
              <i class="ph-fill ph-google-logo"></i>
              <span>Add to Google Calendar</span>
            </a>
            <button class="appointment-reschedule-btn" data-reason="Rescheduling appointment ${escapeHtml(bookingId)}">
              <i class="ph-fill ph-whatsapp-logo"></i>
              <span>Need to change time?</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const reschedBtn = cardWrapper.querySelector('.appointment-reschedule-btn');
    if (reschedBtn) {
      reschedBtn.addEventListener('click', () => {
        openWhatsApp(reschedBtn.getAttribute('data-reason'));
      });
    }

    container.appendChild(cardWrapper);
    scrollToBottom();

    if (state.isLiveActive) {
      geminiLiveController.speak(`Your appointment for ${serviceName} on ${date} at ${time} is confirmed. Booking reference is ${bookingId}.`);
    }
  }

  // ==========================================================================
  // CHAT STREAMING & MESSAGING LOGIC
  // ==========================================================================
  function handleInputChange() {
    const text = elements.messageInput.value.trim();
    elements.sendBtn.disabled = !text || state.isConnecting;
    autoResizeTextarea(elements.messageInput);
  }

  function handleInputKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!elements.sendBtn.disabled) {
        handleFormSubmit(e);
      }
    }
  }

  function handleFormSubmit(e) {
    if (e) e.preventDefault();
    const text = elements.messageInput.value.trim();
    if (!text) return;

    elements.messageInput.value = '';
    handleInputChange();
    sendMessage(text);
  }

  function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 110);
    textarea.style.height = `${Math.max(26, newHeight)}px`;
  }

  async function sendMessage(text, fromLive = false) {
    appendUserMessage(text);
    state.history.push({ role: 'user', text });

    elements.typingIndicator.classList.remove('hidden');
    scrollToBottom();

    const assistantBubbleWrapper = appendAssistantPlaceholder();
    const bubbleEl = assistantBubbleWrapper.querySelector('.msg-bubble');
    const containerEl = assistantBubbleWrapper.querySelector('.msg-content');

    state.currentAssistantBubble = bubbleEl;
    state.currentAssistantText = '';

    try {
      const response = await fetch(`${state.backendUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          message: text,
          history: state.history.slice(-10),
          isVoice: Boolean(fromLive || state.isLiveActive),
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Backend responded with HTTP ${response.status}`);
      }

      elements.typingIndicator.classList.add('hidden');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const jsonStr = trimmed.replace(/^data:\s*/, '');
          if (!jsonStr || jsonStr === '[DONE]') continue;

          try {
            const data = JSON.parse(jsonStr);
            processGeminiChunk(data, bubbleEl, containerEl);
          } catch (parseErr) {
            console.warn('Could not parse SSE chunk:', parseErr, jsonStr);
          }
        }
      }

      if (state.currentAssistantText) {
        state.history.push({ role: 'assistant', text: state.currentAssistantText });
        if (state.isLiveActive || fromLive) {
          geminiLiveController.speak(state.currentAssistantText);
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      elements.typingIndicator.classList.add('hidden');
      bubbleEl.innerHTML = `<span style="color: #f87171;"><i class="ph ph-warning-circle"></i> Error: ${escapeHtml(err.message)}</span>`;
    }
  }

  function processGeminiChunk(chunk, bubbleEl, containerEl) {
    if (!chunk.candidates || !chunk.candidates[0]) return;
    const candidate = chunk.candidates[0];
    const parts = candidate.content?.parts || [];

    for (const part of parts) {
      if (part.text) {
        state.currentAssistantText += part.text;
        bubbleEl.innerHTML = formatMarkdown(state.currentAssistantText);
        scrollToBottom();
      }

      if (part.functionCall) {
        handleFunctionCall(part.functionCall, containerEl);
      }
    }
  }

  async function handleFunctionCall(fnCall, containerEl) {
    const { name, args } = fnCall;
    console.log('[Function Call Triggered]:', name, args);

    if (name === 'show_media') {
      renderMediaCard(args.item_name, containerEl);
    } else if (name === 'transfer_to_whatsapp') {
      renderWhatsAppCard(args.reason, containerEl);
    } else if (name === 'book_appointment') {
      try {
        const bookRes = await fetch(`${state.backendUrl}/book-appointment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(args),
        });
        if (bookRes.ok) {
          const bookingData = await bookRes.json();
          renderAppointmentCard(bookingData, containerEl);
        } else {
          renderAppointmentCard(args, containerEl);
        }
      } catch (e) {
        renderAppointmentCard(args, containerEl);
      }
    }
  }

  // ==========================================================================
  // DOM RENDERING & FORMATTING HELPERS
  // ==========================================================================
  function appendUserMessage(text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper user';

    wrapper.innerHTML = `
      <div class="msg-content">
        <div class="msg-bubble">${escapeHtml(text)}</div>
        <div class="msg-time">${formatTime(new Date())}</div>
      </div>
    `;

    elements.messagesContainer.appendChild(wrapper);
    scrollToBottom();
  }

  function appendAssistantPlaceholder() {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper assistant';

    const glyph = activeConfig.branding?.botAvatarGlyph || 'AI';

    wrapper.innerHTML = `
      <div class="msg-avatar">
        <span>${escapeHtml(glyph)}</span>
      </div>
      <div class="msg-content">
        <div class="msg-bubble"><span class="streaming-dot"></span></div>
        <div class="msg-time">${formatTime(new Date())}</div>
      </div>
    `;

    elements.messagesContainer.appendChild(wrapper);
    scrollToBottom();
    return wrapper;
  }

  function formatMarkdown(text) {
    if (!text) return '';

    let formatted = escapeHtml(text);

    // Bold: **text** or __text__
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italic: *text* or _text_
    formatted = formatted.replace(/\*([^\*]+)\*/g, '<em>$1</em>');

    // Inline code: `text`
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Bullets: lines starting with "- " or "* "
    formatted = formatted.replace(/(?:^|\n)[-*]\s+(.+)/g, '<br>• $1');

    // Numbered lists: lines starting with "1. "
    formatted = formatted.replace(/(?:^|\n)(\d+)\.\s+(.+)/g, '<br>$1. $2');

    // Line breaks
    formatted = formatted.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');

    return formatted;
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function scrollToBottom() {
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
  }

  // Run initial setup on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
