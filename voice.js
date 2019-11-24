const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

var methods = {};

methods.connect = function(client, message)
{
	const broadcast = client.createVoiceBroadcast();
	// console.log("Message: " + JSON.stringify(message));
	const voiceChannel = message.member.voiceChannel;
	
	voiceChannel.join().then(connection => 
	{
    	const stream = ytdl('https://www.youtube.com/watch?v=FveF-we6lcE', { filter : 'audioonly' });
    	broadcast.playStream(stream, streamOptions);
    	const dispatcher = connection.playBroadcast(broadcast);
	}).catch(console.error);
}

module.exports = methods;
