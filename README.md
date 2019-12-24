<link rel="stylesheet" href="css/readme.css">

# RacTrack Discord Bot
Scraping the trash for music you desire!

RacTrack Discord Bot is designed to search though various sources and play sound though a discord server voice channel.

- [RacTrack Discord Bot](#ractrack-discord-bot)
- [Invite RacTrack to your Server!](#invite-ractrack-to-your-server)
- [Global Bot Options (config.js)](#global-bot-options-configjs)
	- [tts(T/F)](#ttstf)
	- [ident (string)](#ident-string)
	- [Status (JSON Objects)](#status-json-objects)
- [Installing Node and Dependencies](#installing-node-and-dependencies)
	- [Windows](#windows)
	- [Mac OSX](#mac-osx)
	- [Ubuntu](#ubuntu)
- [Starting and Stopping the Node.](#starting-and-stopping-the-node)
- [Token Information](#token-information)
	- [Ok I have the token, now what?](#ok-i-have-the-token-now-what)


# Invite RacTrack to your Server!

Feel free to invite the bot to your server, it will be kept up-to-date on the latest version of the github Release branch.

<div>
<a href="https://discordapp.com/api/oauth2/authorize?client_id=629333981778804739&permissions=0&scope=bot" target="_blank">Invite RacTrack</a>
</div>


# Global Bot Options (config.js)
Currently, all the options are inside the config.js file. With this being said, here are some examples.

## `tts(T/F)`
Turns off global text to speech for the bot. When turned on, all messages will be read out loud to the user that is sent from the bot.

Default: `false`
```json
tts: false 		// Or
tts: true
```

## `ident (string)`
Will set the global value of what the bot will listen for. Acts as the command string. Can be set to individual character or any string.

Default: `"!RT"`
```json
ident: ";"		// Or
ident: "bot"	// Or
ident: "RacTrack"
```

## `Status (JSON Objects)`
- Various unique status that can be configured.
- Bot will select one every couple of hours
- NOTE: Make sure to change total amount in functions file

Example: 
```json
status:
{
	status: "online / idle / dnd / invisible",		// Sets indicator for bot
	text: "String"									// Sets Playing String
}
```

<hr>

# Installing Node and Dependencies
Since we are developing in Node, NPM will be required in order to use node and the packages we will be using for development.

## Windows
- Visit: https://www.npmjs.com/get-npm for download and setup instructions

Run this in the ractrack folder in order to install dependencies:
```
$ npm install dependencies
```

## Mac OSX

### Option 1: Homebrew
You can install homebrew package manager which can install npm via terminal for you. I would 
highly recommend this, but its optional.

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

$ npm install dependencies
```

### Option 2: NPM Standalone
- Go to: https://www.npmjs.com/get-npm and follow instructions

Run this in the ractrack folder in order to install dependencies:
```
$ npm install dependencies
```

## Ubuntu
```
sudo apt install npm
```

<hr>

# Starting and Stopping the Node.
In order to start the node server, simply use
```bash
npm start
```
or
```bash
node index.js
```
If you want to start the server that is not attached to the terminal (running as a background process), we can start it using `nohup`
```bash
nohup node index.js &
```


To kill the node we have a few options.
- Send kill signal in terminal: `[CTRL-C]`.
- npm script **NOTE WILL KILL ALL NODES**: `npm kill`
- `kill <pid>` where `<pid>` is the process id of the node.
  - To find the pid, use `ps -aux | grep node` and it should be the node running index.js
- If terminal has node running, type in `kill` and it will kill the server.

<hr>

# Token Information

The token itself is not provided by the developer as we want to keep this information secret for the managed bot. Please refer to the discord developers documentation in order to create a bot and retrieve a key located at the [Discord Developer Portal](https://discordapp.com/developers/docs/intro).

You will also need a YouTube API token. This token is provided by Google themselves and you will need to register for Googles Cloud Console in order to obtain a YouTube API key.

If documentation is requested, I will create the documentation.

## Ok I have the token, now what?

Simply open the "tokens.js" file, and place the tokens in the correct places.

**NOTE:** Do not push a commit with the values in token saved!!!!
