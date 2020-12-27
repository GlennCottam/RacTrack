/*******************************************************************************
File:		RacTack.js
Type:		node application
Comments:	Index.js is used as a start-point for the discord bot itself.
            It handles the connections, messages, and errors.
*******************************************************************************/

// Variables
const child_process = require('child_process');
const Discord = require('discord.js');			                                // Grabs Discord.js API
const client = new Discord.Client();			                                // Creates Discord Client
module.exports.client = client;
const fs = require('fs');			                                            // File System to pull config file
var config = JSON.parse(fs.readFileSync('src/data/config.json'));               // Pulls Config Data
module.exports.config = config;                                                 // Exports Config
var pkg = JSON.parse(fs.readFileSync('package.json'));
module.exports.pkg = pkg;
const functions = require('./functions');		                                // Grabs functions
const term = config.terminal;					                                // Shortened version for terminal emoji's
const handle = require('./message_handler');	                                // Message Handler
const token = require('./tokens').discord_key;	                                // Gets Token
const yt_key = require('./tokens').youtube_api;                                 // Youtube API Key
const log = require('./logs');                                                  // Code to be used in managing logs


// Checks to see if the token is present
if(token === "")                                                                // If no token for Discord API exists, log, and kill server.
{
    console.log(term.error + "No token in tokens.js file. Please add token.");
    log.log.error("No token in config.js file. Please add token.");
    process.exit(0);
};
if(yt_key === "")                                                               // If no Youtube API key, log it and kill server.
{
    console.log(
            term.error + 
            "No Youtube API Token in tokens.js file. Please add token."
        );
        
    log.log.error("No Youtube API Token in tokens.js file. Please add token.");
    kill_server();
};

client.login(token);		// Logs in RacTrack bot

// Script to install dependencies for Ubuntu
async function install_deps()
{
    return new Promise(resolve => 
    {
        client.user.setStatus("dnd");
        client.user.setActivity("Start Script", {type: "PLAYING"});
        log.log.info("Installing Dependencies... Please stand by.")
        child_process.execFile('scripts/install-deps-ubuntu.sh', null, null, 
        (err, stdout, stderr)=>
        {
            log.log.h1("Dependency Installer Output:");
            log.log.code(stdout);
            resolve('resolved');
        });
    });
}

// Prints in console when server is ready
client.on('ready', async () => 
{
    await log.openLogFile();
    var status = functions.get_random_status();
    await install_deps();
    log.log.info("Starting status timer");
    start_status_wait();
    client.user.setStatus(status.status);			                            // Sets status
    client.user.setActivity(status.text, {type: status.type});		            // Sets Activity Type
    log.log.success("Logged in as: " + client.user.tag);
    log.log.success("Ready.");
});

// Handles all messages in message_handler.js
client.on('message', async msg =>
{	
    handle.message(msg);
});


/*******************************************************************************
 * Function will allow user to input a few commands directly into the terminal
 * This allows updating and other things on the fly without shutting down 
    the bot.
*******************************************************************************/
var stdin = process.openStdin();			                                	// Opens console for the node
stdin.addListener("data", function(data)		                                // Adds listener to the terminal
{
    if(data.toString().trim() === "kill")                                       // Kills the server.
    {
        kill_server();
    }

    if(data.toString().trim() === "update")                                     // Updates local config so bot doesn't need to go down.
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
    
});

// Sets Random Status after a random time (between 1 to 6 hours)
function start_status_wait()
{
    
    var time = functions.random_int(1, 4) * 3600000;
    log.log.info(
            config.terminal.info + "Waiting for " + time/3600000 + 
            "hr(s) to change status"
        );
        
    log.log.success("Status Interval Ready");
    setInterval(function()
    {
        var date = new Date();                                                  // Gets Current date
        var status = functions.get_random_status();                             // Grabs a random Status from functions
        
        
        log.log(                                                                // Logs status change + time of next change.
            "Status Changed: { status: \"" + status.status + 
            "\" , Playing \"" + status.text + "\"},  Changing in: " + 
            time/3600000 + "hr(s)"
        );
        
        
        
        client.user.setStatus(status.status);			                        // Sets status to Online (green dot)
        client.user.setActivity(status.text, {type: status.type});		        // Sets "Playing: " status

        time = functions.random_int(1, 4) * 3600000;		                    // Updates random time value

    }, time);
}

process.on('SIGTERM', function() {kill_server();}); 				            // Destroys Client on kill
process.on('SIGINT', () => {console.log("\n"); kill_server();});	            // Destroys client on [CTRL-C] / kill commands

/******************************************************************************
Catches errors and keeps server alive
This is so when a error is found it will keep the bot alive.
*******************************************************************************/
process.on('uncaughtException', err => 
{
    console.error(config.terminal.error + "Error", err);
});

/*******************************************************************************
 * Updates Config globally
 * Allows for easy update of configuration
 * Use in-terminal command "update" to use.
*******************************************************************************/
function update_config()
{
    config = JSON.parse(fs.readFileSync('src/data/config.json'));               // Re-reads config file
    module.exports.config = config;                                             // Updates global config
    log.log("Config File Updated! Ident: " + config.ident);
}

/*******************************************************************************
 * Kills server properly
*******************************************************************************/
function kill_server()
{
    log.log.warn("Safe Server Shutdown Start");
    client.destroy();		                                                    // Destroys Client Connection (logs bot out)
    log.log.dead("Bot Killed.");
    process.exit(0);		                                                    // Kills Node
}


/*******************************************************************************
 * 
*******************************************************************************/