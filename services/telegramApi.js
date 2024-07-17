const axios = require('axios');
const { TG_BOT_TOKEN, TG_CHAT_ID } = require('../envConfigs');

const instance = axios.create({
  baseURL: `https://api.telegram.org/bot${TG_BOT_TOKEN}`,
});

const sendMessageTg = async (message) => {
  const { data } = await instance.post('/sendMessage', {
    chat_id: TG_CHAT_ID,
    parse_mode: 'html',
    text: message,
  });

  return data;
};

module.exports = {
  sendMessageTg,
};
