/*
File:		functions.js
Type:		methods
Comments:	Different functions that will be used for the discord bot itself.
			Use this to handle retrieving of YouTube / search requests.
*/

var methods = {};
const config = require('./config');

// Function to search a message for a specific term
// 		at the beginning of the string.
methods.split_message = function(msg)
{
	var array = [1];
	var full_message;

	// Splits entire message into an array (divided by spaces)
	full_message = msg.content.split(' ');
	array[0] = full_message[0];
	full_message.shift();
	full_message = full_message.join(' ');
	array[1] = full_message;
	
	return array;
}

methods.human_delay = function()
{
	var time = this.random_int(100, 500);		// Gets human delay
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
		console.log(config.terminal.error + "Invalid Status Value: Please enter a int between 0 and " + max);
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
