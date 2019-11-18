/*
File:		message_handler.js
Type:		methods
Comments:	Handles messages that the users post.
*/

// Variables && imported files
const config = require("./config");				// Imports Global Config
const functions = require('./functions');		// Imports Functions File
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
			functions.log("Searching for: \"" + message[1] + "\" | From: \"" + username + "\"");

			await data.search_youtube(message[1]);
			var response = data.response;

			console.log("Search Finished");

			if(response === null)
			{
				console.log(term.error + "Response is null, something is wrong!");
			}
			else
			{
				console.log(JSON.stringify(response));
				// msg.reply(
				// 	"\n**Playing:** \`" + response.title + "\`\n"
				// 	+ "**Link:** " + response.url  + "\n"
				// 	+ "**Duration**: " + response.duration  + "s\n"
				// 	+ "```diff\n"
				// 	+ "+ Likes " + response.likes  + "\n"
				// 	+ "- Dislikes " + response.dislikes + "\n"
				// 	+ "```"
				// 	, options);
			}

			// console.log(config.terminal.info + "Response: " + response.title);

			
		}
		msg.channel.stopTyping();
	}

	if(message[0] === ident + "status")
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
	if(message[0] === ident + "uptime")
	{
		msg.channel.startTyping();
		await functions.human_delay();
		var uptime = client.client.uptime;
		msg.reply("Uptime is `" + uptime + "s`", options);
		msg.channel.stopTyping();
		functions.log("Requested Uptime: \"" + uptime + "s\" | From: \"" + username + "\"");
	}

	if(message[0] === ident + "version")
	{
		msg.channel.startTyping();
		await functions.human_delay();
		var version = config.version;
		msg.channel.send("**Current Version:** \t \`\`\`" + version.id + " - " +  version.type + "\`\`\`\nVersion Information:\n```diff\n" + version.diff + "\n```", options);
		msg.channel.stopTyping();
		functions.log("Version requested by: \"" + username + "\" | Version: \"" + version.id + version.type + "\"");
	}

	// Thank the bot
	else if(message[0] === ident + "thanks")
	{
		msg.channel.startTyping();
		await functions.human_delay();
		msg.reply("No probs fam", options);
		msg.channel.stopTyping();
		functions.log("Thanked by: \"" + username + "\"");
	}

	// Sends list of commands
	else if(message[0] === ident + "help")
	{
		msg.channel.startTyping();
		await functions.human_delay();
		var version = config.version;
		msg.channel.send("**Current Version:** \t \`\`\`" + version.id + " - " + version.type + "\`\`\`\n" + help, options);
		msg.channel.stopTyping();
		functions.log("Help requested by: \"" + username + "\" | Version: \"" + version.id + version.type + "\"");
	}

	// Current test statement
	else if(msg.content === ident + 'ping')
	{
		msg.channel.startTyping();
		await functions.human_delay();
		msg.reply('pong', options);
		msg.channel.stopTyping();
		functions.log("Pinged by: \"" + username + "\"");
	}

	// Method for testing additional functions
	else if(msg.content === ident + 'penis')
	{
		msg.channel.startTyping();
		await functions.human_delay();
		message = functions.get_YouTube_Buddy();		// Grabs "YouTube Buddy" from functions
		msg.reply(message, options); 							// Replies with YouTube Buddy
		msg.channel.stopTyping();
		functions.log("YouTube Buddy Sent to : \"" + username + "\"");
	}

	// Bot will freak out
	else if(msg.content === ident + 'freakout')
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

	else if(msg.content === ident + 'meatballman')
	{
		functions.log("Sending The Meat Ball...");
		msg.channel.startTyping();
		await functions.human_delay();
		msg.channel.send("", {files: ["images/meat-ball-man.png"]});
		msg.channel.stopTyping();
	}
}

module.exports = methods;			// Exports functions for global usage
