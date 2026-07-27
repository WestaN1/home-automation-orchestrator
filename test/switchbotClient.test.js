const test = require('node:test');
const assert = require('node:assert/strict');
const { requestSwitchBot } = require('../src/switchbot/switchbotClient');

test('sends an authenticated JSON request', async () => {
  let request;
  const fetchImpl = async (url, options) => {
    request = { url, options };
    return {
      ok: true,
      json: async () => ({ statusCode: 100 })
    };
  };

  const result = await requestSwitchBot({
    path: '/v1.1/devices/device-id/commands',
    method: 'POST',
    body: {
      command: 'turnOff',
      parameter: 'default',
      commandType: 'command'
    },
    token: 'test-token',
    secret: 'test-secret',
    fetchImpl
  });

  assert.equal(
    request.url,
    'https://api.switch-bot.com/v1.1/devices/device-id/commands'
  );
  assert.equal(request.options.method, 'POST');
  assert.equal(request.options.headers.Authorization, 'test-token');
  assert.equal(request.options.headers['Content-Type'], 'application/json');
  assert.ok(request.options.headers.sign);
  assert.ok(request.options.headers.t);
  assert.ok(request.options.headers.nonce);
  assert.deepEqual(JSON.parse(request.options.body), {
    command: 'turnOff',
    parameter: 'default',
    commandType: 'command'
  });
  assert.deepEqual(result, { statusCode: 100 });
});

test('throws an error containing the API response', async () => {
  const fetchImpl = async () => ({
    ok: false,
    status: 401,
    text: async () => 'Unauthorized'
  });

  await assert.rejects(
    requestSwitchBot({
      path: '/v1.1/devices',
      token: 'test-token',
      secret: 'test-secret',
      fetchImpl
    }),
    /SwitchBot API request failed: 401 Unauthorized/
  );
});
