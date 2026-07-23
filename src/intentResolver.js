function resolveIntent(utterance) {
  const text = (utterance || '').toLowerCase();

  if (text.includes('ただいま')) {
    return {
      trigger: 'ただいま',
      action: 'turn_on_living_room_light'
    };
  }

  if (text.includes('いってきます')) {
    return {
      trigger: 'いってきます',
      action: 'turn_off_living_room_light'
    };
  }

  return {
    trigger: 'unknown',
    action: 'no_op'
  };
}

module.exports = { resolveIntent };
