require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  MONOBANK_TOKEN: process.env.MONOBANK_TOKEN,
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN,
  TG_CHAT_ID: process.env.TG_CHAT_ID,
  MONOBANK_CALLBACK_URL: process.env.MONOBANK_CALLBACK_URL,
  MONOBANK_RESPONSE_URL: process.env.MONOBANK_RESPONSE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  BACKEND_URL: process.env.BACKEND_URL,
};
