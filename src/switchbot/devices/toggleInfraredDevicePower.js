// TODO: Powerの意味が"ON/OFFの電源"と"プラグの電力"の2つの意味で使われてるので、命名をし直す
const { requestSwitchBot } = require('../switchbotClient')

const DEFAULT_DEVICE_ID = process.env.INFRARED_FAN_ID // サーキュレータ

async function toggleInfraredDevicePower({ 
    deviceId = DEFAULT_DEVICE_ID,
    token = process.env.SWITCHBOT_TOKEN, 
    secret = process.env.SWITCHBOT_SECRET 
} = {}) {
  const path = '/v1.1/devices/' + deviceId + '/commands';
  return requestSwitchBot({
    path,
    method: 'POST',
    body: {
      command: 'turnOn', // 実際はトグル
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
            const result = await toggleInfraredDevicePower();
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { toggleInfraredDevicePower };
