(function initNexusStatusWidget(global) {
  'use strict';

  const config = global.__APP_CONFIG__ || {};
  if (config.STATUS_WIDGET_ENABLED === false) return;

  const apiBaseUrl = (
    config.NEXT_PUBLIC_API_BASE_URL ||
    config.APP_API_BASE_URL ||
    'http://localhost:7072'
  ).replace(/\/$/, '');

  const states = {
    loading: { label: 'Sandbox core: checking', background: '#334155' },
    healthy: { label: 'Sandbox core: online', background: '#166534' },
    degraded: { label: 'Sandbox core: degraded', background: '#9a3412' },
    not_configured: { label: 'Sandbox core: not connected', background: '#475569' },
  };

  function createWidget() {
    const element = document.createElement('button');
    element.type = 'button';
    element.id = 'nexus-system-status';
    element.setAttribute('aria-live', 'polite');
    element.title = 'Click to refresh the Nexus sandbox system status.';
    Object.assign(element.style, {
      position: 'fixed',
      right: '16px',
      bottom: '16px',
      zIndex: '9999',
      border: '1px solid rgba(255,255,255,.18)',
      borderRadius: '999px',
      padding: '9px 13px',
      color: '#fff',
      font: '600 12px/1.2 system-ui, -apple-system, sans-serif',
      boxShadow: '0 8px 24px rgba(15,23,42,.28)',
      cursor: 'pointer',
    });
    document.body.appendChild(element);
    return element;
  }

  function applyState(element, stateName) {
    const state = states[stateName] || states.degraded;
    element.textContent = state.label;
    element.style.background = state.background;
    element.dataset.state = stateName;
  }

  async function loadStatus(element) {
    applyState(element, 'loading');
    const controller = new AbortController();
    const timeout = global.setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`${apiBaseUrl}/api/system/status`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        cache: 'no-store',
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const payload = await response.json();
      const safeSandboxState =
        payload &&
        payload.safety &&
        payload.safety.liveMoneyMovementEnabled === false &&
        payload.safety.writeProxyEnabled === false;

      if (!safeSandboxState) {
        applyState(element, 'degraded');
        element.title = 'The API did not return the expected sandbox safety declaration.';
        return;
      }

      applyState(element, payload.state);
      element.title = payload.reachable
        ? 'Fintech core is reachable. Financial write proxying remains disabled.'
        : 'Fintech core is unavailable or not configured. Financial write proxying remains disabled.';
    } catch {
      applyState(element, 'degraded');
      element.title = 'Nexus API status could not be reached. Financial write proxying remains disabled.';
    } finally {
      global.clearTimeout(timeout);
    }
  }

  function start() {
    const element = createWidget();
    element.addEventListener('click', () => void loadStatus(element));
    void loadStatus(element);
    global.setInterval(() => void loadStatus(element), 60000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})(window);
