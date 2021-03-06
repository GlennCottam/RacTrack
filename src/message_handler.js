/*
File:		message_handler.js
Type:		methods
Comments:	Handles messages that the users post.
*/

// Variables && imported files
const Discord = require('discord.js');				// Discord API (For Embeds and other things)
const filesystem = require('fs');					// File System (read write)
const functions = require('./functions');			// Imports Functions File
const voice = require('./voice');					// Voice COnnection)
const client = require('./RacTrack').client;				// Gets client
var config = require('./RacTrack').config;		    // Gets Config
var pkg = require('./RacTrack').pkg;
const Data = require('./get_data');					// Imports Searching Functions
const logs = require('./logs');                      // Logs
const ident = config.ident;							// Imports global server command identifer
const help = config.help;							// Imports help text
const methods = {};									// Sets global methods for export (check below for export)
var options = { tts: config.tts }
const footer = 'RacTrack - 2019, Version ' + pkg.version;
const rac_url = 'https://github.com/GlennCottam/RacTrack';

methods.message = async function(msg)
{
    // Function that returns an array in order to declare functions
    // depending on what the discord bot needs to do.
    // Returning array: [0] = command, [1] = argument.
    
    
    // Log Messages (ONLY FOR DEV USE)
    // console.log(msg);
    
    /*
    *	The following if statements do the following:
    *		1. msg.channel.startTyping()		This will start the bot typing indicator
    *		2. await functions.human_delay() 	will wait for a random time interval
    *		3. msg.channel.stopTyping()			This will stop the bot typing indicator
    *	These are used to get the bot to appear to be typing a response. You don't have to use these for
    *	other if statements, but feel free to do so
    */

    if(msg.content.includes("--delete"))
    {
        logs.log("User Requested Deletion of Message: " + msg.author.username);
        msg.content = msg.content.replace("--delete", "");
        msg.delete();
    }
    
    /*
    *	Seperating invoker, from command, from set of arguments
    *	Going from a 2 value array to a 3 value array:
    ?	array[2] = ["trigger / invoker", "command", "query / arguments"]
    */

    var message = functions.split_message(msg);
    var channel = msg.channel;
    var username = msg.author.username;


    // New method to handle private messages.
    // Idea is to notice when the bot is reciving a private message and not rely on the use of the ident in the config file.
    
    if(msg.channel.type == "dm")
    {
        // console.log("Found Message from DM Channel");
        if(msg.author.username + "#" + msg.author.discriminator != "RacTrack#4467") // TODO: Need to somehow get this identifier for ractrack into this side of the code.
        {
            // TODO: Looks like we gon have to split the message somehow again, as when it does though DM channel, it keeps the remainder into message[2] rather than message[1].
            
            // console.log("The bot recieved a private message!");
            // Switches array to push everything up by one to handle messages.
            message[2] = message[1];
            message[1] = message[0];
            // Handle Messages regardless
            handle_message();
        }
        
    }
    else if(message[0] === ident)
    {
        // Handle Messages with Ident
        handle_message();
    }
    
    // Function to handle all messages as long as they pass the required if statements.
    // Main search function
    // This is where you want to put in the actual YouTube / service search
    // Use get_data.js to host the additional functions
    async function handle_message()
    {
        if(message[1] === "search")
        {
            msg.channel.startTyping();
            await functions.human_delay();
    
            // If search is empty, post error
            if(message[2] === "" || message[2] === " ")
            {
                var embed = new Discord.RichEmbed();

                embed
                .setColor('#FF0000')
                .setTitle('Invalid Search Query')
                .addField('Error: ', ":no_entry_sign: Invalid Entry, Please tell RacTrack what to search for!")
                .setFooter(footer);
                msg.channel.send(embed);

                // msg.reply("\n:no_entry_sign: Please tell me what to search for!");
            }
            else
            {
                var response = await Data.search_youtube(message[2]);
                search_response(response.kind, response, msg);
            }
    
            msg.channel.stopTyping();
        }

        // Starts Playback
        else if(message[1] === "racplay")
        {
            channel.startTyping();

            var response = await Data.search_youtube(message[2]);
            search_response(response.kind, response, msg);

            if(response.kind === 'video')
            {
                // Connet To voice and Playback
                voice.connect(client, msg, response);
            }
            else
            {
                msg.channel.send(":no_entry_sign: Not a valid video, please try searching for a video on YouTube.");
            }

            channel.stopTyping();
        }


        // Stops Playback
        else if(message[1] === "stop")
        {
            if(!msg.member)
            {
                msg.channel.send(":no_entry_sign: Please join a voice channel to enable voice commands!");
            }
            else
            {
                msg.member.voiceChannel.leave();
            }
        }

        // Sends list of commands
        else if(message[1] === "help")
        {
            var embed = new Discord.RichEmbed();

            embed
            .setColor('#0000FF')
            .setTitle('RacTrack Information')
            .setDescription('**Global Identifier:\t' + ident + '**')
            .setURL(rac_url)
            .addField('Current Commands', help)
            .addField('Version ID', pkg.version)
            .addField('Current Changes List', config.version.diff)
            .setFooter(footer);
            
            
            msg.channel.startTyping();
            await functions.human_delay();
            var version = config.version;
            // msg.channel.send("**Current Version:** \t \`\`\`" + version.id + " - " + version.type + "\`\`\`\n" + help, options);
            msg.channel.send(embed);
            msg.channel.stopTyping();
            logs.log("Help requested by: \"" + username + "\" | Version: \"" + version.id + version.type + "\"");
        }

        // Replies with Uptime
        else if(message[1] === "uptime")
        {
            msg.channel.startTyping();
            await functions.human_delay();
            var uptime = functions.ms_convert(client.uptime);
            var embed = new Discord.RichEmbed();

            embed.setColor('#FFFF00')
                .setTitle('RacTrack Bot Uptime')
                .setURL(rac_url);

            if(uptime.years > 0)
            {
                embed.addField('Years', uptime.years, true);
            }
            if(uptime.months > 0)
            {
                embed.addField('Months', uptime.months, true);
            }
            if(uptime.days > 0)
            {
                embed.addField('Days', uptime.days, true);
            }
            if(uptime.hours > 0)
            {
                embed.addField('Hours', uptime.hours, true);
            }
            if(uptime.mins > 0)
            {
                embed.addField('Minutes', uptime.mins, true);
            }

            embed.addField('Seconds', uptime.sec, true);
            embed.setFooter(footer);
            
            msg.channel.send(embed);

            // msg.reply("Uptime is `" + uptime + "s`", options);
            msg.channel.stopTyping();
            logs.log("Requested Uptime: \"" + JSON.stringify(uptime) + "s\" | From: \"" + username + "\"");
        }

        // Prints Version Information (similar to help)
        else if(message[1] === "version")
        {
            var embed = new Discord.RichEmbed();

            embed.setColor('#00FF00')
            .setTitle('Version of RacTrack')
            .setURL(rac_url)
            .addField('Version ID', pkg.version)
            .addField('Current Changes List', config.version.diff)
            .setFooter(footer);

            msg.channel.startTyping();
            await functions.human_delay();
            var version = config.version;
            // msg.channel.send("**Current Version:** \t \`\`\`" + version.id + " - " +  version.type + "\`\`\`\nVersion Information:\n```diff\n" + version.diff + "\n```", options);
            msg.channel.send(embed);
            msg.channel.stopTyping();
            logs.log("Version requested by: \"" + username + "\" | Version: \"" + version.id + version.type + "\"");
        }


        // Thank the bot
        else if(message[1] === "thanks")
        {
            msg.channel.startTyping();
            await functions.human_delay();
            msg.channel.send("No probs fam", options);
            msg.channel.stopTyping();
            logs.log("Thanked by: \"" + username + "\"");
        }

        // Current test statement
        else if(message[1] === "ping")
        {
            msg.channel.startTyping();
            await functions.human_delay();
            msg.channel.send('pong', options);
            msg.channel.stopTyping();
            logs.log("Pinged by: \"" + username + "\"");
        }

        else if (message[1] === "text")
        {
            msg.channel.startTyping();
            await functions.human_delay();
            var text = await functions.get_text(message[2]);

            if(text)
            {
                msg.channel.send("```yaml\n" + text + "\n```");
            }
            else
            {
                msg.channel.send("Please Enter Some Text:\n> " + ident + " text `text`");
            }
            
            msg.channel.stopTyping();
            logs.log("Text Requested By: " + username + "Text: {'" + message[2] + "'}");
        }

        else if(message[1] === "mock")
        {
            msg.channel.startTyping();
            await functions.human_delay();

            if(message[2])     // Gets Random Caps from Input
            {
                var data = functions.random_caps(message[2]);
                msg.channel.send(data);
            }
            else                // Gets Random Caps from last message in channel
            {
                channel.fetchMessages({ limit: 2}).then(messages => 
                {
                    let lastMessage = messages.last();
                    var data = functions.random_caps(lastMessage.content);
                    msg.channel.send(data);
                });
            }

            msg.channel.stopTyping();
            logs.log("Mocked: " + username + "\tText: " + message[2]);
        }
        
        /*
        !    ░█▀█░█▀▀░█▀▀░█░█
        !    ░█░█░▀▀█░█▀▀░█▄█
        !    ░▀░▀░▀▀▀░▀░░░▀░▀
        */
        // Method for testing additional functions
        else if(message[1] === "penis")
        {
            msg.channel.startTyping();
            await functions.human_delay();
            message = functions.get_YouTube_Buddy();		// Grabs "YouTube Buddy" from functions
            msg.channel.send(message, options); 							// Replies with YouTube Buddy
            msg.channel.stopTyping();
            logs.log("YouTube Buddy Sent to : \"" + username + "\"");
        }

        /*
        !    ░█▀█░█▀▀░█▀▀░█░█
        !    ░█░█░▀▀█░█▀▀░█▄█
        !    ░▀░▀░▀▀▀░▀░░░▀░▀
        */
        // Bot will freak out
        else if(message[1] === "freakout")
        {
            msg.channel.startTyping();
            await functions.human_delay();
            msg.channel.send("OH GOD NO PLEASE NO GOD NO!", options);

            await functions.human_delay();
            msg.channel.send("FUCK FUCK FUCK FUCK", options);

            await functions.human_delay();
            msg.channel.send("WHY DOES EVERYTHING SUCK?", options)
            msg.channel.stopTyping();
            logs.log("Freaking out! Requested by: \"" + username + "\"");
        }

        else if(message[1] === "meatballman")
        {
            logs.log("Sending The Meat Ball...");
            msg.channel.startTyping();
            await functions.human_delay();
            msg.channel.send("", {files: ["images/meat-ball-man.png"]});
            msg.channel.stopTyping();
        }

        // Prints out random copypasta stored in server
        else if(message[1] === "copypasta")
        {
            var data = JSON.parse(filesystem.readFileSync('src/data/copypasta.json'));
            if(!data)
            {
                msg.channel.send("Something really fucked up...");
            }
            else
            {
                channel.startTyping();
                await functions.human_delay();

                var total = Object.keys(data.posts).length;
                var value = functions.random_int(0, total);
                var data = data.posts[value];

                msg.channel.send("**" + data.title + "**\n\n" + data.content + "\n\n > " + data.url);
                channel.stopTyping();

                logs.log("Sending Copy Pasta: \"" + value + "\" To \"" + msg.author.username + "\"");

            }
        }

        /*
        !    ░█▀█░█▀▀░█▀▀░█░█
        !    ░█░█░▀▀█░█▀▀░█▄█
        !    ░▀░▀░▀▀▀░▀░░░▀░▀
        */
        else if(message[1] === "fuck" && message[2] === "you" || message[1] === "fuckyou")
        {
            logs.log("Some cunt is being a asshole. Burning in progress...");
            msg.channel.startTyping();
            await functions.human_delay();
            msg.channel.send("Your a fucking cunt you know that right? Why the fuck do you even exist?");
            msg.channel.stopTyping();
            await functions.human_delay();

            msg.channel.startTyping();
            await functions.human_delay();
            msg.channel.send("Why don't you get off your fat ass and go outside rather than spend all your fucking time jerking off and playing minecraft " + msg.author.username + "?");
            msg.channel.stopTyping();
        }
        
        else if (message[1] === "based")
        {
            var data = JSON.parse(filesystem.readFileSync('src/data/ascii.json'));
            if(!data)
            {
                msg.channel.send("Couldn't Retrieved \'ascii.json\' File.")
            }
            else
            {
                logs.log("BASED by: " + username);
                channel.startTyping();
                await functions.human_delay();
    
                var reply = data.based.data;
                channel.send(reply);
                channel.stopTyping();
            }
        }
    
        /*
            !    ░█▀█░█▀▀░█▀▀░█░█
            !    ░█░█░▀▀█░█▀▀░█▄█
            !    ░▀░▀░▀▀▀░▀░░░▀░▀
        */
        else if (message[1] === "billy")
        {
            var data = JSON.parse(filesystem.readFileSync('src/data/ascii.json'));
            if(!data)
            {
                msg.channel.send("Couldn't Retrieve 'ascii.json' File.");
                logs.log.error("Unable to open ascii.json");
            }
            else
            {
                logs.log(username + "IS DOING IT FOR BILLY");
                channel.startTyping();
                await functions.human_delay();
    
                var reply = data.billy.data;
                channel.send(reply);
                channel.stopTyping();
            }
        }
        
        else
        {
            msg.channel.send(":no_entry: Unknown Command! :no_entry:")
        }
    }

    
}

function search_response(type, data, message)
{
    var embed = new Discord.RichEmbed();
    
    if(type === null)
    {
        logs.log.error("Response is null, something went wrong.");
    }

    else if(data.kind === 'err')
    {
        message.reply('Internal Server Error, Unknown Issue. Please report RacTrack Github.');
    }

    else if(type === 'channel')
    {
        embed.setColor('#FFFF00')
        .setTitle(data.title)
        .setDescription(data.desc)
        .addField('Link', data.url)
        .setURL(data.url)
        .setThumbnail(data.thumb)
        .setFooter(footer);

        message.channel.send(embed);
    }
    else if(type === 'video')
    {
        embed
        .setColor('#FFFF00')
        .setTitle(data.title)
        .setDescription(data.desc)
        .addField('URL', data.url)
        .addField("Want to play this? Join a voice channel and use the command:", "`" + ident + " racplay " + data.title + "`")

        .setFooter(footer);

        message.channel.send(embed);

        // message.reply(
        //     "\n**" + data.title + "**\n"
        //     + "> *" + data.desc + "*\n"
        //     + "> " + data.url  + "\n"
        //     , options);
    }
    else
    {
        embed
        .setColor('#FF0000')
        .setTitle("No Results")
        .addField('Problem: ', "No Results Found, please search for something else!")
        .setFooter(footer);

        message.channel.send(embed);


        // message.reply(":no_entry: No results for search query. Please search something else.");
    }

    logs.log("Search requested by: \"" + message.author.username + "\" | Content Found! Type: \"" + type + "\" | Title: \"" + data.title + "\"");
}

module.exports = methods;			// Exports functions for global usage
