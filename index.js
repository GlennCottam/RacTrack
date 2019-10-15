/*
File:		index.js
Type:		node application
Comments:	Index.js is used as a start-point for the discord bot itself.
			It handles the connections, messages, and errors.
*/

const Discord = require('discord.js');			// Grabs Discord.js API
const client = new Discord.Client();			// Creates Discord Client
const config = require('./config');				// Grabs Config File
const functions = require('./functions');		// Grabs Functions File
const handle = require('./message_handler');	// Message Handler
const token = config.token;						// Gets Token
const ident = config.ident;						// Command Identifier EG: ";"
const help = config.help;						// Help Message

// Checks to see if the token is present
if(token === "")
{
	console.log("No token, please get token to run.");
	process.exit(1);
}

client.login(token);		// Logs in RacTrack bot

// When client is ready:
client.on('ready', () => 
{
	console.log('Logged in as: ' + client.user.tag + '\nBot Ready!');	// Indicates that bot is ready
});

// Handles all messages in message_handler.js
client.on('message', msg => handle.message(msg));

// Scans for input on the command line
var stdin = process.openStdin();				// Opens console for the node
stdin.addListener("data", function(data)		// Adds listener to the terminal
{
	if(data.toString().trim() === "kill")
	{
		kill_server();
	}
	handle.message(data.toString().trim());
});

process.on('SIGTERM', function() {kill_server();}); 				// Destroys Client on kill
process.on('SIGINT', () => {console.log("\n"); kill_server();});	// Destroys client on [CTRL-C] / kill commands

// Catches errors and kills server
process.on('uncaughtException', err => 
{
	console.error("Error, Closing Server", err);
	kill_server();
});

// Kills server softly
function kill_server()
{
	console.log("Logging bot out, killing server.");
	client.destroy();		// Destroys Client Connection (logs bot out)
	process.exit(0);		// Kills Node
}
