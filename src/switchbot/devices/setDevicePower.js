const { requestSwitchBot } = require('../switchbotClient')

const DEFAULT_DEVICE_ID = process.env.INFRARED_CEILING_LIGHT_ID // シーリングライト

async function setDevicePower({ 
    deviceId = DEFAULT_DEVICE_ID,
    power = '',
    token = process.env.SWITCHBOT_TOKEN, 
    secret = process.env.SWITCHBOT_SECRET 
} = {}) {
  if (!deviceId) {
    throw new Error('deviceId is required');
  }
  
  if(!['on', 'off'].includes(power)) {
    throw new Error(
      'power must be either "on" or "off"'
    )
  }

  const command = power === 'on' ? 'turnOn' : 'turnOff'
  const path = '/v1.1/devices/' + deviceId + '/commands';
  return requestSwitchBot({
    path,
    method: 'POST',
    body: {
      command,
      parameter: 'default',
      commandType: 'command'
    },
    token,
    secret
  });
}

if (require.main === module) {
    (async () => {
        try {
            const result = await setDevicePower({deviceId: process.env.TV_PLUG_ID, power: 'on'});
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { setDevicePower };
