/*
File:		message_handler.js
Type:		methods
Comments:	Handles messages that the users post.
*/

// Variables && imported files
const Discord = require('discord.js');				// Discord API (For Embeds and other things)
const config = require("./config");					// Imports Global Config
const functions = require('./functions');			// Imports Functions File
const voice = require('./voice');					// Voice COnnection)
const client = require('./RacTrack');				// Gets client
const data = require('./get_data');					// Imports Searching Functions
const ident = config.ident;							// Imports global server command identifer
const help = config.help;							// Imports help text
const methods = {};									// Sets global methods for export (check below for export)
var options = { tts: config.tts }
const footer = 'RacTrack - 2019, Version ' + config.version.id + config.version.type;
const rac_url = 'https://github.com/GlennCottam/RacTrack';

methods.message = async function(msg)
{
	// Function that returns an array in order to declare functions
	// depending on what the discord bot needs to do.
	// Returning array: [0] = command, [1] = argument.

	/*
	*	Seperating invoker, from command, from set of arguments
	*	Going from a 2 value array to a 3 value array:
	?	array[2] = ["trigger / invoker", "command", "query / arguments"]
	*/

	var message = functions.split_message(msg);
	var channel = msg.channel;
	var username = msg.author.username;
	

	/*
	*	The following if statements do the following:
	*		1. msg.channel.startTyping()		This will start the bot typing indicator
	*		2. await functions.human_delay() 	will wait for a random time interval
	*		3. msg.channel.stopTyping()			This will stop the bot typing indicator
	*	These are used to get the bot to appear to be typing a response. You don't have to use these for
	*	other if statements, but feel free to do so
	*/

	// Main search function
	// This is where you want to put in the actual YouTube / service search
	// Use get_data.js to host the additional functions
	if(message[0] === ident)
	{
		if(message[1] === "search")
		{
			msg.channel.startTyping();
			await functions.human_delay();
	
			// If search is empty, post error
			if(message[2] === "" || message[2] === " ")
			{
				msg.reply("\n:no_entry_sign: Please tell me what to search for!");
			}
			else
			{
				functions.log("Searching for: \"" + message[2] + "\" | From: \"" + username + "\"");
				var response = await data.search_youtube(message[2]);
				search_response(response.kind, response, msg);
			}
	
			msg.channel.stopTyping();
		}

		// Starts Playback
		if(message[1] === "racplay")
		{
			channel.startTyping();

			var response = await data.search_youtube(message[2]);
			search_response(response.kind, response, msg);

			if(response.kind === 'video')
			{
				// Connet To voice and Playback
				voice.connect(client.client, msg, response);
			}
			else
			{
				msg.reply("Not a valid video, please try searching for a video on YouTube.");
			}

			channel.stopTyping();
		}


		// Stops Playback
		if(message[1] === "stop")
		{
			var voiceChannel = msg.member.voiceChannel;
			if(!voiceChannel)
			{
				msg.reply("Please join a voice channel to enable voice commands!");
			}
			else
			{
				voiceChannel.leave();
			}
		}

		// Sends list of commands
		if(message[1] === "help")
		{
			var embed = new Discord.RichEmbed();

			embed
			.setColor('#0000FF')
			.setTitle('RacTrack Information')
			.setDescription('**Global Identifier:\t' + ident + '**')
			.setURL(rac_url)
			.addField('Current Commands', help)
			.addField('Version ID', config.version.id + " - " + config.version.type)
			.addField('Current Changes List', config.version.diff)
			.setFooter(footer);
			
			
			msg.channel.startTyping();
			await functions.human_delay();
			var version = config.version;
			// msg.channel.send("**Current Version:** \t \`\`\`" + version.id + " - " + version.type + "\`\`\`\n" + help, options);
			msg.channel.send(embed);
			msg.channel.stopTyping();
			functions.log("Help requested by: \"" + username + "\" | Version: \"" + version.id + version.type + "\"");
		}


		// Status of the Bot
		// if(message[1] === "status")
		// {
		// 	var status = functions.set_status(message[2]);

		// 	if(status === null)
		// 	{
		// 		msg.reply("Status doesn't exist...");
		// 	}
		// 	else
		// 	{
		// 		client.client.user.setStatus(status.status);
		// 		client.client.user.setActivity(status.text);
		// 		msg.reply("Status Changed!");
		// 		functions.log("Status Changed: \"" + status.text + "\" | From : \"" + username + "\"");
		// 	}
		// }


		// Replies with Uptime
		if(message[1] === "uptime")
		{
			msg.channel.startTyping();
			await functions.human_delay();
			var uptime = functions.ms_convert(client.client.uptime);
			var embed = new Discord.RichEmbed();

			embed.setColor('#FFFF00')
				.setTitle('RacTrack Bot Uptime')
				.setURL(rac_url);

			if(uptime.years > 0)
			{
				embed.addField('Years', uptime.years, true);
			}
			if(uptime.months > 0)
			{
				embed.addField('Months', uptime.months, true);
			}
			if(uptime.days > 0)
			{
				embed.addField('Days', uptime.days, true);
			}
			if(uptime.hours > 0)
			{
				embed.addField('Hours', uptime.hours, true);
			}
			if(uptime.mins > 0)
			{
				embed.addField('Minutes', uptime.mins, true);
			}

			embed.addField('Seconds', uptime.sec, true);
			embed.setFooter(footer);
			
			msg.channel.send(embed);

			// msg.reply("Uptime is `" + uptime + "s`", options);
			msg.channel.stopTyping();
			functions.log("Requested Uptime: \"" + JSON.stringify(uptime) + "s\" | From: \"" + username + "\"");
		}

		// Prints Version Information (similar to help)
		if(message[1] === "version")
		{
			var embed = new Discord.RichEmbed();

			embed.setColor('#00FF00')
			.setTitle('Version of RacTrack')
			.setURL(rac_url)
			.addField('Version ID', config.version.id + " - " + config.version.type)
			.addField('Current Changes List', config.version.diff)
			.setFooter(footer);

			msg.channel.startTyping();
			await functions.human_delay();
			var version = config.version;
			// msg.channel.send("**Current Version:** \t \`\`\`" + version.id + " - " +  version.type + "\`\`\`\nVersion Information:\n```diff\n" + version.diff + "\n```", options);
			msg.channel.send(embed);
			msg.channel.stopTyping();
			functions.log("Version requested by: \"" + username + "\" | Version: \"" + version.id + version.type + "\"");
		}


		// Thank the bot
		if(message[1] === "thanks")
		{
			msg.channel.startTyping();
			await functions.human_delay();
			msg.reply("No probs fam", options);
			msg.channel.stopTyping();
			functions.log("Thanked by: \"" + username + "\"");
		}

		// Current test statement
		if(message[1] === "ping")
		{
			msg.channel.startTyping();
			await functions.human_delay();
			msg.reply('pong', options);
			msg.channel.stopTyping();
			functions.log("Pinged by: \"" + username + "\"");
		}

		// Method for testing additional functions
		if(message[1] === "penis")
		{
			msg.channel.startTyping();
			await functions.human_delay();
			message = functions.get_YouTube_Buddy();		// Grabs "YouTube Buddy" from functions
			msg.reply(message, options); 							// Replies with YouTube Buddy
			msg.channel.stopTyping();
			functions.log("YouTube Buddy Sent to : \"" + username + "\"");
		}

		// Bot will freak out
		if(message[1] === "freakout")
		{
			msg.channel.startTyping();
			await functions.human_delay();
			msg.channel.send("OH GOD NO PLEASE NO GOD NO!", options);

			await functions.human_delay();
			msg.channel.send("FUCK FUCK FUCK FUCK", options);

			await functions.human_delay();
			msg.channel.send("WHY DOES EVERYTHING SUCK?", options)
			msg.channel.stopTyping();
			functions.log("Freaking out! Requested by: \"" + username + "\"");
		}

		if(message[1] === "meatballman")
		{
			functions.log("Sending The Meat Ball...");
			msg.channel.startTyping();
			await functions.human_delay();
			msg.channel.send("", {files: ["images/meat-ball-man.png"]});
			msg.channel.stopTyping();
		}
	}	
}

function search_response(type, data, message)
{
	var embed = new Discord.RichEmbed();
	
	if(type === null)
	{
		functions.log.error("Response is null, something went wrong.");
	}

	else if(type === 'channel')
	{
		embed.setColor('#FF0000')
		.setTitle(data.title)
		.setDescription(data.desc)
		.addField('Link', data.url)
		.setURL(data.url)
		.setThumbnail(data.thumb)
		.setFooter(footer);

		message.channel.send(embed);
	}
	else if(type === 'video')
	{
		message.reply(
			"\n**" + data.title + "**\n"
			+ "> *" + data.desc + "*\n"
			+ "> " + data.url  + "\n"
			, options);
	}
	else
	{
		message.reply(":no_entry: No results for search query. Please search something else.");
	}

	functions.log("Search requested by: \"" + message.author.username + "\" | Content Found! Type: \"" + type + "\" | Title: \"" + data.title + "\"");
}

module.exports = methods;			// Exports functions for global usage
