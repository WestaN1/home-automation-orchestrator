const crypto = require('node:crypto');

function getSignature({ token, secret, timestamp, nonce }) {
  const message = `${token}${timestamp}${nonce}`;
  return crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('base64')
    .toUpperCase();
}

function getUnixTimeString() {
  return Date.now().toString();
}

function makeNonce() {
  return crypto.randomUUID();
}

module.exports = {
  getSignature,
  getUnixTimeString,
  makeNonce
};