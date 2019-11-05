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

methods.message = function(msg)
{
	// Function that returns an array in order to declare functions
	// depending on what the discord bot needs to do.
	// Returning array: [0] = command, [1] = argument.
	var message = functions.split_message(msg);
	var username = msg.author.username;

	// If it finds the term we wanted to search for:
	if(message[0] === ident + "search")
	{
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
	}

	// Replies with Uptime
	if(message[0] === ident + "uptime")
	{
		var uptime = client.uptime;
		console.log("Requested Uptime: " + uptime);
		msg.reply("Uptime is `" + uptime + "s`");
	}

	// Thank the bot
	else if(message[0] === ident + "thanks")
	{
		msg.reply("No probs fam");
	}

	// Sends list of commands
	else if(message[0] === ident + "help")
	{
		console.log("Sending Help To: ", + msg.channel.name);
		msg.channel.send(help);
	}

	// Current test statement
	else if(msg.content === ident + 'ping')
	{
		console.log("\nPinged by: " + username);
		msg.reply('pong');
	}

	// Method for testing additional functions
	else if(msg.content === ident + 'penis')
	{
		message = functions.get_YouTube_Buddy();		// Grabs "YouTube Buddy" from functions
		msg.reply(message); 							// Replies with YouTube Buddy
	}

}

module.exports = methods;			// Exports functions for global usage
