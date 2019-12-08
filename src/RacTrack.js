/*
File:		RacTack.js
Type:		node application
Comments:	Index.js is used as a start-point for the discord bot itself.
			It handles the connections, messages, and errors.
*/

// Variables
const Discord = require('discord.js');			// Grabs Discord.js API
const client = new Discord.Client();			// Creates Discord Client
const ytdl = require('ytdl-core');
const config = require('./config');				// Grabs Config File
const functions = require('./functions');		// Grabs functions
const data = require('./get_data');
const voice = require('./voice');
const term = config.terminal;					// Shortened version for terminal emoji's
const ident = config.ident;						// Default Idenifier
const handle = require('./message_handler');	// Message Handler
const token = require('./tokens').discord_key;	// Gets Token
const streamOptions = {seek: 0, volume: 1};
const broadcast = client.createVoiceBroadcast();
var global_message = null;


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
	var status = functions.get_random_status();
	console.log(term.success + 'Logged in as: ' + client.user.tag + '\n' + term.success + 'Bot Ready!');	// Indicates that bot is ready
	client.user.setStatus(status.status);			// Sets status to Online (green dot)
	client.user.setActivity(status.text);		// Sets "Playing: " status
});

// Handles all messages in message_handler.js
client.on('message', async msg =>
{	
	const channel = msg.channel;
	global_message = msg;

	// Stops the voice connection
	if(msg.content.startsWith(ident + "stop"))
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
	// RacPlay will search and start a audio connection with user in channel
	else if(msg.content.startsWith(ident + "RacPlay"))
	{
		var voiceChannel = msg.member.voiceChannel;
		
		channel.startTyping();
		var split = functions.split_message(msg);
		var response = await data.search_youtube(split[1]);

		functions.log("Searching for: \"" + split[1] + "\" | From: \"" + msg.author.username + "\"");

		if(response === null)
		{
			msg.reply("Something Didn't work!");
		}
		else if(response.results === null)
		{
			msg.reply("No results found!");
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
				+ "> " + response.url  + "\n");

			if(!voiceChannel)
			{
				msg.reply("You are not in a channel! Please join one!");
			}
			else
			{

				voiceChannel.leave();
				broadcast.destroy();

				voiceChannel.join().then(connection =>
				{
					var stream = ytdl(response.url, { filter : 'audioonly' });
					broadcast.playStream(stream, streamOptions);
					var dispatcher = connection.playBroadcast(broadcast);
				}).catch(console.error);
			}
		}
		else
		{
			msg.reply("Unknown Search Result. Please send command to Admin.");
		}
		channel.stopTyping();
	}
	else
	{
		handle.message(msg);
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

	// JSON array for listener (so reply will work)
	// This is honestly just for testing
	message = 
	{
		content: data.toString().trim(),
		author:
		{
			username: 'terminal'
		},
		split: function() {return text},
		reply: function (msg) {console.log(term.out + msg)},
		channel:
		{
			startTyping: function() {console.log(term.type + "typing")},
			stopTyping: function() {console.log(term.type + "not typing")}
		}
	}

	handle.message(message);
	
	// Allows testing to the server, without having to use discord.
	// NOTE: Since this is not a message, replies will be null.
	// handle.message(data.toString().trim());
});

// Sets Random Status after a random time (between 1 to 6 hours)
var time = functions.random_int(1, 4) * 3600000;
console.log(config.terminal.info + "Waiting for " + time/3600000 + "hr(s) to change status");
setInterval(function()
{
	var date = new Date();
	var status = functions.get_random_status();
	// console.log(term.info + "[" + date + "] Status Changed: { status: \"" + status.status + "\" , Playing \"" + status.text + "\"},  Changing in: " + time/3600000 + "hr(s)");
	functions.log("Status Changed: { status: \"" + status.status + "\" , Playing \"" + status.text + "\"},  Changing in: " + time/3600000 + "hr(s)");
	client.user.setStatus(status.status);			// Sets status to Online (green dot)
	client.user.setActivity(status.text);		// Sets "Playing: " status

	time = functions.random_int(1, 4) * 3600000;		// Updates random time value
	// console.log(config.terminal.info + "Now Waiting for " + time/3600000 + "hr(s) to change status");

}, time);

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

module.exports.client = client;
module.exports.message = global_message;
