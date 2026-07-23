const test = require('node:test');
const assert = require('node:assert/strict');
const { handler } = require('../src/handler');

test('returns turn_on action for ただいま', async () => {
  const response = await handler({ body: JSON.stringify({ utterance: 'ただいま' }) });
  assert.equal(response.statusCode, 200);
  const body = JSON.parse(response.body);
  assert.equal(body.intent.action, 'turn_on_living_room_light');
  assert.equal(body.result.executed, true);
});

test('returns turn_off action for いってきます', async () => {
  const response = await handler({ body: JSON.stringify({ utterance: 'いってきます' }) });
  assert.equal(response.statusCode, 200);
  const body = JSON.parse(response.body);
  assert.equal(body.intent.action, 'turn_off_living_room_light');
  assert.equal(body.result.executed, true);
});


