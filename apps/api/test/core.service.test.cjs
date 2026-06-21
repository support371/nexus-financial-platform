const test = require('node:test');
const assert = require('node:assert/strict');

require('reflect-metadata');
const { CoreService } = require('../dist/core.service.js');

test('reports not configured when the core URL is absent', async () => {
  const previousUrl = process.env.FINTECH_CORE_API_URL;
  delete process.env.FINTECH_CORE_API_URL;
  try {
    const status = await new CoreService().getStatus();
    assert.equal(status.state, 'not_configured');
    assert.equal(status.safety.liveMoneyMovementEnabled, false);
    assert.equal(status.safety.writeProxyEnabled, false);
  } finally {
    if (previousUrl === undefined) delete process.env.FINTECH_CORE_API_URL;
    else process.env.FINTECH_CORE_API_URL = previousUrl;
  }
});

test('reports healthy when both read-only core probes succeed', async () => {
  const previousUrl = process.env.FINTECH_CORE_API_URL;
  const previousFetch = global.fetch;
  process.env.FINTECH_CORE_API_URL = 'https://core.example.test';
  global.fetch = async (url) => ({
    ok: true,
    json: async () => String(url).endsWith('/health')
      ? { status: 'healthy' }
      : { service: 'fintech-microservices-core' },
  });

  try {
    const status = await new CoreService().getStatus();
    assert.equal(status.state, 'healthy');
    assert.equal(status.reachable, true);
    assert.equal(status.safety.paymentMode, 'sandbox');
  } finally {
    global.fetch = previousFetch;
    if (previousUrl === undefined) delete process.env.FINTECH_CORE_API_URL;
    else process.env.FINTECH_CORE_API_URL = previousUrl;
  }
});
