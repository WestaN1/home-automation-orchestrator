const { executePowerBasedScene } = require('./executePowerBasedScene')
const { getPowerValue } = require('./isDevicePowerAboveThreshold')


async function executeAction(intent) {
  const action = intent?.action || 'no_op';

  //各デバイスの電圧などの状態取得



  if (action === 'no_op') {
    return { executed: false, reason: 'no matching trigger' };
  }

  if (action === 'run_arrival_routine') { // ただいま
    
    return { executed: true }
  }
  
  if (action === 'run_departure_routine') {// いってきます
    
    return { executed: true }
  }

}

module.exports = { executeAction };
