const { requestSwitchBot } = require('../switchbotClient')

const DEFAULT_SCENE_ID = "e58a3284-b929-47c4-b244-868a49c36e85"

async function executeScene({ 
    sceneId = DEFAULT_SCENE_ID,
    token = process.env.SWITCHBOT_TOKEN, 
    secret = process.env.SWITCHBOT_SECRET 
} = {}) {
  const path = '/v1.1/scenes/' + sceneId + '/execute';
  return requestSwitchBot({
    path,
    method: 'POST',
    token,
    secret
  });
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
