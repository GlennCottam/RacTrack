/*
File:		index.js
Type:		node application
Comments:	Index.js is used as a start-point for the discord bot itself.
			It handles the connections, messages, and errors.
*/

// Variables
const Discord = require('discord.js');			// Grabs Discord.js API
const client = new Discord.Client();			// Creates Discord Client
const config = require('./config');				// Grabs Config File
const term = config.terminal;					// Shortened version for terminal emoji's
const handle = require('./message_handler');	// Message Handler
const token = config.token;						// Gets Token

// Checks to see if the token is present
if(token === "")
{
	console.log(term.error + "No token in config.js file. Please add token.");
	process.exit(0);
}

client.login(token);		// Logs in RacTrack bot

// Prints in console when server is ready
client.on('ready', () => 
{
	console.log(term.success + 'Logged in as: ' + client.user.tag + '\n' + term.success + 'Bot Ready!');	// Indicates that bot is ready
});

client.on('message', msg => handle.message(msg)); // Handles all messages in message_handler.js

// Scans for input on the command line
var stdin = process.openStdin();				// Opens console for the node
stdin.addListener("data", function(data)		// Adds listener to the terminal
{
	if(data.toString().trim() === "kill")
	{
		kill_server();
	}

	// JSON array for listener (so reply will work)
	// This is honestly just for testing
	message = {
		content: data.toString().trim(),
		author:
		{
			username: 'terminal'
		},
		split: function() {return text},
		reply: function (msg) {console.log(term.info + msg)}
	}

	handle.message(message);
	
	// Allows testing to the server, without having to use discord.
	// NOTE: Since this is not a message, replies will be null.
	// handle.message(data.toString().trim());
});

process.on('SIGTERM', function() {kill_server();}); 				// Destroys Client on kill
process.on('SIGINT', () => {console.log("\n"); kill_server();});	// Destroys client on [CTRL-C] / kill commands

// Catches errors and keeps server alive
// This is so when a error is found it will keep the bot alive.
process.on('uncaughtException', err => 
{
	console.error(config.terminal.error + "Error", err);
});

// Kills server softly
function kill_server()
{
	console.log(term.warn + "Killing Bot Softly.");
	client.destroy();		// Destroys Client Connection (logs bot out)
	console.log(term.dead + "Bot Killed.")
	process.exit(0);		// Kills Node
}
