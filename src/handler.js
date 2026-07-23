const { resolveIntent } = require('./intentResolver');
const { executeAction } = require('./switchbotClient');

exports.handler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};
    const utterance =
      body.utterance ||
      body.text ||
      event.utterance ||
      event.text ||
      '';

    if (!utterance) {
      return {
        statusCode: 400,
        body: JSON.stringify({ ok: false, error: 'utterance is required' })
      };
    }

    const intent = resolveIntent(utterance);
    const result = await executeAction(intent);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, utterance, intent, result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: error.message })
    };
  }
};
