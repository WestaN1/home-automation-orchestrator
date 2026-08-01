const { requestSwitchBot } = require('../switchbotClient')

const DEFAULT_STRIP_LIGHT_ID = process.env.STRIP_LIGHT_ID

async function setStripLightColor({ 
    stripLightId = DEFAULT_STRIP_LIGHT_ID,
    color = {r:255, g:255, b:255},
    token = process.env.SWITCHBOT_TOKEN, 
    secret = process.env.SWITCHBOT_SECRET 
} = {}) {
  if (!stripLightId) {
    throw new Error('stripLightId is required');
}

  const {r, g, b} = color;
  const colorValues = [r, g, b];
  

  const isColorValueInRange = 
    colorValues.every(value => 
      Number.isInteger(value) &&
      value >= 0 && value <= 255
    )
  
  if(!isColorValueInRange) {
    throw new Error(
      'each value of "color" must be in range between 0 to 255'
    )
  }

  const path = '/v1.1/devices/' + stripLightId + '/commands';
  
  const colorParameter = `${r}:${g}:${b}`

  return requestSwitchBot({
    path,
    method: 'POST',
    body: {
      command: 'setColor',
      parameter: colorParameter,
      commandType: 'command'
    },
    token,
    secret
  });


}

if (require.main === module) {
    (async () => {
        try {
            const result = await setStripLightColor({
                stripLightId: process.env.STRIP_LIGHT_ID, 
                color: {r: 0, g: 255, b:0}
            });
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { setStripLightColor };
