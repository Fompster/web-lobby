//const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: '0:00'//moment().format('h:mm a')
  };
}

module.exports = formatMessage;