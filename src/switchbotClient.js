async function executeAction(intent) {
  const action = intent?.action || 'no_op';

  if (action === 'no_op') {
    return { executed: false, reason: 'no matching trigger' };
  }

  return {
    executed: true,
    action,
    note: 'This stub simulates the SwitchBot action. Replace with real SwitchBot API calls later.'
  };
}

module.exports = { executeAction };
