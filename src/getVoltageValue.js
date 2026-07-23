const { getSignature, getUnixTimeString, makeNonce } = require('./switchbotUtil');

const DEFAULT_DEVICE_ID = '3C8427AFD7AA';
const SWITCHBOT_API_BASE_URL = 'https://api.switch-bot.com';

async function getVoltageValue({
	deviceId = DEFAULT_DEVICE_ID,
	token = process.env.SWITCHBOT_TOKEN,
	secret = process.env.SWITCHBOT_SECRET
} = {}) {
	if (!deviceId) {
		throw new Error('deviceId is required');
	}

	if (!token || !secret) {
		throw new Error('SWITCHBOT_TOKEN and SWITCHBOT_SECRET are required');
	}

	const nonce = makeNonce();
	const timestamp = getUnixTimeString();
	const path = `/v1.1/devices/${deviceId}/status`;
	const sign = getSignature({ token, secret, timestamp, nonce });

	const response = await fetch(`${SWITCHBOT_API_BASE_URL}${path}`, {
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
		// deviceId,
		// voltage: data?.body?.voltage,
		// currentPower: data?.body?.power,
		weight: data?.body?.weight
	};
}

if (require.main === module) {
	(async () => {
		try {
			const result = await getVoltageValue();
			console.log(JSON.stringify(result, null, 2));
		} catch (error) {
			console.error(error.message);
			process.exitCode = 1;
		}
	})();
}

module.exports = { getVoltageValue };
