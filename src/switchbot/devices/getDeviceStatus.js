/* 
デバイスの詳細な情報を取り出すプログラム。
これで取り出せるのはSwitchbotのデバイスの情報のみであり、赤外線を登録したリモコンなどは
対象外なので注意
*/

const { requestSwitchBot } = require('../switchbotClient')

const DEFAULT_DEVICE_ID = process.env.HUB_ID

async function getDeviceStatus({ 
  deviceId = DEFAULT_DEVICE_ID,
  token = process.env.SWITCHBOT_TOKEN, 
  secret = process.env.SWITCHBOT_SECRET } = {}) {
  const path = '/v1.1/devices/' + deviceId + '/status';
  return requestSwitchBot({
    path,
    method: 'GET',
    token,
    secret
  });
}

if (require.main === module) {
    (async () => {
        try {
            const result = await getDeviceStatus();
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}


module.exports = { getDeviceStatus };

