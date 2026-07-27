const { requestSwitchBot } = require('../switchbotClient')

const DEFAULT_FAN_ID = process.env.INFRARED_FAN_ID
const DEFAULT_FAN_SPEED_VALUE = 1

async function changeFanSpeed({ 
    fanId = DEFAULT_FAN_ID,
    fanSpeedValue = DEFAULT_FAN_SPEED_VALUE,
    token = process.env.SWITCHBOT_TOKEN, 
    secret = process.env.SWITCHBOT_SECRET 
} = {}) {
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

  const path = '/v1.1/devices/' + fanId + '/commands';
  return requestSwitchBot({
    path,
    method: 'POST',
    body: {
      command: fanSpeed,
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
            const result = await changeFanSpeed({fanSpeedValue:1});
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { changeFanSpeed };
