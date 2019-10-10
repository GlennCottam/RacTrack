const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config');				// Grabs Config File
const functions = require('./functions');		// Grabs Functions File
const token = config.token;						// Sets Token

// Server Identifier
//      Eg: ;ping
//      @user pong
const ident = config.ident;


const help = config.help;										// Help Message
const channel = client.channels.find('name', config.channel); 	// Gets channel for bot


// If token is missing, close the program
if(config.token === "")
{
	console.log("No token, please get token to run.");
	process.exit(1);
}

// Logs in RacTrack bot
client.login(token);

// When Bot is ready
client.on('ready', () => 
{
	console.log('Logged in as: ' + client.user.tag + "\nBot Ready!");
	
});

// Each time someone sends a message, the bot will scan it
// This is where we will be putting our main functions for searching etc...
// If functions are long and complex, add them to the "functions.js" file.
client.on('message', msg =>
{
	// Function that returns an array in order to declare functions
	// depending on what the discord bot needs to do.
	// Returning array: [0] = command, [1] = argument.
	var message = functions.split_message(msg);     // Splits message
	var username = msg.author.username;             // Gets username of user that posted the message

	// If it finds the term we wanted to search for:
	if(message[0] === ident + "search")
	{
		console.log("\nSearch Command Found: " + message[1] + "\nSent by: " + username);
		msg.reply("Searching for: " + message[1]);
		// ACTUALLY SEARCH SOMETHING
	}
	// Testing
	else if(message[0] === ident + "thanks")
	{
		msg.reply("No probs fam");
	}

	// Sends list of 
	else if(message[0] === ident + "help")
	{
		console.log("Helping: ", + username);

		channel.send(help);													// Sends help message
	}

	// Current test statement
	else if(msg.content === ident + 'ping')
	{
		console.log("\nPinged by: " + username);
		msg.reply('pong');
	}

	// Prints out something just horrible. 
	// Don't include this in the final code...
	// This is an example on how to use the functions method
	else if(msg.content === ident + 'penis')
	{
		message = functions.get_YouTube_Buddy();
		msg.reply(message); 
	}
});

// Opens console for the node
var stdin = process.openStdin();

// When inputting "kill" in terminal, it will kill the program softly
stdin.addListener("data", function(data)
{
	if(data.toString().trim() === "kill")
	{
		kill_server();
	}
});

// Destroys Client on kill
process.on('SIGTERM', function() {kill_server();});

// Destroys client on [CTRL-C] / kill commands
process.on('SIGINT', () => {kill_server();});

// Kills server softly:
//      - Logs bot out
//      - Exits Node
function kill_server()
{
	console.log("Logging bot out, killing server.");
	client.destroy();
	process.exit(0);
}