/*
File:		functions.js
Type:		methods
Comments:	Different functions that will be used for the discord bot itself.
            Use this to handle retrieving of YouTube / search requests.
*/

var methods = {};
var config = require('./RacTrack').config;

methods.lowercase = function(str)
{
    if(str)
    {
        var out = str.toLowerCase();
        return out;
    }
    else
    {
        return null;
    }
}

// Function to search a message for a specific term
// 		at the beginning of the string.
methods.split_message = function(msg)
{
    var array = [2];
    var full_message;

    // Splits entire message into an array (divided by spaces)
    full_message = msg.content.split(' ');
    full_message[1] = this.lowercase(full_message[1]);	// Convert command to lowercase

    array[0] = full_message[0];
    array[1] = full_message[1];
    full_message.shift();
    full_message.shift();
    full_message = full_message.join(' ');
    array[2] = full_message;

    return array;
}

methods.human_delay = function()
{
    var time = this.random_int(50, 200);		// Gets human delay
    return new Promise(resolve => 
    {
        setTimeout(() => {resolve('resolved');}, time);
    });
}

// Returns YouTube buddy
methods.get_YouTube_Buddy = function()
{
    var length = (Math.random() * 10) + 1;
    var message = "8";
    while(length > 0)
    {
        message += "="
        length --;
    }
    message += "D"

    return message;
}

// Gets random status
methods.get_random_status = function()
{
    var total = Object.keys(config.status).length;
    var length = Math.floor(Math.random() * (total - 1));		// Gets random number between max config values and 0
    var status = config.status[length];

    return status;
}

methods.set_status = function(value)
{
    var max = Object.keys(config.status).length;
    if(value > max|| value < 0)
    {
        this.log.error("Invalid Status Value: Please enter a int between 0 and " + max);
        return null;
    }
    else
    {
        var status = config.status[value];
        return status;
    }
    
}

methods.random_int = function(lower, upper)
{
    var value = Math.floor(Math.random() * upper) + lower;
    return value;
}

// Function that Converts Miliseconds to a Date Format (JSON)
methods.ms_convert = function(value)
{
    var total_time = value;
    var array = {}

    var years, months, days, hours, mins, sec

    if(total_time > 31556952000)
    {
        years = parseInt(total_time / 31556952000, 10);
        total_time = total_time - (31556952000 * years);
    }
    if(total_time > 2629746000)
    {
        months = parseInt(total_time / 2629746000, 10);
        total_time = total_time - (2629746000 * months);
    }
    if(total_time > 86400000)
    {
        days = parseInt(total_time / 86400000, 10);
        total_time = total_time - (86400000 * days);
    }
    if(total_time > 3600000)
    {
        hours = parseInt(total_time / 3600000, 10);
        total_time = total_time - (3600000 * hours);
    }
    if(total_time > 60000)
    {
        mins = parseInt(total_time / 60000, 10);
        total_time = total_time - (60000 * mins);
    }

    var sec = total_time / 1000;

    array.years = parseInt(years, 10);		// Years
    array.months = parseInt(months, 10);		// Months
    array.days = parseInt(days, 10);			// Days
    array.hours = parseInt(hours, 10);			// Hours
    array.mins = parseInt(mins, 10);				// Minutes
    array.sec = parseInt(sec, 10);					// Seconds

    return array;
}

methods.log = function(text)
{
    var log = config.terminal.log + "[" + new Date() + "]:\t";
    console.log(log + text);
}

methods.log.error = function(text)
{
    var log = console.terminal.error + "[" + new Date() + "]:\t";
    console.log(log + text);
}

// Exports functions to be used by other programs
// Check out require('./functions.js') under index.js
module.exports = methods;
