const Discord = require('discord.js');
const client = new Discord.Client();

// For token, read README.md
// Grabs Token from config.js.
const config = require('./config');
const functions = require('./functions');

// This token is used to log in RacTrack, do not change it unless you know what your doing.
const token = config.token;

// Server Identifier
//      Eg: ;ping
//      @user pong
const ident = config.ident;

// If token is missing, close the program
if(config.token === "")
{
    console.log("No token, please get token to run.");
    process.exit();
}

// Logs in RacTrack bot
client.login(token);

// When Bot is ready
client.on('ready', () => 
{
    console.log('Logged in as: ' + client.user.tag + "\nBot Ready!");
});

// Each time someone sends a message, the bot will scan it
client.on('message', msg =>
{

    // Function that returns an array in order to declare functions
    // depending on what the discord bot needs to do.
    // Returning array: [0] = command, [1] = argument.
    var message = functions.split_message(msg);
    var username = msg.author.username;

    // If it finds the term we wanted to search for:
    if(message[0] === ";search")
    {
        console.log("\nSearch Command Found: " + message[1] + "\nSent by: " + username);
        msg.reply("Searching for: " + message[1]);
        // ACTUALLY SEARCH SOMETHING
    }
    // Testing
    else if(message[0] === ";thanks")
    {
        msg.reply("No probs fam");
    }

    else if(message[0] === ";help")
    {
        console.log("Helping: ", + username);
        msg.reply("No.");
    }

    // Current test statement
    else if(msg.content === ident + 'ping')
    {
        console.log("\nPinged by: " + username);
        msg.reply('pong');
    }

    // Prints out something just horrible. 
    // Don't include this in the final code...
    else if(msg.content === ident + 'penis')
    {
        var length = (Math.random() * 10) + 1;
        // console.log("Someone got a small thingy: " + length);
        var message = "8";
        console.log(username + " has a " + length + " penis");
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

// Destroys client for Bot Logout
process.on('exit', () =>
{
    client.destroy();
});

// Destroys client on [CTRL-C] / kill commands
process.on('SIGINT', () =>
{
    client.destroy();
});