const { isDevicePowerAboveThreshold } = require('../../switchbot/devices/isDevicePowerAboveThreshold')


/* 
1．電気をONにする
*/
async function runArrivalRoutine() {
    
    return { executed: true }

}

module.exports = { runArrivalRoutine };