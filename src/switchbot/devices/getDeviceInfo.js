const { requestSwitchBot } = require('../switchbotClient')

async function getDeviceInfo({ token = process.env.SWITCHBOT_TOKEN, secret = process.env.SWITCHBOT_SECRET } = {}) {
  return requestSwitchBot({
    path: '/v1.1/devices',
    method: 'GET',
    token,
    secret
  });
}

if (require.main === module) {
    (async () => {
        try {
            const result = await getDeviceInfo();
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { getDeviceInfo };
