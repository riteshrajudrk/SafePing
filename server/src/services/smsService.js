const twilio = require('twilio');
const env = require('../config/env');

let client = null;

const hasValidTwilioConfig =
  typeof env.twilioSid === 'string' &&
  env.twilioSid.startsWith('AC') &&
  Boolean(env.twilioAuthToken) &&
  Boolean(env.twilioPhone);

if (hasValidTwilioConfig) {
  client = twilio(env.twilioSid, env.twilioAuthToken);
}

async function sendSms({ to, body }) {
  if (!client) {
    return {
      deliveryStatus: 'simulated',
      providerResponse: {
        sid: 'simulated-message',
        error: 'Twilio credentials are missing or invalid.',
      },
    };
  }

  try {
    const response = await client.messages.create({
      to,
      from: env.twilioPhone,
      body,
    });

    return {
      deliveryStatus: 'sent',
      providerResponse: {
        sid: response.sid,
      },
    };
  } catch (error) {
    return {
      deliveryStatus: 'failed',
      providerResponse: {
        error: error.message,
      },
    };
  }
}

module.exports = { sendSms };
