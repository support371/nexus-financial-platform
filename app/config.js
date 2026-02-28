(function initAppConfig(global) {
  const existing = global.__APP_CONFIG__ || {};
  global.__APP_CONFIG__ = {
    NEXT_PUBLIC_API_BASE_URL: existing.NEXT_PUBLIC_API_BASE_URL || '',
    APP_API_BASE_URL: existing.APP_API_BASE_URL || '',
  };
})(window);
