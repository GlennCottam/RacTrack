const fs = require('fs');
const mv = require('mv');
var config = require('./RacTrack').config;
var latest_uri = "logs/latest.log";
var logfile;


var methods = {}

methods.openLogFile = async function()
{
    if(fs.existsSync(latest_uri))
    {
        console.log("Found '" + latest_uri + "', archiving and creating new file.");
        // Archives File By Adding Date:
        await mv(latest_uri, "logs/" + date_tostring() + ".log", function(err)
        {
            if(err)
            {
                methods.log.error("Problem Archiving File: " + err);
            }
        });
        fs.openSync(latest_uri, 'w');
        return new Promise(resolve => {resolve()});
    }
    else
    {
        console.log("Creating " + latest_uri + " File");
        fs.openSync(latest_uri, 'w');
        return new Promise(resolve => {resolve()});
    }
}

if(config.logtype === "text" || config.logtype === "log" || config.logtype === "default")
{
    var log_header = '';
    var log_footer = "\n";
}
else if(config.logtype === "markdown")
{
    var log_header = "- ";
    var log_footer = "<br>\n";
}

methods.log = function(text)
{
    var log = log_header + config.terminal.log + "[" + date_tostring() + "]: " + text + log_footer;
    fs.appendFileSync(latest_uri, log);
}

methods.log.h1 = function(text)
{
    var log = "# " + text + log_footer;
    fs.appendFileSync(latest_uri, log);
}

methods.log.info = function(text)
{
    var log = log_header + " " + config.terminal.info + " [" + date_tostring() + "]: " + text + log_footer;
    fs.appendFileSync(latest_uri, log);
}

methods.log.success = function(text)
{
    var log = log_header + config.terminal.success + "[" + date_tostring() + "]: " + text + log_footer;
    fs.appendFileSync(latest_uri, log);
}

methods.log.warn = function(text)
{

    var log = log_header + config.terminal.warn + "[" + date_tostring() + "]: " + text + log_footer;
    fs.appendFileSync(latest_uri, log);
}

methods.log.error = function(text)
{
    var log = log_header + config.terminal.error + "[" + date_tostring() + "]: " + text + log_footer;
    fs.appendFileSync(latest_uri, log);
}

methods.log.dead = function(text)
{
    var log = log_header + config.terminal.dead + "[" + date_tostring() + "]: " + text + log_footer;
    fs.appendFileSync(latest_uri, log);
}

function date_tostring()
{
    var date = new Date();
    date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds()
    return date;
}

module.exports = methods;

