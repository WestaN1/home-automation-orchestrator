const {
  getSignature,
  getUnixTimeString,
  makeNonce
} = require('./switchbotUtil');

const SWITCHBOT_API_BASE_URL = 'https://api.switch-bot.com';

async function requestSwitchBot({
  path,
  method = 'GET',
  body,
  token = process.env.SWITCHBOT_TOKEN,
  secret = process.env.SWITCHBOT_SECRET,
  fetchImpl = fetch
}) {
  if (!path || !path.startsWith('/')) {
    throw new Error('path must start with "/"');
  }

  if (!token || !secret) {
    throw new Error('SWITCHBOT_TOKEN and SWITCHBOT_SECRET are required');
  }

  const nonce = makeNonce();
  const timestamp = getUnixTimeString();
  const sign = getSignature({ token, secret, timestamp, nonce });
  const headers = {
    Authorization: token,
    sign,
    t: timestamp,
    nonce
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetchImpl(`${SWITCHBOT_API_BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `SwitchBot API request failed: ${response.status} ${errorBody}`
    );
  }

  return response.json();
}

module.exports = { requestSwitchBot };
