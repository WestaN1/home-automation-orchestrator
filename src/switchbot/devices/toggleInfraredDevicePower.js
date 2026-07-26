// TODO: Powerの意味が"ON/OFFの電源"と"プラグの電力"の2つの意味で使われてるので、命名をし直す
const { 
    getSignature, 
    getUnixTimeString, 
    makeNonce
} = require('../switchbotUtil')

const DEFAULT_DEVICE_ID = "02-202405131652-50559538" // サーキュレータ

async function toggleInfraredDevicePower({ 
    deviceId = DEFAULT_DEVICE_ID,
    token = process.env.SWITCHBOT_TOKEN, 
    secret = process.env.SWITCHBOT_SECRET 
} = {}) {
  if (!token || !secret) {
    throw new Error('SWITCHBOT_TOKEN and SWITCHBOT_SECRET are required');
  }

  const nonce = makeNonce();
  const timestamp = getUnixTimeString();
  const path = '/v1.1/devices/' + deviceId + '/commands';
  const sign = getSignature({ token, secret, timestamp, nonce });
  const payload = JSON.stringify({
    command: 'turnOn', // 実際はトグル
    parameter: 'default',
    commandType: 'command'
  });

  const response = await fetch(`https://api.switch-bot.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      sign,
      t: timestamp,
      nonce
    },
    body: payload
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
            const result = await toggleInfraredDevicePower();
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { toggleInfraredDevicePower };