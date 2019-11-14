# RacTrack
RacTrack: Scraping the trash for music you desire!

# [Invite RacTrack to your Server!](https://discordapp.com/api/oauth2/authorize?client_id=629333981778804739&permissions=0&scope=bot)

# Options!
Currently, all the options are inside the config.js file. With this being said, here are some examples.

> ## tts (T/F)
Turns off global text to speech for the bot. When turned on, all messages will be read out loud to the user that is sent from the bot.

Default: `false`
```json
tts: false 		// Or
tts: true
```

> ## ident (string)
Will set the global value of what the bot will listen for. Acts as the command string. Can be set to individual character or any string.

Default: `";"`
```json
ident: ";"		// Or
ident: "bot"	// Or
ident: "RacTrack"
```

> ## Status (JSON Objects)
- Various unique status that can be configured.
- Bot will select one every couple of hours
- NOTE: Make sure to change total amount in functions file

Example: 
```json
status:
{
	{
		status: "online / idle / dnd / invisible",		// Sets indicator for bot
		text: "String"									// Sets string of "Playing"
	}
}
```

# Installing Node and Dependencies:
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

# Where the hell is the token?
The token is not being uploaded with the repo since the repo is public. This is cause for a security issue. If you need the token, contact Glenn.

## Ok I have the token, now what?
Simply open the "config.js" file, and place the token inside the "".

NOTE: DO NOT COMMIT ANY CHANGES WITH THE TOKEN IN THAT CONFIG FILE
