# RacTrack
RacTrack: Scraping the trash for music you desire!

# [Invite RacTrack to your Server!](https://discordapp.com/api/oauth2/authorize?client_id=629333981778804739&permissions=0&scope=bot)

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
To kill the node we have a few options.
- Send kill signal in terminal: `[CTRL-C]`.
- npm script **NOTE WILL KILL ALL NODES**: `npm kill`
- `kill <pid>` where `<pid>` is the process id of the node.
- If terminal has node running, type in `kill` and it will kill the server.

# Where the hell is the token?
The token is not being uploaded with the repo since the repo is public. This is cause for a security issue. If you need the token, contact Glenn.

## Ok I have the token, now what?
Simply open the "config.js" file, and place the token inside the "".

NOTE: DO NOT COMMIT ANY CHANGES WITH THE TOKEN IN THAT CONFIG FILE
