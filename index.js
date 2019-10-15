const Discord = require('discord.js');			// Grabs Discord.js API
const client = new Discord.Client();			// Creates Discord Client
const config = require('./config');				// Grabs Config File
const functions = require('./functions');		// Grabs Functions File
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

// When a new message arrives in server
client.on('message', msg =>
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
});

// Scans for input on the command line
var stdin = process.openStdin();				// Opens console for the node
stdin.addListener("data", function(data)		// Adds listener to the terminal
{
	if(data.toString().trim() === "kill")
	{
		kill_server();
	}
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
