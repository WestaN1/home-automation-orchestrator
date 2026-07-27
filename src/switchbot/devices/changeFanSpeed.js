const { 
    getSignature, 
    getUnixTimeString, 
    makeNonce
} = require('../switchbotUtil')

const DEFAULT_FAN_ID = process.env.INFRARED_FAN_ID
const DEFAULT_FAN_SPEED_VALUE = 1

async function changeFanSpeed({ 
    fanId = DEFAULT_FAN_ID,
    fanSpeedValue = DEFAULT_FAN_SPEED_VALUE,
    token = process.env.SWITCHBOT_TOKEN, 
    secret = process.env.SWITCHBOT_SECRET 
} = {}) {
  if (!token || !secret) {
    throw new Error('SWITCHBOT_TOKEN and SWITCHBOT_SECRET are required');
  }

  let fanSpeed = ''
  switch(fanSpeedValue) { 
    case 1: 
      fanSpeed = 'lowSpeed'
      break
    case 2:
      fanSpeed = 'middleSpeed'
      break
    case 3: 
      fanSpeed = 'highSpeed'
      break
    default:
      throw new Error('fanSpeedValue must be in the range of 1 to 3')

  }

  const nonce = makeNonce();
  const timestamp = getUnixTimeString();
  const path = '/v1.1/devices/' + fanId + '/commands';
  const sign = getSignature({ token, secret, timestamp, nonce });
  const payload = JSON.stringify({
    command: fanSpeed, 
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
            const result = await changeFanSpeed({fanSpeedValue:1});
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { changeFanSpeed };
