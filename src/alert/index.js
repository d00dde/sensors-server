const telegramMessage = require('./telegramMessage');
const viberMessage = require('./viberMessage');

module.exports = (channels, message) => {
	channels.forEach(({channel, address}) => {
		switch(channel){
			case 'telegram':
				telegramMessage(address, message);
				break;
			case 'viber':
				viberMessage(address, message);
				break;
			default:
				break;
		}
	});
}