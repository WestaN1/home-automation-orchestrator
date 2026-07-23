const { getSignature, getUnixTimeString, makeNonce } = require('./switchbotUtil');


const DEFAULT_DEVICE_ID = '3C8427AFD7AA';
const SWITCHBOT_API_BASE_URL = 'https://api.switch-bot.com';

async function controlCeiling({
    deviceId = DEFAULT_DEVICE_ID,
    token = process.env.SWITCHBOT_TOKEN,
    secret = process.env.SWITCHBOT_SECRET
} = {}) 
{
  const nonce = makeNonce();
  const timestamp = getUnixTimeString();
  const path = '/v1.1/devices' + 'deviceId' + '/commands';
  const sign = getSignature({ token, secret, timestamp, nonce });
  
  const headers = {
    "Authorization": token,
    sign,
    "t": timestamp,
    nonce
  }

  const payload = JSON.stringify(
    "command": 
  )
  const response = await fetch(`https://api.switch-bot.com${path}`, {
    method: 'GET',
    headers: {
      Authorization: token,
      sign,
      t: timestamp,
      nonce
    }
  });
}