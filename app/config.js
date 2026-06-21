(function initAppConfig(global) {
  const existing = global.__APP_CONFIG__ || {};
  global.__APP_CONFIG__ = {
    NEXT_PUBLIC_API_BASE_URL: existing.NEXT_PUBLIC_API_BASE_URL || '',
    APP_API_BASE_URL: existing.APP_API_BASE_URL || '',
    STATUS_WIDGET_ENABLED: existing.STATUS_WIDGET_ENABLED !== false,
  };

  const script = document.createElement('script');
  script.src = './status.js';
  script.defer = true;
  document.head.appendChild(script);
})(window);
