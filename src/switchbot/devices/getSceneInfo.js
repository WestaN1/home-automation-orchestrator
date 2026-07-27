const { requestSwitchBot } = require('../switchbotClient');

async function getSceneInfo({
	token = process.env.SWITCHBOT_TOKEN,
	secret = process.env.SWITCHBOT_SECRET
} = {}) {

	const data = await requestSwitchBot({
		path: '/v1.1/scenes',
		method: 'GET',
		token,
		secret
	});

	return {
		data
	};
}

if (require.main === module) {
	(async () => {
		try {
			const result = await getSceneInfo();
			console.log(JSON.stringify(result, null, 2));
		} catch (error) {
			console.error(error.message);
			process.exitCode = 1;
		}
	})();
}

module.exports = { getSceneInfo };
