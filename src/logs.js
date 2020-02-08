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

if(config.logtype === "text" || config.logtype === "log" || config.logtype === "default")
{
    var log_header = null;
    var log_footer = "\n";
}
else if(config.logtype === "markdown")
{
    var log_header = "- ";
    var log_footer = "<br>\n";
}

methods.log = function(text)
{
    var log = log_header + config.terminal.log + "[" + new Date() + "]:\t" + text + log_footer;
    fs.appendFileSync('logs/latest.log', log);
}

methods.log.h1 = function(text)
{
    var log = "# " + text + log_footer;
    fs.appendFileSync('logs/latest.log', log);
}

methods.log.error = function(text)
{
    var log = log_header + console.terminal.error + "[" + new Date() + "]:\t" + text + log_footer;
    fs.appendFileSync('logs/latest.log', log);
}


module.exports = methods;

