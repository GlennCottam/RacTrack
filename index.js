const Discord = require('discord.js');
const client = new Discord.Client();

// For token, read README.md
// Grabs Token from config.js.
const config = require('./config');

// This token is used to log in RacTrack, do not change it unless you know what your doing.
const token = config.token;

// Server Identifier
//      Eg: ;ping
//      @user pong
const ident = ";";

if(config.token === "")
{
    console.log("No token, please get token to run.");
}

// When Bot is ready
client.on('ready', () => 
{
    console.log('Logged in as: ' + client.user.tag + "\nBot Ready!");
});

// Each time someone sends a message, the bot will scan it
client.on('message', msg =>
{
    // Current test statement
    if(msg.content === ident + 'ping')
    {
        console.log("Pinged by: " + msg.author);
        msg.reply('pong');
    }
});

// Logs in RacTrack bot
client.login(token);
