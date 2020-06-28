const https = require("https");
const botToken = "1018958708:AAHttZip6PvRZYqXJes6J0dRfLgbjDQUXW4";
const chatId = "739644839";

module.exports = (address, message) => {

  const body = JSON.stringify({
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown"
  });
  const options = {
    hostname: "api.telegram.org",
    port: 443,
    path: `/bot${botToken}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": body.length
    }
  };
  const req = https.request(options);
  req.on("error", e => {
    console.error(e);
  });
  req.write(body);
  req.end();
}