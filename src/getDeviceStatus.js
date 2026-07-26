/* 
デバイスの詳細な情報を取り出すプログラム。
これで取り出せるのはSwitchbotのデバイスの情報のみであり、赤外線を登録したリモコンなどは
対象外なので注意
*/

const crypto = require('node:crypto');
const { getSignature, getUnixTimeString, makeNonce} = require('./switchbotUtil')

const DEFAULT_DEVICE_ID = "EB2A2AEB947B"

async function getDeviceStatus({ 
  deviceId = DEFAULT_DEVICE_ID,
  token = process.env.SWITCHBOT_TOKEN, 
  secret = process.env.SWITCHBOT_SECRET } = {}) {
  if (!token || !secret) {
    throw new Error('SWITCHBOT_TOKEN and SWITCHBOT_SECRET are required');
  }

  const nonce = makeNonce();
  const timestamp = getUnixTimeString();
  const path = '/v1.1/devices/' + deviceId + '/status';
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
            const result = await getDeviceStatus();
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}


module.exports = { getDeviceStatus };

