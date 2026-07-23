const { 
    getSignature, 
    getUnixTimeString, 
    makeNonce
} = require('./switchbotUtil')

const DEFAULT_SCENE_ID = "e58a3284-b929-47c4-b244-868a49c36e85"

async function executeScene({ 
    token = process.env.SWITCHBOT_TOKEN, 
    secret = process.env.SWITCHBOT_SECRET 
} = {}) {
  if (!token || !secret) {
    throw new Error('SWITCHBOT_TOKEN and SWITCHBOT_SECRET are required');
  }

  const nonce = makeNonce();
  const timestamp = getUnixTimeString();
  const path = '/v1.1/scenes/' + DEFAULT_SCENE_ID + '/execute';
  const sign = getSignature({ token, secret, timestamp, nonce });

  const response = await fetch(`https://api.switch-bot.com${path}`, {
    method: 'POST',
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
            const result = await executeScene();
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { executeScene };