/*
File:		message_handler.js
Type:		methods
Comments:	Handles messages that the users post.
*/

// Variables && imported files
const config = require("./config");			// Imports Global Config
const functions = require('./functions');	// Imports Functions File
const ident = config.ident;					// Imports global server command identifer
const help = config.help;					// Imports help text
const methods = {};							// Sets global methods for export (check below for export)

methods.message = async function(msg)
{
	// Function that returns an array in order to declare functions
	// depending on what the discord bot needs to do.
	// Returning array: [0] = command, [1] = argument.
	var message = functions.split_message(msg);
	var username = msg.author.username;

	// If it finds the term we wanted to search for:
	if(message[0] === ident + "search")
	{
		msg.channel.startTyping();
		await functions.human_delay();

		if(message[1] === "" || message[1] === " ")
		{
			msg.reply("\n:no_entry_sign: Please tell me what to search for!");
		}
		else
		{
			console.log("\nSearching for: " + message[1] + "\nSearched By: " + username);
			msg.reply(
				"\n`Playing:` " + message[1]
				+ "\nhttps://www.youtube.com\n"
				+ "> Duration:\t 0:00:00\n> :thumbsdown:: \t 0\n> :thumbsup:: \t 0\n"
				);
			// ACTUALLY SEARCH SOMETHING
		}
		msg.channel.stopTyping();
	}

	// Replies with Uptime
	if(message[0] === ident + "uptime")
	{
		msg.channel.startTyping();
		await functions.human_delay();
		var uptime = client.uptime;
		console.log("Requested Uptime: " + uptime);
		msg.reply("Uptime is `" + uptime + "s`");
		msg.channel.stopTyping();
	}

	// Thank the bot
	else if(message[0] === ident + "thanks")
	{
		msg.channel.startTyping();
		await functions.human_delay();
		msg.reply("No probs fam");
		msg.channel.stopTyping();
	}

	// Sends list of commands
	else if(message[0] === ident + "help")
	{
		msg.channel.startTyping();
		await functions.human_delay();
		console.log("Sending Help To: ", + msg.channel.name);
		msg.channel.send(help);
		msg.channel.stopTyping();
	}

	// Current test statement
	else if(msg.content === ident + 'ping')
	{
		msg.channel.startTyping();
		await functions.human_delay();
		console.log("\nPinged by: " + username);
		msg.reply('pong');
		msg.channel.stopTyping();
	}

	// Method for testing additional functions
	else if(msg.content === ident + 'penis')
	{
		msg.channel.startTyping();
		await functions.human_delay();
		message = functions.get_YouTube_Buddy();		// Grabs "YouTube Buddy" from functions
		msg.reply(message); 							// Replies with YouTube Buddy
		msg.channel.stopTyping();
	}
}

module.exports = methods;			// Exports functions for global usage
