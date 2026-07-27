const { 
    getSignature, 
    getUnixTimeString, 
    makeNonce
} = require('../switchbotUtil')

const DEFAULT_DEVICE_ID = process.env.INFRARED_CEILING_LIGHT_ID 

async function setLightPower({ 
    deviceId = DEFAULT_DEVICE_ID,
    power = '',
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
  
    if(!['on', 'off'].includes(power)) {
    throw new Error(
        'power must be either "on" or "off"'
    )
  }

  const command = power === 'on' ? 'turnOn' : 'turnOff'

  const payload = JSON.stringify({
    command, 
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
            const result = await setLightPower({power: 'on'});
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { setLightPower };
