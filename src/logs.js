const fs = require('fs');
const mv = require('mv');
var config = require('./RacTrack').config;
var logfile;


var methods = {}

methods.openLogFile = async function()
{
    if(fs.existsSync("logs/latest.log"))
    {
        console.log("Latest Log Exists, Archiving and initializing");
        // Archives File By Adding Date:
        var date = new Date();
        date = date.getMonth() + date.getDate() + date.getFullYear() + "-" + date.getHours() + date.getMinutes() + date.getSeconds()
        await mv("logs/latest.log", "logs/" + date + ".log", function(err)
        {
            console.log('');
        });
        fs.openSync("logs/latest.log", 'w');
        return new Promise(resolve => {resolve()});
    }
    else
    {
        console.log("Creating Latest.log File");
        fs.openSync("logs/latest.log", 'w');
        return new Promise(resolve => {resolve()});
    }
}

methods.log = function(text)
{
    var log = config.terminal.log + "[" + new Date() + "]:\t" + text + "\n";
    fs.appendFileSync('logs/latest.log', log);
}

methods.log.error = function(text)
{
    var log = console.terminal.error + "[" + new Date() + "]:\t" + text + "\n";
    fs.appendFileSync('logs/latest.log', log);
}


module.exports = methods;

