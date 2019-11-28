/*
File:		message_handler.js
Type:		methods
Comments:	Handles messages that the users post.
*/

// Variables && imported files
const Discord = require('discord.js');			// Discord API (For Embeds and other things)
const config = require("./config");				// Imports Global Config
const functions = require('./functions');		// Imports Functions File
const voice = require('./voice');				// Voice COnnection)
const client = require('./RacTrack');			// Gets client
const data = require('./get_data');				// Imports Searching Functions
const term = config.terminal;					// Terminal Icons
const ident = config.ident;						// Imports global server command identifer
const help = config.help;						// Imports help text
const methods = {};								// Sets global methods for export (check below for export)

methods.message = async function(msg)
{
	// Function that returns an array in order to declare functions
	// depending on what the discord bot needs to do.
	// Returning array: [0] = command, [1] = argument.
	var message = functions.split_message(msg);
	var username = msg.author.username;
	var options = 
	{
		tts: config.tts
	}

	/*
		The following if statements do the following:
			1. msg.channel.startTyping()		This will start the bot typing indicator
			2. await functions.human_delay() 	will wait for a random time interval
			3. msg.channel.stopTyping()			This will stop the bot typing indicator
		These are used to get the bot to appear to be typing a response. You don't have to use these for
		other if statements, but feel free to do so
	*/

	// Main search function
	// This is where you want to put in the actual YouTube / service search
	// Use get_data.js to host the additional functions
	if(msg.content.startsWith(ident + "search"))
	{
		msg.channel.startTyping();
		await functions.human_delay();

		// If search is empty, post error
		if(message[1] === "" || message[1] === " ")
		{
			msg.reply("\n:no_entry_sign: Please tell me what to search for!");
		}
		else
		{
			functions.log("Searching for: \"" + message[1] + "\" | From: \"" + username + "\"");

			var response = await data.search_youtube(message[1]);
			
			if(response === null)
			{
				console.log(term.error + "Response is null, something is wrong!");
			}
			else if(response.results === null)
			{
				msg.reply(":no_entry: No Results Found!")
			}
			else if(response.kind === 'channel')
			{
				// Reply for Channel
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
					+ "> " + response.url  + "\n"
					, options);

			}
			else
			{
				msg.reply("Unknown Search Result. Please send command to Admin.");
			}
			
		}
		msg.channel.stopTyping();
	}

	// Sends list of commands
	if(msg.content.startsWith(ident + "help"))
	{
		var embed = new Discord.RichEmbed();

		embed
		.setColor('#0000FF')
		.setTitle('RacTrack Information')
		.addField('Current Commands', help)
		.addField('Version ID', config.version.id + " - " + config.version.type)
		.addField('Current Changes List', config.version.diff);
		
		
		msg.channel.startTyping();
		await functions.human_delay();
		var version = config.version;
		// msg.channel.send("**Current Version:** \t \`\`\`" + version.id + " - " + version.type + "\`\`\`\n" + help, options);
		msg.channel.send(embed);
		msg.channel.stopTyping();
		functions.log("Help requested by: \"" + username + "\" | Version: \"" + version.id + version.type + "\"");
	}

	// Status of the Bot
	if(msg.content.startsWith(ident + "status"))
	{
		var value = message[1];
		var array = value.split(' ');
		var status = functions.set_status(array[0]);

		if(status === null)
		{
			msg.reply("Status doesn't exist...");
		}
		else
		{
			client.client.user.setStatus(status.status);
			client.client.user.setActivity(status.text);
			msg.reply("Status Changed!");
			functions.log("Status Changed: \"" + status.text + "\" | From : \"" + username + "\"");
		}
	}

	// Replies with Uptime
	if(msg.content.startsWith(ident + "uptime"))
	{
		msg.channel.startTyping();
		await functions.human_delay();
		var uptime = client.client.uptime;
		msg.reply("Uptime is `" + uptime + "s`", options);
		msg.channel.stopTyping();
		functions.log("Requested Uptime: \"" + uptime + "s\" | From: \"" + username + "\"");
	}

	if(msg.content.startsWith(ident + "version"))
	{
		var embed = new Discord.RichEmbed();

		embed.setColor('#00FF00')
		.setTitle('Version of RacTrack')
		.addField('Version ID', config.version.id + " - " + config.version.type)
		.addField('Current Changes List', config.version.diff);

		msg.channel.startTyping();
		await functions.human_delay();
		var version = config.version;
		// msg.channel.send("**Current Version:** \t \`\`\`" + version.id + " - " +  version.type + "\`\`\`\nVersion Information:\n```diff\n" + version.diff + "\n```", options);
		msg.channel.send(embed);
		msg.channel.stopTyping();
		functions.log("Version requested by: \"" + username + "\" | Version: \"" + version.id + version.type + "\"");
	}

	// Thank the bot
	if(msg.content.startsWith(ident + "thanks"))
	{
		msg.channel.startTyping();
		await functions.human_delay();
		msg.reply("Any Time!", options);
		msg.channel.stopTyping();
		functions.log("Thanked by: \"" + username + "\"");
	}

	// Sends list of commands
	if(msg.content.startsWith(ident + "status"))
	{
		var embed = new Discord.RichEmbed();

		embed
		.setColor('#0000FF')
		.setTitle('RacTrack Information')
		.addField('Current Commands', help)
		.addField('Version ID', config.version.id + " - " + config.version.type)
		.addField('Current Changes List', config.version.diff);
		
		
		msg.channel.startTyping();
		await functions.human_delay();
		var version = config.version;
		// msg.channel.send("**Current Version:** \t \`\`\`" + version.id + " - " + version.type + "\`\`\`\n" + help, options);
		msg.channel.send(embed);
		msg.channel.stopTyping();
		functions.log("Help requested by: \"" + username + "\" | Version: \"" + version.id + version.type + "\"");
	}

	// Current test statement
	if(msg.content.startsWith(ident + "ping"))
	{
		msg.channel.startTyping();
		await functions.human_delay();
		msg.reply('pong', options);
		msg.channel.stopTyping();
		functions.log("Pinged by: \"" + username + "\"");
	}
}

module.exports = methods;			// Exports functions for global usage
