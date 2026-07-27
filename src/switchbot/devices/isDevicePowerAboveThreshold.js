const { requestSwitchBot } = require('../switchbotClient');

const DEFAULT_DEVICE_ID = process.env.TV_PLUG_ID;

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

	const path = `/v1.1/devices/${miniPlugDeviceId}/status`;
	const data = await requestSwitchBot({
		path,
		method: 'GET',
		token,
		secret
	});
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
