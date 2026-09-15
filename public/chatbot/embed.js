/**
 * Universal Embed Script for AICE Services AI Text + Voice Assistant
 * 
 * Usage on ANY client website or embedded directly into HTML/React:
 * <script src="/chatbot/embed.js" data-backend="https://aice-voice-bot-backend.aiceservices.workers.dev"></script>
 */

(function () {
  'use strict';

  // Prevent multiple initializations
  if (window.__AICE_BOT_EMBED_LOADED__) return;
  window.__AICE_BOT_EMBED_LOADED__ = true;

  // Locate the current script tag to read data attributes
  const currentScript = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('embed.js') !== -1) {
        return scripts[i];
      }
    }
    return scripts[scripts.length - 1];
  })();

  const scriptSrc = currentScript ? currentScript.src : '';
  let scriptBaseUrl = '';
  if (scriptSrc) {
    scriptBaseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
  } else {
    scriptBaseUrl = '/chatbot';
  }

  // Support local dev backend overrides or configured worker backend
  const backendUrl = (currentScript && currentScript.getAttribute('data-backend')) || 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:8787' 
      : 'https://aice-voice-bot-backend.aiceservices.workers.dev');

  try {
    localStorage.setItem('BOT_BACKEND_URL', backendUrl);
  } catch (_) {}

  // Inject Keyframe Animations & Styles
  const styleTag = document.createElement('style');
  styleTag.id = 'aice-assistant-styles';
  styleTag.textContent = `
    @keyframes aicePulseRing {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.25); opacity: 0; }
      100% { transform: scale(0.95); opacity: 0; }
    }
    @keyframes aiceFloatBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    #ai-assistant-launcher-btn:hover .aice-tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateX(-10px);
    }
    @media (max-width: 768px) {
      #ai-assistant-frame {
        width: 100vw !important;
        height: 100vh !important;
        height: 100dvh !important;
        max-width: 100vw !important;
        max-height: 100vh !important;
        max-height: 100dvh !important;
        top: 0 !important;
        left: 0 !important;
        bottom: 0 !important;
        right: 0 !important;
        border-radius: 0 !important;
      }
      #ai-assistant-embed-container.chat-open,
      body.aice-assistant-open #ai-assistant-embed-container {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    }
  `;
  document.head.appendChild(styleTag);

  // Container Elements
  const container = document.createElement('div');
  container.id = 'ai-assistant-embed-container';
  container.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 999999;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  // Pulse Ring
  const pulseRing = document.createElement('div');
  pulseRing.style.cssText = `
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(6, 182, 212, 0) 70%);
    animation: aicePulseRing 2.8s infinite ease-out;
    pointer-events: none;
    z-index: -1;
  `;

  // Tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'aice-tooltip';
  tooltip.textContent = 'Chat with AICE Assistant';
  tooltip.style.cssText = `
    position: absolute;
    right: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: #0f172a;
    color: #f8fafc;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    padding: 7px 14px;
    border-radius: 9999px;
    border: 1px solid rgba(16, 185, 129, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
    pointer-events: none;
  `;

  // Launcher Button
  const launcher = document.createElement('button');
  launcher.id = 'ai-assistant-launcher-btn';
  launcher.setAttribute('aria-label', 'Open AI Assistant');
  launcher.style.cssText = `
    position: relative;
    width: 62px;
    height: 62px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.45), 0 4px 12px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
    outline: none;
  `;

  const chatIconHtml = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.1 21.4a1 1 0 0 0 1.25 1.25l4.4-1.238A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.57 0-3.044-.436-4.307-1.192a1 1 0 0 0-.74-.118l-3.033.853.853-3.033a1 1 0 0 0-.118-.74A7.957 7.957 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>
  `;

  const closeIconHtml = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;

  launcher.innerHTML = chatIconHtml;
  launcher.appendChild(pulseRing);
  launcher.appendChild(tooltip);

  launcher.onmouseenter = () => {
    launcher.style.transform = 'scale(1.08) translateY(-2px)';
  };
  launcher.onmouseleave = () => {
    launcher.style.transform = 'scale(1) translateY(0)';
  };

  // Chat Window Frame (with microphone permission enabled)
  const frame = document.createElement('iframe');
  frame.id = 'ai-assistant-frame';
  frame.src = `${scriptBaseUrl}/index.html?backend=${encodeURIComponent(backendUrl)}&embedded=true&v=${Date.now()}`;
  frame.setAttribute('allow', 'microphone; camera; clipboard-write; autoplay');
  frame.setAttribute('title', 'AICE AI Text and Voice Assistant');
  frame.style.cssText = `
    position: fixed;
    bottom: 96px;
    right: 24px;
    width: 420px;
    height: 650px;
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 120px);
    border: none;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 35px rgba(16, 185, 129, 0.25);
    display: none;
    opacity: 0;
    transform: translateY(16px) scale(0.97);
    z-index: 999998;
    background: transparent;
    transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  let isOpen = false;

  function toggleChat(forceState) {
    isOpen = typeof forceState === 'boolean' ? forceState : !isOpen;
    if (isOpen) {
      container.classList.add('chat-open');
      document.body.classList.add('aice-assistant-open');
      frame.style.display = 'block';
      // Force repaint before adding opacity for smooth transition
      requestAnimationFrame(() => {
        frame.style.opacity = '1';
        frame.style.transform = 'translateY(0) scale(1)';
      });
      launcher.innerHTML = closeIconHtml;
      pulseRing.style.display = 'none';
      tooltip.style.display = 'none';
    } else {
      container.classList.remove('chat-open');
      document.body.classList.remove('aice-assistant-open');
      frame.style.opacity = '0';
      frame.style.transform = 'translateY(16px) scale(0.97)';
      setTimeout(() => {
        if (!isOpen) frame.style.display = 'none';
      }, 250);
      launcher.innerHTML = chatIconHtml;
      launcher.appendChild(pulseRing);
      launcher.appendChild(tooltip);
      pulseRing.style.display = 'block';
      tooltip.style.display = '';
    }
  }

  launcher.addEventListener('click', () => toggleChat());

  // Listen for close commands from within the iframe
  window.addEventListener('message', (event) => {
    if (event.data && (event.data.type === 'AICE_ASSISTANT_CLOSE' || event.data.type === 'CLOSE_ASSISTANT')) {
      toggleChat(false);
    }
  });

  // Global helper methods for external button triggers (e.g. CTA buttons on site)
  window.openAICEAssistant = function () {
    toggleChat(true);
  };
  window.closeAICEAssistant = function () {
    toggleChat(false);
  };
  window.toggleAICEAssistant = function () {
    toggleChat();
  };
  window.newAICEAssistantChat = function () {
    toggleChat(true);
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage({ type: 'AICE_ASSISTANT_NEW_CHAT' }, '*');
    }
  };

  // Mount to DOM
  container.appendChild(launcher);
  document.body.appendChild(container);
  document.body.appendChild(frame);
})();
