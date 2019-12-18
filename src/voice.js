const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const functions = require('./functions');
const data = require('./get_data');
const streamOptions = {seek: 0, volume: 1};

var methods = {};

methods.connect = async function(client, message, response)
{
	const broadcast = client.createVoiceBroadcast();
	const voiceChannel = message.member.voiceChannel;

	console.log("voice.js:connect\nVoiceChannel:\t" + voiceChannel);
	
	if(!voiceChannel)
	{
		msg.reply("You are not in a channel! Please join one!");
	}
	else
	{
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
