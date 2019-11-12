/*
File:		message_handler.js
Type:		methods
Comments:	Handles messages that the users post.
*/

// Variables && imported files
const config = require("./config");			// Imports Global Config
const functions = require('./functions');	// Imports Functions File
const client = require('./index');			// Gets client
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

	/*
		The following if statements do the following:
			1. msg.channel.startTyping()		This will start the bot typing indicator
			2. await functions.human_delay() 	will wait for a random time interval
			3. msg.channel.stopTyping()			This will stop the bot typing indicator
		These are used to get the bot to appear to be typing a response. You dont have to use these for
		other if statements, but feel free to do so
	*/

	// Main search function
	// This is where you want to put in the actual youtube / service search
	// Use get_data.js to host the additional functions
	if(message[0] === ident + "search")
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
			console.log("\nSearching for: " + message[1] + "\nSearched By: " + username);
			msg.reply(
				"\n`Playing:` " + message[1]
				+ "\nhttps://www.youtube.com\n"
				+ "> Duration:\t 0:00:00\n> :thumbsdown:: \t 0\n> :thumbsup:: \t 0\n"
				);
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

	// Bot will freak out
	else if(msg.content === ident + 'freakout')
	{
		msg.channel.startTyping();
		await functions.human_delay();
		msg.channel.send("OH GOD NO PLEASE NO GOD NO!");

		await functions.human_delay();
		msg.channel.send("FUCK FUCK FUCK FUCK");

		await functions.human_delay();
		msg.channel.send("WHY DOES EVERYTHING SUCK?")
		msg.channel.stopTyping();
	}
}

module.exports = methods;			// Exports functions for global usage
