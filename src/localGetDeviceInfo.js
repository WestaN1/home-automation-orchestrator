const { getDeviceInfo } = require('./getDeviceInfo');

(async () => {
  try {
    const result = await getDeviceInfo();
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
})();