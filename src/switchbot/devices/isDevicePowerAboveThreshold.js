const { getSignature, getUnixTimeString, makeNonce } = require('../switchbotUtil');

const DEFAULT_DEVICE_ID = '3C8427AFD7AA';
const SWITCHBOT_API_BASE_URL = 'https://api.switch-bot.com';

async function isDevicePowerAboveThreshold({
	miniPlugDeviceId = DEFAULT_DEVICE_ID,
	threshold = 20
} = {}) {

	const { power } = await getPowerValue({miniPlugDeviceId});
	return ( power >= threshold );
}

async function getPowerValue({
	miniPlugDeviceId = DEFAULT_DEVICE_ID,
	token = process.env.SWITCHBOT_TOKEN,
	secret = process.env.SWITCHBOT_SECRET
} = {}) {
	if (!miniPlugDeviceId) {
		throw new Error('miniPlugDeviceId is required');
	}

	if (!token || !secret) {
		throw new Error('SWITCHBOT_TOKEN and SWITCHBOT_SECRET are required');
	}

	const nonce = makeNonce();
	const timestamp = getUnixTimeString();
	const path = `/v1.1/devices/${miniPlugDeviceId}/status`;
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
	console.log(data?.body?.weight)
	return {
		// miniPlugDeviceId,
		// power: data?.body?.power,
		// currentPower: data?.body?.power,
		power: data?.body?.weight
	};
}

if (require.main === module) {
	(async () => {
		try {
			const result = await isDevicePowerAboveThreshold({threshold: 20});
			console.log(JSON.stringify(result, null, 2));
		} catch (error) {
			console.error(error.message);
			process.exitCode = 1;
		}
	})();
}

module.exports = { isDevicePowerAboveThreshold, getPowerValue };
