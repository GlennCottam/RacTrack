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
	var time = this.random_double(200, 800);		// Gets human delay
	console.log("Waiting: " + time + "ms");
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

methods.get_random_status = function()
{
	var length = Math.floor(Math.random() * 4);		// Gets random from 1 to 3
	var status = config.status[length];

	return status;
}

methods.random_int = function(lower, upper)
{
	var value = Math.floor(Math.random() * upper) + lower;
	return value;
}
methods.random_double = function(lower, upper)
{
	var value = Math.random() * upper + lower;
	return value;
}

// Exports functions to be used by other programs
// Check out require('./functions.js') under index.js
module.exports = methods;
