# RacTrack
RacTrack: Scraping the trash for music you desire!

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

# Where the hell is the token?
The token is not being uploaded with the repo since the repo is public. This is cause for a security issue. If you need the token, contact Glenn.

## Ok I have the token, now what?
Simply open the "config.js" file, and place the token inside the "".

NOTE: DO NOT COMMIT ANY CHANGES WITH THE TOKEN IN THAT CONFIG FILE
