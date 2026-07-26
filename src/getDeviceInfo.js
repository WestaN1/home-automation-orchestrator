const crypto = require('node:crypto');
const { getSignature, getUnixTimeString, makeNonce} = require('./switchbotUtil')

async function getDeviceInfo({ token = process.env.SWITCHBOT_TOKEN, secret = process.env.SWITCHBOT_SECRET } = {}) {
  if (!token || !secret) {
    throw new Error('SWITCHBOT_TOKEN and SWITCHBOT_SECRET are required');
  }

  const nonce = makeNonce();
  const timestamp = getUnixTimeString();
  const path = '/v1.1/devices';
  const sign = getSignature({ token, secret, timestamp, nonce });

  const response = await fetch(`https://api.switch-bot.com${path}`, {
    method: 'GET',
    headers: {
      Authorization: token,
      sign,
      t: timestamp,
      nonce
    }
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`SwitchBot API request failed: ${response.status} ${errorBody}`);
  }

  return response.json();
}

if (require.main === module) {
    (async () => {
        try {
            const result = await getDeviceInfo();
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { getDeviceInfo };