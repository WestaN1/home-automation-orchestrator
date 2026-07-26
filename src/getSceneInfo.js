const { getSignature, getUnixTimeString, makeNonce } = require('./switchbotUtil');

async function getSceneInfo({
	token = process.env.SWITCHBOT_TOKEN,
	secret = process.env.SWITCHBOT_SECRET
} = {}) {

	if (!token || !secret) {
		throw new Error('SWITCHBOT_TOKEN and SWITCHBOT_SECRET are required');
	}

	const nonce = makeNonce();
	const timestamp = getUnixTimeString();
	const path = 'https://api.switch-bot.com/v1.1/scenes';
	const sign = getSignature({ token, secret, timestamp, nonce });

	const response = await fetch(`${path}`, {
		method: 'GET',
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

	const data = await response.json();

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
