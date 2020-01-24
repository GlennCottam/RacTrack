const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};
const log = require('./logs');

var methods = {};

methods.connect = async function(client, message, response)
{
	const broadcast = client.createVoiceBroadcast();
	
	if(!message.member.voiceChannel)
	{
		message.reply(":no_entry: You are not in a channel! Please join one! :no_entry:");
		log.log("User was not in a channel.");
	}
	else
	{
		const voiceChannel = message.member.voiceChannel;
		voiceChannel.leave();
		broadcast.destroy();

		voiceChannel.join().then(connection =>
		{
			var stream = ytdl(response.url, { filter: 'audioonly' });
			broadcast.playStream(stream, streamOptions);
			var dispatcher = connection.playBroadcast(broadcast);
		}).catch(console.error);
	}
}

module.exports = methods;
