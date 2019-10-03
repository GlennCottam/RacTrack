const Discord = require('discord.js');
const client = new Discord.Client();

// For token, read README.md
// Grabs Token from config.js.
const config = require('./config');
// const functions = require('./functions');

// This token is used to log in RacTrack, do not change it unless you know what your doing.
const token = config.token;

// Server Identifier
//      Eg: ;ping
//      @user pong
const ident = config.ident;

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
    var message = search_message(msg, ";search");
    if(message != 0)
    {
        console.log("Message Value: " + message);
        msg.reply("Searching for: " + message);
        // ACTUALLY SEARCH SOMETHING

    }

    // Current test statement
    if(msg.content === ident + 'ping')
    {
        console.log("Pinged by: " + msg.author);
        msg.reply('pong');
    }
    if(msg.content === ident + 'penis')
    {
        var length = (Math.random() * 10) + 1;
        // console.log("Someone got a small thingy: " + length);
        var message = "8";
        while(length > 0)
        {
            message += "="
            length --;
        }
        message += "D"
        // console.log(message);
        msg.reply(message); 
    }

});

// Logs in RacTrack bot
client.login(token);

function search_message(msg, term)
{
    var full_message = msg.content.split(' ');
    if(full_message[0] === term)
    {
        full_message[0] = null;         // Removes command
        full_message = full_message.join(' ');
        full_message = full_message.substr(1);
        return full_message;
    }
    else
    {
        return 0;
    }
}

// Functions
function remove_command(text)
{
    var arguments;
    arguments = text.split(" ");
    return arguments;
}

process.on('exit', () =>
{
    client.destroy();
});

process.on('SIGINT', () =>
{
    client.destroy();
});