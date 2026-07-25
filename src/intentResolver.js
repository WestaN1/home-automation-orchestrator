function resolveIntent(utterance) {
  const text = (utterance || '').toLowerCase();

  if (text.includes('ただいま')) {
    return {
      trigger: 'ただいま',
      action: 'run_arrival_routine'
    };
  }

  if (text.includes('いってきます')) {
    return {
      trigger: 'いってきます',
      action: 'run_departure_routine'
    };
  }

  return {
    trigger: 'unknown',
    action: 'no_op'
  };
}

module.exports = { resolveIntent };
