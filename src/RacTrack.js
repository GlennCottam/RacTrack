/*
File:		RacTack.js
Type:		node application
Comments:	Index.js is used as a start-point for the discord bot itself.
            It handles the connections, messages, and errors.
*/

// Variables
const Discord = require('discord.js');			// Grabs Discord.js API
const client = new Discord.Client();			// Creates Discord Client
module.exports.client = client;
const fs = require('fs');			            // File System to pull config file
var config = JSON.parse(fs.readFileSync('src/data/config.json'));    // Pulls Config Data
module.exports.config = config;                 // Exports Config
var pkg = JSON.parse(fs.readFileSync('package.json'));
module.exports.pkg = pkg;
const functions = require('./functions');		// Grabs functions
const term = config.terminal;					// Shortened version for terminal emoji's
const handle = require('./message_handler');	// Message Handler
const token = require('./tokens').discord_key;	// Gets Token
const yt_key = require('./tokens').youtube_api; // Youtube Key
const log = require('./logs');                  // Code to be used in managing logs


// Checks to see if the token is present
if(token === "")
{
    console.log(term.error + "No token in tokens.js file. Please add token.");
    log.log.error("No token in config.js file. Please add token.");
    process.exit(0);
}
if(yt_key === "")
{
    console.log(term.error + "No Youtube API Token in tokens.js file. Please add token.");
    log.log.error("No Youtube API Token in tokens.js file. Please add token.");
    process.exit(0);
}

client.login(token);		// Logs in RacTrack bot

// Prints in console when server is ready
client.on('ready', async () => 
{
    await log.openLogFile();
    var status = functions.get_random_status();
    start_status_wait();
    // log.log(term.success + 'Logged in as: ' + client.user.tag + '\t' + term.success + 'Bot Ready!');	// Indicates that bot is ready
    client.user.setStatus(status.status);			// Sets status to Online (green dot)
    client.user.setActivity(status.text);		// Sets "Playing: " status
    log.log.success("Logged in as: " + client.user.tag);
    log.log.success("Bot Ready!");
});

// Handles all messages in message_handler.js
client.on('message', async msg =>
{	
    handle.message(msg);
    
});

// Scans for input on the command line
var stdin = process.openStdin();				// Opens console for the node
stdin.addListener("data", function(data)		// Adds listener to the terminal
{
    if(data.toString().trim() === "kill")
    {
        kill_server();
    }

    if(data.toString().trim() === "update")
    {
        update_config();
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

function start_status_wait()
{
    // Sets Random Status after a random time (between 1 to 6 hours)
    var time = functions.random_int(1, 4) * 3600000;
    log.log.info(config.terminal.info + "Waiting for " + time/3600000 + "hr(s) to change status");
    setInterval(function()
    {
        var date = new Date();
        var status = functions.get_random_status();
        // console.log(term.info + "[" + date + "] Status Changed: { status: \"" + status.status + "\" , Playing \"" + status.text + "\"},  Changing in: " + time/3600000 + "hr(s)");
        log.log("Status Changed: { status: \"" + status.status + "\" , Playing \"" + status.text + "\"},  Changing in: " + time/3600000 + "hr(s)");
        client.user.setStatus(status.status);			// Sets status to Online (green dot)
        client.user.setActivity(status.text);		// Sets "Playing: " status

        time = functions.random_int(1, 4) * 3600000;		// Updates random time value
        // console.log(config.terminal.info + "Now Waiting for " + time/3600000 + "hr(s) to change status");

    }, time);
}



process.on('SIGTERM', function() {kill_server();}); 				// Destroys Client on kill
process.on('SIGINT', () => {console.log("\n"); kill_server();});	// Destroys client on [CTRL-C] / kill commands

// Catches errors and keeps server alive
// This is so when a error is found it will keep the bot alive.
process.on('uncaughtException', err => 
{
    console.error(config.terminal.error + "Error", err);
});

function update_config()
{
    config = JSON.parse(fs.readFileSync('src/data/config.json'));
    module.exports.config = config;
    log.log("Config File Updated! Ident: " + config.ident);
}

// Kills server softly
function kill_server()
{
    log.log.warn("Safe Server Shutdown Start");
    // console.log(term.warn + "Killing Bot Softly.");
    client.destroy();		// Destroys Client Connection (logs bot out)
    log.log.dead("Bot Killed.");
    // console.log(term.dead + "Bot Killed.")
    process.exit(0);		// Kills Node
}
