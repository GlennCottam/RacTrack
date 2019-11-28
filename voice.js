const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const functions = require('./functions');
const data = require('./get_data');
const streamOptions = {seek: 0, volume: 1};

var methods = {};

methods.connect = async function(client, message)
{
	const broadcast = client.createVoiceBroadcast();
	const voiceChannel = message.member.voiceChannel;

	console.log(voiceChannel);
	if(voiceChannel)
	{
		voiceChannel.leave();
	}

	message.startTyping();

	// Search for YouTube Video
	var split = functions.split_message(message);
	var response = await data.search_youtube(split[1]);

	functions.log("Searching for: \"" + split[1] + "\" | From: \"" + msg.author.username + "\"");

	if(response === null)
	{
		message.reply("Something Didn't Work!");
	}
	else if(response.results === null)
	{
		message.reply("No results found!");
	}
	else if(response.kind === 'channel')
	{
		var embed = new Discord.RichEmbed();
		embed.setColor('#FF0000')
			.setTitle(response.title)
			.setDescription(response.desc)
			.addField('Link', response.url)
			.setURL(response.url)
			.setThumbnail(response.thumb)
			.setFooter('RacTrack - 2019, Version ' + config.version.id + config.version.type);

		msg.channel.send(embed);
	}
	else if(response.kind === 'video')
	{
		msg.reply(
			"\n**" + response.title + "**\n"
			+ "> *" + response.desc + "*\n"
			+ "> " + response.url  + "\n");

		if(!voiceChannel)
		{
			msg.reply("You are not in a channel! Please join one!");
		}
		else
		{
			voiceChannel.join().then(connection =>
			{
				const stream = ytdl(response.url, { filter : 'audioonly' });
				broadcast.playStream(stream, streamOptions);
				const dispatcher = connection.playBroadcast(broadcast);
			}).catch(console.error);
		}
	}
}

module.exports = methods;
