const { requestSwitchBot } = require('../switchbotClient')

const DEFAULT_STRIP_LIGHT_ID = process.env.STRIP_LIGHT_ID
async function setStripLightBrightness({ 
    stripLightId = DEFAULT_STRIP_LIGHT_ID,
    brightness = 255,
    token = process.env.SWITCHBOT_TOKEN, 
    secret = process.env.SWITCHBOT_SECRET 
} = {}) {
  if (!stripLightId) {
    throw new Error('stripLightId is required');
  }
  
  if(brightness < 1 || brightness > 100 ) {
    throw new Error(
      'value of "brightness" must be in range between 1 to 100'
    )
  }

  const path = '/v1.1/devices/' + stripLightId + '/commands';
  
  return requestSwitchBot({
    path,
    method: 'POST',
    body: {
      command: "setBrightness",
      parameter: brightness,
      commandType: 'command'
    },
    token,
    secret
  });
}

if (require.main === module) {
    (async () => {
        try {
            const result = await setStripLightBrightness({brightness: 55});
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { setStripLightBrightness };
